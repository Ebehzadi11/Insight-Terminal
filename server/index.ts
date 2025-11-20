import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { getSupabaseAdmin } from '../src/lib/supabaseAdmin';
import type { IndicatorSeries } from '../src/types/indicators';
import { computeRatios } from '../src/lib/ratios';
import type { RatioCode } from '../src/types/company';
import { getOpenAIClient } from '../src/lib/openaiClient';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

/**
 * GET /api/indicators
 * 
 * Query parameters:
 * - codes: comma-separated list of indicator codes (required)
 * - start: ISO date string (YYYY-MM-DD), defaults to 1 year ago
 * - end: ISO date string (YYYY-MM-DD), defaults to today
 * - freq: "daily" | "weekly" | "monthly" (currently ignored, returns daily)
 */
app.get('/api/indicators', async (req, res) => {
  try {
    const codesParam = req.query.codes as string;
    const startParam = req.query.start as string | undefined;
    const endParam = req.query.end as string | undefined;
    const freqParam = req.query.freq as string | undefined; // Reserved for future use

    // Validate required parameter
    if (!codesParam) {
      return res.status(400).json({
        error: 'Missing required parameter: codes',
      });
    }

    // Parse codes
    const codes = codesParam.split(',').map(code => code.trim()).filter(Boolean);
    if (codes.length === 0) {
      return res.status(400).json({
        error: 'Invalid codes parameter: must contain at least one code',
      });
    }

    // Parse and validate dates, with defaults
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const oneYearAgo = new Date(today);
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    let startDate: Date;
    let endDate: Date;

    if (startParam) {
      startDate = new Date(startParam);
      if (isNaN(startDate.getTime())) {
        return res.status(400).json({
          error: 'Invalid start date format. Use YYYY-MM-DD',
        });
      }
      startDate.setHours(0, 0, 0, 0);
    } else {
      startDate = oneYearAgo;
    }

    if (endParam) {
      endDate = new Date(endParam);
      if (isNaN(endDate.getTime())) {
        return res.status(400).json({
          error: 'Invalid end date format. Use YYYY-MM-DD',
        });
      }
      endDate.setHours(23, 59, 59, 999);
    } else {
      endDate = today;
    }

    // Ensure start <= end
    if (startDate > endDate) {
      return res.status(400).json({
        error: 'Start date must be before or equal to end date',
      });
    }

    // Get Supabase admin client
    const supabase = getSupabaseAdmin();

    // Query indicators table
    const { data: indicators, error: indicatorsError } = await supabase
      .from('indicators')
      .select('id, code, name, category, source')
      .in('code', codes);

    if (indicatorsError) {
      console.error('Error fetching indicators:', indicatorsError);
      return res.status(500).json({
        error: 'Failed to fetch indicators',
        details: indicatorsError.message,
      });
    }

    // If no indicators found, return empty array
    if (!indicators || indicators.length === 0) {
      return res.json({
        indicators: [],
      });
    }

    // Get indicator IDs
    const indicatorIds = indicators.map(ind => ind.id);

    // Query indicator_values table
    const { data: values, error: valuesError } = await supabase
      .from('indicator_values')
      .select('indicator_id, timestamp, value')
      .in('indicator_id', indicatorIds)
      .gte('timestamp', startDate.toISOString().split('T')[0])
      .lte('timestamp', endDate.toISOString().split('T')[0])
      .order('timestamp', { ascending: true });

    if (valuesError) {
      console.error('Error fetching indicator values:', valuesError);
      return res.status(500).json({
        error: 'Failed to fetch indicator values',
        details: valuesError.message,
      });
    }

    // Group values by indicator code
    const indicatorMap = new Map<string, IndicatorSeries>();
    
    // Initialize map with indicator metadata
    indicators.forEach(indicator => {
      indicatorMap.set(indicator.code, {
        code: indicator.code,
        name: indicator.name || indicator.code,
        values: [],
      });
    });

    // Group values by indicator_id, then map to code
    const valuesByIndicatorId = new Map<string, Array<{ indicator_id: string; timestamp: string; value: number }>>();
    if (values) {
      values.forEach(value => {
        const indicatorId = value.indicator_id as string;
        if (!valuesByIndicatorId.has(indicatorId)) {
          valuesByIndicatorId.set(indicatorId, []);
        }
        valuesByIndicatorId.get(indicatorId)!.push(value);
      });
    }

    // Map indicator_id to code and populate values
    indicators.forEach(indicator => {
      const indicatorValues = valuesByIndicatorId.get(indicator.id) || [];
      const series = indicatorMap.get(indicator.code)!;
      
      series.values = indicatorValues.map(v => ({
        indicatorId: v.indicator_id as string,
        timestamp: v.timestamp as string,
        value: Number(v.value),
      }));
    });

    // Convert map to array
    const result = {
      indicators: Array.from(indicatorMap.values()),
    };

    return res.json(result);
  } catch (error) {
    console.error('Unexpected error in /api/indicators:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * POST /api/filings/analyze
 * 
 * Request body:
 * - filingId: string (required) - UUID of the filing to analyze
 * 
 * Returns:
 * {
 *   filingId: string,
 *   ratios: Array<{ ratioCode: RatioCode; value: number | null }>
 * }
 */
app.post('/api/filings/analyze', async (req, res) => {
  try {
    const { filingId } = req.body;

    // Validate required parameter
    if (!filingId || typeof filingId !== 'string') {
      return res.status(400).json({
        error: 'Missing or invalid required parameter: filingId',
      });
    }

    // Get Supabase admin client
    const supabase = getSupabaseAdmin();

    // Query filing_metrics table for the given filing_id
    const { data: metrics, error: metricsError } = await supabase
      .from('filing_metrics')
      .select('metric_name, value')
      .eq('filing_id', filingId);

    if (metricsError) {
      console.error('Error fetching filing metrics:', metricsError);
      return res.status(500).json({
        error: 'Failed to fetch filing metrics',
        details: metricsError.message,
      });
    }

    // If no metrics found, return empty ratios
    if (!metrics || metrics.length === 0) {
      return res.json({
        filingId,
        ratios: [],
      });
    }

    // Convert metrics array to Record<string, number>
    const metricsObject: Record<string, number> = {};
    metrics.forEach((metric) => {
      metricsObject[metric.metric_name] = Number(metric.value);
    });

    // Compute ratios using the ratio engine
    const computedRatios = computeRatios(metricsObject);

    // Convert computed ratios to the response format
    const ratiosArray = Object.entries(computedRatios).map(([ratioCode, value]) => ({
      ratioCode: ratioCode as RatioCode,
      value: value,
    }));

    // Optionally upsert ratios into filing_ratios table
    // First, delete existing ratios for this filing
    const { error: deleteError } = await supabase
      .from('filing_ratios')
      .delete()
      .eq('filing_id', filingId);

    if (deleteError) {
      console.warn('Warning: Failed to delete existing ratios:', deleteError);
      // Continue anyway - we'll try to insert
    }

    // Insert new ratios (only non-null values)
    const ratiosToInsert = ratiosArray
      .filter((r) => r.value !== null)
      .map((r) => ({
        filing_id: filingId,
        ratio_code: r.ratioCode,
        value: r.value,
      }));

    if (ratiosToInsert.length > 0) {
      const { error: insertError } = await supabase
        .from('filing_ratios')
        .insert(ratiosToInsert);

      if (insertError) {
        console.warn('Warning: Failed to upsert ratios:', insertError);
        // Continue anyway - we'll still return the computed ratios
      }
    }

    // Return the computed ratios
    return res.json({
      filingId,
      ratios: ratiosArray,
    });
  } catch (error) {
    console.error('Unexpected error in /api/filings/analyze:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * POST /api/ai/macro
 * 
 * Request body:
 * - indicators: IndicatorSeries[] (required) - Array of indicator series with values
 * - startDate: string (required) - ISO date string (YYYY-MM-DD)
 * - endDate: string (required) - ISO date string (YYYY-MM-DD)
 * - normalization: string (optional) - Normalization mode
 * 
 * Returns:
 * {
 *   analysis: string
 * }
 */
app.post('/api/ai/macro', async (req, res) => {
  try {
    const { indicators, startDate, endDate, normalization } = req.body;

    // Validate required parameters
    if (!indicators || !Array.isArray(indicators) || indicators.length === 0) {
      return res.status(400).json({
        error: 'Missing or invalid required parameter: indicators',
      });
    }

    if (!startDate || typeof startDate !== 'string') {
      return res.status(400).json({
        error: 'Missing or invalid required parameter: startDate',
      });
    }

    if (!endDate || typeof endDate !== 'string') {
      return res.status(400).json({
        error: 'Missing or invalid required parameter: endDate',
      });
    }

    // Build prompt
    const indicatorCodes = indicators.map((ind: IndicatorSeries) => ind.code).join(', ');
    const indicatorNames = indicators.map((ind: IndicatorSeries) => ind.name).join(', ');
    
    // Summarize key values (latest and earliest for each indicator)
    let dataSummary = '';
    indicators.forEach((ind: IndicatorSeries) => {
      if (ind.values && ind.values.length > 0) {
        const sorted = [...ind.values].sort((a, b) => 
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
        const first = sorted[0];
        const last = sorted[sorted.length - 1];
        const change = last.value - first.value;
        const changePercent = first.value !== 0 ? ((change / first.value) * 100).toFixed(2) : 'N/A';
        dataSummary += `\n- ${ind.name} (${ind.code}): Started at ${first.value.toFixed(2)} on ${first.timestamp}, ended at ${last.value.toFixed(2)} on ${last.timestamp} (${change >= 0 ? '+' : ''}${changePercent}% change)\n`;
      }
    });

    const prompt = `You are analyzing macroeconomic indicators over the time period from ${startDate} to ${endDate}.

The following indicators are included:
${indicatorNames} (codes: ${indicatorCodes})

Key data points:
${dataSummary}

Please provide a concise macro interpretation covering:
1. Overall trends and direction
2. Risk-on vs risk-off signals
3. Key turning points or notable changes
4. Interconnections between indicators

Keep the analysis clear and actionable, focusing on what this means for financial markets.`;

    // Call OpenAI
    const openai = getOpenAIClient();
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a financial analyst specializing in macroeconomic analysis. Provide clear, concise, and actionable insights.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const analysis = completion.choices[0]?.message?.content || 'Unable to generate analysis.';

    return res.json({ analysis });
  } catch (error) {
    console.error('Error in /api/ai/macro:', error);
    
    // Handle OpenAI-specific errors
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return res.status(500).json({
          error: 'OpenAI API configuration error. Please check your API key.',
        });
      }
    }

    return res.status(500).json({
      error: 'Failed to generate macro analysis',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * POST /api/ai/company
 * 
 * Request body:
 * - filingId: string (required) - UUID of the filing to analyze
 * 
 * Returns:
 * {
 *   analysis: string
 * }
 */
app.post('/api/ai/company', async (req, res) => {
  try {
    const { filingId } = req.body;

    // Validate required parameter
    if (!filingId || typeof filingId !== 'string') {
      return res.status(400).json({
        error: 'Missing or invalid required parameter: filingId',
      });
    }

    // Get Supabase admin client
    const supabase = getSupabaseAdmin();

    // Fetch filing_ratios for this filing
    const { data: ratios, error: ratiosError } = await supabase
      .from('filing_ratios')
      .select('ratio_code, value')
      .eq('filing_id', filingId);

    if (ratiosError) {
      console.error('Error fetching filing ratios:', ratiosError);
      return res.status(500).json({
        error: 'Failed to fetch filing ratios',
        details: ratiosError.message,
      });
    }

    if (!ratios || ratios.length === 0) {
      return res.status(404).json({
        error: 'No ratios found for this filing. Please analyze the filing first.',
      });
    }

    // Build ratios summary
    const ratiosText = ratios
      .map((r) => `${r.ratio_code}: ${r.value !== null ? Number(r.value).toFixed(4) : 'N/A'}`)
      .join('\n');

    // Fetch filing info for context
    const { data: filing, error: filingError } = await supabase
      .from('filings')
      .select('form_type, period_end_date, company_id')
      .eq('id', filingId)
      .single();

    const filingContext = filing
      ? `Filing: ${filing.form_type} for period ending ${filing.period_end_date}`
      : 'Filing information not available';

    const prompt = `You are an equity analyst reviewing a company's financial ratios.

${filingContext}

Financial Ratios:
${ratiosText}

Please analyze this company's financial health, focusing on:
1. Liquidity (current ratio, quick ratio)
2. Leverage (debt-to-equity, debt ratio, interest coverage)
3. Profitability (margins, ROA, ROE, ROIC)
4. Growth (revenue growth)
5. Cash flow (OCF ratio, FCF, FCF margin)

Provide a clear assessment highlighting:
- Major strengths
- Key risks and concerns
- Overall financial health rating

Be specific about which ratios are concerning or positive, and why.`;

    // Call OpenAI
    const openai = getOpenAIClient();
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an experienced equity analyst. Provide clear, professional financial analysis based on ratios.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1200,
    });

    const analysis = completion.choices[0]?.message?.content || 'Unable to generate analysis.';

    return res.json({ analysis });
  } catch (error) {
    console.error('Error in /api/ai/company:', error);
    
    // Handle OpenAI-specific errors
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return res.status(500).json({
          error: 'OpenAI API configuration error. Please check your API key.',
        });
      }
    }

    return res.status(500).json({
      error: 'Failed to generate company analysis',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * POST /api/ai/combined
 * 
 * Request body:
 * - filingId: string (required) - UUID of the filing to analyze
 * - indicators: IndicatorSeries[] (required) - Array of indicator series with values
 * - startDate: string (required) - ISO date string (YYYY-MM-DD)
 * - endDate: string (required) - ISO date string (YYYY-MM-DD)
 * 
 * Returns:
 * {
 *   analysis: string
 * }
 */
app.post('/api/ai/combined', async (req, res) => {
  try {
    const { filingId, indicators, startDate, endDate } = req.body;

    // Validate required parameters
    if (!filingId || typeof filingId !== 'string') {
      return res.status(400).json({
        error: 'Missing or invalid required parameter: filingId',
      });
    }

    if (!indicators || !Array.isArray(indicators) || indicators.length === 0) {
      return res.status(400).json({
        error: 'Missing or invalid required parameter: indicators',
      });
    }

    if (!startDate || typeof startDate !== 'string') {
      return res.status(400).json({
        error: 'Missing or invalid required parameter: startDate',
      });
    }

    if (!endDate || typeof endDate !== 'string') {
      return res.status(400).json({
        error: 'Missing or invalid required parameter: endDate',
      });
    }

    // Get Supabase admin client
    const supabase = getSupabaseAdmin();

    // Fetch filing_ratios for this filing
    const { data: ratios, error: ratiosError } = await supabase
      .from('filing_ratios')
      .select('ratio_code, value')
      .eq('filing_id', filingId);

    if (ratiosError) {
      console.error('Error fetching filing ratios:', ratiosError);
      return res.status(500).json({
        error: 'Failed to fetch filing ratios',
        details: ratiosError.message,
      });
    }

    if (!ratios || ratios.length === 0) {
      return res.status(404).json({
        error: 'No ratios found for this filing. Please analyze the filing first.',
      });
    }

    // Build macro context
    const indicatorCodes = indicators.map((ind: IndicatorSeries) => ind.code).join(', ');
    const indicatorNames = indicators.map((ind: IndicatorSeries) => ind.name).join(', ');
    
    let macroSummary = '';
    indicators.forEach((ind: IndicatorSeries) => {
      if (ind.values && ind.values.length > 0) {
        const sorted = [...ind.values].sort((a, b) => 
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
        const first = sorted[0];
        const last = sorted[sorted.length - 1];
        const change = last.value - first.value;
        const changePercent = first.value !== 0 ? ((change / first.value) * 100).toFixed(2) : 'N/A';
        macroSummary += `\n- ${ind.name} (${ind.code}): ${change >= 0 ? '+' : ''}${changePercent}% change from ${first.timestamp} to ${last.timestamp}\n`;
      }
    });

    // Build ratios summary
    const ratiosText = ratios
      .map((r) => `${r.ratio_code}: ${r.value !== null ? Number(r.value).toFixed(4) : 'N/A'}`)
      .join('\n');

    // Fetch filing info for context
    const { data: filing, error: filingError } = await supabase
      .from('filings')
      .select('form_type, period_end_date')
      .eq('id', filingId)
      .single();

    const filingContext = filing
      ? `${filing.form_type} for period ending ${filing.period_end_date}`
      : 'Filing information not available';

    const prompt = `You are analyzing how the macroeconomic environment affects a specific company's risk and opportunity profile.

MACRO CONTEXT (${startDate} to ${endDate}):
Indicators analyzed: ${indicatorNames} (${indicatorCodes})
${macroSummary}

COMPANY FINANCIAL RATIOS (${filingContext}):
${ratiosText}

Please provide a combined analysis that:
1. Summarizes the current macro environment and its implications
2. Assesses the company's financial health based on the ratios
3. Explains how the macro environment affects this company specifically:
   - What risks does the macro environment pose to this company?
   - What opportunities does it create?
   - How well-positioned is the company to navigate this environment?
4. Provides actionable insights for investors

Focus on the intersection between macro trends and company fundamentals.`;

    // Call OpenAI
    const openai = getOpenAIClient();
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a senior financial analyst specializing in combining macroeconomic analysis with company-specific fundamentals. Provide strategic insights.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const analysis = completion.choices[0]?.message?.content || 'Unable to generate analysis.';

    return res.json({ analysis });
  } catch (error) {
    console.error('Error in /api/ai/combined:', error);
    
    // Handle OpenAI-specific errors
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return res.status(500).json({
          error: 'OpenAI API configuration error. Please check your API key.',
        });
      }
    }

    return res.status(500).json({
      error: 'Failed to generate combined analysis',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`🚀 API server running on http://localhost:${PORT}`);
});


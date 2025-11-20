import DashboardLayout from '@/components/layout/DashboardLayout';
import FilterBar from '@/components/layout/FilterBar';
import MacroChart from '@/components/macro/MacroChart';
import EnhancedIndicatorSelector from '@/components/macro/EnhancedIndicatorSelector';
import StatsTicker from '@/components/macro/StatsTicker';
import AIAnalysisCard from '@/components/shared/AIAnalysisCard';
import { useMacroStore } from '@/stores/macroStore';
import { useDashboardStore } from '@/stores/dashboardStore';
import type { IndicatorSeries } from '@/types/indicators';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export default function MacroDashboard() {
  const { selectedIndicators } = useMacroStore();
  const { timeRange, normalization } = useDashboardStore();

  const generateMacroAnalysis = async () => {
    try {
      if (selectedIndicators.length === 0) {
        throw new Error('Please select at least one indicator to generate analysis.');
      }

      // Calculate date range based on timeRange
      const now = new Date();
      const rangeMap: Record<string, number> = {
        '1M': 30,
        '3M': 90,
        '6M': 180,
        '1Y': 365,
        '3Y': 1095,
        '5Y': 1825,
        'ALL': 10000,
      };

      const daysBack = rangeMap[timeRange] || 365;
      const startDate = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000);
      const endDate = now;

      // Format dates as YYYY-MM-DD
      const startDateStr = startDate.toISOString().split('T')[0];
      const endDateStr = endDate.toISOString().split('T')[0];

      // Fetch indicator data from API
      const codesParam = selectedIndicators.join(',');
      const indicatorsResponse = await fetch(
        `${API_BASE_URL}/api/indicators?codes=${codesParam}&start=${startDateStr}&end=${endDateStr}`
      );

      if (!indicatorsResponse.ok) {
        const errorData = await indicatorsResponse.json();
        throw new Error(errorData.error || 'Failed to fetch indicator data');
      }

      const { indicators } = (await indicatorsResponse.json()) as { indicators: IndicatorSeries[] };

      if (!indicators || indicators.length === 0) {
        throw new Error('No indicator data available for the selected time range.');
      }

      // Call AI API
      const aiResponse = await fetch(`${API_BASE_URL}/api/ai/macro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          indicators,
          startDate: startDateStr,
          endDate: endDateStr,
          normalization: normalization || 'index',
        }),
      });

      if (!aiResponse.ok) {
        const errorData = await aiResponse.json();
        throw new Error(errorData.error || 'Failed to generate analysis');
      }

      const { analysis } = (await aiResponse.json()) as { analysis: string };
      return analysis;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      throw new Error(errorMessage);
    }
  };

  return (
    <DashboardLayout>
      {/* Stats Ticker - Horizontal */}
      <StatsTicker />

      {/* Filter Bar */}
      <FilterBar />

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex">
        {/* Chart Area - Takes most space */}
        <div className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            {/* Header */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Macro Dashboard</h2>
              <p className="text-muted-foreground">
                Analyze macroeconomic indicators and market trends
              </p>
            </div>

            {/* Chart */}
            <MacroChart />

            {/* AI Analysis */}
            <AIAnalysisCard
              title="AI Macro Analysis"
              description="Generate insights on current macroeconomic trends and market conditions"
              onGenerate={generateMacroAnalysis}
            />
          </div>
        </div>

        {/* Indicator Selector - Right sidebar */}
        <div className="w-80 border-l border-border overflow-hidden flex flex-col">
          <EnhancedIndicatorSelector />
        </div>
      </div>
    </DashboardLayout>
  );
}

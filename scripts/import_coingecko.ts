/**
 * CoinGecko Data Import Script
 * 
 * This script:
 * 1. Upserts BTC and ETH indicator definitions into the indicators table
 * 2. Fetches historical daily prices from CoinGecko API (last 365 days)
 * 3. Inserts/updates the corresponding rows into indicator_values table
 * 
 * How to run:
 *   npm run import:coingecko
 *   or
 *   tsx scripts/import_coingecko.ts
 * 
 * Prerequisites:
 *   - Environment variables must be set:
 *     - SUPABASE_URL or VITE_SUPABASE_URL
 *     - SUPABASE_SERVICE_ROLE_KEY or VITE_SUPABASE_SERVICE_ROLE_KEY
 *   - Create a .env file in the project root with these variables
 * 
 * Notes:
 *   - The script is idempotent (safe to run multiple times)
 *   - Uses upsert on indicators (by code) and indicator_values (by indicator_id + timestamp)
 *   - CoinGecko API endpoint: https://api.coingecko.com/api/v3/coins/{id}/market_chart?vs_currency=usd&days=365
 */

import 'dotenv/config';
import { getSupabaseAdmin } from '../src/lib/supabaseAdmin';

// CoinGecko API configuration
const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3';
const DAYS_TO_FETCH = 365;

// Indicator definitions
const INDICATORS = [
  {
    code: 'BTC',
    name: 'Bitcoin',
    category: 'crypto',
    source: 'coingecko',
  },
  {
    code: 'ETH',
    name: 'Ethereum',
    category: 'crypto',
    source: 'coingecko',
  },
] as const;

// CoinGecko coin IDs mapping
const COINGECKO_IDS: Record<string, string> = {
  BTC: 'bitcoin',
  ETH: 'ethereum',
};

interface CoinGeckoPricePoint {
  timestamp_ms: number;
  price: number;
}

interface CoinGeckoMarketChartResponse {
  prices: [number, number][]; // [timestamp_ms, price]
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

/**
 * Fetches historical price data from CoinGecko API
 */
async function fetchCoinGeckoData(coinId: string): Promise<CoinGeckoPricePoint[]> {
  const url = `${COINGECKO_API_BASE}/coins/${coinId}/market_chart?vs_currency=usd&days=${DAYS_TO_FETCH}`;
  
  console.log(`Fetching data for ${coinId} from CoinGecko...`);
  console.log(`URL: ${url}`);
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`CoinGecko API error: ${response.status} ${response.statusText}`);
  }
  
  const data: CoinGeckoMarketChartResponse = await response.json();
  
  // Convert to our format: { timestamp_ms, price }
  return data.prices.map(([timestamp_ms, price]) => ({
    timestamp_ms,
    price,
  }));
}

/**
 * Converts timestamp (milliseconds) to date string (YYYY-MM-DD)
 */
function timestampToDateString(timestampMs: number): string {
  const date = new Date(timestampMs);
  return date.toISOString().split('T')[0];
}

/**
 * Groups price points by date (one price per day, using the last price of the day)
 */
function groupPricesByDate(pricePoints: CoinGeckoPricePoint[]): Map<string, number> {
  const dailyPrices = new Map<string, number>();
  
  for (const point of pricePoints) {
    const dateStr = timestampToDateString(point.timestamp_ms);
    // Keep the last price of the day (CoinGecko typically provides multiple points per day)
    dailyPrices.set(dateStr, point.price);
  }
  
  return dailyPrices;
}

/**
 * Upserts an indicator definition
 */
async function upsertIndicator(supabase: ReturnType<typeof getSupabaseAdmin>, indicator: typeof INDICATORS[number]) {
  const { data, error } = await supabase
    .from('indicators')
    .upsert(
      {
        code: indicator.code,
        name: indicator.name,
        category: indicator.category,
        source: indicator.source,
      },
      {
        onConflict: 'code',
      }
    )
    .select()
    .single();
  
  if (error) {
    throw new Error(`Failed to upsert indicator ${indicator.code}: ${error.message}`);
  }
  
  console.log(`✓ Upserted indicator: ${indicator.code} (ID: ${data.id})`);
  return data.id;
}

/**
 * Upserts indicator values for a given indicator
 */
async function upsertIndicatorValues(
  supabase: ReturnType<typeof getSupabaseAdmin>,
  indicatorId: string,
  dailyPrices: Map<string, number>
) {
  const values = Array.from(dailyPrices.entries()).map(([timestamp, value]) => ({
    indicator_id: indicatorId,
    timestamp,
    value,
  }));
  
  // Batch upsert (Supabase allows upsert by UNIQUE constraint)
  const { error } = await supabase
    .from('indicator_values')
    .upsert(values, {
      onConflict: 'indicator_id,timestamp',
    });
  
  if (error) {
    throw new Error(`Failed to upsert indicator values: ${error.message}`);
  }
  
  console.log(`✓ Upserted ${values.length} price points`);
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Starting CoinGecko data import...\n');
  
  try {
    const supabase = getSupabaseAdmin();
    
    // Step 1: Upsert indicators
    console.log('Step 1: Upserting indicator definitions...');
    const indicatorIds = new Map<string, string>();
    
    for (const indicator of INDICATORS) {
      const id = await upsertIndicator(supabase, indicator);
      indicatorIds.set(indicator.code, id);
    }
    
    console.log('\nStep 2: Fetching price data from CoinGecko...');
    
    // Step 2: Fetch and import price data for each indicator
    for (const indicator of INDICATORS) {
      const coinId = COINGECKO_IDS[indicator.code];
      const indicatorId = indicatorIds.get(indicator.code)!;
      
      console.log(`\nProcessing ${indicator.code} (${coinId})...`);
      
      try {
        // Fetch data from CoinGecko
        const pricePoints = await fetchCoinGeckoData(coinId);
        console.log(`  Fetched ${pricePoints.length} price points`);
        
        // Group by date
        const dailyPrices = groupPricesByDate(pricePoints);
        console.log(`  Grouped into ${dailyPrices.size} unique days`);
        
        // Upsert into database
        await upsertIndicatorValues(supabase, indicatorId, dailyPrices);
        
        console.log(`✓ Successfully imported ${indicator.code} data`);
      } catch (error) {
        console.error(`✗ Error processing ${indicator.code}:`, error);
        throw error;
      }
    }
    
    console.log('\n✅ Import completed successfully!');
  } catch (error) {
    console.error('\n❌ Import failed:', error);
    process.exit(1);
  }
}

// Run the script
main();


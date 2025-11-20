import { Filing } from '@/types';

// Helper to create metrics object from filing data
function createMetricsFromFiling(filing: Filing, priorRevenue?: number): Record<string, number> {
  return {
    current_assets: filing.currentAssets,
    current_liabilities: filing.currentLiabilities,
    inventory: filing.inventory,
    total_liabilities: filing.totalLiabilities,
    shareholders_equity: filing.totalEquity,
    total_assets: filing.totalAssets,
    ebit: filing.operatingIncome,
    interest_expense: filing.interestExpense,
    gross_profit: filing.grossProfit,
    revenue: filing.revenue,
    operating_income: filing.operatingIncome,
    net_income: filing.netIncome,
    nopat: filing.operatingIncome * 0.7, // Approximate NOPAT (EBIT * (1 - tax rate))
    debt: filing.totalLiabilities,
    cash: filing.cash,
    shares_outstanding: filing.sharesOutstanding || 0,
    operating_cash_flow: (filing.netIncome + filing.operatingIncome) * 0.8, // Approximate OCF
    capex: filing.totalAssets * 0.05, // Approximate CapEx
    ...(priorRevenue !== undefined ? { prior_revenue: priorRevenue } : {}),
  };
}

// Mock 10-K filings data
export const mockFilings: Filing[] = [
  {
    id: '1',
    company: 'Apple Inc.',
    year: 2023,
    filingDate: '2023-11-02',
    totalAssets: 352755000000,
    currentAssets: 143566000000,
    cash: 29965000000,
    inventory: 6331000000,
    accountsReceivable: 29508000000,
    totalLiabilities: 290437000000,
    currentLiabilities: 145308000000,
    totalEquity: 62146000000,
    revenue: 383285000000,
    costOfRevenue: 214137000000,
    grossProfit: 169148000000,
    operatingIncome: 114301000000,
    netIncome: 96995000000,
    interestExpense: 3933000000,
    marketCap: 2800000000000,
    sharesOutstanding: 15550061000,
    stockPrice: 180.09,
  },
  {
    id: '2',
    company: 'Microsoft Corporation',
    year: 2023,
    filingDate: '2023-07-27',
    totalAssets: 411976000000,
    currentAssets: 184257000000,
    cash: 111262000000,
    inventory: 2500000000,
    accountsReceivable: 48688000000,
    totalLiabilities: 205753000000,
    currentLiabilities: 95082000000,
    totalEquity: 206223000000,
    revenue: 211915000000,
    costOfRevenue: 65863000000,
    grossProfit: 146052000000,
    operatingIncome: 88523000000,
    netIncome: 72361000000,
    interestExpense: 2456000000,
    marketCap: 2500000000000,
    sharesOutstanding: 7430000000,
    stockPrice: 336.06,
  },
  {
    id: '3',
    company: 'Tesla Inc.',
    year: 2023,
    filingDate: '2024-01-29',
    totalAssets: 106618000000,
    currentAssets: 48747000000,
    cash: 29129000000,
    inventory: 13626000000,
    accountsReceivable: 3508000000,
    totalLiabilities: 43009000000,
    currentLiabilities: 28748000000,
    totalEquity: 62634000000,
    revenue: 96773000000,
    costOfRevenue: 79113000000,
    grossProfit: 17660000000,
    operatingIncome: 8891000000,
    netIncome: 14974000000,
    interestExpense: 156000000,
    marketCap: 650000000000,
    sharesOutstanding: 3178920395,
    stockPrice: 204.52,
  },
];

// Mock metrics for each filing (used by computeRatios)
export const mockFilingMetrics: Record<string, Record<string, number>> = {
  '1': createMetricsFromFiling(mockFilings[0], 394328000000), // Apple with prior year revenue
  '2': createMetricsFromFiling(mockFilings[1], 198270000000), // Microsoft with prior year revenue
  '3': createMetricsFromFiling(mockFilings[2], 81562000000), // Tesla with prior year revenue
};

// Generate mock time series data
function generateMockTimeSeries(
  baseValue: number,
  volatility: number,
  trend: number,
  points: number = 365
): { date: string; value: number }[] {
  const data = [];
  let value = baseValue;
  const startDate = new Date('2021-01-01');
  
  for (let i = 0; i < points; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    // Add trend and random walk
    value = value * (1 + trend / 365 + (Math.random() - 0.5) * volatility);
    
    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.round(value * 100) / 100,
    });
  }
  
  return data;
}

export const mockIndicatorData = {
  SPX: generateMockTimeSeries(3800, 0.015, 0.15, 1095),
  BTC: generateMockTimeSeries(30000, 0.04, 0.8, 1095),
  ETH: generateMockTimeSeries(2000, 0.05, 1.2, 1095),
  M2: generateMockTimeSeries(20000, 0.005, 0.25, 1095),
  DXY: generateMockTimeSeries(95, 0.008, -0.05, 1095),
  '10Y': generateMockTimeSeries(1.5, 0.01, 0.6, 1095),
};

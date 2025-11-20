// Financial Ratios Types
export interface FinancialRatios {
  // Liquidity Ratios
  currentRatio: number;
  quickRatio: number;
  cashRatio: number;
  
  // Profitability Ratios
  grossProfitMargin: number;
  operatingProfitMargin: number;
  netProfitMargin: number;
  returnOnAssets: number;
  returnOnEquity: number;
  
  // Leverage Ratios
  debtToEquity: number;
  debtToAssets: number;
  interestCoverage: number;
  
  // Efficiency Ratios
  assetTurnover: number;
  inventoryTurnover: number;
  receivablesTurnover: number;
  
  // Valuation Ratios
  priceToEarnings: number;
  priceToBook: number;
}

// 10-K Filing Data
export interface Filing {
  id: string;
  company: string;
  year: number;
  quarter?: string;
  filingDate: string;
  
  // Balance Sheet
  totalAssets: number;
  currentAssets: number;
  cash: number;
  inventory: number;
  accountsReceivable: number;
  totalLiabilities: number;
  currentLiabilities: number;
  totalEquity: number;
  
  // Income Statement
  revenue: number;
  costOfRevenue: number;
  grossProfit: number;
  operatingIncome: number;
  netIncome: number;
  interestExpense: number;
  
  // Market Data
  marketCap?: number;
  sharesOutstanding?: number;
  stockPrice?: number;
}

// Macro Indicator Types
export type IndicatorType = 'SPX' | 'BTC' | 'ETH' | 'M2' | 'DXY' | '10Y';

export interface DataPoint {
  date: string;
  value: number;
}

export interface IndicatorData {
  indicator: IndicatorType;
  data: DataPoint[];
  color: string;
}

export type NormalizationMode = 'index' | 'percent' | 'zscore';
export type TimeRange = '1M' | '3M' | '6M' | '1Y' | '3Y' | '5Y' | 'ALL';
export type Frequency = 'daily' | 'weekly' | 'monthly';

// AI Analysis Types
export interface AIAnalysis {
  id: string;
  type: 'macro' | 'company' | 'combined';
  timestamp: string;
  content: string;
  insights: string[];
}

// Re-export new type definitions
export * from './indicators';
export * from './company';

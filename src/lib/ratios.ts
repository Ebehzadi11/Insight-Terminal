import { RatioCode } from '@/types/company';

/**
 * Safe division helper that returns null for invalid division
 */
function safeDiv(numerator: number | undefined, denominator: number | undefined): number | null {
  if (denominator === undefined || denominator === 0 || numerator === undefined) {
    return null;
  }
  return numerator / denominator;
}

/**
 * Computes 16 financial ratios from a metrics object
 * Returns an object keyed by RatioCode with null for invalid calculations
 */
export function computeRatios(metrics: Record<string, number>): Record<RatioCode, number | null> {
  const {
    current_assets,
    current_liabilities,
    inventory,
    total_liabilities,
    shareholders_equity,
    total_assets,
    ebit,
    interest_expense,
    gross_profit,
    revenue,
    operating_income,
    net_income,
    nopat,
    debt,
    cash,
    shares_outstanding,
    prior_revenue,
    operating_cash_flow,
    capex,
  } = metrics;

  // Liquidity Ratios
  const CURRENT_RATIO = safeDiv(current_assets, current_liabilities);
  const QUICK_RATIO = safeDiv(
    current_assets !== undefined && inventory !== undefined
      ? current_assets - inventory
      : undefined,
    current_liabilities
  );

  // Leverage Ratios
  const DEBT_TO_EQUITY = safeDiv(total_liabilities, shareholders_equity);
  const DEBT_RATIO = safeDiv(total_liabilities, total_assets);
  const INTEREST_COVERAGE = safeDiv(ebit, interest_expense);

  // Profitability Ratios
  const GROSS_MARGIN = safeDiv(gross_profit, revenue);
  const OPERATING_MARGIN = safeDiv(operating_income, revenue);
  const NET_MARGIN = safeDiv(net_income, revenue);
  const ROA = safeDiv(net_income, total_assets);
  const ROE = safeDiv(net_income, shareholders_equity);
  
  // ROIC = NOPAT / (Debt + Shareholders Equity - Cash)
  const investedCapital = 
    debt !== undefined && shareholders_equity !== undefined && cash !== undefined
      ? debt + shareholders_equity - cash
      : undefined;
  const ROIC = safeDiv(nopat, investedCapital);

  // Per Share Metrics
  const EPS = safeDiv(net_income, shares_outstanding);

  // Growth Ratios
  const REVENUE_GROWTH_YOY = safeDiv(
    revenue !== undefined && prior_revenue !== undefined
      ? revenue - prior_revenue
      : undefined,
    prior_revenue
  );

  // Cash Flow Ratios
  const OCF_RATIO = safeDiv(operating_cash_flow, current_liabilities);
  
  // FCF = Operating Cash Flow - CapEx
  const FCF = 
    operating_cash_flow !== undefined && capex !== undefined
      ? operating_cash_flow - capex
      : undefined;
  
  const FCF_MARGIN = safeDiv(FCF, revenue);

  return {
    CURRENT_RATIO,
    QUICK_RATIO,
    DEBT_TO_EQUITY,
    DEBT_RATIO,
    INTEREST_COVERAGE,
    GROSS_MARGIN,
    OPERATING_MARGIN,
    NET_MARGIN,
    ROA,
    ROE,
    ROIC,
    EPS,
    REVENUE_GROWTH_YOY,
    OCF_RATIO,
    FCF: FCF !== undefined ? FCF : null,
    FCF_MARGIN,
  };
}

/**
 * Converts computed ratios (using RatioCode) to legacy FinancialRatios format
 * for backward compatibility with existing store
 */
import { Filing, FinancialRatios } from '@/types';

export function convertComputedRatiosToFinancialRatios(
  computedRatios: Record<RatioCode, number | null>,
  filing: Filing
): FinancialRatios {
  return {
    currentRatio: computedRatios.CURRENT_RATIO || 0,
    quickRatio: computedRatios.QUICK_RATIO || 0,
    cashRatio: safeDiv(filing.cash, filing.currentLiabilities) || 0,
    grossProfitMargin: (computedRatios.GROSS_MARGIN || 0) * 100,
    operatingProfitMargin: (computedRatios.OPERATING_MARGIN || 0) * 100,
    netProfitMargin: (computedRatios.NET_MARGIN || 0) * 100,
    returnOnAssets: (computedRatios.ROA || 0) * 100,
    returnOnEquity: (computedRatios.ROE || 0) * 100,
    debtToEquity: computedRatios.DEBT_TO_EQUITY || 0,
    debtToAssets: (computedRatios.DEBT_RATIO || 0) * 100,
    interestCoverage: computedRatios.INTEREST_COVERAGE || 0,
    assetTurnover: safeDiv(filing.revenue, filing.totalAssets) || 0,
    inventoryTurnover: safeDiv(filing.costOfRevenue, filing.inventory) || 0,
    receivablesTurnover: safeDiv(filing.revenue, filing.accountsReceivable) || 0,
    priceToEarnings: filing.stockPrice && filing.netIncome && filing.sharesOutstanding
      ? filing.stockPrice / (filing.netIncome / filing.sharesOutstanding)
      : 0,
    priceToBook: filing.marketCap && filing.totalEquity
      ? filing.marketCap / filing.totalEquity
      : 0,
  };
}

/**
 * Legacy function for backward compatibility
 * Converts old Filing structure to metrics and uses computeRatios
 */
export function calculateFinancialRatios(filing: Filing): FinancialRatios {
  const metrics: Record<string, number> = {
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
  };

  const ratios = computeRatios(metrics);
  return convertComputedRatiosToFinancialRatios(ratios, filing);
}

export function formatRatio(value: number | null, type: 'ratio' | 'percentage' | 'times'): string {
  if (value === null || !isFinite(value)) return 'N/A';
  
  switch (type) {
    case 'ratio':
      return value.toFixed(2);
    case 'percentage':
      return `${(value * 100).toFixed(2)}%`;
    case 'times':
      return `${value.toFixed(2)}x`;
    default:
      return value.toFixed(2);
  }
}

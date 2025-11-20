export interface Company {
  id: string;
  ticker: string;
  name: string;
  sector?: string;
  industry?: string;
}

export interface Filing {
  id: string;
  companyId: string;
  formType: string;
  periodEndDate: string;
  filedAt: string;
}

export interface FilingMetric {
  metricName: string;
  value: number;
  unit?: string;
}

export type RatioCode =
  | 'CURRENT_RATIO'
  | 'QUICK_RATIO'
  | 'DEBT_TO_EQUITY'
  | 'DEBT_RATIO'
  | 'INTEREST_COVERAGE'
  | 'GROSS_MARGIN'
  | 'OPERATING_MARGIN'
  | 'NET_MARGIN'
  | 'ROA'
  | 'ROE'
  | 'ROIC'
  | 'EPS'
  | 'REVENUE_GROWTH_YOY'
  | 'OCF_RATIO'
  | 'FCF'
  | 'FCF_MARGIN';

export interface FilingRatio {
  ratioCode: RatioCode;
  value: number | null;
}


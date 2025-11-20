export interface Indicator {
  id: string;
  code: string;
  name: string;
  category: string;
  source?: string;
}

export interface IndicatorValue {
  indicatorId: string;
  timestamp: string;
  value: number;
}

export interface IndicatorSeries {
  code: string;
  name: string;
  values: IndicatorValue[];
}


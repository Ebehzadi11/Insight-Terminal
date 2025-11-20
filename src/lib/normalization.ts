import type { IndicatorSeries } from '@/types/indicators';

/**
 * Normalize indicator series to index format (first value = 100)
 */
export function indexNormalize(series: IndicatorSeries[]): IndicatorSeries[] {
  return series.map((s) => {
    if (s.values.length === 0) return s;

    const firstValue = s.values[0].value;
    if (firstValue === 0) return s; // Avoid division by zero

    return {
      ...s,
      values: s.values.map((v) => ({
        ...v,
        value: (v.value / firstValue) * 100,
      })),
    };
  });
}

/**
 * Normalize indicator series to percent change format
 * Returns percentage change from first value: (value - first) / first * 100
 */
export function percentChangeNormalize(series: IndicatorSeries[]): IndicatorSeries[] {
  return series.map((s) => {
    if (s.values.length === 0) return s;

    const firstValue = s.values[0].value;
    if (firstValue === 0) return s; // Avoid division by zero

    return {
      ...s,
      values: s.values.map((v) => ({
        ...v,
        value: ((v.value - firstValue) / firstValue) * 100,
      })),
    };
  });
}

/**
 * Normalize indicator series to z-score format
 * Returns z-scores: (value - mean) / std per series
 */
export function zScoreNormalize(series: IndicatorSeries[]): IndicatorSeries[] {
  return series.map((s) => {
    if (s.values.length === 0) return s;

    const values = s.values.map((v) => v.value);
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const variance =
      values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
    const std = Math.sqrt(variance);

    if (std === 0) return s; // Avoid division by zero (constant series)

    return {
      ...s,
      values: s.values.map((v) => ({
        ...v,
        value: (v.value - mean) / std,
      })),
    };
  });
}


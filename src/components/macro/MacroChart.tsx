import { useEffect, useMemo, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useMacroStore } from '@/stores/macroStore';
import { useDashboardStore } from '@/stores/dashboardStore';
import { Card } from '@/components/ui/card';
import type { IndicatorSeries } from '@/types/indicators';
import { indexNormalize, percentChangeNormalize, zScoreNormalize } from '@/lib/normalization';
import { mockIndicatorData } from '@/lib/mockData';

// Color mapping for indicators using theme chart colors
const defaultColors = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

// Indicator names mapping
const indicatorNames: Record<string, string> = {
  SPX: 'S&P 500',
  BTC: 'Bitcoin',
  ETH: 'Ethereum',
  M2: 'M2 Money Supply',
  DXY: 'Dollar Index',
  '10Y': '10Y Treasury',
};

export default function MacroChart() {
  const { selectedIndicators } = useMacroStore();
  const { timeRange, normalization } = useDashboardStore();
  const [indicatorSeries, setIndicatorSeries] = useState<IndicatorSeries[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load mock data
  useEffect(() => {
    if (selectedIndicators.length === 0) {
      setIndicatorSeries([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
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

      // Convert mock data to IndicatorSeries format
      const series: IndicatorSeries[] = selectedIndicators.map((code) => {
        const mockData = mockIndicatorData[code as keyof typeof mockIndicatorData];

        if (!mockData) {
          return {
            code,
            name: indicatorNames[code] || code,
            values: [],
          };
        }

        // Filter data by date range
        const filteredData = mockData.filter((point) => {
          const pointDate = new Date(point.date);
          return pointDate >= startDate && pointDate <= endDate;
        });

        return {
          code,
          name: indicatorNames[code] || code,
          values: filteredData.map((point) => ({
            indicatorId: code,
            timestamp: point.date,
            value: point.value,
          })),
        };
      });

      setIndicatorSeries(series);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
      setIndicatorSeries([]);
    } finally {
      setLoading(false);
    }
  }, [selectedIndicators, timeRange]);

  // Apply normalization and transform to chart format
  const chartData = useMemo(() => {
    if (indicatorSeries.length === 0) return [];

    // Filter to only selected indicators
    const filteredSeries = indicatorSeries.filter((s) =>
      selectedIndicators.some((ind) => ind === s.code)
    );

    if (filteredSeries.length === 0) return [];

    // Apply normalization
    let normalizedSeries: IndicatorSeries[];
    switch (normalization) {
      case 'index':
        normalizedSeries = indexNormalize(filteredSeries);
        break;
      case 'percent':
        normalizedSeries = percentChangeNormalize(filteredSeries);
        break;
      case 'zscore':
        normalizedSeries = zScoreNormalize(filteredSeries);
        break;
      default:
        normalizedSeries = filteredSeries;
    }

    // Collect all unique timestamps
    const timestampSet = new Set<string>();
    normalizedSeries.forEach((series) => {
      series.values.forEach((v) => timestampSet.add(v.timestamp));
    });

    const timestamps = Array.from(timestampSet).sort();

    // Transform to Recharts format: array of { date, indicator1, indicator2, ... }
    return timestamps.map((timestamp) => {
      const dataPoint: Record<string, string | number> = { date: timestamp };

      normalizedSeries.forEach((series) => {
        const value = series.values.find((v) => v.timestamp === timestamp);
        dataPoint[series.code] = value ? value.value : null;
      });

      return dataPoint;
    });
  }, [indicatorSeries, selectedIndicators, normalization]);

  // Get indicator metadata for colors and labels
  const indicatorMetadata = useMemo(() => {
    const metadata = new Map<string, { name: string; color: string }>();
    indicatorSeries.forEach((series, idx) => {
      if (selectedIndicators.some((ind) => ind === series.code)) {
        metadata.set(series.code, {
          name: series.name,
          color: defaultColors[idx % defaultColors.length],
        });
      }
    });
    return metadata;
  }, [indicatorSeries, selectedIndicators]);

  // Y-axis label based on normalization mode
  const yAxisLabel = useMemo(() => {
    switch (normalization) {
      case 'index':
        return 'Index (100 = start)';
      case 'percent':
        return 'Percent Change (%)';
      case 'zscore':
        return 'Z-Score';
      default:
        return 'Value';
    }
  }, [normalization]);

  if (selectedIndicators.length === 0) {
    return (
      <Card className="p-8 bg-card border-border">
        <p className="text-center text-muted-foreground">Select indicators to display chart</p>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className="p-8 bg-card border-border">
        <p className="text-center text-muted-foreground">Loading chart data...</p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-8 bg-card border-border">
        <p className="text-center text-destructive">Error: {error}</p>
      </Card>
    );
  }

  if (chartData.length === 0) {
    return (
      <Card className="p-8 bg-card border-border">
        <p className="text-center text-muted-foreground">No data available for selected indicators</p>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-card border-border">
      <ResponsiveContainer width="100%" height={500}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="date"
            stroke="hsl(var(--muted-foreground))"
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
            tickFormatter={(value) =>
              new Date(value).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
            }
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
            label={{
              value: yAxisLabel,
              angle: -90,
              position: 'insideLeft',
              fill: 'hsl(var(--muted-foreground))',
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--popover))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              color: 'hsl(var(--popover-foreground))',
            }}
            labelFormatter={(value) => new Date(value).toLocaleDateString()}
          />
          <Legend wrapperStyle={{ color: 'hsl(var(--muted-foreground))' }} />
          {Array.from(indicatorMetadata.entries()).map(([code, meta]) => (
            <Line
              key={code}
              type="monotone"
              dataKey={code}
              name={meta.name}
              stroke={meta.color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}

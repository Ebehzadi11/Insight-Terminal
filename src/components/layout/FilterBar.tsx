import { useDashboardStore } from '@/stores/dashboardStore';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TimeRange, Frequency, NormalizationMode } from '@/types';
import { Calendar, TrendingUp, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FilterBar() {
  const { timeRange, frequency, normalization, setTimeRange, setFrequency, setNormalization } =
    useDashboardStore();

  const timeRanges: TimeRange[] = ['1M', '3M', '6M', '1Y', '3Y', '5Y', 'ALL'];
  const frequencies: Frequency[] = ['daily', 'weekly', 'monthly'];
  const normalizations: NormalizationMode[] = ['index', 'percent', 'zscore'];

  const normalizationLabels: Record<NormalizationMode, string> = {
    index: 'Index (100=start)',
    percent: 'Percent Change',
    zscore: 'Z-Score',
  };

  return (
    <div className="bg-card border-b border-border px-4 py-3">
      <div className="flex flex-wrap items-center gap-4">
        {/* Time Range */}
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <div className="flex gap-1">
            {timeRanges.map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setTimeRange(range)}
                className={cn(
                  'h-8 px-3',
                  timeRange === range
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                )}
              >
                {range}
              </Button>
            ))}
          </div>
        </div>

        {/* Frequency */}
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-muted-foreground" />
          <Select value={frequency} onValueChange={(v) => setFrequency(v as Frequency)}>
            <SelectTrigger className="w-32 h-8 bg-background border-input">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {frequencies.map((freq) => (
                <SelectItem key={freq} value={freq}>
                  {freq.charAt(0).toUpperCase() + freq.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Normalization */}
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
          <Select value={normalization} onValueChange={(v) => setNormalization(v as NormalizationMode)}>
            <SelectTrigger className="w-40 h-8 bg-background border-input">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {normalizations.map((norm) => (
                <SelectItem key={norm} value={norm}>
                  {normalizationLabels[norm]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

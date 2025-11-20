import { TrendingUp, TrendingDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDashboardStore } from '@/stores/dashboardStore';
import { Button } from '@/components/ui/button';

interface TickerItem {
  code: string;
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  color: string;
}

export default function StatsTicker() {
  const { toggleStatsDrawer } = useDashboardStore();

  const tickerData: TickerItem[] = [
    {
      code: 'SPX',
      label: 'S&P 500',
      value: '4,783',
      change: '+12.4%',
      trend: 'up',
      color: 'hsl(var(--chart-1))',
    },
    {
      code: 'BTC',
      label: 'Bitcoin',
      value: '43.5K',
      change: '+85.2%',
      trend: 'up',
      color: 'hsl(var(--chart-3))',
    },
    {
      code: 'ETH',
      label: 'Ethereum',
      value: '2,450',
      change: '+45.1%',
      trend: 'up',
      color: 'hsl(var(--chart-4))',
    },
    {
      code: 'M2',
      label: 'M2 Supply',
      value: '21.2T',
      change: '+8.1%',
      trend: 'up',
      color: 'hsl(var(--chart-2))',
    },
    {
      code: 'DXY',
      label: 'Dollar Index',
      value: '101.2',
      change: '-2.3%',
      trend: 'down',
      color: 'hsl(var(--chart-5))',
    },
    {
      code: '10Y',
      label: '10Y Treasury',
      value: '4.2%',
      change: '-5.1%',
      trend: 'down',
      color: 'hsl(var(--chart-1))',
    },
  ];

  return (
    <div className="border-b border-border bg-card">
      <div className="flex items-center">
        {/* Scrollable Ticker */}
        <div className="flex-1 overflow-x-auto">
          <div className="flex items-center divide-x divide-border min-w-max">
            {tickerData.map((item) => (
              <div
                key={item.code}
                className="flex items-center gap-3 px-4 py-3 hover:bg-accent/50 transition-colors cursor-pointer"
              >
                {/* Indicator Dot */}
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />

                {/* Code & Label */}
                <div className="flex flex-col min-w-[80px]">
                  <span className="text-xs font-medium text-muted-foreground">{item.code}</span>
                  <span className="text-sm font-semibold text-foreground">{item.value}</span>
                </div>

                {/* Change */}
                <div className="flex items-center gap-1">
                  {item.trend === 'up' ? (
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )}
                  <span
                    className={cn(
                      'text-xs font-medium',
                      item.trend === 'up' ? 'text-green-500' : 'text-red-500'
                    )}
                  >
                    {item.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Drawer Button */}
        <div className="flex-shrink-0 border-l border-border px-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleStatsDrawer}
            className="h-8 gap-1 text-muted-foreground hover:text-foreground"
          >
            <span className="text-xs">View All</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

import { useEffect } from 'react';
import { useDashboardStore } from '@/stores/dashboardStore';
import { Button } from '@/components/ui/button';
import { X, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TickerItem {
  code: string;
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  color: string;
}

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

export default function StatsDrawer() {
  const { statsDrawerOpen, toggleStatsDrawer } = useDashboardStore();

  // Handle ESC key to close drawer
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && statsDrawerOpen) {
        toggleStatsDrawer();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [statsDrawerOpen, toggleStatsDrawer]);

  // Prevent body scroll when drawer is open on mobile
  useEffect(() => {
    if (statsDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [statsDrawerOpen]);

  return (
    <>
      {/* Backdrop - Mobile only (overlay mode) */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 transition-opacity duration-200 lg:hidden z-30',
          statsDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={toggleStatsDrawer}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-labelledby="stats-drawer-title"
        className={cn(
          'fixed top-0 right-0 h-full bg-card border-l border-border shadow-2xl z-40',
          'transition-transform duration-300 ease-in-out',
          // Desktop: 400px fixed width
          // Mobile: 90% screen width
          'w-[90%] lg:w-[400px]',
          // Slide animation
          statsDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h2 id="stats-drawer-title" className="text-lg font-semibold text-foreground">
            Market Stats
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleStatsDrawer}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close drawer</span>
          </Button>
        </div>

        {/* Content - Stats Grid */}
        <div className="h-[calc(100%-57px)] overflow-auto p-4">
          <div className="space-y-3">
            {tickerData.map((item) => (
              <div
                key={item.code}
                className="p-4 rounded-lg border border-border bg-background hover:bg-accent/50 transition-colors"
              >
                {/* Header with dot and code */}
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs font-medium text-muted-foreground uppercase">
                    {item.code}
                  </span>
                </div>

                {/* Label */}
                <div className="text-sm font-medium text-foreground mb-1">
                  {item.label}
                </div>

                {/* Value and Change */}
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-bold text-foreground">
                    {item.value}
                  </span>
                  <div className="flex items-center gap-1">
                    {item.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span
                      className={cn(
                        'text-sm font-semibold',
                        item.trend === 'up' ? 'text-green-500' : 'text-red-500'
                      )}
                    >
                      {item.change}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

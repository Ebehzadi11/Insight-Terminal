import { useState } from 'react';
import { useMacroStore } from '@/stores/macroStore';
import { useDashboardStore } from '@/stores/dashboardStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IndicatorType } from '@/types';
import { Check, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IndicatorItem {
  type: IndicatorType;
  label: string;
  color: string;
  category: string;
}

const indicators: IndicatorItem[] = [
  { type: 'SPX', label: 'S&P 500', color: 'hsl(var(--chart-1))', category: 'Markets' },
  { type: 'BTC', label: 'Bitcoin', color: 'hsl(var(--chart-3))', category: 'Crypto' },
  { type: 'ETH', label: 'Ethereum', color: 'hsl(var(--chart-4))', category: 'Crypto' },
  { type: 'M2', label: 'M2 Money Supply', color: 'hsl(var(--chart-2))', category: 'Monetary' },
  { type: 'DXY', label: 'Dollar Index', color: 'hsl(var(--chart-5))', category: 'Forex' },
  { type: '10Y', label: '10Y Treasury', color: 'hsl(var(--chart-1))', category: 'Rates' },
];

export default function IndicatorToggleBar() {
  const { selectedIndicators, toggleIndicator } = useMacroStore();
  const { indicatorPanelOpen, toggleIndicatorPanel } = useDashboardStore();
  const [searchQuery, setSearchQuery] = useState('');

  // Group indicators by category
  const categorizedIndicators = indicators.reduce(
    (acc, indicator) => {
      if (!acc[indicator.category]) {
        acc[indicator.category] = [];
      }
      acc[indicator.category].push(indicator);
      return acc;
    },
    {} as Record<string, IndicatorItem[]>
  );

  // Filter indicators by search query
  const filteredCategories = Object.entries(categorizedIndicators).reduce(
    (acc, [category, items]) => {
      const filtered = items.filter(
        (item) =>
          item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filtered.length > 0) {
        acc[category] = filtered;
      }
      return acc;
    },
    {} as Record<string, IndicatorItem[]>
  );

  return (
    <div className="bg-card border-b border-border">
      {/* Toggle Button */}
      <div className="px-3 sm:px-4 py-2 flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleIndicatorPanel}
          className="text-muted-foreground hover:text-foreground gap-1 sm:gap-2 text-xs sm:text-sm"
        >
          {indicatorPanelOpen ? (
            <>
              <ChevronUp className="h-4 w-4" />
              <span className="hidden xs:inline">Hide Indicators</span>
              <span className="xs:hidden">Hide</span>
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4" />
              <span className="hidden xs:inline">Show Indicators</span>
              <span className="xs:hidden">Show</span>
            </>
          )}
        </Button>
        <div className="text-xs text-muted-foreground">
          {selectedIndicators.length} selected
        </div>
      </div>

      {/* Collapsible Panel */}
      <div
        className={cn(
          'overflow-hidden transition-all duration-300 ease-in-out',
          indicatorPanelOpen ? 'max-h-[240px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="px-4 pb-4 space-y-3 overflow-y-auto max-h-[240px]">
          {/* Search and Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search indicators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 bg-background border-input"
              />
            </div>
            <div className="flex gap-2 sm:flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                className="text-xs flex-1 sm:flex-initial"
                onClick={() => {
                  const allTypes = indicators.map(i => i.type);
                  allTypes.forEach(type => {
                    if (!selectedIndicators.includes(type)) {
                      toggleIndicator(type);
                    }
                  });
                }}
              >
                Select All
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs flex-1 sm:flex-initial"
                onClick={() => {
                  selectedIndicators.forEach(type => toggleIndicator(type));
                }}
              >
                Clear All
              </Button>
            </div>
          </div>

          {/* Indicator Grid by Category */}
          <div className="space-y-2">
            {Object.entries(filteredCategories).map(([category, items]) => (
              <div key={category}>
                <div className="text-xs font-medium text-muted-foreground mb-2">
                  {category}
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((indicator) => {
                    const isSelected = selectedIndicators.includes(indicator.type);
                    return (
                      <button
                        key={indicator.type}
                        onClick={() => toggleIndicator(indicator.type)}
                        className={cn(
                          'flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors',
                          isSelected
                            ? 'bg-accent text-accent-foreground border border-primary'
                            : 'bg-background hover:bg-accent/50 border border-border'
                        )}
                      >
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: indicator.color }}
                        />
                        <span className="text-sm">{indicator.label}</span>
                        {isSelected && <Check className="h-3 w-3 text-primary flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

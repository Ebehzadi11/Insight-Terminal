import { useState } from 'react';
import { useMacroStore } from '@/stores/macroStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { IndicatorType } from '@/types';
import { Check, ChevronDown, ChevronRight, Search, Plus } from 'lucide-react';
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

export default function EnhancedIndicatorSelector() {
  const { selectedIndicators, toggleIndicator } = useMacroStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(['Markets', 'Crypto', 'Monetary', 'Forex', 'Rates'])
  );

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

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
    <Card className="flex flex-col h-full bg-card border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground mb-3">Indicators</h3>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search indicators..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-background border-input"
          />
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {Object.entries(filteredCategories).map(([category, items]) => {
          const isExpanded = expandedCategories.has(category);
          const selectedCount = items.filter((item) =>
            selectedIndicators.includes(item.type)
          ).length;

          return (
            <Collapsible
              key={category}
              open={isExpanded}
              onOpenChange={() => toggleCategory(category)}
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-accent rounded-md transition-colors group">
                <div className="flex items-center gap-2">
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="text-sm font-medium text-foreground">{category}</span>
                  {selectedCount > 0 && (
                    <span className="text-xs text-muted-foreground">
                      ({selectedCount}/{items.length})
                    </span>
                  )}
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent className="mt-1 space-y-1 pl-6">
                {items.map((indicator) => {
                  const isSelected = selectedIndicators.includes(indicator.type);

                  return (
                    <button
                      key={indicator.type}
                      onClick={() => toggleIndicator(indicator.type)}
                      className={cn(
                        'flex items-center justify-between w-full p-2 rounded-md transition-colors text-left',
                        isSelected
                          ? 'bg-accent text-accent-foreground'
                          : 'hover:bg-accent/50 text-muted-foreground hover:text-foreground'
                      )}
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: indicator.color }}
                        />
                        <span className="text-sm truncate">{indicator.label}</span>
                      </div>
                      {isSelected && <Check className="h-4 w-4 text-primary flex-shrink-0" />}
                    </button>
                  );
                })}
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-border space-y-2">
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Custom Indicator
        </Button>

        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 text-xs"
            onClick={() => {
              // Select all in view
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
            variant="ghost"
            size="sm"
            className="flex-1 text-xs"
            onClick={() => {
              // Clear all
              selectedIndicators.forEach(type => toggleIndicator(type));
            }}
          >
            Clear
          </Button>
        </div>
      </div>
    </Card>
  );
}

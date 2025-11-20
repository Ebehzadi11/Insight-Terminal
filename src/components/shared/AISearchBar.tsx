import { useState, useEffect, useRef } from 'react';
import { useDashboardStore } from '@/stores/dashboardStore';
import { useMacroStore } from '@/stores/macroStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Sparkles, TrendingUp, BarChart3, Lightbulb, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { IndicatorSeries } from '@/types/indicators';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface QuickAction {
  id: string;
  label: string;
  icon: typeof Sparkles;
  prompt: string;
}

const quickActions: QuickAction[] = [
  {
    id: 'macro-analysis',
    label: 'Generate Macro Analysis',
    icon: Sparkles,
    prompt: 'Generate a comprehensive macro analysis',
  },
  {
    id: 'compare',
    label: 'Compare Indicators',
    icon: BarChart3,
    prompt: 'Compare selected indicators',
  },
  {
    id: 'trends',
    label: 'Identify Trends',
    icon: TrendingUp,
    prompt: 'Identify key trends in the data',
  },
  {
    id: 'insights',
    label: 'Market Insights',
    icon: Lightbulb,
    prompt: 'Provide market insights',
  },
];

export default function AISearchBar() {
  const { aiSearchOpen, setAISearchOpen, timeRange, normalization } = useDashboardStore();
  const { selectedIndicators } = useMacroStore();
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle keyboard shortcut (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setAISearchOpen(!aiSearchOpen);
      }
      if (e.key === 'Escape' && aiSearchOpen) {
        setAISearchOpen(false);
        setResponse(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [aiSearchOpen, setAISearchOpen]);

  // Focus input when opened
  useEffect(() => {
    if (aiSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [aiSearchOpen]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        aiSearchOpen
      ) {
        setAISearchOpen(false);
        setResponse(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [aiSearchOpen, setAISearchOpen]);

  const handleSubmit = async (queryText: string) => {
    if (!queryText.trim() || selectedIndicators.length === 0) {
      return;
    }

    setIsLoading(true);
    setResponse(null);

    try {
      // Calculate date range
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

      const startDateStr = startDate.toISOString().split('T')[0];
      const endDateStr = endDate.toISOString().split('T')[0];

      // Fetch indicator data
      const codesParam = selectedIndicators.join(',');
      const indicatorsResponse = await fetch(
        `${API_BASE_URL}/api/indicators?codes=${codesParam}&start=${startDateStr}&end=${endDateStr}`
      );

      if (!indicatorsResponse.ok) {
        throw new Error('Failed to fetch indicator data');
      }

      const { indicators } = (await indicatorsResponse.json()) as { indicators: IndicatorSeries[] };

      // Call AI API
      const aiResponse = await fetch(`${API_BASE_URL}/api/ai/macro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          indicators,
          startDate: startDateStr,
          endDate: endDateStr,
          normalization: normalization || 'index',
          customQuery: queryText,
        }),
      });

      if (!aiResponse.ok) {
        throw new Error('Failed to generate analysis');
      }

      const { analysis } = (await aiResponse.json()) as { analysis: string };
      setResponse(analysis);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setResponse(`Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action: QuickAction) => {
    setQuery(action.prompt);
    handleSubmit(action.prompt);
  };

  const handleClear = () => {
    setQuery('');
    setResponse(null);
    setAISearchOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Ask AI about macro trends... ⌘K"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setAISearchOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit(query);
            }
          }}
          className="pl-10 pr-10 h-9 bg-background/50 border-input hover:bg-background transition-colors"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {aiSearchOpen && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-card border border-border rounded-lg shadow-2xl z-50 max-h-[500px] overflow-y-auto">
          <div className="p-4 space-y-4">
            {/* Quick Actions */}
            {!response && !isLoading && (
              <>
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Quick Actions
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <Button
                        key={action.id}
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickAction(action)}
                        className="justify-start gap-2 h-auto py-2 text-left"
                        disabled={selectedIndicators.length === 0}
                      >
                        <Icon className="h-4 w-4 flex-shrink-0" />
                        <span className="text-sm">{action.label}</span>
                      </Button>
                    );
                  })}
                </div>

                {selectedIndicators.length === 0 && (
                  <div className="text-xs text-muted-foreground text-center py-2">
                    Select indicators first to use AI features
                  </div>
                )}

                <div className="text-xs text-muted-foreground">
                  Or type a custom question and press Enter
                </div>
              </>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center gap-3 py-8">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                <span className="text-sm text-muted-foreground">Analyzing...</span>
              </div>
            )}

            {/* Response */}
            {response && !isLoading && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">AI Response</span>
                </div>
                <div className="text-sm text-foreground whitespace-pre-wrap leading-relaxed bg-background/50 rounded-lg p-4 border border-border">
                  {response}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigator.clipboard.writeText(response)}
                  >
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleClear}>
                    Clear
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

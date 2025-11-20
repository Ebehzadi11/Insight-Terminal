import { useMacroStore } from '@/stores/macroStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { IndicatorType } from '@/types';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const indicators: { type: IndicatorType; label: string; color: string }[] = [
  { type: 'SPX', label: 'S&P 500', color: 'bg-blue-500' },
  { type: 'BTC', label: 'Bitcoin', color: 'bg-orange-500' },
  { type: 'ETH', label: 'Ethereum', color: 'bg-purple-500' },
  { type: 'M2', label: 'M2 Money Supply', color: 'bg-green-500' },
  { type: 'DXY', label: 'Dollar Index', color: 'bg-red-500' },
  { type: '10Y', label: '10Y Treasury', color: 'bg-cyan-500' },
];

export default function IndicatorSelector() {
  const { selectedIndicators, toggleIndicator } = useMacroStore();

  return (
    <Card className="p-4 bg-slate-800 border-slate-700">
      <h3 className="text-sm font-semibold text-slate-300 mb-3">Select Indicators</h3>
      <div className="grid grid-cols-2 gap-2">
        {indicators.map((indicator) => {
          const isSelected = selectedIndicators.includes(indicator.type);
          
          return (
            <Button
              key={indicator.type}
              variant="outline"
              size="sm"
              onClick={() => toggleIndicator(indicator.type)}
              className={cn(
                'justify-start gap-2 border-slate-600',
                isSelected
                  ? 'bg-slate-700 border-slate-500 text-slate-100'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-100'
              )}
            >
              <div className={cn('w-3 h-3 rounded-full', indicator.color)} />
              <span className="flex-1 text-left">{indicator.label}</span>
              {isSelected && <Check className="h-4 w-4 text-green-400" />}
            </Button>
          );
        })}
      </div>
    </Card>
  );
}

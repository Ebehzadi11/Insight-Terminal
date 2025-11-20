import { create } from 'zustand';
import { IndicatorType } from '@/types';

interface MacroState {
  selectedIndicators: IndicatorType[];
  toggleIndicator: (indicator: IndicatorType) => void;
  setIndicators: (indicators: IndicatorType[]) => void;
}

export const useMacroStore = create<MacroState>((set) => ({
  selectedIndicators: ['SPX', 'BTC', 'M2'],
  
  toggleIndicator: (indicator) =>
    set((state) => ({
      selectedIndicators: state.selectedIndicators.includes(indicator)
        ? state.selectedIndicators.filter((i) => i !== indicator)
        : [...state.selectedIndicators, indicator],
    })),
    
  setIndicators: (indicators) => set({ selectedIndicators: indicators }),
}));

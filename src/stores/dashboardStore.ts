import { create } from 'zustand';
import { TimeRange, Frequency, NormalizationMode } from '@/types';

interface DashboardState {
  timeRange: TimeRange;
  frequency: Frequency;
  normalization: NormalizationMode;
  sidebarCollapsed: boolean;
  aiPanelOpen: boolean;
  
  setTimeRange: (range: TimeRange) => void;
  setFrequency: (freq: Frequency) => void;
  setNormalization: (mode: NormalizationMode) => void;
  toggleSidebar: () => void;
  toggleAIPanel: () => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  timeRange: '1Y',
  frequency: 'daily',
  normalization: 'index',
  sidebarCollapsed: false,
  aiPanelOpen: false,
  
  setTimeRange: (range) => set({ timeRange: range }),
  setFrequency: (freq) => set({ frequency: freq }),
  setNormalization: (mode) => set({ normalization: mode }),
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  toggleAIPanel: () => set((state) => ({ aiPanelOpen: !state.aiPanelOpen })),
}));

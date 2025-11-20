import { create } from 'zustand';
import { TimeRange, Frequency, NormalizationMode } from '@/types';

interface DashboardState {
  timeRange: TimeRange;
  frequency: Frequency;
  normalization: NormalizationMode;
  sidebarCollapsed: boolean;
  aiPanelOpen: boolean;
  indicatorPanelOpen: boolean;
  indicatorDrawerOpen: boolean;
  statsDrawerOpen: boolean;
  aiSearchOpen: boolean;

  setTimeRange: (range: TimeRange) => void;
  setFrequency: (freq: Frequency) => void;
  setNormalization: (mode: NormalizationMode) => void;
  toggleSidebar: () => void;
  toggleAIPanel: () => void;
  toggleIndicatorPanel: () => void;
  toggleIndicatorDrawer: () => void;
  toggleStatsDrawer: () => void;
  toggleAISearch: () => void;
  setAISearchOpen: (open: boolean) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  timeRange: '1Y',
  frequency: 'daily',
  normalization: 'index',
  sidebarCollapsed: false,
  aiPanelOpen: false,
  indicatorPanelOpen: false,
  indicatorDrawerOpen: false,
  statsDrawerOpen: false,
  aiSearchOpen: false,

  setTimeRange: (range) => set({ timeRange: range }),
  setFrequency: (freq) => set({ frequency: freq }),
  setNormalization: (mode) => set({ normalization: mode }),
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  toggleAIPanel: () => set((state) => ({ aiPanelOpen: !state.aiPanelOpen })),
  toggleIndicatorPanel: () => set((state) => ({ indicatorPanelOpen: !state.indicatorPanelOpen })),
  toggleIndicatorDrawer: () => set((state) => ({ indicatorDrawerOpen: !state.indicatorDrawerOpen })),
  toggleStatsDrawer: () => set((state) => ({ statsDrawerOpen: !state.statsDrawerOpen })),
  toggleAISearch: () => set((state) => ({ aiSearchOpen: !state.aiSearchOpen })),
  setAISearchOpen: (open) => set({ aiSearchOpen: open }),
}));

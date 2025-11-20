import { create } from 'zustand';
import { Filing, FinancialRatios } from '@/types';
import { FilingRatio } from '@/types/company';

interface CompanyState {
  selectedFiling: Filing | null;
  ratios: FinancialRatios | null; // Legacy format for backward compatibility
  filingRatios: FilingRatio[] | null; // New format from API
  isLoadingRatios: boolean;
  ratiosError: string | null;
  
  setSelectedFiling: (filing: Filing | null) => void;
  setRatios: (ratios: FinancialRatios | null) => void;
  setFilingRatios: (ratios: FilingRatio[] | null) => void;
  setIsLoadingRatios: (loading: boolean) => void;
  setRatiosError: (error: string | null) => void;
}

export const useCompanyStore = create<CompanyState>((set) => ({
  selectedFiling: null,
  ratios: null,
  filingRatios: null,
  isLoadingRatios: false,
  ratiosError: null,
  
  setSelectedFiling: (filing) => set({ selectedFiling: filing }),
  setRatios: (ratios) => set({ ratios: ratios }),
  setFilingRatios: (ratios) => set({ filingRatios: ratios }),
  setIsLoadingRatios: (loading) => set({ isLoadingRatios: loading }),
  setRatiosError: (error) => set({ ratiosError: error }),
}));

import { useCompanyStore } from '@/stores/companyStore';
import { mockFilings } from '@/lib/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

// Hardcoded filing_id for testing - replace with actual UUID from your database
const MOCK_FILING_ID = '00000000-0000-0000-0000-000000000001'; // TODO: Replace with real filing_id from database

export default function FilingSelector() {
  const { selectedFiling, setSelectedFiling, setIsLoadingRatios, setFilingRatios, setRatiosError } = useCompanyStore();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFilingChange = (filingId: string) => {
    const filing = mockFilings.find((f) => f.id === filingId);
    if (filing) {
      setSelectedFiling(filing);
      // Clear previous ratios when selecting a new filing
      setFilingRatios(null);
      setRatiosError(null);
    }
  };

  const handleAnalyzeFiling = async () => {
    if (!selectedFiling) {
      return;
    }

    setIsAnalyzing(true);
    setIsLoadingRatios(true);
    setRatiosError(null);

    try {
      // Use hardcoded filing_id for now - in production, this would come from the selected filing
      const response = await fetch('/api/filings/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filingId: MOCK_FILING_ID, // TODO: Replace with selectedFiling.id when using real database filings
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze filing');
      }

      const data = await response.json();
      setFilingRatios(data.ratios);
    } catch (error) {
      console.error('Error analyzing filing:', error);
      setRatiosError(error instanceof Error ? error.message : 'Unknown error occurred');
    } finally {
      setIsAnalyzing(false);
      setIsLoadingRatios(false);
    }
  };

  return (
    <Card className="p-4 bg-slate-800 border-slate-700">
      <h3 className="text-sm font-semibold text-slate-300 mb-3">Select Company Filing</h3>
      <div className="space-y-3">
        <Select
          value={selectedFiling?.id || ''}
          onValueChange={handleFilingChange}
        >
          <SelectTrigger className="bg-slate-700 border-slate-600">
            <SelectValue placeholder="Choose a filing..." />
          </SelectTrigger>
          <SelectContent>
            {mockFilings.map((filing) => (
              <SelectItem key={filing.id} value={filing.id}>
                {filing.company} - {filing.year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedFiling && (
          <Button
            onClick={handleAnalyzeFiling}
            disabled={isAnalyzing}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Analyze Filing'
            )}
          </Button>
        )}
      </div>
    </Card>
  );
}

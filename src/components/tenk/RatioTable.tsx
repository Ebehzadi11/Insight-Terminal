import { useCompanyStore } from '@/stores/companyStore';
import { formatRatio } from '@/lib/ratios';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { RatioCode } from '@/types/company';
import { TrendingUp, TrendingDown, Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface RatioDisplay {
  code: RatioCode;
  label: string;
  value: number | null;
  type: 'ratio' | 'percentage' | 'times';
  benchmark: number;
}

export default function RatioTable() {
  const { selectedFiling, filingRatios, isLoadingRatios, ratiosError } = useCompanyStore();
  
  // Convert FilingRatio[] array to Record<RatioCode, number | null> for easy lookup
  const computedRatios: Record<RatioCode, number | null> | null = filingRatios
    ? filingRatios.reduce((acc, ratio) => {
        acc[ratio.ratioCode] = ratio.value;
        return acc;
      }, {} as Record<RatioCode, number | null>)
    : null;

  if (!selectedFiling) {
    return (
      <Card className="p-6 bg-slate-800 border-slate-700">
        <p className="text-center text-slate-400">Select a filing to view financial ratios</p>
      </Card>
    );
  }

  if (isLoadingRatios) {
    return (
      <Card className="p-6 bg-slate-800 border-slate-700">
        <div className="flex items-center justify-center gap-2 text-slate-400">
          <Loader2 className="h-5 w-5 animate-spin" />
          <p>Analyzing filing...</p>
        </div>
      </Card>
    );
  }

  if (ratiosError) {
    return (
      <Card className="p-6 bg-slate-800 border-slate-700">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{ratiosError}</AlertDescription>
        </Alert>
      </Card>
    );
  }

  if (!computedRatios || filingRatios === null || filingRatios.length === 0) {
    return (
      <Card className="p-6 bg-slate-800 border-slate-700">
        <p className="text-center text-slate-400">Click "Analyze Filing" to compute financial ratios</p>
      </Card>
    );
  }

  // Use computed ratios from API (FilingRatio[] converted to Record)
  const ratioGroups: Array<{ title: string; ratios: RatioDisplay[] }> = [
    {
      title: 'Liquidity Ratios',
      ratios: [
        { 
          code: 'CURRENT_RATIO', 
          label: 'Current Ratio', 
          value: computedRatios?.CURRENT_RATIO ?? null, 
          type: 'ratio', 
          benchmark: 2.0 
        },
        { 
          code: 'QUICK_RATIO', 
          label: 'Quick Ratio', 
          value: computedRatios?.QUICK_RATIO ?? null, 
          type: 'ratio', 
          benchmark: 1.0 
        },
      ],
    },
    {
      title: 'Profitability Ratios',
      ratios: [
        { 
          code: 'GROSS_MARGIN', 
          label: 'Gross Margin', 
          value: computedRatios?.GROSS_MARGIN ?? null, 
          type: 'percentage', 
          benchmark: 0.40 
        },
        { 
          code: 'OPERATING_MARGIN', 
          label: 'Operating Margin', 
          value: computedRatios?.OPERATING_MARGIN ?? null, 
          type: 'percentage', 
          benchmark: 0.15 
        },
        { 
          code: 'NET_MARGIN', 
          label: 'Net Margin', 
          value: computedRatios?.NET_MARGIN ?? null, 
          type: 'percentage', 
          benchmark: 0.10 
        },
        { 
          code: 'ROA', 
          label: 'Return on Assets', 
          value: computedRatios?.ROA ?? null, 
          type: 'percentage', 
          benchmark: 0.05 
        },
        { 
          code: 'ROE', 
          label: 'Return on Equity', 
          value: computedRatios?.ROE ?? null, 
          type: 'percentage', 
          benchmark: 0.15 
        },
        { 
          code: 'ROIC', 
          label: 'Return on Invested Capital', 
          value: computedRatios?.ROIC ?? null, 
          type: 'percentage', 
          benchmark: 0.10 
        },
      ],
    },
    {
      title: 'Leverage Ratios',
      ratios: [
        { 
          code: 'DEBT_TO_EQUITY', 
          label: 'Debt to Equity', 
          value: computedRatios?.DEBT_TO_EQUITY ?? null, 
          type: 'ratio', 
          benchmark: 1.5 
        },
        { 
          code: 'DEBT_RATIO', 
          label: 'Debt Ratio', 
          value: computedRatios?.DEBT_RATIO ?? null, 
          type: 'percentage', 
          benchmark: 0.50 
        },
        { 
          code: 'INTEREST_COVERAGE', 
          label: 'Interest Coverage', 
          value: computedRatios?.INTEREST_COVERAGE ?? null, 
          type: 'times', 
          benchmark: 3 
        },
      ],
    },
    {
      title: 'Efficiency & Growth Ratios',
      ratios: [
        { 
          code: 'REVENUE_GROWTH_YOY', 
          label: 'Revenue Growth YoY', 
          value: computedRatios?.REVENUE_GROWTH_YOY ?? null, 
          type: 'percentage', 
          benchmark: 0.10 
        },
        { 
          code: 'OCF_RATIO', 
          label: 'Operating Cash Flow Ratio', 
          value: computedRatios?.OCF_RATIO ?? null, 
          type: 'ratio', 
          benchmark: 1.0 
        },
        { 
          code: 'FCF', 
          label: 'Free Cash Flow', 
          value: computedRatios?.FCF ?? null, 
          type: 'ratio', 
          benchmark: 0 
        },
        { 
          code: 'FCF_MARGIN', 
          label: 'FCF Margin', 
          value: computedRatios?.FCF_MARGIN ?? null, 
          type: 'percentage', 
          benchmark: 0.10 
        },
        { 
          code: 'EPS', 
          label: 'Earnings Per Share', 
          value: computedRatios?.EPS ?? null, 
          type: 'ratio', 
          benchmark: 0 
        },
      ],
    },
  ];

  return (
    <Card className="bg-slate-800 border-slate-700 overflow-hidden">
      <div className="p-6 border-b border-slate-700">
        <h3 className="text-lg font-semibold text-slate-100">Financial Ratios Analysis</h3>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700 hover:bg-slate-700/50">
              <TableHead className="text-slate-300">Category</TableHead>
              <TableHead className="text-slate-300">Ratio</TableHead>
              <TableHead className="text-slate-300 text-right">Value</TableHead>
              <TableHead className="text-slate-300 text-right">Benchmark</TableHead>
              <TableHead className="text-slate-300 text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ratioGroups.map((group) =>
              group.ratios.map((ratio, idx) => {
                // Handle null values gracefully - skip comparison if value is null
                const valueForComparison = ratio.value ?? ratio.benchmark;
                const isAboveBenchmark = valueForComparison >= ratio.benchmark;
                const isGood = 
                  group.title === 'Leverage Ratios' 
                    ? !isAboveBenchmark 
                    : isAboveBenchmark;
                const hasValue = ratio.value !== null;
                
                return (
                  <TableRow key={`${group.title}-${idx}-${ratio.code}`} className="border-slate-700 hover:bg-slate-700/30">
                    {idx === 0 && (
                      <TableCell
                        rowSpan={group.ratios.length}
                        className="font-medium text-slate-300 bg-slate-800/50"
                      >
                        {group.title}
                      </TableCell>
                    )}
                    <TableCell className="text-slate-400">{ratio.label}</TableCell>
                    <TableCell className="text-right text-slate-100 font-medium">
                      {formatRatio(ratio.value, ratio.type)}
                    </TableCell>
                    <TableCell className="text-right text-slate-400">
                      {formatRatio(ratio.benchmark, ratio.type)}
                    </TableCell>
                    <TableCell className="text-center">
                      {hasValue ? (
                        isGood ? (
                          <TrendingUp className="h-5 w-5 text-green-400 inline" />
                        ) : (
                          <TrendingDown className="h-5 w-5 text-red-400 inline" />
                        )
                      ) : (
                        <span className="text-slate-500 text-xs">N/A</span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}

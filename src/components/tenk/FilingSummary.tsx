import { useCompanyStore } from '@/stores/companyStore';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Building2, Calendar, DollarSign, TrendingUp } from 'lucide-react';

export default function FilingSummary() {
  const { selectedFiling } = useCompanyStore();

  if (!selectedFiling) {
    return null;
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 2,
    }).format(value);
  };

  const sections = [
    {
      title: 'Company Information',
      icon: Building2,
      items: [
        { label: 'Company', value: selectedFiling.company },
        { label: 'Filing Year', value: selectedFiling.year.toString() },
        { label: 'Filing Date', value: new Date(selectedFiling.filingDate).toLocaleDateString() },
      ],
    },
    {
      title: 'Financial Highlights',
      icon: DollarSign,
      items: [
        { label: 'Total Revenue', value: formatCurrency(selectedFiling.revenue) },
        { label: 'Net Income', value: formatCurrency(selectedFiling.netIncome) },
        { label: 'Total Assets', value: formatCurrency(selectedFiling.totalAssets) },
        { label: 'Total Equity', value: formatCurrency(selectedFiling.totalEquity) },
      ],
    },
    {
      title: 'Market Data',
      icon: TrendingUp,
      items: [
        { label: 'Market Cap', value: selectedFiling.marketCap ? formatCurrency(selectedFiling.marketCap) : 'N/A' },
        { label: 'Stock Price', value: selectedFiling.stockPrice ? `$${selectedFiling.stockPrice.toFixed(2)}` : 'N/A' },
        { label: 'Shares Outstanding', value: selectedFiling.sharesOutstanding ? `${(selectedFiling.sharesOutstanding / 1e9).toFixed(2)}B` : 'N/A' },
      ],
    },
  ];

  return (
    <Card className="p-6 bg-slate-800 border-slate-700">
      <h3 className="text-lg font-semibold text-slate-100 mb-4">Filing Summary</h3>
      
      <div className="space-y-6">
        {sections.map((section, idx) => {
          const Icon = section.icon;
          return (
            <div key={section.title}>
              <div className="flex items-center gap-2 mb-3">
                <Icon className="h-5 w-5 text-blue-400" />
                <h4 className="font-medium text-slate-200">{section.title}</h4>
              </div>
              <div className="space-y-2 ml-7">
                {section.items.map((item) => (
                  <div key={item.label} className="flex justify-between">
                    <span className="text-sm text-slate-400">{item.label}</span>
                    <span className="text-sm text-slate-100 font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
              {idx < sections.length - 1 && <Separator className="mt-4 bg-slate-700" />}
            </div>
          );
        })}
      </div>
    </Card>
  );
}

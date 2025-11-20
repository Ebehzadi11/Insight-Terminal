import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Activity, DollarSign } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: 'trending' | 'activity' | 'dollar';
}

export default function SummaryCards() {
  const cards: SummaryCardProps[] = [
    {
      title: 'S&P 500',
      value: '4,783.45',
      change: '+12.4%',
      trend: 'up',
      icon: 'trending',
    },
    {
      title: 'Bitcoin',
      value: '$43,521',
      change: '+85.2%',
      trend: 'up',
      icon: 'dollar',
    },
    {
      title: 'M2 Supply',
      value: '$21.2T',
      change: '+8.1%',
      trend: 'up',
      icon: 'activity',
    },
    {
      title: 'DXY',
      value: '101.23',
      change: '-2.3%',
      trend: 'down',
      icon: 'trending',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <Card key={card.title} className="p-4 bg-slate-800 border-slate-700">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-400 mb-1">{card.title}</p>
              <p className="text-2xl font-bold text-slate-100">{card.value}</p>
              <div className="flex items-center gap-1 mt-2">
                {card.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 text-green-400" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-400" />
                )}
                <span
                  className={`text-sm font-medium ${
                    card.trend === 'up' ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {card.change}
                </span>
              </div>
            </div>
            <div className="p-2 bg-slate-700 rounded-lg">
              {card.icon === 'trending' && <TrendingUp className="h-5 w-5 text-blue-400" />}
              {card.icon === 'activity' && <Activity className="h-5 w-5 text-green-400" />}
              {card.icon === 'dollar' && <DollarSign className="h-5 w-5 text-orange-400" />}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

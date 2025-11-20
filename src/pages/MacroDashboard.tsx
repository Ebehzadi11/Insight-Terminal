import DashboardLayout from '@/components/layout/DashboardLayout';
import FilterBar from '@/components/layout/FilterBar';
import MacroChart from '@/components/macro/MacroChart';
import IndicatorDrawer from '@/components/macro/IndicatorDrawer';
import StatsDrawer from '@/components/macro/StatsDrawer';
import { useDashboardStore } from '@/stores/dashboardStore';
import { cn } from '@/lib/utils';

export default function MacroDashboard() {
  const { indicatorDrawerOpen, statsDrawerOpen } = useDashboardStore();

  return (
    <DashboardLayout>
      {/* Filter Bar */}
      <FilterBar />

      {/* Main Content - Full Width with Push Effect on Desktop */}
      <div
        className={cn(
          'flex-1 overflow-auto transition-all duration-300 ease-in-out',
          // Desktop: Push mode - add right margin when drawer is open
          // Mobile: Overlay mode - no margin
          'lg:mr-0',
          indicatorDrawerOpen && 'lg:mr-[360px]',
          statsDrawerOpen && 'lg:mr-[400px]'
        )}
      >
        <div className="p-6 space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Macro Dashboard</h2>
            <p className="text-muted-foreground">
              Analyze macroeconomic indicators and market trends
            </p>
          </div>

          {/* Chart - Full Width */}
          <MacroChart />
        </div>
      </div>

      {/* Drawers */}
      <IndicatorDrawer />
      <StatsDrawer />
    </DashboardLayout>
  );
}

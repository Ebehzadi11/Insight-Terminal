import { useEffect } from 'react';
import { useDashboardStore } from '@/stores/dashboardStore';
import EnhancedIndicatorSelector from './EnhancedIndicatorSelector';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function IndicatorDrawer() {
  const { indicatorDrawerOpen, toggleIndicatorDrawer } = useDashboardStore();

  // Handle ESC key to close drawer
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && indicatorDrawerOpen) {
        toggleIndicatorDrawer();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [indicatorDrawerOpen, toggleIndicatorDrawer]);

  // Prevent body scroll when drawer is open on mobile
  useEffect(() => {
    if (indicatorDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [indicatorDrawerOpen]);

  return (
    <>
      {/* Backdrop - Mobile only (overlay mode) */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 transition-opacity duration-200 lg:hidden z-30',
          indicatorDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={toggleIndicatorDrawer}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-labelledby="indicator-drawer-title"
        className={cn(
          'fixed top-0 right-0 h-full bg-card border-l border-border shadow-2xl z-40',
          'transition-transform duration-300 ease-in-out',
          // Desktop: 360px fixed width
          // Mobile: 85% screen width
          'w-[85%] lg:w-[360px]',
          // Slide animation
          indicatorDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h2 id="indicator-drawer-title" className="text-lg font-semibold text-foreground">
            Indicators
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleIndicatorDrawer}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close drawer</span>
          </Button>
        </div>

        {/* Content - EnhancedIndicatorSelector */}
        <div className="h-[calc(100%-57px)] overflow-auto">
          <EnhancedIndicatorSelector />
        </div>
      </div>
    </>
  );
}

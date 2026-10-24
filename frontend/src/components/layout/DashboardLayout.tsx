import React, { useState } from 'react';
import { Sidebar, NavigationTab } from './Sidebar';
import { Navbar } from './Navbar';
import { LocationCoordinates } from '../../types/weather';
import { WeatherAlert } from '../../types/alert';
import { X } from 'lucide-react';

interface DashboardLayoutProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  selectedLocation: LocationCoordinates;
  onSelectLocation: (loc: LocationCoordinates) => void;
  lastUpdated: Date;
  onRefresh: () => void;
  isRefreshing?: boolean;
  alerts?: WeatherAlert[];
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  activeTab,
  onTabChange,
  selectedLocation,
  onSelectLocation,
  lastUpdated,
  onRefresh,
  isRefreshing = false,
  alerts = [],
  children,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileTabSelect = (tab: NavigationTab) => {
    onTabChange(tab);
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-ivory text-charcoal overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <div className="hidden md:block shrink-0">
        <Sidebar
          activeTab={activeTab}
          onTabChange={onTabChange}
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed(!collapsed)}
          unreadAlertCount={alerts.filter((a) => a.severity === 'CRITICAL' || a.severity === 'WARNING').length}
        />
      </div>

      {/* Mobile Drawer Backdrop & Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-charcoal/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative flex flex-col w-72 max-w-xs bg-ivory-paper border-r border-softborder h-full shadow-elevated z-10 animate-in slide-in-from-left">
            <div className="h-16 px-4 flex items-center justify-between border-b border-softborder">
              <span className="font-serif font-bold text-charcoal">Meghdoot (मेघदूत)</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded text-charcoal-muted hover:text-charcoal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <Sidebar
                activeTab={activeTab}
                onTabChange={handleMobileTabSelect}
                collapsed={false}
                onToggleCollapse={() => {}}
                unreadAlertCount={alerts.filter((a) => a.severity === 'CRITICAL' || a.severity === 'WARNING').length}
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar
          selectedLocation={selectedLocation}
          onSelectLocation={onSelectLocation}
          lastUpdated={lastUpdated}
          onRefresh={onRefresh}
          isRefreshing={isRefreshing}
          alerts={alerts}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />

        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  MapPin,
  Bell,
  RefreshCw,
  Clock,
  Menu,
  ChevronDown,
  Check,
  ShieldCheck,
  X,
  ExternalLink,
} from 'lucide-react';
import { LocationCoordinates } from '../../types/weather';
import { DEMO_LOCATIONS } from '../../utils/locationUtils';
import { WeatherAlert } from '../../types/alert';
import { formatTime, timeAgo } from '../../utils/dateUtils';

interface NavbarProps {
  selectedLocation: LocationCoordinates;
  onSelectLocation: (loc: LocationCoordinates) => void;
  lastUpdated: Date;
  onRefresh: () => void;
  isRefreshing?: boolean;
  alerts?: WeatherAlert[];
  onOpenMobileMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  selectedLocation,
  onSelectLocation,
  lastUpdated,
  onRefresh,
  isRefreshing = false,
  alerts = [],
  onOpenMobileMenu,
}) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Live digital clock (IST)
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredLocations = DEMO_LOCATIONS.filter((loc) =>
    `${loc.name} ${loc.state}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <header className="h-16 bg-ivory-paper border-b border-softborder px-4 md:px-6 flex items-center justify-between sticky top-0 z-20 shadow-subtle">
      {/* Left: Mobile Menu Toggle + Location Selector */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="p-2 rounded bg-ivory-200 text-charcoal-muted hover:text-charcoal md:hidden border border-softborder transition"
          title="Open Menu"
        >
          <Menu className="w-4 h-4" />
        </button>

        {/* Location Dropdown / Search Trigger */}
        <div className="relative" ref={searchRef}>
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded bg-white hover:bg-ivory-100 text-charcoal border border-softborder transition shadow-subtle group text-xs font-medium"
          >
            <MapPin className="w-3.5 h-3.5 text-monsoon shrink-0" />
            <div className="flex flex-col text-left">
              <span className="font-semibold text-charcoal leading-tight truncate max-w-[120px] sm:max-w-[200px]">
                {selectedLocation.name}
              </span>
              <span className="text-[10px] text-charcoal-muted leading-none font-mono">
                {selectedLocation.state}, IN
              </span>
            </div>
            <ChevronDown className="w-3 h-3 text-charcoal-muted group-hover:text-charcoal ml-1 transition-transform" />
          </button>

          {/* Location Selector Modal / Dropdown */}
          {searchOpen && (
            <div className="absolute left-0 mt-2 w-80 bg-white border border-softborder rounded shadow-elevated p-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="relative mb-2">
                <Search className="w-3.5 h-3.5 text-charcoal-muted absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Search observation stations or districts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-ivory-50 text-charcoal text-xs rounded pl-8 pr-3 py-1.5 border border-softborder focus:outline-none focus:border-monsoon font-sans"
                  autoFocus
                />
              </div>

              <div className="text-[10px] font-semibold text-charcoal-muted uppercase tracking-wider px-2 py-1 font-mono">
                Meteorological Observation Stations
              </div>

              <div className="max-h-56 overflow-y-auto space-y-1">
                {filteredLocations.map((loc) => {
                  const isSelected = loc.name === selectedLocation.name;
                  return (
                    <button
                      key={loc.name}
                      onClick={() => {
                        onSelectLocation(loc);
                        setSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-xs transition ${
                        isSelected
                          ? 'bg-monsoon/10 text-monsoon font-medium border border-monsoon/30'
                          : 'text-charcoal hover:bg-ivory-100'
                      }`}
                    >
                      <div className="flex items-center gap-2 text-left">
                        <MapPin className="w-3 h-3 text-monsoon shrink-0" />
                        <div>
                          <p className="font-medium text-charcoal leading-tight">{loc.name}</p>
                          <p className="text-[10px] text-charcoal-muted font-mono">
                            {loc.latitude.toFixed(2)}°N, {loc.longitude.toFixed(2)}°E · {loc.state}
                          </p>
                        </div>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-monsoon shrink-0" />}
                    </button>
                  );
                })}
                {filteredLocations.length === 0 && (
                  <p className="text-xs text-charcoal-muted p-3 text-center">No stations match query</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Center: Live Clock & Last Updated */}
      <div className="hidden lg:flex items-center gap-4 text-xs text-charcoal-muted">
        <div className="flex items-center gap-2 px-3 py-1 rounded bg-white border border-softborder shadow-subtle">
          <Clock className="w-3.5 h-3.5 text-monsoon" />
          <span className="font-mono text-charcoal font-medium">{currentTime} IST</span>
          <span className="text-[10px] text-charcoal-muted/60">· IMD Sync</span>
        </div>

        <div className="flex items-center gap-2">
          <span>Observed {timeAgo(lastUpdated.toISOString())}</span>
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="p-1 rounded hover:bg-ivory-200 hover:text-charcoal transition text-charcoal-muted"
            title="Refresh weather feeds"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-monsoon' : ''}`} />
          </button>
        </div>
      </div>

      {/* Right: Notifications, Refresh (mobile), Profile */}
      <div className="flex items-center gap-2.5">
        {/* Refresh button on mobile */}
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="p-2 rounded bg-white hover:bg-ivory-100 text-charcoal-muted hover:text-charcoal border border-softborder lg:hidden transition shadow-subtle"
          title="Refresh feeds"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-monsoon' : ''}`} />
        </button>

        {/* Notifications Bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="p-2 rounded bg-white hover:bg-ivory-100 text-charcoal-muted hover:text-charcoal border border-softborder transition relative shadow-subtle"
            title="Early warning advisories"
          >
            <Bell className="w-4 h-4 text-charcoal" />
            {alerts.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-terracotta" />
            )}
          </button>

          {/* Notifications Panel */}
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-softborder rounded shadow-elevated p-3 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-softborder">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-monsoon" />
                  <span className="text-xs font-semibold text-charcoal">Meteorological Advisories</span>
                </div>
                <span className="text-[10px] font-mono text-charcoal-muted">{alerts.length} active</span>
              </div>

              <div className="max-h-72 overflow-y-auto space-y-2">
                {alerts.map((alt) => (
                  <div
                    key={alt.id}
                    className="p-2.5 rounded bg-ivory-50 border border-softborder hover:border-charcoal-muted transition text-left"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`text-[10px] font-mono font-medium px-1.5 py-0.5 rounded ${
                          alt.severity === 'CRITICAL'
                            ? 'bg-crimson/15 text-crimson border border-crimson/30'
                            : alt.severity === 'WARNING'
                            ? 'bg-terracotta/15 text-terracotta border border-terracotta/30'
                            : 'bg-monsoon/10 text-monsoon border border-monsoon/25'
                        }`}
                      >
                        {alt.severity}
                      </span>
                      <span className="text-[10px] font-mono text-charcoal-muted">{formatTime(alt.issued_at)}</span>
                    </div>
                    <p className="text-xs font-semibold text-charcoal leading-snug">{alt.title}</p>
                    <p className="text-[11px] text-charcoal-muted mt-0.5 line-clamp-2 leading-relaxed">
                      {alt.description}
                    </p>
                  </div>
                ))}
                {alerts.length === 0 && (
                  <p className="text-xs text-charcoal-muted py-4 text-center">
                    No active severe weather warnings for current region.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-2 pl-2 border-l border-softborder">
          <div className="w-8 h-8 rounded bg-monsoon/10 border border-monsoon/30 flex items-center justify-center text-xs font-medium text-monsoon font-mono">
            RS
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-semibold text-charcoal leading-none">Rohit Singh</span>
            <span className="text-[10px] text-charcoal-muted leading-tight mt-0.5">Hydrometeorology Desk</span>
          </div>
        </div>
      </div>
    </header>
  );
};

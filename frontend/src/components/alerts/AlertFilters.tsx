import React from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';
import { AlertFilterOptions } from '../../types/alert';

interface AlertFiltersProps {
  filters: AlertFilterOptions;
  onChange: (updated: AlertFilterOptions) => void;
  totalCount: number;
  filteredCount: number;
}

export const AlertFilters: React.FC<AlertFiltersProps> = ({
  filters,
  onChange,
  totalCount,
  filteredCount,
}) => {
  const severities = [
    { id: 'all', label: 'All Severities' },
    { id: 'CRITICAL', label: 'Critical' },
    { id: 'WARNING', label: 'Warning' },
    { id: 'ADVISORY', label: 'Advisory' },
    { id: 'INFO', label: 'Info' },
  ];

  const hazardTypes = [
    { id: 'all', label: 'All Hazards' },
    { id: 'thunderstorm', label: 'Thunderstorms' },
    { id: 'heavy_rainfall', label: 'Heavy Rain' },
    { id: 'local_flooding', label: 'Flooding' },
    { id: 'strong_winds', label: 'Wind Gale' },
  ];

  const handleReset = () => {
    onChange({
      severity: 'all',
      hazardType: 'all',
      searchQuery: '',
    });
  };

  return (
    <div className="bg-white border border-softborder rounded p-4 space-y-3 shadow-subtle font-sans">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-charcoal-muted absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search advisories by headline, keyword, or district..."
            value={filters.searchQuery}
            onChange={(e) => onChange({ ...filters, searchQuery: e.target.value })}
            className="w-full bg-ivory-50 text-charcoal text-xs rounded pl-9 pr-3 py-2 border border-softborder focus:outline-none focus:border-monsoon font-sans"
          />
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-charcoal-muted font-mono">
          <span>
            Active: <strong className="text-charcoal">{filteredCount}</strong> of {totalCount}
          </span>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1 text-[11px] text-monsoon hover:underline font-mono"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </div>
      </div>

      {/* Severity Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-softborder">
        <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-charcoal-muted mr-1">
          Severity:
        </span>
        {severities.map((sev) => {
          const active = filters.severity === sev.id;
          return (
            <button
              key={sev.id}
              onClick={() => onChange({ ...filters, severity: sev.id })}
              className={`px-2.5 py-1 rounded text-xs transition font-mono ${
                active
                  ? 'bg-charcoal text-ivory font-semibold shadow-subtle'
                  : 'bg-ivory-100 text-charcoal-muted hover:text-charcoal border border-softborder'
              }`}
            >
              {sev.label}
            </button>
          );
        })}
      </div>

      {/* Hazard Type Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-charcoal-muted mr-1">
          Hazard Type:
        </span>
        {hazardTypes.map((hz) => {
          const active = filters.hazardType === hz.id;
          return (
            <button
              key={hz.id}
              onClick={() => onChange({ ...filters, hazardType: hz.id })}
              className={`px-2.5 py-1 rounded text-[11px] transition font-sans ${
                active
                  ? 'bg-monsoon text-white font-medium shadow-subtle'
                  : 'bg-ivory-100 text-charcoal-muted hover:text-charcoal border border-softborder'
              }`}
            >
              {hz.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

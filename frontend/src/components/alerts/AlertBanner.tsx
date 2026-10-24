import React, { useState } from 'react';
import { AlertTriangle, ShieldAlert, ArrowRight, X } from 'lucide-react';
import { WeatherAlert } from '../../types/alert';
import { formatTime } from '../../utils/dateUtils';

interface AlertBannerProps {
  alert: WeatherAlert | null | undefined;
  onViewAlerts?: () => void;
}

export const AlertBanner: React.FC<AlertBannerProps> = ({ alert, onViewAlerts }) => {
  const [dismissed, setDismissed] = useState(false);

  if (!alert || dismissed) return null;

  const isCritical = alert.severity === 'CRITICAL';

  return (
    <div
      className={`relative w-full rounded px-4 py-3 border transition-all animate-in fade-in slide-in-from-top-1 shadow-subtle ${
        isCritical
          ? 'bg-crimson/10 border-crimson/35 text-charcoal'
          : 'bg-terracotta/10 border-terracotta/35 text-charcoal'
      }`}
    >
      <div className="flex items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded shrink-0 ${
              isCritical ? 'bg-crimson text-white' : 'bg-terracotta text-white'
            }`}
          >
            {isCritical ? (
              <ShieldAlert className="w-4 h-4 animate-pulse" />
            ) : (
              <AlertTriangle className="w-4 h-4" />
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <div className="flex items-center gap-2">
              <span
                className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                  isCritical ? 'bg-crimson/20 text-crimson' : 'bg-terracotta/20 text-terracotta'
                }`}
              >
                {alert.severity} BULLETIN
              </span>
              <span className="text-xs font-semibold text-charcoal">{alert.title}</span>
            </div>
            <span className="hidden md:inline text-charcoal-muted text-xs">•</span>
            <span className="text-xs text-charcoal-muted truncate max-w-md font-sans">
              {alert.affected_location} ({alert.expected_window})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {onViewAlerts && (
            <button
              onClick={onViewAlerts}
              className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded transition ${
                isCritical
                  ? 'bg-crimson/15 hover:bg-crimson/25 text-crimson font-mono'
                  : 'bg-terracotta/15 hover:bg-terracotta/25 text-terracotta font-mono'
              }`}
            >
              <span>View Advisory</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}

          <button
            onClick={() => setDismissed(true)}
            className="p-1 rounded text-charcoal-muted hover:text-charcoal transition"
            title="Dismiss bulletin"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import {
  AlertTriangle,
  Clock,
  MapPin,
  ShieldAlert,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { WeatherAlert } from '../../types/alert';
import { formatDateTime } from '../../utils/dateUtils';

interface AlertCardProps {
  alert: WeatherAlert;
}

export const AlertCard: React.FC<AlertCardProps> = ({ alert }) => {
  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return {
          border: 'border-crimson/35',
          badge: 'bg-crimson/15 text-crimson border-crimson/30',
          iconColor: 'text-crimson',
          headerBg: 'bg-crimson/5',
        };
      case 'WARNING':
        return {
          border: 'border-terracotta/35',
          badge: 'bg-terracotta/15 text-terracotta border-terracotta/30',
          iconColor: 'text-terracotta',
          headerBg: 'bg-terracotta/5',
        };
      case 'ADVISORY':
        return {
          border: 'border-monsoon/35',
          badge: 'bg-monsoon/10 text-monsoon border-monsoon/25',
          iconColor: 'text-monsoon',
          headerBg: 'bg-monsoon/5',
        };
      default:
        return {
          border: 'border-softborder',
          badge: 'bg-ivory-200 text-charcoal-muted border-softborder',
          iconColor: 'text-charcoal-muted',
          headerBg: 'bg-ivory-50',
        };
    }
  };

  const style = getSeverityStyle(alert.severity);

  return (
    <div className={`bg-white border ${style.border} rounded overflow-hidden shadow-subtle font-sans`}>
      {/* Bulletin Header */}
      <div className={`p-4 ${style.headerBg} border-b border-softborder flex items-start justify-between gap-3`}>
        <div className="flex items-start gap-2.5">
          <ShieldAlert className={`w-5 h-5 ${style.iconColor} shrink-0 mt-0.5`} />
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span
                className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${style.badge}`}
              >
                {alert.severity} BULLETIN
              </span>
              <span className="text-[10px] font-mono text-charcoal-muted uppercase">
                Hazard: {alert.hazard_type.replace('_', ' ')}
              </span>
              {alert.is_simulated && (
                <span className="text-[9px] font-mono text-ochre-dark bg-ochre/10 px-1.5 py-0.5 rounded border border-ochre/25">
                  SIMULATED
                </span>
              )}
            </div>
            <h3 className="text-base font-serif font-bold text-charcoal leading-snug">{alert.title}</h3>
          </div>
        </div>

        <div className="text-right text-[10px] font-mono text-charcoal-muted shrink-0 flex flex-col items-end">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-monsoon" />
            Issued: {formatDateTime(alert.issued_at)}
          </span>
          <span className="text-terracotta mt-0.5 font-semibold">{alert.expected_window}</span>
        </div>
      </div>

      {/* Bulletin Body */}
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-1.5 text-xs text-charcoal font-medium">
          <MapPin className="w-3.5 h-3.5 text-monsoon shrink-0" />
          <span>Geographical Scope: <strong>{alert.affected_location}</strong></span>
        </div>

        <p className="text-xs text-charcoal leading-relaxed font-sans">
          {alert.description}
        </p>

        {/* Actionable Precautions */}
        {alert.precautions && alert.precautions.length > 0 && (
          <div className="pt-2 border-t border-softborder">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-charcoal block mb-2">
              Actionable Public Safety Advisories:
            </span>
            <ul className="space-y-1.5">
              {alert.precautions.map((prec, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-charcoal p-2 rounded bg-ivory-50/70 border border-softborder/60">
                  <CheckCircle2 className="w-3.5 h-3.5 text-monsoon shrink-0 mt-0.5" />
                  <span>{prec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-charcoal-muted border-t border-softborder">
          <span>Source: {alert.data_source}</span>
          <span>Valid until {formatDateTime(alert.expires_at)}</span>
        </div>
      </div>
    </div>
  );
};

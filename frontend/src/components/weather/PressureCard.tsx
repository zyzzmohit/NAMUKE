import React from 'react';
import { Gauge, ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';

interface PressureCardProps {
  pressure: number;
}

export const PressureCard: React.FC<PressureCardProps> = ({ pressure }) => {
  // Pressure gradient status
  const getPressureStatus = (val: number) => {
    if (val < 1005) {
      return {
        label: 'Low Pressure (Depression)',
        color: 'text-terracotta',
        icon: ArrowDownRight,
      };
    }
    if (val > 1014) {
      return {
        label: 'High Pressure (Stable)',
        color: 'text-monsoon',
        icon: ArrowUpRight,
      };
    }
    return {
      label: 'Standard Baseline',
      color: 'text-charcoal-muted',
      icon: Minus,
    };
  };

  const status = getPressureStatus(pressure);
  const StatusIcon = status.icon;

  return (
    <div className="bg-white border border-softborder rounded p-4 flex flex-col justify-between shadow-subtle">
      <div className="flex items-center justify-between text-charcoal-muted mb-2">
        <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal-muted">Atmospheric Pressure</span>
        <Gauge className="w-3.5 h-3.5 text-monsoon" />
      </div>

      <div className="flex items-baseline gap-1.5 my-1">
        <span className="text-3xl font-mono font-bold text-charcoal tracking-tight">{pressure.toFixed(1)}</span>
        <span className="text-xs font-mono text-charcoal-muted">hPa</span>
      </div>

      <div className="pt-2 border-t border-softborder flex items-center justify-between text-xs font-sans">
        <span className="text-charcoal-muted">Gradient</span>
        <div className={`flex items-center gap-1 font-medium ${status.color} font-mono text-[11px]`}>
          <StatusIcon className="w-3 h-3" />
          <span>{pressure < 1005 ? 'Falling depression' : 'Steady'}</span>
        </div>
      </div>
    </div>
  );
};

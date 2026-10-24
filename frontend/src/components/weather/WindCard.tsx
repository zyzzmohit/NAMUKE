import React from 'react';
import { Wind, Navigation } from 'lucide-react';

interface WindCardProps {
  speed: number;
  direction: string;
  gust?: number;
}

export const WindCard: React.FC<WindCardProps> = ({ speed, direction, gust }) => {
  return (
    <div className="bg-white border border-softborder rounded p-4 flex flex-col justify-between shadow-subtle">
      <div className="flex items-center justify-between text-charcoal-muted mb-2">
        <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal-muted">Wind Velocity</span>
        <Wind className="w-3.5 h-3.5 text-monsoon" />
      </div>

      <div className="flex items-baseline gap-1.5 my-1">
        <span className="text-3xl font-mono font-bold text-charcoal tracking-tight">{speed.toFixed(1)}</span>
        <span className="text-xs font-mono text-charcoal-muted">km/h</span>
      </div>

      <div className="pt-2 border-t border-softborder flex items-center justify-between text-xs text-charcoal-muted font-sans">
        <div className="flex items-center gap-1.5">
          <Navigation className="w-3 h-3 text-monsoon rotate-45" />
          <span className="font-semibold text-charcoal font-mono">{direction}</span>
        </div>
        {gust && <span className="font-mono text-[11px]">Gusts {gust} km/h</span>}
      </div>
    </div>
  );
};

import React from 'react';
import { CloudRain, Umbrella } from 'lucide-react';

interface RainfallCardProps {
  rate: number;
  probability: number;
}

export const RainfallCard: React.FC<RainfallCardProps> = ({ rate, probability }) => {
  return (
    <div className="bg-white border border-softborder rounded p-4 flex flex-col justify-between shadow-subtle">
      <div className="flex items-center justify-between text-charcoal-muted mb-2">
        <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal-muted">Precipitation Rate</span>
        <CloudRain className="w-3.5 h-3.5 text-monsoon" />
      </div>

      <div className="flex items-baseline gap-1.5 my-1">
        <span className="text-3xl font-mono font-bold text-charcoal tracking-tight">{rate.toFixed(1)}</span>
        <span className="text-xs font-mono text-charcoal-muted">mm/h</span>
      </div>

      <div className="pt-2 border-t border-softborder flex items-center justify-between text-xs text-charcoal-muted font-sans">
        <div className="flex items-center gap-1.5">
          <Umbrella className="w-3 h-3 text-monsoon" />
          <span className="font-mono text-[11px]">{probability}% probability</span>
        </div>
        <span className="text-[11px] font-medium text-terracotta font-mono">
          {rate > 20 ? 'Torrential' : rate > 5 ? 'Moderate' : 'Light'}
        </span>
      </div>
    </div>
  );
};

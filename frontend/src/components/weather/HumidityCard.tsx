import React from 'react';
import { Droplets } from 'lucide-react';

interface HumidityCardProps {
  humidity: number;
}

export const HumidityCard: React.FC<HumidityCardProps> = ({ humidity }) => {
  const getHumidityDesc = (val: number) => {
    if (val > 80) return 'High saturation';
    if (val > 60) return 'Moderate humidity';
    if (val > 40) return 'Comfortable humidity';
    return 'Dry air mass';
  };

  return (
    <div className="bg-white border border-softborder rounded p-4 flex flex-col justify-between shadow-subtle">
      <div className="flex items-center justify-between text-charcoal-muted mb-2">
        <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal-muted">Relative Humidity</span>
        <Droplets className="w-3.5 h-3.5 text-monsoon" />
      </div>

      <div className="flex items-baseline gap-1.5 my-1">
        <span className="text-3xl font-mono font-bold text-charcoal tracking-tight">{humidity}</span>
        <span className="text-xs font-mono text-charcoal-muted">%</span>
      </div>

      <div className="pt-2 border-t border-softborder flex items-center justify-between text-xs text-charcoal-muted font-sans">
        <span>{getHumidityDesc(humidity)}</span>
        <div className="w-16 h-1.5 rounded-full bg-ivory-200 overflow-hidden">
          <div
            className="h-full bg-monsoon rounded-full"
            style={{ width: `${Math.min(100, humidity)}%` }}
          />
        </div>
      </div>
    </div>
  );
};

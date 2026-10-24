import React from 'react';
import { Thermometer, ArrowUp, ArrowDown } from 'lucide-react';

interface TemperatureCardProps {
  temperature: number;
  feelsLike: number;
  tempMax?: number;
  tempMin?: number;
}

export const TemperatureCard: React.FC<TemperatureCardProps> = ({
  temperature,
  feelsLike,
  tempMax,
  tempMin,
}) => {
  return (
    <div className="bg-white border border-softborder rounded p-4 flex flex-col justify-between shadow-subtle">
      <div className="flex items-center justify-between text-charcoal-muted mb-2">
        <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal-muted">Surface Temp</span>
        <Thermometer className="w-3.5 h-3.5 text-monsoon" />
      </div>

      <div className="flex items-baseline gap-1.5 my-1">
        <span className="text-3xl font-mono font-bold text-charcoal tracking-tight">
          {temperature.toFixed(1)}°
        </span>
        <span className="text-xs font-mono text-charcoal-muted">C</span>
      </div>

      <div className="pt-2 border-t border-softborder flex items-center justify-between text-xs text-charcoal-muted font-sans">
        <span>Feels {feelsLike.toFixed(1)}°C</span>
        {tempMax !== undefined && tempMin !== undefined && (
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span className="flex items-center text-terracotta">
              <ArrowUp className="w-3 h-3" />
              {tempMax}°
            </span>
            <span className="flex items-center text-monsoon">
              <ArrowDown className="w-3 h-3" />
              {tempMin}°
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import {
  HourlyForecast,
  DailyForecast,
} from '../../types/weather';
import { HourlyForecastChart } from '../weather/HourlyForecastChart';
import {
  Calendar,
  CloudSun,
  CloudRain,
  CloudLightning,
  Sun,
  Umbrella,
  Wind,
} from 'lucide-react';
import { formatDateShort } from '../../utils/dateUtils';

interface ForecastSummaryProps {
  hourly: HourlyForecast[];
  daily: DailyForecast[];
}

export const ForecastSummary: React.FC<ForecastSummaryProps> = ({
  hourly,
  daily,
}) => {
  const getConditionIcon = (cond: string) => {
    const c = cond.toLowerCase();
    if (c.includes('thunder')) return <CloudLightning className="w-5 h-5 text-amber" />;
    if (c.includes('rain')) return <CloudRain className="w-5 h-5 text-coral" />;
    if (c.includes('cloud')) return <CloudSun className="w-5 h-5 text-sage" />;
    return <Sun className="w-5 h-5 text-amber" />;
  };

  return (
    <div className="space-y-6">
      {/* 24-Hour Interactive Hourly Forecast */}
      <div className="bg-white border border-softborder rounded p-5 shadow-subtle">
        <div className="flex items-center justify-between pb-3 border-b border-softborder mb-4">
          <div className="flex items-center gap-2">
            <CloudSun className="w-4 h-4 text-monsoon" />
            <h3 className="text-base font-serif font-semibold text-charcoal">
              24-Hour High-Resolution Convective Trajectory
            </h3>
          </div>
          <span className="text-[10px] font-mono text-charcoal-muted">Hourly Synoptic Interpolation</span>
        </div>

        <HourlyForecastChart data={hourly} />
      </div>

      {/* 5-Day Extended Weather Outlook */}
      <div className="bg-white border border-softborder rounded p-5 shadow-subtle">
        <div className="flex items-center justify-between pb-3 border-b border-softborder mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-monsoon" />
            <h3 className="text-base font-serif font-semibold text-charcoal">
              5-Day Regional Meteorological Outlook
            </h3>
          </div>
          <span className="text-[10px] font-mono text-charcoal-muted">Synoptic Trend Analysis</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {daily.map((d, index) => (
            <div
              key={index}
              className="p-3.5 rounded bg-ivory-50 border border-softborder hover:border-charcoal-muted/40 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-charcoal font-serif">{d.day}</span>
                  <span className="text-[10px] font-mono text-charcoal-muted">{formatDateShort(d.date)}</span>
                </div>

                <div className="flex items-center gap-2.5 my-2">
                  <div className="p-2 rounded bg-white border border-softborder shadow-subtle shrink-0">
                    {getConditionIcon(d.condition)}
                  </div>
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base font-mono font-bold text-charcoal">{d.temp_max}°</span>
                      <span className="text-xs font-mono text-charcoal-muted">/ {d.temp_min}°</span>
                    </div>
                    <span className="text-[11px] text-charcoal-muted block truncate max-w-[110px]">
                      {d.condition}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-softborder space-y-1 text-[11px] text-charcoal-muted font-sans">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-monsoon font-mono text-[10px]">
                    <Umbrella className="w-3 h-3" />
                    {d.precipitation_probability}%
                  </span>
                  <span className="text-[10px] font-mono font-medium text-charcoal">{d.rainfall_mm} mm</span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="flex items-center gap-1 text-charcoal-muted">
                    <Wind className="w-2.5 h-2.5 text-monsoon" />
                    Max {d.wind_speed_max_kmh} km/h
                  </span>
                  <span>UV {d.uv_index}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

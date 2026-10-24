import React from 'react';
import {
  CloudLightning,
  CloudRain,
  Sun,
  CloudSun,
  Droplets,
  Wind,
  Gauge,
  Eye,
  ShieldCheck,
} from 'lucide-react';
import { CurrentWeather } from '../../types/weather';
import { formatTime } from '../../utils/dateUtils';

interface WeatherOverviewProps {
  weather: CurrentWeather;
}

export const WeatherOverview: React.FC<WeatherOverviewProps> = ({ weather }) => {
  const getWeatherIcon = (cond: string) => {
    const c = cond.toLowerCase();
    if (c.includes('thunder') || c.includes('lightning')) {
      return <CloudLightning className="w-12 h-12 text-amber animate-pulse" />;
    }
    if (c.includes('rain') || c.includes('torrential') || c.includes('shower')) {
      return <CloudRain className="w-12 h-12 text-coral" />;
    }
    if (c.includes('cloud')) {
      return <CloudSun className="w-12 h-12 text-sage" />;
    }
    return <Sun className="w-12 h-12 text-amber" />;
  };

  return (
    <div className="bg-white border border-softborder rounded p-6 shadow-subtle">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* Left: Condition, Icon, Main Temperature */}
        <div className="flex items-center gap-5">
          <div className="p-3.5 rounded bg-ivory-50 border border-softborder shadow-subtle shrink-0">
            {getWeatherIcon(weather.condition)}
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl md:text-5xl font-mono font-bold text-charcoal tracking-tight">
                {weather.temperature.toFixed(1)}°
              </span>
              <span className="text-base font-mono text-charcoal-muted">C</span>
              <span className="text-xs text-charcoal-muted ml-2 font-sans">
                (Feels like {weather.feels_like.toFixed(1)}°C)
              </span>
            </div>

            <h2 className="text-lg md:text-xl font-serif font-semibold text-charcoal mt-1">
              {weather.condition}
            </h2>
            <p className="text-xs text-charcoal-muted max-w-lg mt-0.5 leading-relaxed font-sans">
              {weather.condition_description}
            </p>
          </div>
        </div>

        {/* Right: Technical Observation Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full lg:w-auto">
          <div className="p-3 rounded bg-ivory-50 border border-softborder flex flex-col justify-between">
            <span className="text-[10px] font-mono text-charcoal-muted uppercase tracking-wider flex items-center gap-1">
              <Droplets className="w-3 h-3 text-monsoon" /> Humidity
            </span>
            <span className="text-base font-mono font-bold text-charcoal mt-1">{weather.humidity}%</span>
            <span className="text-[10px] text-monsoon font-mono">Dew Pt. 23.4°C</span>
          </div>

          <div className="p-3 rounded bg-ivory-50 border border-softborder flex flex-col justify-between">
            <span className="text-[10px] font-mono text-charcoal-muted uppercase tracking-wider flex items-center gap-1">
              <Wind className="w-3 h-3 text-monsoon" /> Surface Wind
            </span>
            <span className="text-base font-mono font-bold text-charcoal mt-1">
              {weather.wind_speed_kmh.toFixed(1)} <span className="text-[10px] font-normal font-sans">km/h</span>
            </span>
            <span className="text-[10px] text-charcoal font-mono">{weather.wind_direction} Vector</span>
          </div>

          <div className="p-3 rounded bg-ivory-50 border border-softborder flex flex-col justify-between">
            <span className="text-[10px] font-mono text-charcoal-muted uppercase tracking-wider flex items-center gap-1">
              <Gauge className="w-3 h-3 text-terracotta" /> Pressure
            </span>
            <span className="text-base font-mono font-bold text-charcoal mt-1">
              {weather.pressure_hpa.toFixed(1)} <span className="text-[10px] font-normal font-sans">hPa</span>
            </span>
            <span className="text-[10px] text-terracotta font-mono">Barometric Gradient</span>
          </div>

          <div className="p-3 rounded bg-ivory-50 border border-softborder flex flex-col justify-between">
            <span className="text-[10px] font-mono text-charcoal-muted uppercase tracking-wider flex items-center gap-1">
              <Eye className="w-3 h-3 text-monsoon" /> Visibility
            </span>
            <span className="text-base font-mono font-bold text-charcoal mt-1">
              {weather.visibility_km} <span className="text-[10px] font-normal font-sans">km</span>
            </span>
            <span className="text-[10px] text-charcoal-muted font-mono">Cloud: {weather.cloud_cover_percent}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

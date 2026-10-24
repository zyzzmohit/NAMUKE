import React from 'react';
import {
  Compass,
  ArrowRight,
  ShieldAlert,
  Wind,
  Droplets,
  Activity,
  Layers,
  ChevronRight,
  TrendingDown,
  CloudLightning,
} from 'lucide-react';
import { CurrentWeather, LocationCoordinates } from '../../types/weather';
import { WeatherAlert } from '../../types/alert';

interface HeroBriefingProps {
  weather: CurrentWeather;
  location: LocationCoordinates;
  alerts: WeatherAlert[];
  onExploreMap: () => void;
  onViewAlerts: () => void;
}

export const HeroBriefing: React.FC<HeroBriefingProps> = ({
  weather,
  location,
  alerts,
  onExploreMap,
  onViewAlerts,
}) => {
  const activeWarningCount = alerts.filter(
    (a) => a.severity === 'CRITICAL' || a.severity === 'WARNING'
  ).length;

  return (
    <div className="bg-white border border-softborder rounded overflow-hidden shadow-subtle mb-6">
      {/* Top Editorial Banner */}
      <div className="p-6 md:p-8 border-b border-softborder">
        {/* Monospace Station Telemetry Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-charcoal-muted pb-4 border-b border-softborder mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-monsoon animate-pulse" />
            <span className="font-semibold text-charcoal">SURFACE SYNOPTIC CYCLE 0600 UTC</span>
            <span className="text-softborder">|</span>
            <span>STN-{location.name.toUpperCase().slice(0, 3)}-43003</span>
            <span className="text-softborder">|</span>
            <span>ELEV 14m ASL</span>
          </div>
          <div className="flex items-center gap-2">
            <span>WESTERN GHATS CONVECTIVE CORRIDOR</span>
            <span className="text-softborder">·</span>
            <span className="text-monsoon font-medium">RADAR L-BAND SYNCHRONIZED</span>
          </div>
        </div>

        {/* Hero Grid: Editorial narrative (Left) + Atmospheric Synoptic State (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Editorial Headline & Narrative */}
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-2">
              <span className="text-xs font-mono font-medium uppercase tracking-widest text-monsoon">
                Meteorological Risk & Synoptic Intelligence
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-semibold tracking-tight text-charcoal leading-[1.15]">
                Understand the weather <br className="hidden sm:inline" />
                <span className="italic font-normal">before it turns.</span>
              </h1>
            </div>

            <p className="text-sm md:text-base text-charcoal-muted leading-relaxed max-w-2xl font-sans">
              Meghdoot synthesizes hyper-local automated surface telemetry, Doppler radar hydrometeor echoes, and thermodynamic convective indices to detect micro-scale cloudbursts, severe lightning surges, and flash floods across India before macro models react.
            </p>

            {/* Action Row */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreMap}
                className="inline-flex items-center gap-2 px-4 py-2 rounded bg-charcoal text-ivory text-xs font-medium hover:bg-charcoal-800 transition shadow-subtle group"
              >
                <span>Explore Synoptic GIS Map</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>

              {activeWarningCount > 0 ? (
                <button
                  onClick={onViewAlerts}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded bg-terracotta/10 text-terracotta border border-terracotta/30 text-xs font-medium hover:bg-terracotta/15 transition"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>{activeWarningCount} Active Severe Advisories</span>
                </button>
              ) : (
                <button
                  onClick={onViewAlerts}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded bg-ivory-100 text-charcoal text-xs font-medium hover:bg-ivory-200 border border-softborder transition"
                >
                  <span>Review Public Safety Protocols</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Synoptic Thermodynamic Vector Card */}
          <div className="lg:col-span-5 bg-ivory-50 border border-softborder rounded p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-softborder">
              <div className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-monsoon" />
                <span className="text-xs font-mono font-semibold text-charcoal uppercase tracking-wider">
                  Atmospheric Sounding Indices
                </span>
              </div>
              <span className="text-[10px] font-mono text-charcoal-muted">Colaba Sounding</span>
            </div>

            {/* Convective Indices Table */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded bg-white border border-softborder">
                <span className="text-[10px] font-mono text-charcoal-muted uppercase block">CAPE Energy</span>
                <span className="text-base font-mono font-bold text-charcoal">1,840 <span className="text-[10px] font-normal text-charcoal-muted">J/kg</span></span>
                <span className="text-[10px] text-terracotta font-mono block mt-0.5">Elevated Instability</span>
              </div>

              <div className="p-2.5 rounded bg-white border border-softborder">
                <span className="text-[10px] font-mono text-charcoal-muted uppercase block">Precipitable Water</span>
                <span className="text-base font-mono font-bold text-charcoal">54.2 <span className="text-[10px] font-normal text-charcoal-muted">mm</span></span>
                <span className="text-[10px] text-monsoon font-mono block mt-0.5">Heavy Moisture Column</span>
              </div>

              <div className="p-2.5 rounded bg-white border border-softborder">
                <span className="text-[10px] font-mono text-charcoal-muted uppercase block">Lifting Cond. Level</span>
                <span className="text-base font-mono font-bold text-charcoal">620 <span className="text-[10px] font-normal text-charcoal-muted">m</span></span>
                <span className="text-[10px] text-charcoal-muted font-mono block mt-0.5">Low Cloud Base</span>
              </div>

              <div className="p-2.5 rounded bg-white border border-softborder">
                <span className="text-[10px] font-mono text-charcoal-muted uppercase block">0-6 km Bulk Shear</span>
                <span className="text-base font-mono font-bold text-charcoal">24 <span className="text-[10px] font-normal text-charcoal-muted">kts</span></span>
                <span className="text-[10px] text-ochre font-mono block mt-0.5">Multi-cell Organization</span>
              </div>
            </div>

            {/* Synoptic Vector Bar */}
            <div className="pt-2 border-t border-softborder flex items-center justify-between text-[11px] font-mono text-charcoal-muted">
              <span>Synoptic Regime:</span>
              <span className="font-semibold text-charcoal">South-West Monsoon Trough Surge</span>
            </div>
          </div>
        </div>
      </div>

      {/* Continuous Meteorological Briefing Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-softborder bg-ivory-50/50">
        {/* Left Column (7 cols): Narrative Weather Story */}
        <div className="lg:col-span-7 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-charcoal flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-monsoon" />
              Current State & 6–12 Hour Convective Outlook
            </h2>
            <span className="text-[10px] font-mono text-charcoal-muted">Issued 07:30 IST</span>
          </div>

          <div className="space-y-3 text-xs md:text-sm text-charcoal leading-relaxed font-sans">
            <p>
              <strong className="font-semibold text-charcoal font-serif text-base">Immediate Regime:</strong>{' '}
              Surface observation shows high boundary-layer saturation ({weather.humidity}%) coupled with a surface temperature of{' '}
              <span className="font-mono font-medium">{weather.temperature.toFixed(1)}°C</span> and falling barometric pressure ({weather.pressure_hpa.toFixed(1)} hPa). Strong moisture advection from the Arabian Sea is creating dense cumulus congestus clusters along the coastline.
            </p>

            <p className="text-charcoal-muted">
              <strong className="font-semibold text-charcoal">Evolution (Next 6–12 Hours):</strong>{' '}
              As daytime insolation peaks over the Western Ghats slope, localized orographic lifting is forecast to initiate rapid convective vertical development. Cloud tops are projected to exceed 12 km by mid-afternoon, elevating the probability of short-duration torrential downpours ({weather.precipitation_rate_mmh > 0 ? `${weather.precipitation_rate_mmh.toFixed(1)} mm/h current` : 'up to 35 mm/h peak'}) and localized urban waterlogging in low-lying transit corridors.
            </p>
          </div>

          {/* Precautions Capsule */}
          <div className="p-3 rounded bg-white border border-softborder flex items-start gap-3 text-xs">
            <CloudLightning className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
            <div className="text-charcoal-muted leading-snug">
              <span className="font-semibold text-charcoal block mb-0.5">Field Operation Protocol:</span>
              Urban storm drainage pumping stations on standby. Construction crane operations advised to suspend if squall gusts exceed 45 km/h.
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Dense Formatted Scientific Observation Table */}
        <div className="lg:col-span-5 p-6 space-y-4 bg-white">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-charcoal flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-monsoon" />
              Ground Truth Telemetry Matrix
            </h2>
            <span className="text-[10px] font-mono text-monsoon bg-monsoon/10 px-1.5 py-0.5 rounded border border-monsoon/20">
              1 km² Resolution
            </span>
          </div>

          <table className="w-full text-xs font-mono">
            <tbody className="divide-y divide-softborder">
              <tr className="hover:bg-ivory-50/50">
                <td className="py-2 text-charcoal-muted font-sans">Surface Temperature</td>
                <td className="py-2 text-right font-bold text-charcoal">{weather.temperature.toFixed(1)}°C</td>
                <td className="py-2 text-right text-[11px] text-charcoal-muted">Feels {weather.feels_like.toFixed(1)}°C</td>
              </tr>
              <tr className="hover:bg-ivory-50/50">
                <td className="py-2 text-charcoal-muted font-sans">Barometric Pressure</td>
                <td className="py-2 text-right font-bold text-charcoal">{weather.pressure_hpa.toFixed(1)} hPa</td>
                <td className="py-2 text-right text-[11px] text-terracotta flex items-center justify-end gap-0.5 pt-2">
                  <TrendingDown className="w-3 h-3" />
                  -1.4 hPa/3h
                </td>
              </tr>
              <tr className="hover:bg-ivory-50/50">
                <td className="py-2 text-charcoal-muted font-sans">Wind & Gust Envelope</td>
                <td className="py-2 text-right font-bold text-charcoal">
                  {weather.wind_speed_kmh.toFixed(1)} <span className="text-[10px] font-normal">km/h</span>
                </td>
                <td className="py-2 text-right text-[11px] text-charcoal">{weather.wind_direction} (Gusts {weather.wind_gust_kmh || 32} km/h)</td>
              </tr>
              <tr className="hover:bg-ivory-50/50">
                <td className="py-2 text-charcoal-muted font-sans">Precipitation Rate</td>
                <td className="py-2 text-right font-bold text-charcoal">
                  {weather.precipitation_rate_mmh.toFixed(1)} <span className="text-[10px] font-normal">mm/h</span>
                </td>
                <td className="py-2 text-right text-[11px] text-monsoon">{weather.precipitation_probability}% prob.</td>
              </tr>
              <tr className="hover:bg-ivory-50/50">
                <td className="py-2 text-charcoal-muted font-sans">Horizontal Visibility</td>
                <td className="py-2 text-right font-bold text-charcoal">{weather.visibility_km} km</td>
                <td className="py-2 text-right text-[11px] text-charcoal-muted">Clear Deck</td>
              </tr>
              <tr className="hover:bg-ivory-50/50">
                <td className="py-2 text-charcoal-muted font-sans">Cloud Fraction</td>
                <td className="py-2 text-right font-bold text-charcoal">{weather.cloud_cover_percent}%</td>
                <td className="py-2 text-right text-[11px] text-charcoal-muted">Stratocumulus Base 650m</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

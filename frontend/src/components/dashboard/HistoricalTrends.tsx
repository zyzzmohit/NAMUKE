import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { HistoricalTrendPoint } from '../../types/weather';
import { History, TrendingUp, Calendar, Info } from 'lucide-react';

interface HistoricalTrendsProps {
  data: HistoricalTrendPoint[];
}

export const HistoricalTrends: React.FC<HistoricalTrendsProps> = ({ data }) => {
  const [range, setRange] = useState<'7d' | '14d' | '30d'>('7d');
  const [metricTab, setMetricTab] = useState<'rainfall' | 'temp'>('rainfall');

  return (
    <div className="bg-white border border-softborder rounded p-6 space-y-5 shadow-subtle font-sans">
      {/* Section Header with Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-softborder gap-3">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-monsoon" />
          <div>
            <h3 className="text-base font-serif font-semibold text-charcoal">
              Historical Meteorological Trends & Anomalies
            </h3>
            <p className="text-[11px] font-mono text-charcoal-muted">
              Observed Telemetry vs 10-Year Climatological Mean
            </p>
          </div>
        </div>

        {/* Range & Metric Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center bg-ivory-100 rounded p-0.5 border border-softborder text-xs">
            <button
              onClick={() => setMetricTab('rainfall')}
              className={`px-3 py-1 rounded text-xs transition ${
                metricTab === 'rainfall'
                  ? 'bg-monsoon text-white font-medium shadow-subtle'
                  : 'text-charcoal-muted hover:text-charcoal'
              }`}
            >
              Rainfall Anomaly
            </button>
            <button
              onClick={() => setMetricTab('temp')}
              className={`px-3 py-1 rounded text-xs transition ${
                metricTab === 'temp'
                  ? 'bg-terracotta text-white font-medium shadow-subtle'
                  : 'text-charcoal-muted hover:text-charcoal'
              }`}
            >
              Temperature Delta
            </button>
          </div>

          <div className="flex items-center bg-ivory-100 rounded p-0.5 border border-softborder text-xs text-charcoal-muted font-mono">
            <button
              onClick={() => setRange('7d')}
              className={`px-2 py-1 rounded ${range === '7d' ? 'bg-white text-charcoal font-semibold shadow-subtle' : 'hover:text-charcoal'}`}
            >
              7D
            </button>
            <button
              onClick={() => setRange('14d')}
              className={`px-2 py-1 rounded ${range === '14d' ? 'bg-white text-charcoal font-semibold shadow-subtle' : 'hover:text-charcoal'}`}
            >
              14D
            </button>
            <button
              onClick={() => setRange('30d')}
              className={`px-2 py-1 rounded ${range === '30d' ? 'bg-white text-charcoal font-semibold shadow-subtle' : 'hover:text-charcoal'}`}
            >
              30D
            </button>
          </div>
        </div>
      </div>

      {/* Main Historical Chart */}
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {metricTab === 'rainfall' ? (
            <ComposedChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="#D8DCD5" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" stroke="#737975" fontSize={10} tickLine={false} fontFamily="JetBrains Mono, monospace" />
              <YAxis
                stroke="#526B59"
                fontSize={10}
                tickLine={false}
                fontFamily="JetBrains Mono, monospace"
                unit="mm"
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const p = payload[0].payload;
                    return (
                      <div className="bg-white p-3 rounded border border-softborder shadow-elevated text-xs space-y-1.5 font-sans">
                        <p className="font-serif font-bold text-charcoal text-sm">{p.date}</p>
                        <p className="text-terracotta font-mono">Observed Rainfall: {p.actual_rainfall_mm} mm</p>
                        <p className="text-charcoal-muted font-mono">10-Yr Baseline Avg: {p.historical_avg_rainfall_mm} mm</p>
                        <p className="text-monsoon font-mono">Surface Wind: {p.wind_speed_kmh} km/h</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: '11px', color: '#737975', paddingTop: '8px', fontFamily: 'Inter, sans-serif' }}
              />
              <Bar
                name="Recorded Rainfall (mm)"
                dataKey="actual_rainfall_mm"
                fill="#B9684D"
                opacity={0.85}
                radius={[2, 2, 0, 0]}
                maxBarSize={28}
              />
              <Line
                name="10-Year Climatological Median (mm)"
                type="monotone"
                dataKey="historical_avg_rainfall_mm"
                stroke="#526B59"
                strokeWidth={2}
                dot={{ r: 3, fill: '#526B59' }}
              />
            </ComposedChart>
          ) : (
            <ComposedChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="#D8DCD5" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" stroke="#737975" fontSize={10} tickLine={false} fontFamily="JetBrains Mono, monospace" />
              <YAxis
                stroke="#B9684D"
                fontSize={10}
                tickLine={false}
                fontFamily="JetBrains Mono, monospace"
                domain={['dataMin - 2', 'dataMax + 2']}
                unit="°C"
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const p = payload[0].payload;
                    return (
                      <div className="bg-white p-3 rounded border border-softborder shadow-elevated text-xs space-y-1.5 font-sans">
                        <p className="font-serif font-bold text-charcoal text-sm">{p.date}</p>
                        <p className="text-terracotta font-mono">Recorded Temp: {p.actual_temp}°C</p>
                        <p className="text-charcoal-muted font-mono">10-Year Normal: {p.historical_avg_temp}°C</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: '11px', color: '#737975', paddingTop: '8px', fontFamily: 'Inter, sans-serif' }}
              />
              <Line
                name="Observed Temperature (°C)"
                type="monotone"
                dataKey="actual_temp"
                stroke="#B9684D"
                strokeWidth={2.5}
                dot={{ r: 3.5, fill: '#B9684D' }}
              />
              <Line
                name="10-Year Climatological Average (°C)"
                type="monotone"
                dataKey="historical_avg_temp"
                stroke="#737975"
                strokeDasharray="4 4"
                strokeWidth={1.8}
                dot={false}
              />
            </ComposedChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Analytical Callout */}
      <div className="p-3.5 rounded bg-ivory-50 border border-softborder flex items-start gap-2.5 text-xs">
        <Info className="w-4 h-4 text-monsoon shrink-0 mt-0.5" />
        <p className="text-charcoal-muted leading-relaxed font-sans">
          <strong className="text-charcoal font-semibold">Climatological Anomaly Diagnostic: </strong>
          Rainfall across the current cycle reflects a +320% positive deviation above the 10-year seasonal median, driven by quasi-stationary mid-tropospheric cyclonic vortex advection over the Western Ghats windward slopes.
        </p>
      </div>
    </div>
  );
};

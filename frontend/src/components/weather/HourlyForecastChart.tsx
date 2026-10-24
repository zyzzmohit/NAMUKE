import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { HourlyForecast } from '../../types/weather';
import { CloudRain, Thermometer } from 'lucide-react';

interface HourlyForecastChartProps {
  data: HourlyForecast[];
}

export const HourlyForecastChart: React.FC<HourlyForecastChartProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="h-56 flex items-center justify-center text-xs text-charcoal-muted font-mono">
        No hourly trajectory telemetry available
      </div>
    );
  }

  // Filter to show every 2 or 3 hours on small screens, or all 24
  const chartData = data.slice(0, 24).map((d) => ({
    hour: d.hour,
    temp: d.temperature,
    feels: d.feels_like,
    rainProb: d.precipitation_probability,
    rainRate: d.precipitation_rate_mmh,
    condition: d.condition,
  }));

  return (
    <div className="w-full font-sans">
      <div className="flex flex-wrap items-center justify-between text-xs text-charcoal-muted mb-3 gap-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-terracotta" />
            <span className="text-charcoal font-medium">Temperature (°C)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-monsoon" />
            <span className="text-charcoal font-medium">Precipitation Chance (%)</span>
          </div>
        </div>
        <span className="text-[11px] font-mono text-charcoal-muted">24-Hour Convective Sequence</span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#B9684D" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#B9684D" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#D8DCD5" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="hour"
              stroke="#737975"
              fontSize={10}
              tickLine={false}
              fontFamily="JetBrains Mono, monospace"
              interval="preserveStartEnd"
            />
            <YAxis
              yAxisId="temp"
              stroke="#B9684D"
              fontSize={10}
              domain={['dataMin - 2', 'dataMax + 2']}
              tickLine={false}
              fontFamily="JetBrains Mono, monospace"
              unit="°"
            />
            <YAxis
              yAxisId="rain"
              orientation="right"
              stroke="#526B59"
              fontSize={10}
              domain={[0, 100]}
              tickLine={false}
              fontFamily="JetBrains Mono, monospace"
              unit="%"
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const p = payload[0].payload;
                  return (
                    <div className="bg-white p-3 rounded border border-softborder shadow-elevated text-xs space-y-1.5 font-sans">
                      <p className="font-serif font-bold text-charcoal text-sm">{p.hour} — {p.condition}</p>
                      <div className="flex items-center gap-2 text-terracotta font-mono text-[11px]">
                        <Thermometer className="w-3.5 h-3.5" />
                        <span>Temp: {p.temp}°C (Feels {p.feels}°C)</span>
                      </div>
                      <div className="flex items-center gap-2 text-monsoon font-mono text-[11px]">
                        <CloudRain className="w-3.5 h-3.5" />
                        <span>Precip Prob: {p.rainProb}% ({p.rainRate} mm/h)</span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar
              yAxisId="rain"
              dataKey="rainProb"
              fill="#526B59"
              opacity={0.3}
              radius={[2, 2, 0, 0]}
              maxBarSize={16}
            />
            <Area
              yAxisId="temp"
              type="monotone"
              dataKey="temp"
              stroke="#B9684D"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#tempGradient)"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

import React from 'react';
import { getRiskCategory, getRiskColor, getRiskLabel } from '../../utils/riskUtils';

interface RiskGaugeProps {
  score: number; // 0 - 100
  size?: number;
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({ score, size = 180 }) => {
  const category = getRiskCategory(score);
  const color = getRiskColor(category);

  // SVG Semicircular geometry
  const strokeWidth = 12;
  const radius = (size - strokeWidth * 2) / 2;
  const centerX = size / 2;
  const centerY = size / 2 + 10;

  // Semicircle circumference: PI * radius
  const arcLength = Math.PI * radius;
  // Percentage to fill: clamped 0 to 1
  const pct = Math.max(0, Math.min(100, score)) / 100;
  const strokeDashoffset = arcLength * (1 - pct);

  return (
    <div className="flex flex-col items-center justify-center relative select-none">
      <svg width={size} height={size * 0.65} viewBox={`0 0 ${size} ${size * 0.75}`}>
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#526B59" />
            <stop offset="35%" stopColor="#A67C38" />
            <stop offset="70%" stopColor="#B9684D" />
            <stop offset="100%" stopColor="#8E3935" />
          </linearGradient>
        </defs>

        {/* Background Arc */}
        <path
          d={`M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 1 ${centerX + radius} ${centerY}`}
          fill="none"
          stroke="#E2DDD2"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Filled Arc */}
        <path
          d={`M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 1 ${centerX + radius} ${centerY}`}
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={arcLength}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-700 ease-out"
        />

        {/* Center Score readout */}
        <text
          x={centerX}
          y={centerY - 10}
          textAnchor="middle"
          className="font-mono font-bold fill-charcoal text-3xl tracking-tight"
          style={{ fontSize: '34px', fontWeight: 700 }}
        >
          {score}
        </text>

        <text
          x={centerX}
          y={centerY + 12}
          textAnchor="middle"
          className="fill-charcoal-muted uppercase font-mono tracking-widest text-[10px]"
          style={{ fontSize: '10px' }}
        >
          Risk Index / 100
        </text>
      </svg>

      {/* Category Pill */}
      <div className="mt-1">
        <span
          className={`inline-flex items-center px-3 py-1 rounded text-xs font-mono font-medium ${color.pill}`}
        >
          {getRiskLabel(category)}
        </span>
      </div>
    </div>
  );
};

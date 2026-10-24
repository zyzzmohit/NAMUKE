import React from 'react';

export const MapLegend: React.FC = () => {
  const levels = [
    { label: 'Low (0–24)', color: '#526B59', desc: 'Minimal localized threat' },
    { label: 'Moderate (25–49)', color: '#A67C38', desc: 'Scattered squall / gusts' },
    { label: 'High (50–74)', color: '#B9684D', desc: 'Thunderstorms & lightning' },
    { label: 'Severe (75–100)', color: '#8E3935', desc: 'Inundation & cloudburst' },
  ];

  return (
    <div className="p-3 rounded bg-white/95 backdrop-blur-xs border border-softborder shadow-elevated text-xs space-y-2 select-none font-sans">
      <div className="flex items-center justify-between pb-1.5 border-b border-softborder">
        <span className="font-mono font-semibold text-charcoal text-[10px] uppercase tracking-wider">
          Risk Zone Classification
        </span>
        <span className="text-[9px] font-mono text-monsoon uppercase font-semibold">1 km² Overlays</span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[11px]">
        {levels.map((lvl) => (
          <div key={lvl.label} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-xs shrink-0 border border-charcoal/15"
              style={{ backgroundColor: lvl.color }}
            />
            <div className="flex flex-col leading-tight">
              <span className="font-medium text-charcoal font-mono text-[10px]">{lvl.label}</span>
              <span className="text-[9px] text-charcoal-muted truncate">{lvl.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

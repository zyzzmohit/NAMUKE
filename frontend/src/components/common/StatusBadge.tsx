import React from 'react';
import { DataSourceType } from '../../types/api';

interface StatusBadgeProps {
  source?: DataSourceType;
  label?: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  source = 'mock',
  label,
  className = '',
}) => {
  if (label) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono tracking-wider border ${className}`}
      >
        {label}
      </span>
    );
  }

  if (source === 'live') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-medium uppercase tracking-wider bg-monsoon/10 text-monsoon border border-monsoon/25">
        <span className="w-1.5 h-1.5 rounded-full bg-monsoon animate-pulse" />
        Live Telemetry
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-medium uppercase tracking-wider bg-ochre/10 text-ochre-dark border border-ochre/25">
      <span className="w-1.5 h-1.5 rounded-full bg-ochre" />
      Simulated Model
    </span>
  );
};

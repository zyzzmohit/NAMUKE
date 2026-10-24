import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  subtext?: string;
  height?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading Meteorological Data...',
  subtext = 'Aggregating sensor telemetry and localized radar feeds',
  height = 'h-64',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center ${height} text-center p-6 bg-white border border-softborder rounded shadow-subtle font-sans`}>
      <div className="relative mb-4">
        <div className="w-12 h-12 rounded-full border-2 border-softborder border-t-monsoon animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-5 h-5 text-monsoon animate-pulse" />
        </div>
      </div>
      <p className="text-sm font-serif font-semibold text-charcoal">{message}</p>
      {subtext && <p className="text-xs text-charcoal-muted mt-1 max-w-sm font-sans">{subtext}</p>}
    </div>
  );
};

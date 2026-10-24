import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  height?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Data Fetch Unsuccessful',
  message = 'Unable to reach the meteorological station feed. Please verify your connection or fallback to simulated data.',
  onRetry,
  height = 'h-64',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center ${height} text-center p-6 bg-white border border-terracotta/35 rounded shadow-subtle font-sans`}>
      <div className="w-12 h-12 rounded-full bg-terracotta/10 border border-terracotta/30 flex items-center justify-center mb-3">
        <AlertCircle className="w-6 h-6 text-terracotta" />
      </div>
      <h3 className="text-base font-serif font-semibold text-charcoal mb-1">{title}</h3>
      <p className="text-xs text-charcoal-muted max-w-md mb-4 font-sans leading-relaxed">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono font-medium bg-ivory-100 hover:bg-ivory-200 text-charcoal rounded transition border border-softborder shadow-subtle"
        >
          <RefreshCw className="w-3.5 h-3.5 text-monsoon" />
          <span>Retry Observation Sync</span>
        </button>
      )}
    </div>
  );
};

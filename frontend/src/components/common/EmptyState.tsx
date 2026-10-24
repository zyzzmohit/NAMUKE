import React from 'react';
import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  height?: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Records Found',
  description = 'No active alerts or records match the selected filter criteria.',
  height = 'h-48',
  actionText,
  onAction,
}) => {
  return (
    <div className={`flex flex-col items-center justify-center ${height} text-center p-6 bg-ivory-50 border border-softborder rounded font-sans`}>
      <div className="w-10 h-10 rounded-full bg-ivory-200 flex items-center justify-center mb-2.5">
        <Inbox className="w-5 h-5 text-charcoal-muted" />
      </div>
      <p className="text-sm font-serif font-semibold text-charcoal">{title}</p>
      <p className="text-xs text-charcoal-muted mt-1 max-w-sm font-sans">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="mt-3 px-3 py-1 text-xs font-mono font-medium text-monsoon hover:underline"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

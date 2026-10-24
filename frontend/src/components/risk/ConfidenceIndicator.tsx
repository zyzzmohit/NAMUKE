import React from 'react';
import { Cpu, Info } from 'lucide-react';

interface ConfidenceIndicatorProps {
  confidence: number | null; // e.g. 0.88 or null
  isSimulated?: boolean;
}

export const ConfidenceIndicator: React.FC<ConfidenceIndicatorProps> = ({
  confidence,
  isSimulated = true,
}) => {
  if (confidence === null || confidence === undefined) {
    return null;
  }

  const confidencePct = Math.round(confidence * 100);

  return (
    <div className="p-3 rounded bg-white border border-softborder flex items-center justify-between text-xs shadow-subtle">
      <div className="flex items-center gap-2.5">
        <div className="p-1.5 rounded bg-ivory-100 text-monsoon border border-softborder">
          <Cpu className="w-3.5 h-3.5" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-charcoal">Inference Confidence</span>
            {isSimulated && (
              <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-ochre/10 text-ochre-dark border border-ochre/25 font-mono">
                Simulated
              </span>
            )}
          </div>
          <span className="text-[10px] text-charcoal-muted leading-tight block">
            Sensor concordance: Colaba AWS + Santacruz Radar
          </span>
        </div>
      </div>

      <div className="text-right shrink-0">
        <span className="text-sm font-bold text-monsoon font-mono">
          {confidencePct}%
        </span>
        <span className="block text-[9px] text-charcoal-muted font-mono">Model Trust</span>
      </div>
    </div>
  );
};

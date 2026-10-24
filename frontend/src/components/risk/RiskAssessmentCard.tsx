import React from 'react';
import { ShieldAlert, AlertTriangle, ChevronRight } from 'lucide-react';
import { RiskAssessment } from '../../types/risk';
import { RiskGauge } from './RiskGauge';
import { HazardBreakdown } from './HazardBreakdown';
import { ConfidenceIndicator } from './ConfidenceIndicator';

interface RiskAssessmentCardProps {
  assessment: RiskAssessment;
  onViewDetailedMap?: () => void;
}

export const RiskAssessmentCard: React.FC<RiskAssessmentCardProps> = ({
  assessment,
  onViewDetailedMap,
}) => {
  return (
    <div className="bg-white border border-softborder rounded p-5 space-y-5 shadow-subtle">
      <div className="flex items-center justify-between pb-3 border-b border-softborder">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-monsoon" />
          <div>
            <h3 className="text-base font-serif font-semibold text-charcoal">
              Multi-Hazard Micro-Climate Risk Index
            </h3>
            <p className="text-[11px] font-mono text-charcoal-muted">
              Hyper-local 1 km² Convective Inference
            </p>
          </div>
        </div>

        {onViewDetailedMap && (
          <button
            onClick={onViewDetailedMap}
            className="inline-flex items-center gap-1 text-xs text-monsoon hover:text-monsoon-dark font-mono font-medium transition"
          >
            <span>Hazard GIS Overlays</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Main Gauge & Top Level Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        <div className="md:col-span-5 flex flex-col items-center justify-center p-4 rounded bg-ivory-50 border border-softborder">
          <RiskGauge score={assessment.overall_score} size={190} />
          
          <div className="w-full mt-3">
            <ConfidenceIndicator
              confidence={assessment.model_confidence}
              isSimulated={assessment.is_simulated}
            />
          </div>
        </div>

        {/* Individual Hazard Spectrum */}
        <div className="md:col-span-7 space-y-2">
          <div className="flex items-center justify-between text-xs text-charcoal-muted mb-1 px-0.5">
            <span className="font-mono uppercase font-semibold text-charcoal tracking-wider text-[10px]">
              Individual Hazard Spectrum
            </span>
            <span className="text-[10px] font-mono">Severity & Lead Time</span>
          </div>

          <HazardBreakdown hazards={assessment.hazards} />
        </div>
      </div>
    </div>
  );
};

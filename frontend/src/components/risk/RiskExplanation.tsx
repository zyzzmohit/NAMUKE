import React from 'react';
import { HelpCircle, Layers, CheckCircle2, AlertOctagon } from 'lucide-react';
import { RiskAssessment } from '../../types/risk';

interface RiskExplanationProps {
  assessment: RiskAssessment;
}

export const RiskExplanation: React.FC<RiskExplanationProps> = ({ assessment }) => {
  return (
    <div className="bg-white border border-softborder rounded p-6 space-y-5 shadow-subtle">
      <div className="flex items-center gap-2 pb-3 border-b border-softborder">
        <HelpCircle className="w-4 h-4 text-monsoon" />
        <h3 className="text-base font-serif font-semibold text-charcoal">
          Atmospheric Physics & Diagnostic Analysis
        </h3>
        <span className="text-[10px] font-mono text-charcoal-muted ml-auto">
          Sounding Diagnostic Analysis
        </span>
      </div>

      <p className="text-xs md:text-sm text-charcoal leading-relaxed font-sans">
        {assessment.primary_explanation}
      </p>

      {/* Observed Contributing Parameters Table */}
      {assessment.factors && assessment.factors.length > 0 && (
        <div className="space-y-2.5 pt-1">
          <span className="text-xs font-mono uppercase font-semibold text-charcoal tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-monsoon" />
            Key Thermodynamic & Kinematic Indicators:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            {assessment.factors.map((f, i) => (
              <div
                key={i}
                className="p-3 rounded bg-ivory-50 border border-softborder flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold text-charcoal text-xs">{f.parameter}</span>
                  <span
                    className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded ${
                      f.impact === 'critical'
                        ? 'bg-crimson/15 text-crimson border border-crimson/30'
                        : f.impact === 'elevated'
                        ? 'bg-terracotta/15 text-terracotta border border-terracotta/30'
                        : 'bg-monsoon/10 text-monsoon border border-monsoon/25'
                    }`}
                  >
                    {f.impact}
                  </span>
                </div>
                <div className="font-mono text-sm text-charcoal font-bold mb-1">
                  {f.observed_value}
                </div>
                <p className="text-[11px] text-charcoal-muted leading-relaxed font-sans">{f.notes}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Precautions List */}
      {assessment.recommended_precautions && assessment.recommended_precautions.length > 0 && (
        <div className="pt-3 border-t border-softborder">
          <span className="text-xs font-mono uppercase font-semibold text-charcoal tracking-wider flex items-center gap-1.5 mb-2.5">
            <AlertOctagon className="w-3.5 h-3.5 text-terracotta" />
            Recommended Public Safety & Operations Precautions:
          </span>

          <ul className="space-y-2">
            {assessment.recommended_precautions.map((prec, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs text-charcoal leading-relaxed p-2.5 rounded bg-ivory-50/60 border border-softborder/60"
              >
                <CheckCircle2 className="w-4 h-4 text-monsoon shrink-0 mt-0.5" />
                <span className="font-medium">{prec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="text-[11px] text-charcoal-muted bg-ivory-50 p-3 rounded border border-softborder leading-relaxed font-sans">
        <span className="font-semibold text-charcoal font-mono text-[10px] uppercase tracking-wider block mb-0.5">
          Methodological Transparency:
        </span>
        Estimates represent localized statistical risk indices derived from simulated micro-meteorological radar and surface telemetry. Actual localized convective formations are dynamic; always reference IMD and local municipal emergency management directives.
      </div>
    </div>
  );
};

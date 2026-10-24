import React from 'react';
import { CloudLightning, CloudRain, Zap, Wind, Droplets, Clock, AlertCircle } from 'lucide-react';
import { IndividualHazard } from '../../types/risk';
import { getRiskColor } from '../../utils/riskUtils';

interface HazardBreakdownProps {
  hazards: IndividualHazard[];
}

export const HazardBreakdown: React.FC<HazardBreakdownProps> = ({ hazards }) => {
  const getHazardIcon = (type: string) => {
    switch (type) {
      case 'thunderstorm':
        return <CloudLightning className="w-4 h-4 text-terracotta" />;
      case 'heavy_rainfall':
        return <CloudRain className="w-4 h-4 text-monsoon" />;
      case 'lightning':
        return <Zap className="w-4 h-4 text-terracotta" />;
      case 'strong_winds':
        return <Wind className="w-4 h-4 text-ochre" />;
      case 'local_flooding':
        return <Droplets className="w-4 h-4 text-crimson" />;
      default:
        return <AlertCircle className="w-4 h-4 text-charcoal-muted" />;
    }
  };

  const getHazardMechanism = (hz: IndividualHazard) => {
    if (hz.contributing_factor && hz.contributing_factor.length > 5) {
      return hz.contributing_factor;
    }
    switch (hz.type) {
      case 'heavy_rainfall':
        return 'Moisture convergence in low-level trough with saturated 850 hPa boundary layer.';
      case 'thunderstorm':
        return 'Elevated CAPE (>1,800 J/kg) driven by daytime insolation and orographic ascent.';
      case 'lightning':
        return 'Intense hydrometeor charge-separation in vertical cloud cells exceeding 10 km.';
      case 'strong_winds':
        return 'Convective downdraft outflow and localized pressure gradient momentum transfer.';
      case 'local_flooding':
        return 'High catchment saturation exceeding urban stormwater culvert infiltration capacity.';
      default:
        return hz.description;
    }
  };

  const getHazardPrecaution = (type: string) => {
    switch (type) {
      case 'heavy_rainfall':
        return 'Avoid transit corridors prone to flash accumulation; verify storm drainage discharge.';
      case 'thunderstorm':
        return 'Halt open-field and crane operations; seek shelter in reinforced structures.';
      case 'lightning':
        return 'Follow 30/30 safety rule; stay clear of solitary trees, metal structures, and water bodies.';
      case 'strong_winds':
        return 'Secure temporary tin roofs, hoardings, and loose balcony fixtures against squall gusts.';
      case 'local_flooding':
        return 'Never drive or wade through submerged roadways; keep emergency sump pumps operational.';
      default:
        return 'Monitor continuous automated station updates and official regional advisories.';
    }
  };

  return (
    <div className="space-y-3">
      {hazards.map((hz) => {
        const color = getRiskColor(hz.severity);
        const mechanism = getHazardMechanism(hz);
        const precaution = getHazardPrecaution(hz.type);

        return (
          <div
            key={hz.id}
            className="p-3.5 rounded bg-white border border-softborder hover:border-charcoal-muted/40 transition shadow-subtle"
          >
            {/* Header: Hazard title, badge, lead time, score */}
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded bg-ivory-50 border border-softborder shrink-0">
                  {getHazardIcon(hz.type)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-semibold text-charcoal leading-tight">{hz.title}</h4>
                    <span
                      className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded ${color.pill}`}
                    >
                      {hz.severity}
                    </span>
                  </div>
                  <p className="text-[11px] text-charcoal-muted leading-tight mt-0.5">{hz.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                {hz.estimated_lead_time_hours && (
                  <span className="hidden sm:flex items-center gap-1 text-[10px] font-mono text-charcoal-muted bg-ivory-50 px-2 py-0.5 rounded border border-softborder">
                    <Clock className="w-2.5 h-2.5 text-monsoon" />
                    +{hz.estimated_lead_time_hours}h lead
                  </span>
                )}
                <div className="text-right">
                  <span className={`text-xs font-mono font-bold ${color.text} block`}>
                    {hz.score}%
                  </span>
                  <span className="text-[9px] font-mono text-charcoal-muted">Risk</span>
                </div>
              </div>
            </div>

            {/* Scientific Mechanism & Precautions Details */}
            <div className="pt-2 border-t border-softborder grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-charcoal leading-snug">
              <div className="p-2 rounded bg-ivory-50/70 border border-softborder">
                <span className="text-[9px] font-mono font-semibold uppercase tracking-wider text-charcoal-muted block mb-0.5">
                  Physical Mechanism
                </span>
                <p className="text-charcoal-muted">{mechanism}</p>
              </div>

              <div className="p-2 rounded bg-ivory-50/70 border border-softborder">
                <span className="text-[9px] font-mono font-semibold uppercase tracking-wider text-charcoal-muted block mb-0.5">
                  Actionable Precaution
                </span>
                <p className="text-charcoal font-medium">{precaution}</p>
              </div>
            </div>

            {/* Micro Progress Track */}
            <div className="w-full h-1 rounded-full bg-ivory-200 overflow-hidden mt-2.5">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(100, hz.score)}%`,
                  backgroundColor: color.hex,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

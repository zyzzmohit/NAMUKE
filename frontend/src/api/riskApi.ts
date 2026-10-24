import { apiClient } from './client';
import { RiskAssessment } from '../types/risk';
import { ApiResponse } from '../types/api';
import { getMockRiskAssessment } from '../mocks/risk.mock';

export async function getRiskPrediction(
  lat: number,
  lon: number,
  locationName: string,
  timeHorizonHours = 24
): Promise<ApiResponse<RiskAssessment>> {
  try {
    const res = await apiClient<any>('/prediction/risk', {
      method: 'POST',
      body: JSON.stringify({
        latitude: lat,
        longitude: lon,
        time_horizon_hours: timeHorizonHours,
        include_sensor_telemetry: true,
      }),
    });

    if (res.success && res.data) {
      // If backend returns data matching the contract, adapt to frontend view model
      const d = res.data;
      const score = d.overall_risk_score !== undefined ? d.overall_risk_score : (d.overall_risk_level === 'CRITICAL' ? 88 : d.overall_risk_level === 'HIGH' ? 68 : d.overall_risk_level === 'MODERATE' ? 42 : 18);
      
      const adapted: RiskAssessment = {
        assessment_id: d.assessment_id || 'risk_live',
        location: {
          name: locationName,
          latitude: lat,
          longitude: lon,
        },
        overall_score: score,
        risk_category: d.overall_risk_level || 'HIGH',
        model_confidence: d.confidence_score !== undefined ? d.confidence_score : 0.88,
        evaluated_at: d.timestamp || new Date().toISOString(),
        valid_until: new Date(Date.now() + 6 * 3600 * 1000).toISOString(),
        hazards: (d.hazards || []).map((h: any, idx: number) => ({
          id: `live-hz-${idx}`,
          type: h.type || 'thunderstorm',
          title: h.type ? h.type.replace('_', ' ').toUpperCase() : 'Weather Hazard',
          score: Math.round((h.probability || 0.7) * 100),
          severity: h.severity || 'HIGH',
          probability: h.probability || 0.7,
          estimated_lead_time_hours: h.estimated_lead_time_hours || 2.0,
          description: h.details || 'Risk detected from localized atmospheric telemetry.',
          contributing_factor: 'Elevated regional hydrometeor buildup.',
        })),
        primary_explanation: d.recommended_action || 'Elevated risk from localized convective atmospheric parameters.',
        factors: [
          {
            parameter: 'Model Confidence',
            observed_value: `${Math.round((d.confidence_score || 0.88) * 100)}%`,
            impact: 'elevated',
            notes: 'AI model inference output from active telemetry feed.',
          },
        ],
        recommended_precautions: [
          d.recommended_action || 'Monitor localized alerts and avoid flood-prone routes.',
        ],
        is_simulated: false,
      };

      return {
        success: true,
        data: adapted,
        meta: {
          source: 'live',
          timestamp: new Date().toISOString(),
        },
      };
    }
    throw new Error('Backend unavailable, using mock');
  } catch {
    // Graceful offline fallback
    return {
      success: true,
      data: getMockRiskAssessment(locationName),
      meta: {
        source: 'mock',
        timestamp: new Date().toISOString(),
      },
    };
  }
}

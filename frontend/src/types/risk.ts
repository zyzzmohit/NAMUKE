export type RiskCategory = 'LOW' | 'MODERATE' | 'HIGH' | 'SEVERE';

export type HazardType = 'thunderstorm' | 'heavy_rainfall' | 'lightning' | 'strong_winds' | 'local_flooding';

export interface IndividualHazard {
  id: string;
  type: HazardType;
  title: string;
  score: number; // 0-100
  severity: RiskCategory;
  probability: number; // 0.0 - 1.0
  estimated_lead_time_hours?: number;
  description: string;
  contributing_factor: string;
}

export interface RiskZonePolygon {
  id: string;
  name: string;
  risk_level: RiskCategory;
  hazard_type: string;
  score: number;
  coordinates: [number, number][]; // Lat, Lon pairs
  area_sqkm?: number;
  advisory: string;
}

export interface RiskAssessment {
  assessment_id: string;
  location: {
    name: string;
    latitude: number;
    longitude: number;
  };
  overall_score: number; // 0 - 100
  risk_category: RiskCategory;
  model_confidence: number | null; // e.g. 0.88 or null if unavailable
  evaluated_at: string;
  valid_until: string;
  hazards: IndividualHazard[];
  primary_explanation: string;
  factors: {
    parameter: string;
    observed_value: string;
    impact: 'low' | 'moderate' | 'elevated' | 'critical';
    notes: string;
  }[];
  recommended_precautions: string[];
  is_simulated: boolean;
}

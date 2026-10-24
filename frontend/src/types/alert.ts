export type AlertSeverity = 'INFO' | 'ADVISORY' | 'WARNING' | 'CRITICAL';

export interface WeatherAlert {
  id: string;
  title: string;
  severity: AlertSeverity;
  hazard_type: string;
  affected_location: string;
  coordinates?: [number, number];
  affected_polygon?: [number, number][];
  issued_at: string;
  expected_window: string;
  expires_at: string;
  description: string;
  precautions: string[];
  data_source: string;
  is_simulated: boolean;
  active: boolean;
}

export interface AlertFilterOptions {
  severity: string; // 'all' | AlertSeverity
  hazardType: string; // 'all' | string
  searchQuery: string;
}

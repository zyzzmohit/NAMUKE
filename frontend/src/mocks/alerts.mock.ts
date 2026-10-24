import { WeatherAlert } from '../types/alert';

export const MOCK_ALERTS: WeatherAlert[] = [
  {
    id: 'alt-pn-01',
    title: 'Severe Thunderstorm & Lightning Advisory',
    severity: 'WARNING',
    hazard_type: 'thunderstorm',
    affected_location: 'Pune District (Hinjawadi, Mulshi, Haveli)',
    coordinates: [18.5204, 73.8567],
    affected_polygon: [
      [18.57, 73.68],
      [18.62, 73.74],
      [18.58, 73.82],
      [18.51, 73.78],
      [18.49, 73.70],
    ],
    issued_at: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    expected_window: 'Next 2 to 4 hours',
    expires_at: new Date(Date.now() + 3 * 3600 * 1000).toISOString(),
    description:
      'Simulated Doppler radar indicates multi-cell convective clouds with high lightning flash rates and localized rain bursts up to 35 mm/hr moving eastward across the western fringes.',
    precautions: [
      'Seek indoor shelter immediately if thunder is audible within 30 seconds of lightning.',
      'Do not take refuge under isolated trees or metal sheds.',
      'Exercise caution on wet highways due to reduced tyre friction.',
    ],
    data_source: 'Meghdoot Simulated Telemetry Engine',
    is_simulated: true,
    active: true,
  },
  {
    id: 'alt-mum-02',
    title: 'High Tide & Coastal Inundation Critical Alert',
    severity: 'CRITICAL',
    hazard_type: 'local_flooding',
    affected_location: 'Mumbai Coastal Strip & Low Estuaries',
    coordinates: [19.0760, 72.8777],
    affected_polygon: [
      [19.05, 72.85],
      [19.09, 72.87],
      [19.07, 72.90],
      [19.03, 72.88],
    ],
    issued_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    expected_window: 'Current - High tide peak at 13:40 IST',
    expires_at: new Date(Date.now() + 4 * 3600 * 1000).toISOString(),
    description:
      'Coincidence of astronomical high tide (4.2m) with continuous heavy precipitation may overload gravity outfalls and cause street waterlogging in designated low-lying basins.',
    precautions: [
      'Avoid driving through waterlogged underpasses where depth cannot be judged.',
      'Keep clear of seafront promenades and marine drive barriers during high tide peak.',
      'Cooperate with local traffic police diversions.',
    ],
    data_source: 'Meghdoot Simulated Telemetry Engine',
    is_simulated: true,
    active: true,
  },
  {
    id: 'alt-str-03',
    title: 'Ghat Ridge Runoff & Slippage Warning',
    severity: 'WARNING',
    hazard_type: 'heavy_rainfall',
    affected_location: 'Satara - Mahabaleshwar Mountain Passes',
    coordinates: [17.6805, 73.9997],
    affected_polygon: [
      [17.85, 73.62],
      [17.96, 73.72],
      [17.88, 73.80],
      [17.75, 73.70],
    ],
    issued_at: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
    expected_window: 'Next 6 hours',
    expires_at: new Date(Date.now() + 5 * 3600 * 1000).toISOString(),
    description:
      'Continuous orographic precipitation has brought soil moisture in steep catchment cuts close to saturation. Localized small debris displacement observed along winding ghat passes.',
    precautions: [
      'Reduce vehicle speed and maintain double the normal following distance on ghat curves.',
      'Check wipers, defoggers, and brake linings before commencing hill ascents.',
      'Report any hillside mud movement to nearest highway patrol checkpoint.',
    ],
    data_source: 'Meghdoot Simulated Telemetry Engine',
    is_simulated: true,
    active: true,
  },
  {
    id: 'alt-rtn-04',
    title: 'Squally Wind & Rough Marine Advisory',
    severity: 'ADVISORY',
    hazard_type: 'strong_winds',
    affected_location: 'Ratnagiri - Sindhudurg Coastal Waters',
    coordinates: [16.9902, 73.3120],
    issued_at: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
    expected_window: 'Next 12 hours',
    expires_at: new Date(Date.now() + 10 * 3600 * 1000).toISOString(),
    description:
      'Wind speeds reaching 40-50 km/h with gusts up to 60 km/h likely along and off the Konkan shoreline with moderate to rough wave heights.',
    precautions: [
      'Small craft and traditional fishing boats advised not to venture past 5 nautical miles.',
      'Secure harbour moorings and beachside vendor kiosks.',
    ],
    data_source: 'Meghdoot Simulated Telemetry Engine',
    is_simulated: true,
    active: true,
  },
  {
    id: 'alt-gen-05',
    title: 'Routine Meteorological Monitoring Notice',
    severity: 'INFO',
    hazard_type: 'weather_monitoring',
    affected_location: 'Maharashtra Regional Radar Coverage',
    issued_at: new Date(Date.now() - 180 * 60 * 1000).toISOString(),
    expected_window: 'Ongoing observation cycle',
    expires_at: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
    description:
      'Meghdoot telemetry stations are operating on scheduled 15-minute Doppler synthetic sweep intervals across all 6 demo nodes.',
    precautions: [
      'No emergency action required; informational status broadcast.',
    ],
    data_source: 'Meghdoot Core Engine',
    is_simulated: true,
    active: true,
  },
];

export function getMockAlerts(locationName?: string): WeatherAlert[] {
  if (!locationName) return MOCK_ALERTS;
  // Match alerts containing the location name or regional
  return MOCK_ALERTS.filter(
    (alt) =>
      alt.affected_location.toLowerCase().includes(locationName.toLowerCase()) ||
      alt.severity === 'INFO'
  );
}

import { RiskZonePolygon } from '../../types/risk';
import { MOCK_RISK_ZONES } from '../../mocks/risk.mock';
import { DEMO_LOCATIONS } from '../../utils/locationUtils';
import { LocationCoordinates } from '../../types/weather';

export interface StationMarker {
  id: string;
  name: string;
  coordinates: [number, number];
  temperature: number;
  condition: string;
  riskCategory: 'LOW' | 'MODERATE' | 'HIGH' | 'SEVERE';
}

export function getStationMarkers(): StationMarker[] {
  return [
    {
      id: 'stn-pn',
      name: 'Pune Urban Station',
      coordinates: [18.5204, 73.8567],
      temperature: 28.4,
      condition: 'Thunderstorm Cloud',
      riskCategory: 'HIGH',
    },
    {
      id: 'stn-mum',
      name: 'Mumbai Coastal Node',
      coordinates: [19.0760, 72.8777],
      temperature: 30.2,
      condition: 'Torrential Surge',
      riskCategory: 'SEVERE',
    },
    {
      id: 'stn-nsk',
      name: 'Nashik Godavari Node',
      coordinates: [19.9975, 73.7898],
      temperature: 26.1,
      condition: 'Moderate Rain',
      riskCategory: 'MODERATE',
    },
    {
      id: 'stn-str',
      name: 'Satara Koyna Ridge',
      coordinates: [17.6805, 73.9997],
      temperature: 22.8,
      condition: 'Orographic Runoff',
      riskCategory: 'SEVERE',
    },
    {
      id: 'stn-rtn',
      name: 'Ratnagiri Port Node',
      coordinates: [16.9902, 73.3120],
      temperature: 29.0,
      condition: 'Gale Surge',
      riskCategory: 'HIGH',
    },
    {
      id: 'stn-ngp',
      name: 'Nagpur Central Plain',
      coordinates: [21.1458, 79.0882],
      temperature: 34.5,
      condition: 'Partly Cloudy',
      riskCategory: 'LOW',
    },
  ];
}

export function getHazardPolygons(): RiskZonePolygon[] {
  return MOCK_RISK_ZONES;
}

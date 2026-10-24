import { LocationCoordinates } from '../types/weather';

export const DEMO_LOCATIONS: LocationCoordinates[] = [
  {
    name: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    latitude: 18.5204,
    longitude: 73.8567,
  },
  {
    name: 'Mumbai Coastal',
    state: 'Maharashtra',
    country: 'India',
    latitude: 19.0760,
    longitude: 72.8777,
  },
  {
    name: 'Nashik',
    state: 'Maharashtra',
    country: 'India',
    latitude: 19.9975,
    longitude: 73.7898,
  },
  {
    name: 'Satara Ghats',
    state: 'Maharashtra',
    country: 'India',
    latitude: 17.6805,
    longitude: 73.9997,
  },
  {
    name: 'Ratnagiri Coast',
    state: 'Maharashtra',
    country: 'India',
    latitude: 16.9902,
    longitude: 73.3120,
  },
  {
    name: 'Nagpur',
    state: 'Maharashtra',
    country: 'India',
    latitude: 21.1458,
    longitude: 79.0882,
  },
];

export const DEFAULT_LOCATION = DEMO_LOCATIONS[0]; // Pune

export function findLocationByName(name: string): LocationCoordinates | undefined {
  return DEMO_LOCATIONS.find(
    (loc) => loc.name.toLowerCase().includes(name.toLowerCase())
  );
}

export function formatCoordinates(lat: number, lon: number): string {
  const latDir = lat >= 0 ? 'N' : 'S';
  const lonDir = lon >= 0 ? 'E' : 'W';
  return `${Math.abs(lat).toFixed(4)}°${latDir}, ${Math.abs(lon).toFixed(4)}°${lonDir}`;
}

export interface LocationCoordinates {
  name: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface CurrentWeather {
  location: LocationCoordinates;
  temperature: number;
  feels_like: number;
  condition: string;
  condition_description: string;
  humidity: number;
  pressure_hpa: number;
  wind_speed_kmh: number;
  wind_direction: string;
  wind_gust_kmh?: number;
  precipitation_rate_mmh: number;
  precipitation_probability: number;
  visibility_km: number;
  uv_index: number;
  cloud_cover_percent: number;
  recorded_at: string;
}

export interface HourlyForecast {
  time: string;
  hour: string;
  temperature: number;
  feels_like: number;
  precipitation_rate_mmh: number;
  precipitation_probability: number;
  condition: string;
  wind_speed_kmh: number;
  humidity: number;
}

export interface DailyForecast {
  date: string;
  day: string;
  condition: string;
  temp_max: number;
  temp_min: number;
  precipitation_probability: number;
  rainfall_mm: number;
  wind_speed_max_kmh: number;
  uv_index: number;
  sunrise: string;
  sunset: string;
}

export interface HistoricalTrendPoint {
  date: string;
  actual_temp: number;
  historical_avg_temp: number;
  actual_rainfall_mm: number;
  historical_avg_rainfall_mm: number;
  wind_speed_kmh: number;
}

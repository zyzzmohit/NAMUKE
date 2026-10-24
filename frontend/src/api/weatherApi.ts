import { apiClient } from './client';
import { CurrentWeather, HourlyForecast, DailyForecast, HistoricalTrendPoint } from '../types/weather';
import { ApiResponse } from '../types/api';
import { getMockWeather } from '../mocks/weather.mock';
import { generateHourlyForecast, generateDailyForecast, MOCK_HISTORICAL_TRENDS } from '../mocks/forecast.mock';

export async function getCurrentWeather(
  lat: number,
  lon: number,
  locationName: string
): Promise<ApiResponse<CurrentWeather>> {
  try {
    const res = await apiClient<CurrentWeather>(`/weather/current?lat=${lat}&lon=${lon}`);
    if (res.success && res.data) {
      return res;
    }
    throw new Error(res.error?.message || 'Failed to fetch current weather');
  } catch (err) {
    // Graceful fallback to mock data
    const mockData = getMockWeather(locationName);
    return {
      success: true,
      data: mockData,
      meta: {
        source: 'mock',
        timestamp: new Date().toISOString(),
      },
    };
  }
}

export async function getHourlyForecast(
  locationName: string,
  baseTemp: number,
  baseRainProb: number
): Promise<ApiResponse<HourlyForecast[]>> {
  try {
    const res = await apiClient<HourlyForecast[]>(`/weather/forecast/hourly?location=${encodeURIComponent(locationName)}`);
    if (res.success && res.data) {
      return res;
    }
    throw new Error('Fallback to mock');
  } catch {
    return {
      success: true,
      data: generateHourlyForecast(baseTemp, baseRainProb),
      meta: {
        source: 'mock',
        timestamp: new Date().toISOString(),
      },
    };
  }
}

export async function getDailyForecast(
  locationName: string,
  baseMax: number,
  baseMin: number
): Promise<ApiResponse<DailyForecast[]>> {
  try {
    const res = await apiClient<DailyForecast[]>(`/weather/forecast/daily?location=${encodeURIComponent(locationName)}`);
    if (res.success && res.data) {
      return res;
    }
    throw new Error('Fallback to mock');
  } catch {
    return {
      success: true,
      data: generateDailyForecast(baseMax, baseMin),
      meta: {
        source: 'mock',
        timestamp: new Date().toISOString(),
      },
    };
  }
}

export async function getHistoricalTrends(
  _locationName: string
): Promise<ApiResponse<HistoricalTrendPoint[]>> {
  try {
    const res = await apiClient<HistoricalTrendPoint[]>('/weather/historical');
    if (res.success && res.data) {
      return res;
    }
    throw new Error('Fallback to mock');
  } catch {
    return {
      success: true,
      data: MOCK_HISTORICAL_TRENDS,
      meta: {
        source: 'mock',
        timestamp: new Date().toISOString(),
      },
    };
  }
}

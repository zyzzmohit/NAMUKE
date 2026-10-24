import { apiClient } from './client';
import { WeatherAlert } from '../types/alert';
import { ApiResponse } from '../types/api';
import { getMockAlerts } from '../mocks/alerts.mock';

export async function getActiveAlerts(
  minSeverity?: string,
  locationName?: string
): Promise<ApiResponse<WeatherAlert[]>> {
  try {
    const query = minSeverity ? `?min_severity=${minSeverity}` : '';
    const res = await apiClient<any>(`/alerts/active${query}`);

    if (res.success && res.data) {
      const rawAlerts = res.data.alerts || res.data;
      const adapted: WeatherAlert[] = rawAlerts.map((a: any) => ({
        id: a.id || `alt_${Math.random()}`,
        title: a.title || 'Weather Alert',
        severity: a.severity || 'WARNING',
        hazard_type: a.hazard_type || 'weather_hazard',
        affected_location: a.affected_location || 'Designated Regional Zone',
        coordinates: a.coordinates || undefined,
        affected_polygon: a.affected_polygon || undefined,
        issued_at: a.issued_at || new Date().toISOString(),
        expected_window: a.expected_window || 'Immediate attention recommended',
        expires_at: a.expires_at || new Date(Date.now() + 4 * 3600 * 1000).toISOString(),
        description: a.description || 'Elevated risk detected.',
        precautions: a.precautions || ['Follow local municipal guidelines.'],
        data_source: 'Backend API Live Feed',
        is_simulated: false,
        active: true,
      }));

      return {
        success: true,
        data: adapted,
        meta: {
          source: 'live',
          timestamp: new Date().toISOString(),
        },
      };
    }
    throw new Error('Fallback to mock');
  } catch {
    return {
      success: true,
      data: getMockAlerts(locationName),
      meta: {
        source: 'mock',
        timestamp: new Date().toISOString(),
      },
    };
  }
}

import { useState, useEffect, useCallback, useMemo } from 'react';
import { WeatherAlert, AlertFilterOptions } from '../types/alert';
import { DataSourceType } from '../types/api';
import { getActiveAlerts } from '../api/alertsApi';

export function useAlerts(locationName?: string) {
  const [alerts, setAlerts] = useState<WeatherAlert[]>([]);
  const [dataSource, setDataSource] = useState<DataSourceType>('mock');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<AlertFilterOptions>({
    severity: 'all',
    hazardType: 'all',
    searchQuery: '',
  });

  const fetchAlerts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getActiveAlerts(undefined, locationName);
      if (res.data) {
        setAlerts(res.data);
        if (res.meta) setDataSource(res.meta.source);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch alerts');
    } finally {
      setLoading(false);
    }
  }, [locationName]);

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      // Severity filter
      if (filters.severity !== 'all' && alert.severity !== filters.severity) {
        return false;
      }
      // Hazard type filter
      if (filters.hazardType !== 'all' && alert.hazard_type !== filters.hazardType) {
        return false;
      }
      // Search query filter
      if (filters.searchQuery.trim() !== '') {
        const query = filters.searchQuery.toLowerCase();
        const matchesTitle = alert.title.toLowerCase().includes(query);
        const matchesLocation = alert.affected_location.toLowerCase().includes(query);
        const matchesDesc = alert.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesLocation && !matchesDesc) {
          return false;
        }
      }
      return true;
    });
  }, [alerts, filters]);

  // Critical alerts that should trigger top alert banner
  const highPriorityAlert = useMemo(() => {
    return alerts.find(
      (a) => a.active && (a.severity === 'CRITICAL' || a.severity === 'WARNING')
    );
  }, [alerts]);

  return {
    alerts,
    filteredAlerts,
    highPriorityAlert,
    dataSource,
    loading,
    error,
    filters,
    setFilters,
    refresh: fetchAlerts,
  };
}

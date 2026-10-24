import { useState, useEffect, useCallback } from 'react';
import { LocationCoordinates } from '../types/weather';
import { RiskAssessment } from '../types/risk';
import { DataSourceType } from '../types/api';
import { getRiskPrediction } from '../api/riskApi';

export function useRiskPrediction(location: LocationCoordinates) {
  const [assessment, setAssessment] = useState<RiskAssessment | null>(null);
  const [dataSource, setDataSource] = useState<DataSourceType>('mock');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRisk = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await getRiskPrediction(location.latitude, location.longitude, location.name);
      if (res.data) {
        setAssessment(res.data);
        if (res.meta) setDataSource(res.meta.source);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch risk assessment');
    } finally {
      setLoading(false);
    }
  }, [location.latitude, location.longitude, location.name]);

  useEffect(() => {
    fetchRisk();
  }, [fetchRisk]);

  return {
    assessment,
    dataSource,
    loading,
    error,
    refresh: fetchRisk,
  };
}

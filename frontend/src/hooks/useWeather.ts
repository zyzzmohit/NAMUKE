import { useState, useEffect, useCallback } from 'react';
import { LocationCoordinates, CurrentWeather, HourlyForecast, DailyForecast, HistoricalTrendPoint } from '../types/weather';
import { DataSourceType } from '../types/api';
import { getCurrentWeather, getHourlyForecast, getDailyForecast, getHistoricalTrends } from '../api/weatherApi';

export function useWeather(location: LocationCoordinates) {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
  const [hourlyForecast, setHourlyForecast] = useState<HourlyForecast[]>([]);
  const [dailyForecast, setDailyForecast] = useState<DailyForecast[]>([]);
  const [historicalTrends, setHistoricalTrends] = useState<HistoricalTrendPoint[]>([]);
  const [dataSource, setDataSource] = useState<DataSourceType>('mock');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchWeatherData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // 1. Current Weather
      const currentRes = await getCurrentWeather(location.latitude, location.longitude, location.name);
      if (currentRes.data) {
        setCurrentWeather(currentRes.data);
        if (currentRes.meta) setDataSource(currentRes.meta.source);

        // 2. Hourly & Daily forecasts derived with location base
        const [hourlyRes, dailyRes, histRes] = await Promise.all([
          getHourlyForecast(location.name, currentRes.data.temperature, currentRes.data.precipitation_probability),
          getDailyForecast(location.name, currentRes.data.temperature + 3, currentRes.data.temperature - 5),
          getHistoricalTrends(location.name),
        ]);

        if (hourlyRes.data) setHourlyForecast(hourlyRes.data);
        if (dailyRes.data) setDailyForecast(dailyRes.data);
        if (histRes.data) setHistoricalTrends(histRes.data);
      }
      setLastUpdated(new Date());
    } catch (err: any) {
      setError(err.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  }, [location.latitude, location.longitude, location.name]);

  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

  return {
    currentWeather,
    hourlyForecast,
    dailyForecast,
    historicalTrends,
    dataSource,
    loading,
    error,
    lastUpdated,
    refresh: fetchWeatherData,
  };
}

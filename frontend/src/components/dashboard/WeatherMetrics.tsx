import React from 'react';
import { CurrentWeather, DailyForecast } from '../../types/weather';
import { TemperatureCard } from '../weather/TemperatureCard';
import { HumidityCard } from '../weather/HumidityCard';
import { WindCard } from '../weather/WindCard';
import { PressureCard } from '../weather/PressureCard';
import { RainfallCard } from '../weather/RainfallCard';

interface WeatherMetricsProps {
  weather: CurrentWeather;
  todayForecast?: DailyForecast;
}

export const WeatherMetrics: React.FC<WeatherMetricsProps> = ({
  weather,
  todayForecast,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <TemperatureCard
        temperature={weather.temperature}
        feelsLike={weather.feels_like}
        tempMax={todayForecast?.temp_max}
        tempMin={todayForecast?.temp_min}
      />
      <HumidityCard humidity={weather.humidity} />
      <WindCard
        speed={weather.wind_speed_kmh}
        direction={weather.wind_direction}
        gust={weather.wind_gust_kmh}
      />
      <PressureCard pressure={weather.pressure_hpa} />
      <RainfallCard
        rate={weather.precipitation_rate_mmh}
        probability={weather.precipitation_probability}
      />
    </div>
  );
};

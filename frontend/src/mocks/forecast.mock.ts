import { HourlyForecast, DailyForecast, HistoricalTrendPoint } from '../types/weather';

export function generateHourlyForecast(baseTemp: number, baseRainProb: number): HourlyForecast[] {
  const currentHour = new Date().getHours();
  const forecast: HourlyForecast[] = [];

  for (let i = 0; i < 24; i++) {
    const targetHour = (currentHour + i) % 24;
    const hourLabel = `${targetHour.toString().padStart(2, '0')}:00`;
    
    // diurnal variation curve
    const tempOffset = Math.sin(((targetHour - 9) / 24) * 2 * Math.PI) * 4;
    const temp = Math.round((baseTemp + tempOffset + (Math.random() * 0.8 - 0.4)) * 10) / 10;
    
    // rain chance variation
    const rainNoise = Math.sin(((targetHour - 14) / 12) * Math.PI) * 20;
    const rainProb = Math.min(100, Math.max(5, Math.round(baseRainProb + rainNoise)));
    const rainRate = rainProb > 50 ? Math.round(((rainProb - 50) / 5 + Math.random() * 2) * 10) / 10 : 0;

    let condition = 'Partly Cloudy';
    if (rainProb > 75) condition = 'Thunderstorm Rain';
    else if (rainProb > 45) condition = 'Scattered Rain';
    else if (tempOffset > 2) condition = 'Warm & Humid';

    forecast.push({
      time: new Date(Date.now() + i * 3600 * 1000).toISOString(),
      hour: hourLabel,
      temperature: temp,
      feels_like: Math.round((temp + 2.5) * 10) / 10,
      precipitation_rate_mmh: rainRate,
      precipitation_probability: rainProb,
      condition,
      wind_speed_kmh: Math.round((18 + Math.random() * 14) * 10) / 10,
      humidity: Math.min(98, Math.max(55, Math.round(75 - tempOffset * 3))),
    });
  }

  return forecast;
}

export function generateDailyForecast(baseTempMax: number, baseTempMin: number): DailyForecast[] {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date();
  const daily: DailyForecast[] = [];

  for (let i = 0; i < 5; i++) {
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + i);
    const dayName = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : days[targetDate.getDay()];
    
    const prob = i === 0 ? 75 : i === 1 ? 65 : i === 2 ? 40 : 25 + i * 10;
    const rainMm = prob > 50 ? Math.round((prob * 0.45) * 10) / 10 : Math.round((prob * 0.1) * 10) / 10;

    daily.push({
      date: targetDate.toISOString(),
      day: dayName,
      condition: prob > 70 ? 'Thunderstorms' : prob > 45 ? 'Passing Showers' : 'Partly Cloudy',
      temp_max: baseTempMax + (i % 2 === 0 ? 1 : -1),
      temp_min: baseTempMin + (i % 2 === 0 ? 0 : 1),
      precipitation_probability: prob,
      rainfall_mm: rainMm,
      wind_speed_max_kmh: Math.round(28 + i * 2),
      uv_index: 4 + (i % 3),
      sunrise: '06:12 AM',
      sunset: '06:34 PM',
    });
  }

  return daily;
}

export const MOCK_HISTORICAL_TRENDS: HistoricalTrendPoint[] = [
  {
    date: '18 Oct',
    actual_temp: 29.8,
    historical_avg_temp: 28.5,
    actual_rainfall_mm: 12.0,
    historical_avg_rainfall_mm: 4.2,
    wind_speed_kmh: 18.2,
  },
  {
    date: '19 Oct',
    actual_temp: 28.4,
    historical_avg_temp: 28.2,
    actual_rainfall_mm: 24.5,
    historical_avg_rainfall_mm: 5.0,
    wind_speed_kmh: 22.0,
  },
  {
    date: '20 Oct',
    actual_temp: 27.1,
    historical_avg_temp: 28.0,
    actual_rainfall_mm: 38.0,
    historical_avg_rainfall_mm: 4.8,
    wind_speed_kmh: 31.5,
  },
  {
    date: '21 Oct',
    actual_temp: 26.5,
    historical_avg_temp: 27.9,
    actual_rainfall_mm: 45.2,
    historical_avg_rainfall_mm: 3.9,
    wind_speed_kmh: 28.4,
  },
  {
    date: '22 Oct',
    actual_temp: 27.8,
    historical_avg_temp: 27.8,
    actual_rainfall_mm: 18.0,
    historical_avg_rainfall_mm: 3.5,
    wind_speed_kmh: 20.1,
  },
  {
    date: '23 Oct',
    actual_temp: 28.2,
    historical_avg_temp: 27.6,
    actual_rainfall_mm: 14.2,
    historical_avg_rainfall_mm: 3.2,
    wind_speed_kmh: 22.4,
  },
  {
    date: '24 Oct (Today)',
    actual_temp: 28.4,
    historical_avg_temp: 27.5,
    actual_rainfall_mm: 26.8,
    historical_avg_rainfall_mm: 3.0,
    wind_speed_kmh: 24.0,
  },
];

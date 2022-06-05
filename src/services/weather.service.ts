import ky from 'ky';
import type { Weather } from '@/interfaces/Weather';

export const WEATHER_API = 'https://api.openweathermap.org/data/2.5/weather';

type Coords = { lat: number; lon: number };

export class WeatherService {
  static async getWeather({ lat, lon }: Coords): Promise<Weather> {
    const response = await ky.get(WEATHER_API, {
      searchParams: {
        units: 'metric',
        lat: lat.toString(),
        lon: lon.toString(),
        appid: import.meta.env.VITE_API_KEY,
      },
    });
    return response.json();
  }
}

import ky from 'ky';
import type { City } from '@/interfaces/City';

const GEO_API = `https://api.openweathermap.org/geo/1.0/direct`;

export class GeoService {
  static async search(name: string, limit = 20): Promise<City[]> {
    const response = await ky.get(GEO_API, {
      mode: 'cors',
      searchParams: {
        q: name,
        limit: limit.toString(),
        appid: import.meta.env.VITE_API_KEY,
      },
    });
    return response.json();
  }
}

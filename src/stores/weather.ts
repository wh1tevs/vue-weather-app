import { reactive } from 'vue';
import { defineStore } from 'pinia';
import type { City } from '@/interfaces/City';
import type { Weather } from '@/interfaces/Weather';
import { WeatherService } from '@/services/weather.service';
import { getCityUrl } from '@/utils';

export const useWeatherStore = defineStore('weather', () => {
  const weatherMap = reactive<{ [id: string]: Weather }>({});

  async function getWeather(city: City) {
    const id = getCityUrl(city);
    const weather = await WeatherService.getWeather(city);
    weatherMap[id] = weather;
  }

  return {
    weatherMap,
    getWeather,
  };
});

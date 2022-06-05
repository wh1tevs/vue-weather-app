import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import type { City } from '@/interfaces/City';
import { getCityUrl } from '@/utils';

export const useCitiesStore = defineStore('cities', () => {
  const citiesList = useLocalStorage<{ [id: string]: City }>('citiesList', {});

  function addCity(city: City) {
    citiesList.value[getCityUrl(city)] = city;
  }

  function deleteCity(id: string) {
    delete citiesList.value[id];
  }

  return { citiesList, addCity, deleteCity };
});

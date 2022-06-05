<script setup lang="ts">
import type { City } from '@/interfaces/City';
import { useCitiesStore } from '@/stores/cities';
import { useWeatherStore } from '@/stores/weather';
import { getCityFullName, getCityUrl } from '@/utils';
import { computed, onMounted, toRefs } from 'vue';
import { RouterLink } from 'vue-router';
import IconRefresh from './icons/IconRefresh.vue';
import IconTrash from './icons/IconTrash.vue';
import IconWeather from './icons/IconWeather.vue';

const props = defineProps<{ city: City }>();
const { city } = toRefs(props);
const cityId = getCityUrl(city.value);
const citiesStore = useCitiesStore();
const weatherStore = useWeatherStore();

const weather = computed(() => weatherStore.weatherMap[cityId]);
const temp = computed(() => Math.round(weather.value?.main.temp || 0));

function refresh() {
  weatherStore.getWeather(city.value);
}

onMounted(refresh);
</script>

<template>
  <div class="p-6 shadow-xl bg-neutral-200/60 backdrop-blur-md">
    <div class="absolute top-2 right-2">
      <button
        class="p-1 outline-none hover:text-blue-600 focus:text-blue-600"
        @click="refresh"
      >
        <IconRefresh />
      </button>
      <button
        class="p-1 outline-none hover:text-red-600 focus:text-red-600"
        @click="citiesStore.deleteCity(cityId)"
      >
        <IconTrash />
      </button>
    </div>
    <RouterLink
      v-if="weather"
      :to="{ name: 'city', params: { city: getCityUrl(city) } }"
    >
      <div class="grid grid-cols-2">
        <div class="flex flex-col">
          <span class="text-xl font-medium">
            {{ getCityFullName(city) }}
          </span>
          <span>
            {{ weather?.weather[0].main }},&#32;
            {{ weather?.weather[0].description }}
          </span>
        </div>
        <div class="flex items-center justify-center row-span-2 -m-4">
          <IconWeather :name="weather?.weather[0].icon" :size="4" />
        </div>
        <div class="flex items-end">
          <span class="text-4xl font-medium">{{ temp }}&#x2103;</span>
        </div>
      </div>
    </RouterLink>
    <div v-else class="flex flex-col items-center justify-center w-full h-full">
      <IconRefresh class="w-16 h-16 animation-spin" />
    </div>
  </div>
</template>

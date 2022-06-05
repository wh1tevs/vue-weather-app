<script setup lang="ts">
import { computed, onMounted, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import IconRefresh from '@/components/icons/IconRefresh.vue';
import IconWeather from '@/components/icons/IconWeather.vue';
import IconWind from '@/components/icons/IconWind.vue';
import { useCitiesStore } from '@/stores/cities';
import { useWeatherStore } from '@/stores/weather';
import { getCityFullName } from '@/utils';

const route = useRoute();
const { citiesList } = toRefs(useCitiesStore());
const weatherStore = useWeatherStore();
const cityId = route.params.city as string;
const city = ref(citiesList.value[cityId]);

function refresh() {
  weatherStore.getWeather(city.value);
}

const weather = computed(() => weatherStore.weatherMap[cityId]);

onMounted(refresh);
// onBeforeMount(refresh);
</script>

<template>
  <main class="flex flex-col items-center h-full">
    <template v-if="weather">
      <div class="grid items-center grid-cols-2 mt-4">
        <IconWeather :name="weather?.weather[0].icon" :size="4" />
        <div class="flex flex-col">
          <span class="text-2xl font-medium">{{ getCityFullName(city) }}</span>
          <span>
            {{ weather?.weather[0].main }},&#32;
            {{ weather?.weather[0].description }}
          </span>
          <div class="flex flex-col items-center max-w-fit">
            <span class="text-5xl">
              {{ Math.round(weather?.main.temp) }}&#x2103;
            </span>
            <span class="text-sm text-slate-600">
              Feels like {{ Math.round(weather?.main.feels_like) }}&#x2103;
            </span>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 text-lg">
        <div class="flex items-center space-x-2">
          <IconWind class="w-4 h-4 text-slate-900" :deg="weather?.wind.deg" />
          <span>{{ weather?.wind.speed }} m/s</span>
        </div>
        <span>Pressure: {{ weather?.main.pressure }}hPa</span>
        <span>Humidity: {{ weather?.main.humidity }}%</span>
        <span>Visibility: {{ weather?.visibility / 1000 }}km</span>
      </div>
    </template>
    <div v-else class="flex flex-col items-center justify-center h-full">
      <IconRefresh class="w-20 h-20 animation-spin" />
    </div>
  </main>
</template>

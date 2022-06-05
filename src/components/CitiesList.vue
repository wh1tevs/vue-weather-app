<script setup lang="ts">
import type { City } from '@/interfaces/City';
import CityCard from './CityCard.vue';

const props = defineProps<{ cities: { [id: string]: City } }>();
</script>

<template>
  <div class="flex flex-col space-y-2">
    <CityCard v-for="(city, index) in props.cities" :key="index" :city="city" />
  </div>
</template>

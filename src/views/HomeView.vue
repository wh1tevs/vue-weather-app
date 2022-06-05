<script setup lang="ts">
import CitiesList from '@/components/CitiesList.vue';
import IconPlus from '@/components/icons/IconPlus.vue';
import SearchCityModal from '@/components/SearchCityModal.vue';
import type { City } from '@/interfaces/City';
import { useCitiesStore } from '@/stores/cities';
import { ref } from 'vue';

const citiesStore = useCitiesStore();
const isModalOpen = ref(false);

function openModal() {
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
}

function addCity(city: City) {
  citiesStore.addCity(city);
}
</script>

<template>
  <main class="flex flex-col items-center w-full">
    <div class="flex flex-col justify-center w-1/3 pt-4">
      <CitiesList :cities="citiesStore.citiesList" />
    </div>
  </main>
  <button
    class="fixed px-3 py-3 text-3xl font-black text-white bg-blue-600 rounded-full bottom-4 right-4"
    @click="openModal"
  >
    <IconPlus />
  </button>
  <Teleport to="body">
    <SearchCityModal
      :is-open="isModalOpen"
      @select-city="addCity"
      @close="closeModal"
    />
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { onClickOutside, useDebounce } from '@vueuse/core';
import { GeoService } from '@/services/geo.service';
import type { City } from '@/interfaces/City';
import { getCityFullName } from '@/utils';

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'select-city', city: City): void;
  (e: 'close'): void;
}>();

const inputEl = ref<HTMLInputElement | null>(null);
const modalEl = ref<HTMLDivElement | null>(null);
const input = ref('');
const debouncedInput = useDebounce(input, 1000);
const variants = ref<City[]>([]);

function closeModal() {
  input.value = '';
  emit('close');
}

function selectCity(city: City) {
  emit('select-city', city);
  closeModal();
}

watchEffect(() => {
  if (debouncedInput.value) {
    GeoService.search(debouncedInput.value).then(
      (cities) => (variants.value = cities)
    );
  }
});

watchEffect(() => {
  if (!input.value) {
    variants.value = [];
  }
});

watchEffect(() => props.isOpen && inputEl.value?.focus());

onClickOutside(modalEl, closeModal);
</script>

<template>
  <div
    v-if="props.isOpen"
    class="fixed inset-0 flex flex-col items-center w-full h-full bg-gray-600/40 backdrop-blur-sm"
    @keydown.esc="closeModal"
  >
    <div ref="modalEl" class="relative w-1/3 px-4 py-3 mt-10 bg-slate-50">
      <label for="cityInput" class="flex flex-col">
        <span class="mx-2 text-lg text-slate-900">Type city</span>
        <input
          ref="inputEl"
          type="text"
          name="cityInput"
          class="px-6 py-2 mt-2 -mx-4 text-base transition-all outline-none bg-slate-200 text-slate-900 focus:ring-4 hover:bg-slate-200 focus:ring-blue-400 focus:bg-slate-200"
          v-model="input"
        />
      </label>
      <div class="w-full">
        <ul class="w-full mt-2 space-y-1">
          <li v-for="(city, index) of variants" :key="index" class="w-full">
            <button
              @click="selectCity(city)"
              class="w-full px-2 py-2 text-left outline-none text-slate-900 hover:bg-slate-200 focus:ring-4 focus:bg-slate-200 ring-blue-400"
            >
              {{ getCityFullName(city) }}
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

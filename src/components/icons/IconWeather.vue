<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  name: string;
  size: number;
}>();

const size = computed(() =>
  props.size && props.size > 1 ? `@${props.size}x` : ''
);

const src = computed(
  () => `http://openweathermap.org/img/wn/${props.name}${size.value}.png`
);
</script>

<template>
  <img :src="src" />
</template>

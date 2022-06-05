import type { RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import CityView from '@/views/CityView.vue';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/:city',
    name: 'city',
    component: CityView,
  },
];

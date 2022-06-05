import type { City } from '@/interfaces/City';

export function getCityFullName(city: City) {
  const name = city.name;
  const state = city.state || null;
  const country = city.country;
  return state ? `${name}, ${state}, ${country}` : `${name}, ${country}`;
}

export function getCityUrl(city: City) {
  return getCityFullName(city).replaceAll(', ', '-').toLocaleLowerCase();
}

<template>
  <div>
    <WeatherWidget
        v-if="screen === 'main' && cities.length > 0"
        :cities="cities"
        :activeCity="activeCity"
        :theme="props.theme"
        @open-settings="openSettings"
        @update-city="setActiveCity"
    />

    <WeatherSettings
        v-else
        :cities="cities"
        @update-cities="updateCities"
        @close="closeSettings"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import WeatherWidget from "./components/WeatherWidget.vue";
import WeatherSettings from "./components/WeatherSettings.vue";
import {API_KEY, API_URL} from "./config/weather";

const props = defineProps<{ theme: string }>();
const screen = ref<"main" | "settings">("main");
const cities = ref<
    Array<{ name: string; lat: number; lon: number; isAuto?: boolean }>
>([]);

const activeCity = ref(0);

const loadFromLS = () => {
  const saved = localStorage.getItem("cities");
  const savedIndex = localStorage.getItem("activeCity");

  if (saved) cities.value = JSON.parse(saved);
  if (savedIndex) activeCity.value = Number(savedIndex);
};

const saveToLS = () => {
  localStorage.setItem("cities", JSON.stringify(cities.value));
  localStorage.setItem("activeCity", activeCity.value.toString());
};
const addGeoCity = async () => {
  return new Promise<void>((resolve) => {
    if (!navigator.geolocation) {
      cities.value = [{
        name: "London, UK",
        lat: 51.5072,
        lon: -0.1276,
      }];
      return resolve();
    }

    navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;

          const url = `${API_URL}search.json?key=${API_KEY}&q=${lat},${lon}`;
          const res = await fetch(url);
          const data = await res.json();

          if (data?.length) {
            cities.value.unshift({
              name: data[0].name + " (My Location)",
              lat,
              lon,
              isAuto: true,
            });
          } else {
            cities.value = [{
              name: "London, UK",
              lat: 51.5072,
              lon: -0.1276,
            }];
          }

          resolve();
        },
        // user denied geolocation → default London
        () => {
          cities.value = [{
            name: "London, UK",
            lat: 51.5072,
            lon: -0.1276,
          }];
          resolve();
        }
    );
  });
};
onMounted(async () => {
  loadFromLS();

  if (cities.value.length === 0) {
    await addGeoCity();
  }

  saveToLS();
});
const openSettings = () => screen.value = "settings";
const closeSettings = () => screen.value = "main";

const updateCities = (newList: any[]) => {
  cities.value = newList;
  localStorage.setItem("cities", JSON.stringify(cities.value));
};

const setActiveCity = (index: number) => {
  activeCity.value = index;
  localStorage.setItem("activeCity", activeCity.value.toString());
};
</script>

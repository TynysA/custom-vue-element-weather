<template>
  <div>
    <WeatherWidget
      v-if="screen === 'main'"
      :cities="cities"
      :activeCity="activeCity"
      @open-settings="openSettings"
      @update-city="setActiveCity"
    />

    <WeatherSettings
      v-else
      :cities="cities"
      @close="closeSettings"
      @update-cities="updateCities"
    />
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import WeatherWidget from "./components/WeatherWidget.vue";
import WeatherSettings from "./components/WeatherSettings.vue";

export default {
  components: { WeatherWidget, WeatherSettings },

  setup() {
    const screen = ref<"main" | "settings">("main");

    const cities = ref([
      { name: "London, UK", lat: 51.5072, lon: -0.1276 },
      { name: "Moscow, RU", lat: 55.7558, lon: 37.6173 }
    ]);

    const activeCity = ref(0);

    const updateCities = (newList: any[]) => {
      cities.value = newList;
      localStorage.setItem("cities", JSON.stringify(newList));
    };

    const setActiveCity = (index: number) => {
      activeCity.value = index;
      localStorage.setItem("activeCity", index.toString());
    };

    const openSettings = () => (screen.value = "settings");
    const closeSettings = () => (screen.value = "main");

    onMounted(() => {
      const saved = localStorage.getItem("cities");
      const savedIndex = localStorage.getItem("activeCity");

      if (saved) cities.value = JSON.parse(saved);
      if (savedIndex) activeCity.value = Number(savedIndex);
    });

    return {
      screen,
      cities,
      activeCity,
      openSettings,
      closeSettings,
      updateCities,
      setActiveCity
    };
  }
};
</script>

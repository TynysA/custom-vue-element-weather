<script lang="ts">
import { ref, computed, watch, PropType, onMounted } from "vue";
import {API_KEY, API_URL} from "../config/weather";

export default {
  name: "WeatherWidget",

  props: {
    cities: {
      type: Array as PropType<Array<{ name: string; lat: number; lon: number }>>,
      required: true
    },
    activeCity: {
      type: Number,
      required: true
    }
  },

  emits: ["open-settings", "update-city"],

  setup(props, { emit }) {

    const loading = ref(true);
    const data = ref<any[]>([]);

    const slider = ref<HTMLElement | null>(null);
    const index = ref(props.activeCity);

    // ============================
    // Fetch weather for each city
    // ============================
    const fetchAll = async () => {
      loading.value = true;
      data.value = [];

      for (const c of props.cities) {
        const url = `${API_URL}current.json?key=${API_KEY}&q=${c.lat},${c.lon}&aqi=no`;
        const res = await fetch(url);
        data.value.push(await res.json());
      }

      loading.value = false;
    };

    watch(() => props.cities, fetchAll, { immediate: true });

    // =================================
    // Slider logic: transform translateX
    // =================================
    const go = (i: number) => {
      if (!slider.value) return;
      index.value = i;

      slider.value.style.transform = `translateX(-${i * 100}%)`;

      emit("update-city", i);
    };

    const next = () => go((index.value + 1) % props.cities.length);
    const prev = () =>
        go((index.value - 1 + props.cities.length) % props.cities.length);
    onMounted(() => {
      go(props.activeCity);
    });

    return {
      loading,
      data,
      index,
      slider,
      go,
      next,
      prev
    };
  }
};
</script>

<template>
  <div class="widget">

    <!-- SKELETON -->
    <div v-if="loading" class="skeleton">
      <div class="skeleton-title"></div>
      <div class="skeleton-main"></div>
      <div class="skeleton-lines"></div>
    </div>
    <div class="top">
      <button class="arrow" @click="prev">‹</button>
      <h3>{{ cities[index].name }}</h3>
      <button class="gear" @click="$emit('open-settings')">⚙️</button>
      <button class="arrow" @click="next">›</button>
    </div>

    <div v-if="loading" class="loading">Loading...</div>

    <div v-else class="swiper">
      <div class="slides" ref="slider">
        <div
            class="slide"
            v-for="(c, i) in cities"
            :key="i"
        >
          <img :src="'https:' + data[i].current.condition.icon" class="icon" />
          <div class="temp">{{ data[i].current.temp_c }}°C</div>

          <div class="desc">
            Feels like {{ data[i].current.feelslike_c }}°C.
            {{ data[i].current.condition.text }}
          </div>

          <div class="details">
            <div>💨 {{ data[i].current.wind_kph }} km/h {{ data[i].current.wind_dir }}</div>
            <div>🔘 {{ data[i].current.pressure_mb }} hPa</div>
          </div>

          <div class="extra">
            <div>Humidity: {{ data[i].current.humidity }}%</div>
            <div>Visibility: {{ data[i].current.vis_km }} km</div>
          </div>
        </div>
      </div>

      <!-- DOTS -->
      <div class="dots">
        <span
            v-for="(c, i) in cities"
            :key="i"
            class="dot"
            :class="{ active: i === index }"
            @click="go(i)"
        ></span>
      </div>
    </div>
  </div>
</template>
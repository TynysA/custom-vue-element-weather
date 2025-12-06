<template>
  <div class="settings">
    <div class="header">
      <h3>Settings</h3>
      <button class="close" @click="$emit('close')">✖</button>
    </div>

    <!-- List of saved cities -->
    <transition-group name="fade" tag="div" class="city-list">
      <div
        class="city"
        v-for="(city, i) in local"
        :key="city.name"
        draggable="true"
        @dragstart="dragStart(i)"
        @dragover.prevent
        @drop="drop(i)"
      >
        <span class="drag">☰</span>
        <span class="name">{{ city.name }}</span>
        <button class="del" @click="remove(i)">🗑️</button>
      </div>
    </transition-group>


    <!-- Add new city -->
    <h4>Add Location:</h4>
    <div class="add-block ">
      <input
        v-model="query"
        placeholder="New York"
        @keyup.enter="addFirstResult"
      />

      <button @click="addFirstResult">↩</button>
    </div>

    <!-- Search results dropdown -->
    <div v-if="results.length" class="dropdown">
      <div
        v-for="(city, index) in results"
        :key="city.id"
        class="dropdown-item"
        @click="select(city)"
      >
        🌍 {{ city.name }}, {{ city.country }}
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { ref, watch, PropType } from "vue";
import {API_KEY, API_URL} from "../config/weather";

interface City {
  name: string;
  lat: number;
  lon: number;
}

export default {
  name: "WeatherSettings",

  props: {
    cities: {
      type: Array as PropType<City[]>,
      required: true,
    },
  },

  emits: ["close", "update-cities"],

  setup(props, { emit }) {
    const local = ref([...props.cities]);
    const query = ref("");
    const results = ref<any[]>([]);

    /* -------------------------------
       🌟 Debounce helper
    ---------------------------------*/
    function debounce(fn: Function, delay = 400) {
      let timer: number;
      return (...args: any[]) => {
        clearTimeout(timer);
        timer = window.setTimeout(() => fn(...args), delay);
      };
    }
    const fetchSuggestions = debounce(async (text: string) => {
      if (!text) {
        results.value = [];
        return;
      }

      const url = `${API_URL}search.json?key=${API_KEY}&q=${text}`;
      const res = await fetch(url);
      results.value = await res.json();
    }, 350);

    watch(query, (val) => fetchSuggestions(val));

    const select = (city: any) => {
      local.value.push({
        name: `${city.name}, ${city.country}`,
        lat: city.lat,
        lon: city.lon,
      });

      emit("update-cities", local.value);
      results.value = [];
      query.value = "";
    };
    const addFirstResult = () => {
      if (results.value.length > 0) {
        select(results.value[0]);
      }
    };

    /* -------------------------------
       🌟 Drag & drop reorder
    ---------------------------------*/
    const dragIndex = ref(-1);

    const dragStart = (i: number) => {
      dragIndex.value = i;
    };

    const drop = (i: number) => {
      const arr = [...local.value];
      const moved = arr.splice(dragIndex.value, 1)[0];
      arr.splice(i, 0, moved);

      local.value = arr;
      emit("update-cities", arr);
    };

    /* -------------------------------
       🌟 Remove city
    ---------------------------------*/
    const remove = (i: number) => {
      local.value.splice(i, 1);
      emit("update-cities", local.value);
    };

    return {
      local,
      query,
      results,
      dragStart,
      drop,
      remove,
      select,
      addFirstResult,
    };
  },
};
</script>

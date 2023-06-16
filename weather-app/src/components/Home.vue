<script setup>
import { ref } from "vue";
import WeatherObjCons from "./../HelperFunctions/WeatherObjCons";
import scatterdCloud from "./../assets/scattered_cloud.jpeg";
import haze from "./../assets/haze.jpeg";

const searchedCity = ref("");
const CityHeading = ref("Searched City");
const weather_results = ref(null);
const WEATHER_API_KEY = "f31dc2b8b49a27efda7c2d44d41aa637";

const getImageSource = () => {
  if (weather_results.value?.weather === "haze") {
    return haze; // Path to the haze image
  } else {
    return scatterdCloud; // Path to the scattered_cloud image
  }
};

async function handleSubmit() {
  CityHeading.value = searchedCity.value;
  try {
    const queryParams = new URLSearchParams({
      q: searchedCity.value,
      APPID: WEATHER_API_KEY,
    });

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?${queryParams}`
    );
    const data = await response.json();

    console.log("Response ", data);
    weather_results.value = WeatherObjCons({
      temperature: data?.main.temp,
      feelsLike: data?.main.feels_like,
      weather: data?.weather[0]?.description,
      windSpeed: data?.wind?.speed,
      minTemp: data?.main.temp_min,
      maxTemp: data?.main.temp_max,
      name: data?.name,
    });
    console.log("Weather Results are ", weather_results.value);
  } catch (error) {
    alert(error.response);
    // Handle errors
  }
}
</script>

<template>
  <div
    class="mt-3 bg-black-300 p-7 transition-all duration-500 border-gray-200 rounded-lg shadow-xl"
  >
    <div class="flex items-center flex-col md:flex-row md:justify-between">
      <h1 class="text-2xl font-bold my-3 md:my-0">{{ CityHeading }}</h1>

      <form class="flex items-center" @submit.prevent="handleSubmit">
        <label for="simple-search" class="sr-only">Search</label>
        <div class="relative w-full">
          <div
            class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="simple-search"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
            required
            v-model="searchedCity"
          />
        </div>
        <button
          type="submit"
          class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
          <span class="sr-only">Search</span>
        </button>
      </form>
    </div>
    <div class="item-center flex transition-all duration-1000 justify-center">
      <div
        v-if="weather_results"
        class="max-w-sm md:max-w-full my-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <a href="#">
          <img
            class="rounded-t-lg object-cover w-full"
            :src="getImageSource()"
            alt=""
          />
        </a>
        <div class="p-5 text-center">
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            Weather: {{ weather_results?.weather }}
          </h5>
          <div class="flex flex-col md:flex-row items-center justify-between">
            <h1 class="m-2 md:mx-3"> <span class="font-semibold">Min </span>{{ weather_results.mintemp }} &deg;C</h1>
            <h1 class="m-2 md:mx-3 font-semibold text-3xl">{{ weather_results.temperature }} &deg;C</h1>
            <h1 class="m-2 md:mx-3"><span class="font-semibold">Max </span>{{ weather_results.maxtemp }} &deg;C</h1>
          </div>
          <h1 class="m-2 md:mx-3"> <span class="font-semibold">Wind Speed </span>{{ weather_results.windspeed }} m/s</h1>
        </div>
      </div>
    </div>
  </div>
</template>
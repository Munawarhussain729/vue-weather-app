
<script setup>
import { reactive, ref } from "vue";
import WeatherObjCons from "../HelperFunctions/WeatherObjCons";
const searchedCity = ref("");
const NoOfDays = ref("");
const CityHeading = ref("Searched City");
const WEATHER_API_KEY = "f31dc2b8b49a27efda7c2d44d41aa637";
const setError = ref("");

const weatherForcast = reactive([]);

const HandleNoofDays = (e) => {
  const value = e.target.value;
  NoOfDays.value = value;

  if (value > 5) {
    setError.value = "Number of days cannot exceed 5";
  } else {
    setError.value = "";
  }
};

async function handleSubmit() {
  CityHeading.value = searchedCity.value;
  try {
    const queryParams = new URLSearchParams({
      lat: 31.5204,
      lon: 74.3587,
      APPID: WEATHER_API_KEY,
    });

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?${queryParams}`
    );
    const data = await response.json();

    if (data) {
      const ForcastList = data.list;
      const Location = data.city.name;
      const ForcastObject = [];
      ForcastList?.forEach((element) => {
        const dt = element.dt; // Example timestamp
        const date = new Date(dt * 1000); // Multiply by 1000 to convert from seconds to milliseconds
        const formattedDate = date.toDateString(); // Convert to a human-readable date string

        console.log("Each element is ", element);
        ForcastObject.push(
          WeatherObjCons({
            temperature: element?.main.temp,
            feelsLike: element?.main.feels_like?.toString(),
            weather: element?.weather[0]?.description,
            windSpeed: element?.wind?.speed,
            minTemp: element?.main.temp_min,
            maxTemp: element?.main.temp_max,
            name: formattedDate,
          })
        );
      });
      weatherForcast.splice(0, weatherForcast.length, ...ForcastObject); // Update reactive object
    }
    console.log("Modified One is ", weatherForcast);
  } catch (error) {
    alert(error.response);
    // Handle errors
  }
}
</script>

<template>
  <div
    class="mt-3 bg-black-300 p-7 md:m-20 transition-all duration-500 border-gray-200 rounded-lg shadow-xl"
  >
    <div class="flex items-center flex-col md:flex-row">
      <div class="flex flex-col md:flex-row w-94 mt-5">
        <h1 class="mx-3 font-semibold mt-2">Select Number of Days:</h1>
        <div>
          <input
            type="number"
            placeholder="No of Days"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block h-10 pl-4 p-1"
            :value="NoOfDays"
            @input="HandleNoofDays"
          />
          <p v-if="setError.length > 0" className="text-red-500 text-sm ">
            {{ setError }}
          </p>
          <p v-else class="h-5"></p>
        </div>
      </div>

      <form
        class="flex items-center flex-1 md:mx-4 my-3"
        @submit.prevent="handleSubmit"
      >
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
            placeholder="Enter City Name"
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
    <div>
      <div class="relative overflow-x-auto">
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-3">Date</th>
              <th scope="col" class="px-6 py-3">Temperature</th>
              <th scope="col" class="px-6 py-3">Feels Like</th>
              <th scope="col" class="px-6 py-3">Max Temp</th>
              <th scope="col" class="px-6 py-3">Min Temp</th>
              <th scope="col" class="px-6 py-3">Wind</th>
              <th scope="col" class="px-6 py-3">Weather </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in weatherForcast"
              :key="item"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ item.location }}
              </th>
              <td class="px-6 py-4">{{item.temperature}}</td>
              <td class="px-6 py-4">{{item.feelslike}}</td>
              <td class="px-6 py-4">{{item.maxtemp}}</td>
              <td class="px-6 py-4">{{item.mintemp}}</td>
              <td class="px-6 py-4">{{item.wind}}</td>
              <td class="px-6 py-4">{{item.weather}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

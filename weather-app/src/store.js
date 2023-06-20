import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      weatherDataList: [],
      filteredData:[]
    }
  },
  mutations: {
    increment (state) {
      state.count++
    },
    addWeatherData(state, action){
        state.weatherDataList.unshift(action)
        console.log(state.weatherDataList);
    },
    addForcastData(state, action){
      state.weatherDataList = [...action]
    },
    getDataForDays(state,action){
      console.log("Inside Store",action);
      const currentDate = new Date();
      state.filteredData = state.weatherDataList.filter((item) => {
        const itemDate = new Date(item.location);
        const timeDifference = currentDate.getTime() - itemDate.getTime();
        const daysDifference = Math.abs( Math.floor(timeDifference / (1000 * 3600 * 24)));
        console.log("Days Difference", daysDifference);
        return daysDifference <= action;
      });
    }
  }
})

export default store
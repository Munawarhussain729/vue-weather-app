import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      weatherDataList: []
    }
  },
  mutations: {
    increment (state) {
      state.count++
    },
    addWeatherData(state, action){
        console.log("Value is ", action);   
        state.weatherDataList.push(action)
        console.log(state.weatherDataList);
    }
  }
})

export default store
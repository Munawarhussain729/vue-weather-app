<script setup>
import { ref, computed } from 'vue'
import NavBar from './components/NavBar.vue';
import Home from './components/Home.vue';
import Search from './components/Search.vue';
import Forcast from './components/Forcast.vue';

const routes = {
  '/forcast': Forcast,
  '/search': Search,
  '/':Home
}

const currentPath = ref(window.location.pathname)

window.addEventListener('popstate', () => {
  currentPath.value = window.location.pathname
})

const navigateTo = (path) => {
  window.history.pushState(null, '', path)
  currentPath.value = path
}

const currentView = computed(() => {
  const path = currentPath.value
  if (path && routes[path]) {
    return routes[path]
  } else {
    return NotFound
  }
})
</script>

<template>
  <NavBar/>
  <component v-if="currentView !== NotFound" :is="currentView" />
  <div v-else>
    <!-- Handle the case when the route is not found -->
    Route not found!
  </div>
</template>

<style scoped>

</style>

<script setup>
import { computed, createApp, ref } from 'vue'
import NavBar from './components/NavBar.vue'
import Home from './components/Home.vue'
import Search from './components/Search.vue'
import NotFound from './components/NotFound.vue'
import Forcast from './components/Forcast.vue'
import store from './store' // Import the Vuex store

const routes = {
    '/forcast': Forcast,
    '/search': Search,
    '/': Home
}

const currentPath = ref(window.location.pathname)

window.addEventListener('popstate', () => {
    currentPath.value = window.location.pathname
})

const currentView = computed(() => {
    const path = currentPath.value
    if (path && routes[path]) {
        return routes[path]
    } else {
        return NotFound
    }
})
// Method to increment the count
const incrementCount = () => {
    store.commit('increment')
}
const app = createApp({
    components: {
        NavBar
    },
    setup() {
        return {
            currentView,
            incrementCount
        }
    }
})

app.use(store) // Install the Vuex store instance as a plugin

app.mount('#app')
</script>

<template>
    <NavBar />
    <component v-if="currentView !== NotFound" :is="currentView" />
    <div v-else>
        <!-- Handle the case when the route is not found -->
        Route not found!
    </div>
</template>


<style scoped>

</style>

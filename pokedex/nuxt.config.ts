// https://nuxt.com/docs/api/configuration/nuxt-config


export default defineNuxtConfig({
    css: ['primevue/resources/themes/saga-green/theme.css',
        'primevue/resources/primevue.min.css',
        'primeicons/primeicons.css',
        'primeflex/primeflex.css',
        '@/assets/scss/_main.scss',
        '@/assets/scss/_layout.scss',
        '@/assets/scss/_pokemonList.scss',
        '@/assets/scss/_pokemonDetail.scss',
        '@/assets/scss/_pokemonTeam.scss'
    ],
    build: {
        transpile: ["primevue"]
    },
    modules: ['@pinia/nuxt'],
    pinia: {
        autoImports: [
            // automatically imports `defineStore`
            'defineStore', // import { defineStore } from 'pinia'
            ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
        ],
    }
})

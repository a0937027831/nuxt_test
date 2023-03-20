import { languages } from "./i18n";
import { defaultLocale } from "./i18n"
const messages = Object.assign(languages);

export default defineNuxtConfig({
    runtimeConfig:{
        public:{
            env:{
                NODE_ENV: process.env.NODE_ENV,
                BASE_URL: process.env.BASE_URL,
            },
            FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
        },
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
            
        },
    },
    modules: [
        '@pinia/nuxt',
        '@vueuse/nuxt',
        '@nuxtjs/color-mode',
        '@nuxtjs/i18n',
    ],
    i18n: {
        vueI18n:{
            legacy: false,
            locale: defaultLocale,
            messages:messages,
        }
    },
    colorMode: {
        classSuffix: ''
    },
    css: ['@/assets/css/tailwind.css'],
 
    imports: {
        dirs: [
          // 掃描 composables 目錄頂層
          'composables',
          // 掃描深度一層的特定檔案
          'composables/*/index.{ts,js,mjs,mts}',
          // 掃描整個 composables 目錄下的檔案
          'composables/**'
        ]
    }
})

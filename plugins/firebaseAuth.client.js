import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();
    const firebaseConfig = {
        apiKey: config.public.FIREBASE_API_KEY,
        authDomain: "nuxt-test-f533d.firebaseapp.com",
        projectId: "nuxt-test-f533d",
        storageBucket: "nuxt-test-f533d.appspot.com",
        messagingSenderId: "485170875592",
        appId: "1:485170875592:web:b848230fbecfa873ab29fd",
        measurementId: "G-0CFW5BEXSE",
    };
    const app = initializeApp(firebaseConfig);
    initUser();
});

import { createApp } from 'vue'
// import router from "./router";
import router from './router/index.js'
import App from './App.vue';
require("./assets/main.scss");

const app = createApp(App);

app.use(router);

app.mount('#app')
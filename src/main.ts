import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import { createPinia } from "pinia";
import vant from "./plugins/vantui";
// import FastClick from "fastclick";
// FastClick.attach(document.body);

createApp(App).use(router).use(createPinia()).use(vant).mount("#app");

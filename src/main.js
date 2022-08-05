import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import VeeValidatePlugin from "./includes/plugins/validation";
import { auth } from "./includes/firebase/firebase";

import "./assets/base.css";
import "./assets/main.css";

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);
    app.use(createPinia());
    app.use(router);
    app.use(VeeValidatePlugin);

    app.mount("#app");
  }
});

import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import "jquery";
import "popper.js";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.css";
import router from "./router";
createApp(App).use(router).mount("#app");

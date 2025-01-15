import { createApp } from "vue";
import { Quasar } from "quasar";

import App from "./App.vue";

import "quasar/src/css/index.sass";
import "@quasar/extras/material-icons/material-icons.css";

// Vue 플러그인 사용
createApp(App)
  .use(Quasar) // UI 라이브러리
  .mount("#app");

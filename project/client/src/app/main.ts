/* eslint-disable import/order */
import { createApp } from "vue";
import { createPinia } from "pinia";
import { Quasar } from "quasar";

import router from "./router";
import App from "./App.vue";

import "quasar/src/css/index.sass";
import "@quasar/extras/material-icons/material-icons.css";

const pinia = createPinia();

// Vue 플러그인 사용
createApp(App)
  .use(router) // 라우터
  .use(pinia) // 상태 관리
  .use(Quasar) // UI 라이브러리
  .mount("#app");

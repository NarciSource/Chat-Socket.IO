import singleSpaVue from "single-spa-vue";
import { createApp, h } from "vue";
import { Quasar } from "quasar";

import App from "./App.vue";

const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render() {
      return h(App, {
        props: {
          name: this.name,
        },
      });
    },
  },
  handleInstance: (app) => {
    app.use(Quasar);
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;

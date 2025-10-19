import { createRouter, createMemoryHistory } from "vue-router";

import Explorer from "@/features/explorer/index.vue";
import Chat from "@/features/chat/index.vue";

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: "/", component: Explorer },
    { path: "/room/:id", component: Chat },
  ],
});

export default router;

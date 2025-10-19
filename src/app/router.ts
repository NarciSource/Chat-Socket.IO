import { createRouter, createMemoryHistory } from "vue-router";

import Explorer from "@/features/explorer/index.vue";
import Chat from "@/features/chat/index.vue";
import { RouterName } from "@/shared/constants";

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: "/", name: RouterName.Explorer, component: Explorer },
    { path: "/room/:id", name: RouterName.Room, component: Chat },
  ],
});

export default router;

import { ref } from "vue";
import { defineStore } from "pinia";

export default defineStore("users", () => {
  const users = ref<string[]>([]);

  return { users };
});

import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export const useCommonStore = defineStore("common", () => {
  const router = useRouter();

  return {
    router,
  };
});

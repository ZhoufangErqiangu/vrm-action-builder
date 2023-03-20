import { defineStore } from "pinia";
import { ref } from "vue";

export const useLayoutStore = defineStore("layout", () => {
  const title = ref(import.meta.env.VITE_APP_TITLE);
  const desc = ref("");

  function setPage(param: { title: string; desc: string }) {
    title.value = param.title;
    desc.value = param.desc;
  }

  return { title, desc, setPage };
});

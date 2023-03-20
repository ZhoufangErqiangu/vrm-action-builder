import { type RouteRecordRaw } from "vue-router";
import HomeView from "../view/home/HomeView.vue";
import { defineAsyncComponent } from "vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/home",
    name: "home",
    component: HomeView,
    meta: {
      title: "Home",
      desc: "",
    },
  },
  {
    path: "/about",
    name: "about",
    component: defineAsyncComponent(
      async () => await import("../view/about/AboutView.vue"),
    ),
    meta: {
      title: "About",
      desc: "",
    },
  },
];

export default routes;

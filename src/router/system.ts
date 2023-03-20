import { type RouteRecordRaw } from "vue-router";
import LoginView from "../view/system/LoginView.vue";
import VrmTest from "../view/vrm/VrmTest.vue";
import { defineAsyncComponent } from "vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: {
      title: "Login",
      desc: "",
    },
  },
  {
    path: "/regist",
    name: "regist",
    component: defineAsyncComponent(
      async () => await import("../view/system/RegistView.vue"),
    ),
    meta: {
      title: "Regist",
      desc: "",
    },
  },
  {
    path: "/vrm",
    name: "vrm",
    component: VrmTest,
    meta: {
      title: "Vrm Test",
      desc: "",
    },
  },
];

export default routes;

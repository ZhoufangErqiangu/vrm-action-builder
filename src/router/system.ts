import { type RouteRecordRaw } from "vue-router";
import LoginView from "../view/system/LoginView.vue";
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
    component: defineAsyncComponent(
      async () => await import("../view/vrm/VrmTest.vue"),
    ),
    meta: {
      title: "Vrm Test",
      desc: "",
    },
  },
  {
    path: "/vrm-action",
    name: "vrm action",
    component: defineAsyncComponent(
      async () => await import("../view/vrm/VrmAction.vue"),
    ),
    meta: {
      title: "Vrm Test",
      desc: "",
    },
  },
];

export default routes;

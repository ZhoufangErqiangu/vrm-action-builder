import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import LayoutView from "../layout/LayoutView.vue";
import { useLayoutStore } from "../store/layout";
import { useUserStore } from "../store/user";
import NotFountView from "../view/system/NotFoundView.vue";
import AdminRoutes from "./admin";
import SystemRoutes from "./system";

const defaultTitle = process.env.VUE_APP_TITILE ?? "";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "index",
    redirect: "/vrm",
  },
  {
    path: "/",
    name: "system",
    component: LayoutView,
    children: SystemRoutes,
  },
  {
    path: "/",
    name: "admin",
    component: LayoutView,
    children: AdminRoutes,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: NotFountView,
    meta: {
      title: "Not Found",
      desc: "",
    },
  },
];

const base = "/";
const router = createRouter({
  history: createWebHistory(base),
  routes,
});
router.beforeEach((to, from) => {
  const isLogin: boolean = useUserStore().isLogin;
  // 避免无限重定向
  if (to.name === from.name) return false;
  // check login
  if (!isLogin && to.matched[0].name !== "system") {
    return { name: "login" };
  }
});

router.afterEach((to) => {
  // set browser title
  window.document.title = to.meta?.title
    ? defaultTitle
    : `${defaultTitle} | ${to.meta.title as string}`;
  // store title
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  useLayoutStore().setPage(to.meta);
  // debug
  console.log("router to", to);
});

export default router;

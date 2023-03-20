import { ElIcon, ElMessage, ElNotification } from "element-plus";
import "element-plus/es/components/icon/style/css";
import "element-plus/es/components/message/style/css";
import "element-plus/es/components/notification/style/css";
import "element-plus/theme-chalk/dark/css-vars.css";
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.css";

createApp(App)
  .use(createPinia())
  .use(router)
  .use(ElIcon)
  .use(ElMessage)
  .use(ElNotification)
  .mount("#app");

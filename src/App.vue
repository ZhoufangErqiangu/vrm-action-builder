<template>
  <router-view />
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { PublicGetVersion } from "./api/serve/public";

onMounted(async () => {
  const res = await PublicGetVersion();
  console.log("get version", res);
});
</script>

<!-- override -->
<style>
div.el-scrollbar {
  --el-scrollbar-opacity: 1;
  --el-scrollbar-bg-color: black;
  --el-scrollbar-hover-opacity: 1;
  --el-scrollbar-hover-bg-color: black;
}

/* .el-scrollbar__bar.is-vertical>div {
  height: 20px !important;
} */
</style>

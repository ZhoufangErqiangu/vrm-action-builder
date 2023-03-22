<template>
  <el-container>
    <el-header>
      <layout-header />
    </el-header>
    <el-main class="main-box">
      <router-view />
    </el-main>
    <el-footer>
      <layout-footer />
    </el-footer>
  </el-container>
</template>

<script lang="ts" setup>
import { ElContainer, ElFooter, ElHeader, ElMain } from "element-plus";
import "element-plus/es/components/container/style/css";
import "element-plus/es/components/footer/style/css";
import "element-plus/es/components/header/style/css";
import "element-plus/es/components/main/style/css";
import LayoutFooter from "./LayoutFooter.vue";
import LayoutHeader from "./LayoutHeader.vue";
</script>

<style lang="less" scoped>
.logo {
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: 28px;
  }
}

.main-box {
  position: relative;
}
</style>

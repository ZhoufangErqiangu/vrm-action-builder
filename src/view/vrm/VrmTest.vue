<template>
  <div id="vrm-box" class="vrm-box">
    this is vrm box
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";

onMounted(() => {
  // use dom
  const vrmBox = document.getElementById("vrm-box");
  if (!vrmBox) throw new Error("null vrm box");
  vrmBox.innerText = "";
});
</script>

<style lang="less" scoped>
.vrm-box {
  margin: 0 auto;
  height: calc(100vh - 160px);
}
</style>

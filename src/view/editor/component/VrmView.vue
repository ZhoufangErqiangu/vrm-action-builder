<template>
  <div id="vrm-box" class="vrm-box">
    <div v-if="loading" class="progress-box">
      <h2>Loading...</h2>
      <el-progress :percentage="progressValue" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage, ElProgress } from "element-plus";
import "element-plus/es/components/progress/style/css";
import { onMounted, ref } from "vue";

const loading = ref(true);
const progressValue = ref(0.0);

async function init() {
  try {
    // use dom
    const vrmBox = document.getElementById("vrm-box");
    if (!vrmBox) throw new Error("null vrm box");
    // todo
    loading.value = false;
  } catch (err) {
    ElMessage.error("Vrm Load Error.");
    console.error("vrm load error", err);
  }
}

onMounted(init);
</script>

<style lang="less" scoped>
.vrm-box {
  position: relative;
  margin: 0 auto;
  height: calc(100vh - 160px);
  background-color: black;

  .progress-box {
    width: 260px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    h2 {
      text-align: center;
    }
  }
}
</style>

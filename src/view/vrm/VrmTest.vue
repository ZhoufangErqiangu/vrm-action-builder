<template>
  <div id="vrm-box" class="vrm-box">
    <div v-if="!ready" class="progress-box">
      <h2>Loading...</h2>
      <el-progress :percentage="progressValue" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage, ElProgress } from "element-plus";
import "element-plus/es/components/progress/style/css";
import { onMounted, ref } from "vue";
import { Animate } from "./animate";
import { init } from "./init";

const ready = ref(false);
const progressValue = ref(0.0);

onMounted(async () => {
  try {
    // use dom
    const vrmBox = document.getElementById("vrm-box");
    if (!vrmBox) throw new Error("null vrm box");
    // init
    const { vrm, renderer, scene, camera, clock } = await init("/model/VRM1_Constraint_Twist_Sample.vrm", vrmBox, {
      onProgress: (ev) => { progressValue.value = ev.loaded / ev.total * 100.0; }
    });
    ready.value = true;
    // animate
    const animate = new Animate({ vrm, renderer, scene, camera, clock });
    setTimeout(() => { animate.stop(); }, 3000);
  } catch (err) {
    ElMessage.error("Vrm Load Error.");
    console.error("vrm load error", err);
  }
});
</script>

<style lang="less" scoped>
.vrm-box {
  position: relative;
  margin: 0 auto;
  height: calc(100vh - 160px);

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

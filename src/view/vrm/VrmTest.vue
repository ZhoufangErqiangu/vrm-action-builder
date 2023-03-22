<template>
  <div id="vrm-box" class="vrm-box">
    <div v-if="!loading" class="progress-box">
      <h2>Loading...</h2>
      <el-progress :percentage="progressValue" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage, ElProgress } from "element-plus";
import "element-plus/es/components/progress/style/css";
import { onMounted, ref } from "vue";
import { VrmBase, VrmAnimate } from "../../assets/vrm";
import { VRMHumanBoneName } from "@pixiv/three-vrm";

const loading = ref(false);
const progressValue = ref(0.0);
let base: VrmBase;
let animate1: VrmAnimate;

async function init() {
  try {
    // use dom
    const vrmBox = document.getElementById("vrm-box");
    if (!vrmBox) throw new Error("null vrm box");
    // init
    base = new VrmBase(vrmBox);
    await base.init({
      modelUrl: "/model/VRM1_Constraint_Twist_Sample.vrm",
      onProgress: (ev) => { progressValue.value = ev.loaded / ev.total * 100.0; }
    });
    loading.value = true;
    animate1 = new VrmAnimate(base, function (this: VrmAnimate) {
      const s =
        0.25 * Math.PI * Math.sin(Math.PI * this.base.clock.elapsedTime);
      const neck = this.base.vrm.humanoid.getNormalizedBoneNode(
        VRMHumanBoneName.Neck,
      );
      const leftUpperArm = this.base.vrm.humanoid.getNormalizedBoneNode(
        VRMHumanBoneName.LeftUpperArm,
      );
      const rightUpperArm = this.base.vrm.humanoid.getNormalizedBoneNode(
        VRMHumanBoneName.RightUpperArm,
      );
      if (neck) neck.rotation.y = s;
      if (leftUpperArm) leftUpperArm.rotation.z = s;
      if (rightUpperArm) rightUpperArm.rotation.x = s;
      if (this.base.clock.elapsedTime > 4) this.stop();
    });
    animate1.start();
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
  height: calc(100vh - 120px);

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

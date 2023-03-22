<template>
  <el-form :model="form">
    <el-form-item prop="bone" label="Bone">
      <el-select v-model="form.bone" @change="onBoneChange">
        <el-option v-for="item in vrmHumanBoneNameOption" :key="item.value" :value="item.value" :label="item.label" />
      </el-select>
    </el-form-item>
    <el-form-item prop="rotationX" label="Rotate X">
      <el-slider v-model="form.rotationX" :step="Math.PI / 180.0 / 100.0" :max="Math.PI" :min="Math.PI * -1.0" />
    </el-form-item>
    <el-form-item prop="rotationY" label="Rotate Y">
      <el-slider v-model="form.rotationY" :step="Math.PI / 180.0 / 100.0" :max="Math.PI" :min="Math.PI * -1.0" />
    </el-form-item>
    <el-form-item prop="rotationZ" label="Rotate Z">
      <el-slider v-model="form.rotationZ" :step="Math.PI / 180.0 / 100.0" :max="Math.PI" :min="Math.PI * -1.0" />
    </el-form-item>
    <el-form-item>
      <el-button type="warning" :icon="Close" @click="emits('close')">
        删除
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { Close } from "@element-plus/icons-vue";
import { VRMHumanBoneList, VRMHumanBoneName } from "@pixiv/three-vrm";
import { ElButton, ElForm, ElFormItem, ElOption, ElSelect, ElSlider } from "element-plus";
import "element-plus/es/components/button/style/css";
import "element-plus/es/components/form-item/style/css";
import "element-plus/es/components/form/style/css";
// import "element-plus/es/components/input/style/css";
import "element-plus/es/components/option/style/css";
import "element-plus/es/components/select/style/css";
import "element-plus/es/components/slider/style/css";
import { onBeforeUnmount, reactive, ref, watch } from "vue";
import { VrmBase } from "../../assets/vrm";

const props = withDefaults(defineProps<{ vrm: VrmBase }>(), {});
const emits = defineEmits(["close"]);

const form = reactive<{
  bone?: VRMHumanBoneName,
  rotationX: number,
  rotationY: number,
  rotationZ: number,
}>({
  bone: undefined,
  rotationX: 0.0,
  rotationY: 0.0,
  rotationZ: 0.0,
});
const vrmHumanBoneNameOption = ref(VRMHumanBoneList.map(e => {
  return { label: e, value: e };
}));

function onBoneChange() {
  if (!form.bone) return;
  const bone = props.vrm.vrm.humanoid.getNormalizedBoneNode(form.bone);
  if (!bone) return;
  form.rotationX = bone.rotation.x;
  form.rotationY = bone.rotation.y;
  form.rotationZ = bone.rotation.z;
}

watch(form, (val) => {
  if (!val.bone) return;
  props.vrm.moveSingleBone(val.bone, {
    moveType: "absolute",
    rotation: {
      x: form.rotationX,
      y: form.rotationY,
      z: form.rotationZ,
    }
  });
});

onBeforeUnmount(() => {
  if (!form.bone) return;
  props.vrm.moveSingleBone(form.bone, {
    moveType: "absolute",
    rotation: {
      x: 0.0,
      y: 0.0,
      z: 0.0,
    }
  });
});
</script>

<style lang="less" scoped></style>

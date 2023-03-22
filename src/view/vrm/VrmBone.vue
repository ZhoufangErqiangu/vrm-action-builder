<template>
  <el-form>
    <el-form-item prop="bone" label="Bone">
      <el-select :model-value="props.action.boneName" @change="onBoneChange">
        <el-option v-for="item in vrmHumanBoneNameOption" :key="item.value" :value="item.value" :label="item.label" />
      </el-select>
    </el-form-item>
    <el-form-item prop="rotationX" label="Rotate X">
      <el-slider :model-value="props.action.param.rotation.x" :step="Math.PI / 180.0 / 100.0" :max="Math.PI"
        :min="Math.PI * -1.0" @input="onRotationChangeX" />
    </el-form-item>
    <el-form-item prop="rotationY" label="Rotate Y">
      <el-slider :model-value="props.action.param.rotation.y" :step="Math.PI / 180.0 / 100.0" :max="Math.PI"
        :min="Math.PI * -1.0" @input="onRotationChangeY" />
    </el-form-item>
    <el-form-item prop="rotationZ" label="Rotate Z">
      <el-slider :model-value="props.action.param.rotation.z" :step="Math.PI / 180.0 / 100.0" :max="Math.PI"
        :min="Math.PI * -1.0" @input="onRotationChangeZ" />
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
import { ElButton, ElForm, ElFormItem, ElOption, ElSelect, ElSlider } from "element-plus";
import "element-plus/es/components/button/style/css";
import "element-plus/es/components/form-item/style/css";
import "element-plus/es/components/form/style/css";
import "element-plus/es/components/option/style/css";
import "element-plus/es/components/select/style/css";
import "element-plus/es/components/slider/style/css";
import { VrmBaseMoveSingleBoneData, vrmHumanBoneNameOption } from "../../assets/vrm";
import { VRMHumanBoneName } from "@pixiv/three-vrm-core";
import { nextTick } from "vue";

const props = withDefaults(defineProps<{ action: VrmBaseMoveSingleBoneData }>(), {});
const emits = defineEmits(["close", "update:action"]);

function onBoneReset() {
  if (props.action.boneName) {
    emits("update:action", {
      ...props.action,
      param: {
        ...props.action.param,
        rotation: { x: 0.0, y: 0.0, z: 0.0 }
      }
    });
  }
}

function onBoneChange(value: VRMHumanBoneName) {
  if (props.action.boneName) {
    onBoneReset();
    nextTick(() => {
      emits("update:action", { ...props.action, boneName: value });
    });
  } else {
    emits("update:action", { ...props.action, boneName: value });
  }
}

function onRotationChangeX(value: number | number[]) {
  onRotationChange(value, "x");
}

function onRotationChangeY(value: number | number[]) {
  onRotationChange(value, "y");
}

function onRotationChangeZ(value: number | number[]) {
  onRotationChange(value, "z");
}

function onRotationChange(value: number | number[], direction: "x" | "y" | "z") {
  let temp = value;
  if (temp instanceof Array) temp = temp[0];
  emits("update:action", {
    ...props.action,
    param: {
      ...props.action.param,
      rotation: {
        ...props.action.param.rotation,
        [direction]: temp
      }
    }
  });
}
</script>

<style lang="less" scoped></style>

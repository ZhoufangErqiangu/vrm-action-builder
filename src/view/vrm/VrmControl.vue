<template>
  <el-form :inline="true" class="control-box">
    <el-form-item>
      <el-button type="warning" :icon="Refresh" @click="onInit">
        初始化
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { Refresh } from "@element-plus/icons-vue";
import { ElButton, ElForm, ElFormItem } from "element-plus";
import "element-plus/es/components/button/style/css";
import "element-plus/es/components/form-item/style/css";
import "element-plus/es/components/form/style/css";
import "element-plus/es/components/option/style/css";
import "element-plus/es/components/select/style/css";
import "element-plus/es/components/slider/style/css";
import { VrmBase } from "../../assets/vrm";

const props = defineProps<{ vrm: VrmBase }>();

function onInit() {
  props.vrm.resetAllBone();
}
</script>

<style lang="less" scoped>
.control-box {
  position: absolute;
  left: 30px;
  bottom: 30px;
}
</style>

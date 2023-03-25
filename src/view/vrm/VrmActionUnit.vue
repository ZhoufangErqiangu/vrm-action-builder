<template>
  <el-form class="action-unit">
    <el-form-item label="名字">
      {{ props.action.name }}
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :icon="Edit" @click="emits('run', props.action.uuid)">
        编辑
      </el-button>
      <el-button type="primary" :icon="VideoPlay" @click="emits('run', props.action.uuid)">
        运行
      </el-button>
      <el-button type="danger" :icon="Close" @click="emits('close', props.action.uuid)">
        删除
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { Close, VideoPlay, Edit } from "@element-plus/icons-vue";
import { ElButton, ElForm, ElFormItem } from "element-plus";
import "element-plus/es/components/button/style/css";
import "element-plus/es/components/form-item/style/css";
import "element-plus/es/components/form/style/css";
import { type VrmBaseActionParam } from "../../assets/vrm";

const props = defineProps<{ action: VrmBaseActionParam }>();
const emits = defineEmits(["run", "close", "edit"]);
</script>

<style lang="less" scoped>
.action-unit {
  margin-bottom: 5px;
  border: solid 1px grey;
  border-radius: 5px;
}
</style>

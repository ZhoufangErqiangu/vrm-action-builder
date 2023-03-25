<template>
  <div class="action-list">
    <el-form :inline="true">
      <el-form-item>
        <el-button type="primary" :icon="Reading" @click="onOpen">
          读取
        </el-button>
        <el-button type="primary" :icon="Download" @click="onSave">
          保存
        </el-button>
        <el-button type="primary" :icon="Link" :disabled="true" @click="onImport">
          导入
        </el-button>
      </el-form-item>
    </el-form>
    <vrm-action-unit v-for="item in actionListStore.list" :key="item.uuid" :action="item" @run="onRun" @close="onClose" />
  </div>
</template>

<script lang="ts" setup>
import { Reading, Download, Link } from "@element-plus/icons-vue";
import { ElButton, ElForm, ElFormItem, ElMessage } from "element-plus";
import "element-plus/es/components/button/style/css";
import "element-plus/es/components/form-item/style/css";
import "element-plus/es/components/form/style/css";
import { VrmBase } from "../../assets/vrm";
import { useActionListStroe } from "../../store/actionList";
import VrmActionUnit from "./VrmActionUnit.vue";

const props = defineProps<{ vrm: VrmBase }>();

const actionListStore = useActionListStroe();

function onOpen() {
  actionListStore.readFromLocal();
  ElMessage.success("读取成功");
}

function onSave() {
  actionListStore.saveToLocal();
  ElMessage.success("保存完成");
}

function onImport() {
  // todo
}

function onRun(uuid: string) {
  const index = actionListStore.uuidList.indexOf(uuid);
  if (index === -1) throw new Error(`null uuid ${uuid}`);
  props.vrm.runAction(actionListStore.list[index]);
}

function onClose(uuid: string) {
  actionListStore.deleteAction(uuid);
}
</script>

<style lang="less" scoped>
.action-list {
  position: absolute;
  left: 30px;
  top: 30px;
  height: 50%;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>

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
    <el-collapse :accordion="true">
      <el-collapse-item v-for="item in list" :key="item.uuid" :title="item.name">
        <action-unit :action="item" />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts" setup>
import { Download, Link, Reading } from "@element-plus/icons-vue";
import { ElButton, ElCollapse, ElCollapseItem, ElForm, ElFormItem, ElMessage } from "element-plus";
import "element-plus/es/components/button/style/css";
import "element-plus/es/components/collapse-item/style/css";
import "element-plus/es/components/collapse/style/css";
import "element-plus/es/components/form-item/style/css";
import "element-plus/es/components/form/style/css";
import { reactive } from "vue";
import { type VrmBaseActionParam } from "../../../assets/vrm";
import ActionUnit from "./ActionUnit.vue";

const list: VrmBaseActionParam[] = reactive([]);

function onOpen() {
  // actionListStore.readFromLocal();
  ElMessage.success("读取成功");
}

function onSave() {
  // actionListStore.saveToLocal();
  ElMessage.success("保存完成");
}

function onImport() {
  // todo
}

</script>

<style lang="less" scoped>
.action-list {
  width: 20vw;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>

<template>
  <div class="edit-box">
    <vrm-bone v-for="item in list" :key="`vrmBone${item}`" class="bone" :vrm="props.vrm" @close="onClose(item)" />
    <div class="add" @click="onAdd">
      <el-icon size="30" color="white">
        <plus />
      </el-icon>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Plus } from "@element-plus/icons-vue";
import { ref } from "vue";
import { VrmBase } from "../../assets/vrm";
import VrmBone from "./VrmBone.vue";

const props = defineProps<{ vrm: VrmBase }>();

function cid() {
  return Math.random().toFixed(6);
}

const list = ref([cid()]);

function onAdd() {
  list.value.push(cid());
}

function onClose(id: string) {
  const index = list.value.indexOf(id);
  if (index < 0) return;
  list.value.splice(index, 1);
}
</script>

<style lang="less" scoped>
.edit-box {
  position: absolute;
  right: 30px;
  top: 30px;
  height: calc(100% - 40px);
  overflow-y: auto;

  .bone {
    margin-bottom: 5px;
  }

  .add {
    width: 100%;
    min-width: 100px;
    padding: 15px 0;
    box-sizing: border-box;
    border: solid 1px grey;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
  }
}
</style>

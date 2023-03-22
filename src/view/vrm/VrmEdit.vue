<template>
  <div class="edit-box">
    <vrm-bone v-for="item, index in action" :key="`vrmBone${item.uuid}`" v-model:action="action[index]" class="bone"
      @close="onClose(index)" />
    <div class="add" @click="onAdd">
      <el-icon size="30" color="white">
        <plus />
      </el-icon>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Plus } from "@element-plus/icons-vue";
import { VrmBase, VrmBaseMoveSingleBoneData } from "../../assets/vrm";
import VrmBone from "./VrmBone.vue";
import { uuid } from "../../util/uuid";
import { onMounted, reactive, watch } from "vue";

// eslint-disable-next-line no-unused-vars
const props = defineProps<{ vrm: VrmBase }>();
const action: VrmBaseMoveSingleBoneData[] = reactive([]);

function onAdd() {
  action.push({
    uuid: uuid(),
    boneName: undefined,
    param: {
      moveType: "absolute",
      rotation: { x: 0.0, y: 0.0, z: 0.0 }
    }
  });
}

function onClose(index: number) {
  const temp = action[index];
  if (temp.boneName) {
    props.vrm.resetSingleBone(temp.boneName);
  }
  action.splice(index, 1);
}

onMounted(() => {
  onAdd();
});

watch(action, (val) => {
  if (!props.vrm?.isReady) return;
  props.vrm.moveMultipleBone(val);
});
</script>

<style lang="less" scoped>
.edit-box {
  position: absolute;
  right: 30px;
  top: 30px;
  height: calc(100% - 60px);
  overflow-x: hidden;
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

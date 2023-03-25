<template>
  <div class="edit-box">
    <el-form :model="form">
      <el-form-item prop="name" label="Name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item prop="time" label="Time">
        <el-input-number v-model="form.time" :min="0" :step="1" />
      </el-form-item>
      <el-form-item>
        <el-button :icon="Finished" type="primary" @click="onComplete">
          完成
        </el-button>
        <el-button :icon="VideoPlay" type="primary" @click="onRun">
          运行
        </el-button>
      </el-form-item>
    </el-form>
    <vrm-bone v-for="item, index1 in action" :key="`vrmBone${item.uuid}`" v-model:action="action[index1]" class="bone"
      @close="onClose(index1)" @reset="onReset(index1)" />
    <div class="add" @click="onAdd">
      <el-icon size="30" color="white">
        <plus />
      </el-icon>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Finished, Plus, VideoPlay } from "@element-plus/icons-vue";
import { ElButton, ElForm, ElFormItem, ElInput, ElInputNumber } from "element-plus";
import "element-plus/es/components/button/style/css";
import "element-plus/es/components/form-item/style/css";
import "element-plus/es/components/form/style/css";
import "element-plus/es/components/input-number/style/css";
import "element-plus/es/components/input/style/css";
import { computed, onMounted, reactive, watch } from "vue";
import { VrmBase, VrmBaseMoveSingleBoneData } from "../../assets/vrm";
import { uuid } from "../../util/uuid";
import VrmBone from "./VrmBone.vue";
import { useActionListStroe } from "../../store/actionList";

const props = defineProps<{ vrm: VrmBase, index: Number }>();
const actionListStore = useActionListStroe();
const action: VrmBaseMoveSingleBoneData[] = reactive([]);
const form = reactive({ name: `action ${actionListStore.list.length + 1}`, time: 1000 });
const uuidStr = uuid();

const actionParam = computed(() => {
  return {
    uuid: uuidStr,
    ...form,
    action,
  };
});

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

function onReset(index: number) {
  const temp = action[index];
  if (temp.boneName) {
    props.vrm.resetSingleBone(temp.boneName);
  }
  temp.param.rotation = { x: 0.0, y: 0.0, z: 0.0 };
}

function onClose(index: number) {
  const temp = action[index];
  if (temp.boneName) {
    props.vrm.resetSingleBone(temp.boneName);
  }
  action.splice(index, 1);
}

function onComplete() {
  actionListStore.addAction(actionParam.value);
}

function onRun() {
  props.vrm.runAction(actionParam.value);
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
    background-color: #383838;
    border: solid 1px grey;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
  }
}
</style>

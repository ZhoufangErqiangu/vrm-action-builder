<template>
  <div class="edit-box">
    <action-list />
    <div class="edit-main">
      <vrm-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
import ActionList from "./component/ActionList.vue";
import VrmView from "./component/VrmView.vue";
</script>

<style lang="less" scoped>
.edit-box {
  display: flex;
}
</style>

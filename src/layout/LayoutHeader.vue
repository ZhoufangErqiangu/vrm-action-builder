<template>
  <div class="head-box">
    <el-page-header :title="pageHeader.title" :content="pageHeader.desc" @back="onBack" />
    <div class="box1">
      <div class="unit">
        <router-link to="/user">
          <img v-if="avatar !== ''" :src="avatarUrl" alt="user avatar" class="avatar">
          <el-icon v-else :size="30" color="white">
            <User />
          </el-icon>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { User } from "@element-plus/icons-vue";
import { ElPageHeader } from "element-plus";
import "element-plus/es/components/page-header/style/css";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { fileUrl } from "../api/serve/file";
import { useLayoutStore } from "../store/layout";
import { useUserStore } from "../store/user";

const router = useRouter();
const layoutStore = useLayoutStore();
const userStrore = useUserStore();

function onBack() {
  router.back();
}

const avatar = computed(() => userStrore.avatar);
const avatarUrl = computed(() => {
  return fileUrl(avatar.value);
});
const pageHeader = computed(() => {
  return { title: layoutStore.title, desc: layoutStore.desc };
});

</script>

<style lang="less" scoped>
.head-box {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;

  .box1 {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    display: flex;
    align-items: center;

    .unit {
      margin-left: 15px;

      :deep(.el-switch) {
        --el-switch-on-color: rgb(44, 44, 44);
      }

      :deep(a) {
        line-height: normal;
      }
    }

    .avatar {
      width: 30px;
      height: 30px;
      object-fit: cover;
      border-radius: 5px;
    }
  }
}
</style>

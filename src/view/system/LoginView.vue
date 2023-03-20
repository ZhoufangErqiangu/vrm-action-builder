<template>
  <div class="login-box">
    <h1>Login</h1>
    <el-form :model="loginData" class="form">
      <el-form-item name="username" :required="true">
        <el-input v-model="loginData.username" placeholder="User name" type="text" name="username" />
      </el-form-item>
      <el-form-item name="password" :required="true">
        <el-input v-model="loginData.password" placeholder="Password" type="password" name="password" />
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="onLogin">
          Login
        </el-button>
        <el-button @click="onRegist">
          Regist
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ElButton, ElForm, ElFormItem, ElInput, ElMessage } from "element-plus";
import "element-plus/es/components/button/style/css";
import "element-plus/es/components/form-item/style/css";
import "element-plus/es/components/form/style/css";
import "element-plus/es/components/input/style/css";
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { LoginData } from "../../api/serve/user";
import { useUserStore } from "../../store/user";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const loginData = reactive({
  username: "",
  password: ""
} as LoginData);
const loading = ref(false);

onMounted(() => {
  const query: { username?: string } = route.query;
  const { username } = query;
  if (username) loginData.username = username;
});

async function onLogin(): Promise<void> {
  loading.value = true;
  try {
    if (!loginData.username || !loginData.password) {
      ElMessage.warning("Must input user name and password.");
      console.warn("null username password", loginData);
    } else {
      await userStore.login(loginData);
      router.push({ name: "home" });
    }
  } catch (err) {
    ElMessage.error("Login error");
    console.error("login error", err);
  }
  loading.value = false;
}

function onRegist() {
  router.push({ name: "regist" });
}
</script>

<style lang="less" scoped>
.login-box {
  width: 30vw;
  margin: 0px auto;

  @media screen and(max-width:960px) {
    width: 80vw;
  }

  h1 {
    margin-top: 25vh;
    margin-bottom: 15px;
    font-size: 72px;
    font-weight: 700;
    text-align: center;
  }
}
</style>

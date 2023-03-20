<template>
  <div class="regist-box">
    <h1>Regist</h1>
    <el-form :model="registData" class="form">
      <el-form-item name="username" :required="true">
        <el-input v-model="registData.username" placeholder="User name" type="text" name="username" />
      </el-form-item>
      <el-form-item name="password" :required="true">
        <el-input v-model="registData.password" placeholder="Password" type="password" name="password" />
      </el-form-item>
      <el-form-item name="password2" :required="true">
        <el-input v-model:value="registData.password2" placeholder="Repeart password" type="password" name="password2" />
      </el-form-item>
      <el-form-item name="verificateCode" :required="true">
        <el-input v-model="registData.verifyCode" placeholder="Verificate Code" type="text" name="verificateCode" />
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="onRegist">
          Regist
        </el-button>
        <el-button :loading="loading" type="warning" @click="onReset">
          Reset
        </el-button>
        <el-button @click="onLogin">
          Login
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
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { regist } from "../../api/serve/user";

const router = useRouter();
const registData = reactive({
  username: "",
  password: "",
  password2: "",
  verifyCode: "",
});
const loading = ref(false);

async function onRegist(): Promise<void> {
  loading.value = true;
  try {
    if (!registData.username || !registData.password || !registData.verifyCode) {
      ElMessage.warning("Must input username password and verificate code.");
      console.warn("null username password", registData);
    } else {
      const res = await regist({ ...registData });
      if (res.code === 1) {
        router.push({ path: "/login", query: { username: res.username } });
      } else {
        ElMessage.warning("Regist fail");
        console.warn("regist fail", res);
      }
    }
  } catch (err) {
    ElMessage.error("Regist error");
    console.error("regist error", err);
  }
  loading.value = false;
}

function onReset() {
  registData.username = "";
  registData.password = "";
  registData.verifyCode = "";
}

function onLogin() {
  router.push({ path: "/login" });
}
</script>

<style lang="less" scoped>
.regist-box {
  width: 30vw;
  margin: 0px auto;

  @media screen and(max-width:960px) {
    width: 80vw;
  }

  h1 {
    margin-top: 25vh;
    font-size: 72px;
    font-weight: 700;
    text-align: center;
  }
}
</style>

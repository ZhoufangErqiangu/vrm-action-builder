import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { getSome, login as loginApi, type LoginData } from "../api/serve/user";

export const useUserStore = defineStore("user", () => {
  const uid = ref("");
  const token = ref("");
  const nickName = ref("");
  const avatar = ref("");
  const lastLoginTime = ref("");

  const isLogin = computed(() => {
    return !!token.value;
  });

  async function getUserInfo() {
    if (!isLogin.value) return;
    const { data } = await getSome({ id: uid.value });
    if (data.length === 0) return;
    nickName.value = data[0].nickName ?? "";
    avatar.value = data[0].avatar ?? "";
    lastLoginTime.value = data[0].lastLoginTime ?? "";
    return {
      nickName: nickName.value,
      avatar: avatar.value,
      lastLoginTime: new Date(lastLoginTime.value),
    };
  }

  async function login(data: LoginData) {
    const res = await loginApi(data);
    uid.value = res.uid;
    token.value = res.token;
    lastLoginTime.value = res.lastLoginTime;
    // store in loacal
    localStorage.setItem("uid", res.uid ?? "");
    localStorage.setItem("access_token", res.token ?? "");
    void getUserInfo();
  }

  function logout() {
    uid.value = "";
    token.value = "";
    nickName.value = "";
    avatar.value = "";
    lastLoginTime.value = "";
    // clear local
    localStorage.removeItem("uid");
    localStorage.removeItem("access_token");
  }

  return {
    uid,
    token,
    nickName,
    avatar,
    lastLoginTime,
    isLogin,
    login,
    logout,
    getUserInfo,
  };
});

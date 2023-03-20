import request, { type Model, type ObjectId, type Response } from ".";

export interface LoginData {
  username: string;
  password: string;
  verifyCode?: string;
}

export interface LoginRes extends Response {
  uid: string;
  authority: number;
  token: string;
  lastLoginTime: string;
}

export async function login(data: LoginData): Promise<LoginRes> {
  if (data.verifyCode) {
    return await request({
      method: "post",
      url: "/user/login2",
      data: {
        ...data,
      },
    });
  }
  return await request({
    method: "post",
    url: "/user/login",
    data,
  });
}

export interface RegistData {
  username: string;
  password: string;
  password2: string;
  verifyCode: string;
  inviteId?: string;
}

export interface RegistRes extends Response {
  username?: string;
}

export async function regist(data: RegistData): Promise<RegistRes> {
  return await request({
    method: "post",
    url: "/user/regist",
    data: {
      ...data,
    },
  });
}

export interface Regist2Data {
  username: string;
  password: string;
  password2: string;
  verifyCode: string;
  inviteId: string;
}

export async function regist2(data: Regist2Data): Promise<RegistRes> {
  return await request({
    method: "post",
    url: "/user/regist2",
    data,
  });
}

export interface UpdateInfoData {
  nickName?: string;
  avatar?: string;
}

export async function updateInfo(data: UpdateInfoData): Promise<Response> {
  return await request({
    method: "put",
    url: "/user/info",
    data,
  });
}

export interface UpdatePasswordData {
  password: string;
  password2: string;
}

export async function updatePassword(
  data: UpdatePasswordData,
): Promise<Response> {
  return await request({
    method: "put",
    url: "/user/password",
    data,
  });
}

export interface GetSomeQuery {
  id: string;
}
export interface GetSomeRes extends Response {
  data: User[];
}
export async function getSome(params: GetSomeQuery) {
  return await request<GetSomeRes>({
    method: "get",
    url: "/user/some",
    params,
  });
}
export async function checkUsernameAvailable(params: { username: string }) {
  return await request<Response>({
    method: "get",
    url: "/user/check-name",
    params,
  });
}
export async function sendVerifyCode(username: string) {
  return await request<Response>({
    url: "/user/send-verify-code",
    method: "post",
    data: { username },
  });
}
export async function getInviteRecord() {
  return await request<Response>({
    url: "/user-invite/self",
    method: "get",
  });
}

// user crud
export type User = Model & {
  username: string;
  nickName?: string;
  avatar?: string;
  role?: ObjectId;
  lastLoginTime: string;
};

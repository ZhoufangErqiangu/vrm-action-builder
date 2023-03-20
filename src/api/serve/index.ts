import axios, { type AxiosRequestConfig } from "axios";
import router from "../../router";
import { useUserStore } from "../../store/user";

// types
export interface Response {
  code: number;
  msg: string;
  [key: string]: unknown;
}

export interface PageResponse<T> extends Response {
  items: T[];
  totalNum?: number;
  pageNum?: number;
  page?: number;
}

export interface PageRes<T> extends Response {
  currentPage: number;
  pageSize: number;
  total: number;
  records: T[];
  pageNum: number;
}

export interface PageQuery<T, R = Record<string, 1 | -1>> {
  form: T;
  page: {
    currentPage: number;
    pageSize: number;
  };
  sort: R;
}

export type ObjectId = string;

export interface Model {
  _id: ObjectId;
  __v: string;
  createdAt: Date;
  updatedAt: Date;
}

// axios
axios.defaults.withCredentials = true;

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 60000,
});

service.interceptors.request.use(
  (config) => {
    if (config.headers) {
      config.headers.authorization = useUserStore().token || "";
      // } else {
      //   config.headers = { authorization: store.getters.userToken || "" };
    }
    return config;
  },
  async (error) => {
    console.error("axios error", error);
    return await Promise.reject(error);
  },
);

service.interceptors.response.use(
  (response) => {
    switch (response.status) {
      case 201:
        if (!response.data) response.data = { code: 1, msg: "create ok" };
        return response;
      case 204:
        if (!response.data) response.data = { code: 1, msg: "no content" };
        return response;
      case 210:
        // duplicate requests
        return response;
      case 303:
        // see other url
        return response;
      default:
        return response;
    }
  },
  (error) => {
    if (error?.response) {
      switch (error.response.status) {
        case 400:
          error.message = "bad request";
          break;
        case 401:
          error.message = "unauthorized";
          void router.push({ path: "/login" });
          break;
        case 403:
          error.message = "access denied";
          break;
        case 404:
          error.message = `wrong request url: ${
            error.response.config.url as string
          }`;
          break;
        case 405:
          error.message = "access denied";
          break;
        // case 408:
        //   error.message = "request exceed max time ";
        //   break;
        case 410:
          error.message = "null";
          break;
        case 415:
          error.message = "unsupported media type";
          break;
        case 422:
          error.message = "unprocessable entity";
          break;
        case 429:
          error.message = "too many request";
          break;
        case 500:
          error.message = "server internal error";
          break;
        // case 501:
        //   error.message = "server error";
        //   break;
        // case 502:
        //   error.message = "router error";
        //   break;
        case 503:
          error.message = "service not available";
          break;
        // case 504:
        //   error.message = "router exceed max time";
        //   break;
        // case 505:
        //   error.message = "http version is not supported";
        //   break;
        default:
          error.message = "unknown error";
          break;
      }
      throw new Error(error.message);
    }
  },
);

async function request<T extends Response | null>(
  config: AxiosRequestConfig,
): Promise<T> {
  try {
    const res = await service.request<T>(config);
    return res.data;
  } catch (err) {
    if (import.meta.env.NODE_ENV === "development") {
      console.error("request error", err);
    }
    throw new Error("request error");
  }
}

export interface AddRequestRes extends Response {
  _id: string;
}
export async function baseAdd(model: string, data: unknown) {
  return await request<AddRequestRes>({
    url: `/${model}`,
    method: "post",
    data,
  });
}

export interface DeleteData {
  _id: string;
}
export interface DeleteRes extends Response {
  _id: string;
}
export async function baseDelete(model: string, data: DeleteData) {
  return await request<DeleteRes>({
    url: `/${model}`,
    method: "delete",
    data,
  });
}

export interface UpdateData {
  _id: string;
  [key: string]: unknown;
}
export interface UpdateRes extends Response {
  _id: string;
}
export async function baseUpdate(model: string, data: UpdateData) {
  return await request<UpdateRes>({
    url: `/${model}`,
    method: "put",
    data,
  });
}

export type GetQuery = Record<string, string>;
export async function baseGet(model: string, params: PageQuery<GetQuery>) {
  return await request<PageRes<unknown>>({
    url: `/${model}`,
    method: "get",
    params,
  });
}

export default request;

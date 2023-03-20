import request, { type Model, type Response } from ".";

export enum BookingStatus {
  Init = 0,
  Used,
}

export type Booking = Model & {
  code: string;
  status: BookingStatus;
  name?: string;
  phone?: string;
  lesson: number[];
  enteryNo: number;
};

export interface CheckQuery {
  code: string;
}
export async function check(params: CheckQuery) {
  return await request<Response>({
    url: "/booking/check",
    method: "get",
    params,
  });
}

export interface PostNewData {
  name: string;
  phone: string;
  allow: boolean;
  code: string;
}
export interface PostNewRes extends Response {
  data?: Booking;
}
export async function postNew(data: PostNewData) {
  return await request<PostNewRes>({
    url: "/booking/new",
    method: "post",
    data,
  });
}

export interface PostLessonData {
  _id: string;
  lesson: number[];
}
export interface PostLessonRes extends Response {
  data?: Booking;
}
export async function postLesson(data: PostLessonData) {
  return await request<PostLessonRes>({
    url: "/booking/lesson",
    method: "post",
    data,
  });
}

export interface GetLessonCountQuery {
  lesson: string;
  [key: string]: string;
}
export interface GetLessonCountRes extends Response {
  data: boolean;
}
export async function getLessonCount(params: GetLessonCountQuery) {
  return await request<GetLessonCountRes>({
    url: "/booking/lesson/count",
    method: "get",
    params,
  });
}

export interface GetByIdQuery {
  _id: string;
}
export type BookingGet = Model & {
  status: BookingStatus;
  lesson: number[];
  enteryNo: number;
};
export interface GetByIdRes extends Response {
  data?: BookingGet | null;
}
export async function getById(params: GetByIdQuery) {
  return await request<GetByIdRes>({
    url: "/booking/id",
    method: "get",
    params,
  });
}

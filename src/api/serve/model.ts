import request, { type Response } from ".";

interface GetModelDictRes extends Response {
  data: string[]
}
export async function getModelDict () {
  return await request<GetModelDictRes>({
    url: "/model/dict",
    method: "get"
  });
}

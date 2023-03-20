import request, { type Response } from ".";

export interface GetVersionRes extends Response {
  version?: string
}

export async function PublicGetVersion (): Promise<GetVersionRes> {
  return await request({
    method: "get",
    url: "/version"
  });
}

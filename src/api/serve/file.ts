import request, { type Response } from ".";

type UploadFileData = Record<string, File | File[]>;
export interface UploadFileRes extends Response {
  data: Record<string, string | string[]>
}
export async function uploadFile (data: UploadFileData) {
  return await request<UploadFileRes>({
    url: "/file/upload",
    method: "post",
    headers: {
      "content-type": "multipart/form-data"
    },
    data
  });
}

export function fileUrl (fileName: string) {
  return `${import.meta.env.VITE_APP_BASE_API}/file/${fileName}`;
}

export const fileUploadUrl = `${import.meta.env.VITE_APP_BASE_API}/file/upload`;

import request, { type Model, type ObjectId, type Response } from ".";

export interface Role extends Model {
  name: string
  desc?: string
  model: string[]
}

interface GetRoleDictRes extends Response {
  data: Array<{ _id: ObjectId, name: string }>
}
export async function getRoleDict () {
  return await request<GetRoleDictRes>({
    url: "/role/dict",
    method: "get"
  });
}

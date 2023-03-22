import { VRMHumanBoneList } from "@pixiv/three-vrm";

export const vrmHumanBoneNameOption = VRMHumanBoneList.map((e) => {
  return { label: e, value: e };
});

export * from "./base";
export * from "./animate";

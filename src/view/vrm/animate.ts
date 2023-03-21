import { VRMHumanBoneName, type VRM } from "@pixiv/three-vrm";
import type * as THREE from "three";

export function animate(
  vrm: VRM,
  renderer: THREE.Renderer,
  scene: THREE.Scene,
  camera: THREE.Camera,
  clock: THREE.Clock,
) {
  requestAnimationFrame(() => {
    animate(vrm, renderer, scene, camera, clock);
  });
  const deltaTime = clock.getDelta();
  // tweak bones
  const s = 0.25 * Math.PI * Math.sin(Math.PI * clock.elapsedTime);
  const neck = vrm.humanoid.getNormalizedBoneNode(VRMHumanBoneName.Neck);
  const leftUpperArm = vrm.humanoid.getNormalizedBoneNode(
    VRMHumanBoneName.LeftUpperArm,
  );
  const rightUpperArm = vrm.humanoid.getNormalizedBoneNode(
    VRMHumanBoneName.RightUpperArm,
  );
  if (neck) neck.rotation.y = s;
  if (leftUpperArm) leftUpperArm.rotation.z = s;
  if (rightUpperArm) rightUpperArm.rotation.x = s;
  // update vrm
  vrm.update(deltaTime);
  // renderer
  renderer.render(scene, camera);
}

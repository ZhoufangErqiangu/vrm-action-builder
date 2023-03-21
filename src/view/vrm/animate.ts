import { VRMHumanBoneName, type VRM } from "@pixiv/three-vrm";
import type * as THREE from "three";

export interface AnimateUseInstance {
  vrm: VRM;
  renderer: THREE.Renderer;
  scene: THREE.Scene;
  camera: THREE.Camera;
  clock: THREE.Clock;
}

export class Animate {
  public vrm: VRM;
  public renderer: THREE.Renderer;
  public scene: THREE.Scene;
  public camera: THREE.Camera;
  public clock: THREE.Clock;

  public running = false;

  constructor({ vrm, renderer, scene, camera, clock }: AnimateUseInstance) {
    this.vrm = vrm;
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.clock = clock;
    this.start();
  }

  public start() {
    if (this.running) return;
    this.running = true;
    const animate = () => {
      if (this.running) requestAnimationFrame(animate);
      const deltaTime = this.clock.getDelta();
      // tweak bones
      const s = 0.25 * Math.PI * Math.sin(Math.PI * this.clock.elapsedTime);
      const neck = this.vrm.humanoid.getNormalizedBoneNode(
        VRMHumanBoneName.Neck,
      );
      const leftUpperArm = this.vrm.humanoid.getNormalizedBoneNode(
        VRMHumanBoneName.LeftUpperArm,
      );
      const rightUpperArm = this.vrm.humanoid.getNormalizedBoneNode(
        VRMHumanBoneName.RightUpperArm,
      );
      if (neck) neck.rotation.y = s;
      if (leftUpperArm) leftUpperArm.rotation.z = s;
      if (rightUpperArm) rightUpperArm.rotation.x = s;
      // update vrm
      this.vrm.update(deltaTime);
      // renderer
      this.renderer.render(this.scene, this.camera);
    };
    animate();
  }

  public stop() {
    this.running = false;
  }
}

import { VRMHumanBoneName } from "@pixiv/three-vrm";
import { type VrmBase } from "./base";

export class VrmEndlessAnimate {
  public base: VrmBase;

  public running = false;

  constructor(base: VrmBase) {
    this.base = base;
    this.start();
  }

  public start() {
    if (!this.base.isReady) return;
    if (this.running) return;
    this.running = true;
    const animate = () => {
      if (this.running) requestAnimationFrame(animate);
      const deltaTime = this.base.clock.getDelta();
      // tweak bones
      const s =
        0.25 * Math.PI * Math.sin(Math.PI * this.base.clock.elapsedTime);
      const neck = this.base.vrm.humanoid.getNormalizedBoneNode(
        VRMHumanBoneName.Neck,
      );
      const leftUpperArm = this.base.vrm.humanoid.getNormalizedBoneNode(
        VRMHumanBoneName.LeftUpperArm,
      );
      const rightUpperArm = this.base.vrm.humanoid.getNormalizedBoneNode(
        VRMHumanBoneName.RightUpperArm,
      );
      if (neck) neck.rotation.y = s;
      if (leftUpperArm) leftUpperArm.rotation.z = s;
      if (rightUpperArm) rightUpperArm.rotation.x = s;
      // update vrm
      this.base.vrm.update(deltaTime);
    };
    animate();
  }

  public stop() {
    this.running = false;
  }
}

import { type VrmBase } from "./base";

export type AnimateFunction = (this: VrmAnimate) => void;
export class VrmAnimate {
  public base: VrmBase;

  // flag
  public running = false;

  // function
  private readonly animate: AnimateFunction;

  constructor(base: VrmBase, animate: AnimateFunction) {
    this.base = base;
    this.animate = animate;
    this.start();
  }

  public start() {
    if (!this.base.isReady || this.running) return;
    this.running = true;
    const anm = () => {
      if (this.running) requestAnimationFrame(anm);
      // do animate
      this.animate();
      // update vrm
      this.base.vrm.update(this.base.clock.getDelta());
    };
    anm();
  }

  public stop() {
    this.running = false;
  }
}

import {
  VRMLoaderPlugin,
  VRMUtils,
  type VRM,
  type VRMHumanBoneName,
  VRMHumanBoneList,
} from "@pixiv/three-vrm";
import {
  AxesHelper,
  Clock,
  DirectionalLight,
  GridHelper,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  sRGBEncoding,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
  GLTFLoader,
  type GLTF,
  type GLTFParser,
} from "three/examples/jsm/loaders/GLTFLoader";

export interface VrmBaseInitParams {
  modelUrl: string;
  onProgress?: (ev: ProgressEvent<EventTarget>) => void;
}
export class VrmBase {
  // instance
  public vrm!: VRM;
  public renderer: THREE.WebGLRenderer;
  public scene: THREE.Scene;
  public camera: THREE.Camera;
  public clock: THREE.Clock;
  public loader: GLTFLoader;

  // dom
  public element: HTMLElement;
  public elementWidth: number;
  public elementHeight: number;

  // flag
  private ready = false;

  // function
  private readonly animate: () => void;

  constructor(vrmBox: HTMLElement) {
    // dom
    this.element = vrmBox;
    this.elementWidth = vrmBox.clientWidth;
    this.elementHeight = vrmBox.clientHeight;
    // renderer
    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.outputEncoding = sRGBEncoding;
    this.renderer.setSize(this.elementWidth, this.elementHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    vrmBox.appendChild(this.renderer.domElement);
    // camera
    this.camera = new PerspectiveCamera(
      30.0,
      this.elementWidth / this.elementHeight,
      0.1,
      20.0,
    );
    this.camera.position.set(0.0, 1.0, 5.0);
    // camera controls
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.screenSpacePanning = true;
    controls.target.set(0.0, 1.0, 0.0);
    controls.update();
    // scene
    this.scene = new Scene();
    // light
    const light = new DirectionalLight(0xffffff);
    light.position.set(1.0, 1.0, 1.0).normalize();
    this.scene.add(light);
    // helpers
    const gridHelper = new GridHelper(10, 10);
    this.scene.add(gridHelper);
    const axesHelper = new AxesHelper(5);
    this.scene.add(axesHelper);
    // gltf and vrm
    this.loader = new GLTFLoader();
    this.loader.crossOrigin = "anonymous";
    this.loader.register((parser: GLTFParser) => {
      return new VRMLoaderPlugin(parser);
    });
    // clock
    this.clock = new Clock();
    // animate
    this.animate = () => {
      requestAnimationFrame(this.animate);
      this.vrm.update(this.clock.getDelta());
      this.renderer.render(this.scene, this.camera);
    };
  }

  public async init({
    modelUrl,
    onProgress = (ev: ProgressEvent) => {
      console.debug("Loading model...", 100.0 * (ev.loaded / ev.total), "%");
    },
  }: VrmBaseInitParams) {
    this.clock.start();
    await new Promise<void>((resolve, reject) => {
      this.loader.load(
        // URL of the VRM you want to load
        modelUrl,
        // called when the resource is loaded
        (gltf: GLTF) => {
          this.vrm = gltf.userData.vrm as VRM;
          // calling these functions greatly improves the performance
          VRMUtils.removeUnnecessaryVertices(gltf.scene);
          VRMUtils.removeUnnecessaryJoints(gltf.scene);
          // Disable frustum culling
          this.vrm.scene.traverse((obj: any) => {
            obj.frustumCulled = false;
          });
          this.scene.add(this.vrm.scene);
          this.animate();
          console.debug("vrm", this.vrm);
          this.ready = true;
          resolve();
        },
        // called while loading is progressing
        onProgress,
        // called when loading has errors
        (ev: ErrorEvent) => {
          reject(ev);
        },
      );
    });
  }

  get isReady() {
    return this.ready && !!this.vrm;
  }

  public moveSingleBone(
    boneName: VRMHumanBoneName,
    param: VrmBaseMoveSingleBoneParam,
  ) {
    const fn = () => {
      if (!this.ready) return;
      // use bone
      const bone = this.vrm.humanoid.getNormalizedBoneNode(boneName);
      if (!bone) {
        console.warn("null bone", boneName);
        return;
      }
      // change vrm
      if (param.moveType === "absolute") {
        bone.rotation.x = param.rotation.x;
        bone.rotation.y = param.rotation.y;
        bone.rotation.z = param.rotation.z;
      } else if (param.moveType === "relative") {
        bone.rotation.x += param.rotation.x;
        bone.rotation.y += param.rotation.y;
        bone.rotation.z += param.rotation.z;
      }
    };
    requestAnimationFrame(fn);
  }

  public resetSingleBone(boneName: VRMHumanBoneName) {
    this.moveSingleBone(boneName, {
      moveType: "absolute",
      rotation: { x: 0.0, y: 0.0, z: 0.0 },
    });
  }

  public resetAllBone() {
    VRMHumanBoneList.forEach((e) => {
      this.resetSingleBone(e);
    });
  }

  public moveMultipleBone(data: VrmBaseMoveSingleBoneData[]) {
    data.forEach((e) => {
      if (!e.boneName) return;
      this.moveSingleBone(e.boneName, e.param);
    });
  }

  public getCurrentBonePos() {
    const pos: VrmBaseBonePos = {};
    for (const key of VRMHumanBoneList) {
      const bone = this.vrm.humanoid.getNormalizedBoneNode(key);
      if (bone) {
        pos[key] = {
          rotation: {
            x: bone.rotation.x,
            y: bone.rotation.y,
            z: bone.rotation.z,
          },
        };
      }
    }
    return pos;
  }

  public runAction(param: VrmBaseActionParam) {
    const startTime = this.clock.getElapsedTime() * 1000.0;
    const startPos = this.getCurrentBonePos();
    const fn = () => {
      const nowTime = this.clock.getElapsedTime() * 1000.0;
      const dT = nowTime - startTime;
      if (nowTime > startTime + param.time) return;
      // loop action
      const moveList: VrmBaseMoveSingleBoneData[] = [];
      for (const action of param.action) {
        if (!action.boneName) break;
        const startP = startPos[action.boneName];
        if (!startP) break;
        const x =
          ((action.param.rotation.x - startP.rotation.x) / param.time) * dT;
        const y =
          ((action.param.rotation.y - startP.rotation.y) / param.time) * dT;
        const z =
          ((action.param.rotation.z - startP.rotation.z) / param.time) * dT;
        moveList.push({
          uuid: "",
          boneName: action.boneName,
          param: { moveType: "absolute", rotation: { x, y, z } },
        });
      }
      this.moveMultipleBone(moveList);
      requestAnimationFrame(fn);
    };
    requestAnimationFrame(fn);
  }
}

export interface VrmBaseMoveSingleBoneParam {
  moveType: "absolute" | "relative";
  rotation: {
    x: number;
    y: number;
    z: number;
  };
}

export interface VrmBaseMoveSingleBoneData {
  uuid: string;
  boneName?: VRMHumanBoneName;
  param: VrmBaseMoveSingleBoneParam;
}

/**
 * time time in ms
 */
export interface VrmBaseActionParam {
  uuid: string;
  name: string;
  time: number;
  action: VrmBaseMoveSingleBoneData[];
}

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export type VrmBaseBonePos = {
  [key in VRMHumanBoneName]?: {
    rotation: {
      x: number;
      y: number;
      z: number;
    };
  };
};

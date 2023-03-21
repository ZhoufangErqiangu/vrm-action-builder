import { VRMLoaderPlugin, VRMUtils, type VRM } from "@pixiv/three-vrm";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
  GLTFLoader,
  type GLTF,
  type GLTFParser,
} from "three/examples/jsm/loaders/GLTFLoader";

export interface InitParams {
  onProgress?: (ev: ProgressEvent) => void;
}
export interface InitRes {
  vrm: VRM;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  light: THREE.DirectionalLight;
  loader: GLTFLoader;
  clock: THREE.Clock;
}
export async function init(
  modelUrl: string,
  vrmBox: HTMLElement,
  {
    onProgress = (ev: ProgressEvent) => {
      console.log("Loading model...", 100.0 * (ev.loaded / ev.total), "%");
    },
  }: InitParams = {},
) {
  const vrmBoxSize = { width: vrmBox.clientWidth, height: vrmBox.clientHeight };
  // render
  const renderer = new THREE.WebGLRenderer();
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.setSize(vrmBoxSize.width, vrmBoxSize.height);
  renderer.setPixelRatio(window.devicePixelRatio);
  vrmBox.appendChild(renderer.domElement);

  // camera
  const camera = new THREE.PerspectiveCamera(
    30.0,
    vrmBoxSize.width / vrmBoxSize.height,
    0.1,
    20.0,
  );
  camera.position.set(0.0, 1.0, 5.0);
  // camera controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.screenSpacePanning = true;
  controls.target.set(0.0, 1.0, 0.0);
  controls.update();

  // scene
  const scene = new THREE.Scene();

  // light
  const light = new THREE.DirectionalLight(0xffffff);
  light.position.set(1.0, 1.0, 1.0).normalize();
  scene.add(light);
  // gltf and vrm
  const loader = new GLTFLoader();
  loader.crossOrigin = "anonymous";
  loader.register((parser: GLTFParser) => {
    return new VRMLoaderPlugin(parser);
  });

  // helpers
  const gridHelper = new THREE.GridHelper(10, 10);
  scene.add(gridHelper);
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  // animate
  const clock = new THREE.Clock();
  clock.start();

  return await new Promise<InitRes>((resolve, reject) => {
    loader.load(
      // URL of the VRM you want to load
      modelUrl,
      // called when the resource is loaded
      (gltf: GLTF) => {
        const vrm: VRM = gltf.userData.vrm;

        // calling these functions greatly improves the performance
        VRMUtils.removeUnnecessaryVertices(gltf.scene);
        VRMUtils.removeUnnecessaryJoints(gltf.scene);

        // Disable frustum culling
        vrm.scene.traverse((obj: any) => {
          obj.frustumCulled = false;
        });

        scene.add(vrm.scene);
        resolve({ vrm, renderer, camera, scene, light, loader, clock });
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

import { VRMLoaderPlugin, VRMUtils } from "@pixiv/three-vrm";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { type GLTFParser } from "three/examples/jsm/loaders/GLTFLoader";

export function init(vrmBox: HTMLElement) {
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
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  let currentVrm;
  const loader = new GLTFLoader();
  loader.crossOrigin = "anonymous";
  loader.register((parser: GLTFParser) => {
    return new VRMLoaderPlugin(parser);
  });
  loader.load(
    // URL of the VRM you want to load
    "/model/alicia-solid.vrm",
    // called when the resource is loaded
    (gltf: any) => {
      const vrm = gltf.userData.vrm;

      // calling these functions greatly improves the performance
      VRMUtils.removeUnnecessaryVertices(gltf.scene);
      VRMUtils.removeUnnecessaryJoints(gltf.scene);

      // Disable frustum culling
      vrm.scene.traverse((obj: any) => {
        obj.frustumCulled = false;
      });

      currentVrm = vrm;
      console.debug("vrm", vrm);
      scene.add(vrm.scene);
    },
    // called while loading is progressing
    (progress: any) => {
      console.log(
        "Loading model...",
        100.0 * (progress.loaded / progress.total),
        "%",
      );
    },
    // called when loading has errors
    (error: any) => {
      console.error(error);
    },
  );

  // helpers
  const gridHelper = new THREE.GridHelper(10, 10);
  scene.add(gridHelper);
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  // animate
  const clock = new THREE.Clock();
  clock.start();

  const animate = () => {
    requestAnimationFrame(animate);
    // update vrm components
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (currentVrm) {
      currentVrm.update(clock.getDelta());
    }
    // render
    renderer.render(scene, camera);
  };

  animate();
}

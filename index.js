import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

let model;

const viewport = document.querySelector('[data-3d="c"]');
const stl = getComputedStyle(div);
const [w, h] = [parseInt(stl.width), parseInt(stl.height)];

// Camera
const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
camera.position.set(5, 6, 7);

// Scene
const scene = new THREE.Scene();

// Model loader
const loader = new GLTFLoader();
loader.load(
  "https://cdn.prod.website-files.com/65bd1a06f6cf505c41a8973d/67489b79bd1c4bfeb988213d_bca_service_letter_copy.txt",
  function (gltf) {
    model = gltf.scene;
    model.position.set(0, 0, 0);
    model.scale.set(0.6, 0.6, 0.6);
    scene.add(model);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// Renderer
const renderer = new THREE.WebGLRenderer({ viewport, antialias: true });
renderer.setSize(w, h, false);
renderer.setAnimationLoop(animate);
viewport.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

scene.background = new THREE.Color("#fbfaf8");

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.065;
controls.minDistance = 2;
controls.maxDistance = 6;
controls.maxPolarAngle = Math.PI / 2;
controls.minPolarAngle = 0;

function resizeCanvasToDisplaySize() {
  const canvas = renderer.domElement;
  // look up the size the canvas is being displayed
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  // adjust displayBuffer size to match
  if (canvas.width !== width || canvas.height !== height) {
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    // update any render target sizes here
  }
}

// Animation loop
function animate() {
  resizeCanvasToDisplaySize();
  if (model) {
    model.rotation.y += 0.0025;
  }
  controls.update();
  renderer.render(scene, camera);
}

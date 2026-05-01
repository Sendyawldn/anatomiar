// js/main.js
import { MindARThree } from "mindar-image-three";
import { loadOrgan } from "./organ-loader.js";
import CONFIG from "./config.js";
import * as THREE from "three"; // <-- Pastikan THREE di-import

const mindarThree = new MindARThree({
  container: document.querySelector("#container"),
  imageTargetSrc: CONFIG.MARKER_PATH,
});

const { renderer, scene, camera } = mindarThree;

// === TAMBAHKAN CAHAYA DI SINI ===
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5); // Cahaya merata
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2); // Cahaya dari satu arah
directionalLight.position.set(0, 5, 10);
scene.add(directionalLight);
// =================================

const anchor = mindarThree.addAnchor(0);

// Load 3D model organ
loadOrgan("./assets/models/heart.glb", anchor.group);

const startAR = async () => {
  await mindarThree.start();
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
};

startAR();

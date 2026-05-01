// js/organ-loader.js
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import CONFIG from "./config.js";
import { createWireframeLineMaterial } from "./wireframe-material.js";

export function loadOrgan(modelPath, parentGroup) {
  const loader = new GLTFLoader();

  loader.load(modelPath, (gltf) => {
    const model = gltf.scene;

    model.traverse((child) => {
      if (child.isMesh) {
        // 1. Ambil geometri dari model asli
        const wireframe = new THREE.WireframeGeometry(child.geometry);

        // 2. Buat garis wireframe (warnanya tetap dari config, misal: cyan/putih)
        const wireframeMesh = new THREE.LineSegments(
          wireframe,
          createWireframeLineMaterial(),
        );

        // 3. KITA TIDAK LAGI MENIMPA MATERIAL ASLI DI SINI
        // child.material = createSolidTransparentMaterial(); <-- Baris ini dihapus

        // 4. Tambahkan garis wireframe sebagai 'anak' dari mesh asli
        child.add(wireframeMesh);
      }
    });

    model.scale.set(CONFIG.ORGAN_SCALE, CONFIG.ORGAN_SCALE, CONFIG.ORGAN_SCALE);
    model.rotation.x = -Math.PI / 2;

    // Sesuaikan posisi model (opsional, tergantung titik origin dari file glb)
    // model.position.set(0, 0, 0.1);

    parentGroup.add(model);
  });
}

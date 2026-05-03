// js/organ-loader.js
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import CONFIG from './config.js';

export function loadOrgan(modelPath, parentGroup) {
  const loader = new GLTFLoader();

  loader.load(modelPath, (gltf) => {
    const model = gltf.scene;

    // KITA HAPUS SEMUA KODE WIREFRAME DAN MATERIAL DI SINI
    // Biarkan model tampil persis seperti bawaan dari file .glb aslinya

    // Atur skala dan rotasi saja
    model.scale.set(CONFIG.ORGAN_SCALE, CONFIG.ORGAN_SCALE, CONFIG.ORGAN_SCALE);
    model.rotation.x = -Math.PI / 2;
    
    // Masukkan ke dalam AR
    parentGroup.add(model);
  });
}
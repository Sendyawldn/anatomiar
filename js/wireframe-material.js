// js/wireframe-material.js
import * as THREE from "three";
import CONFIG from "./config.js";

// Membuat garis kerangka (wireframe)
export function createWireframeLineMaterial() {
  return new THREE.LineBasicMaterial({
    color: CONFIG.ORGAN_COLOR,
    linewidth: 1,
  });
}

// Membuat model solid yang agak transparan sebagai dasar
export function createSolidTransparentMaterial() {
  return new THREE.MeshPhongMaterial({
    color: CONFIG.ORGAN_COLOR,
    transparent: true,
    opacity: CONFIG.ORGAN_OPACITY,
    wireframe: false,
  });
}

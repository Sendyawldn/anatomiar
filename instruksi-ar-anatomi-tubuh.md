# INSTRUKSI PROYEK: AR ANATOMI TUBUH 3D (ANATOMIAR)
Single Source of Truth — Dokumen ini adalah acuan utama pengerjaan proyek AnatomAR.

**Posisi Asisten:** Senior AR/Web Developer (MindAR.js + Three.js + Unity + Vuforia Expert).

---

## 1. Ringkasan Proyek & Role Pengguna

Membangun sistem Augmented Reality berbasis marker/gambar untuk menampilkan model 3D organ tubuh manusia (hati, usus, paru-paru, jantung, dll) dengan efek wireframe ketika pengguna mengarahkan kamera ke gambar anatomi tubuh — seperti efek kartu AR pada produk Boboiboy Coki-coki.

Proyek dibagi menjadi **2 fase**:
- **Phase 1 — Web AR:** Prototype cepat berbasis browser menggunakan MindAR.js + Three.js
- **Phase 2 — Native App:** Aplikasi mobile menggunakan Unity + Vuforia (Android/iOS)

### Peran Pengguna (Hanya 2):

**Developer / Admin:** Mengelola marker gambar, mengunggah dan mengatur 3D model organ, mengonfigurasi tampilan wireframe, dan mengatur pengalaman AR secara keseluruhan.

**End User / Viewer:** Membuka aplikasi atau link web, mengarahkan kamera ke gambar anatomi tubuh, dan melihat organ 3D wireframe muncul di atas gambar secara real-time.

---

## 2. Struktur Folder Proyek

Proyek ini menggunakan arsitektur 2 fase dengan folder terpisah untuk Web AR dan Native App.

```
anatomiar/
├── phase1-web-ar/                  # Phase 1: Web AR berbasis browser
│   ├── index.html                  # Entry point utama aplikasi web AR
│   ├── assets/
│   │   ├── markers/                # Gambar marker (target scan)
│   │   │   └── anatomy-card.jpg    # Gambar kartu anatomi tubuh
│   │   ├── models/                 # File 3D model organ
│   │   │   ├── heart.glb           # Model jantung
│   │   │   ├── liver.glb           # Model hati
│   │   │   ├── lungs.glb           # Model paru-paru
│   │   │   ├── intestine.glb       # Model usus
│   │   │   └── kidney.glb          # Model ginjal
│   │   └── textures/               # Texture wireframe dan material
│   │       └── wireframe.png
│   ├── js/
│   │   ├── main.js                 # Logic utama AR + Three.js
│   │   ├── organ-loader.js         # Script load dan tampilkan 3D model
│   │   └── wireframe-material.js   # Pengaturan material wireframe
│   ├── css/
│   │   └── style.css               # Styling UI overlay (nama organ, tombol)
│   └── mind-target/
│       └── anatomy.mind            # File target hasil compile MindAR
│
├── phase2-native/                  # Phase 2: Unity + Vuforia (Native App)
│   ├── Assets/
│   │   ├── Scenes/
│   │   │   └── MainAR.unity        # Scene utama AR
│   │   ├── Models/                 # 3D model organ (.fbx / .obj)
│   │   │   ├── Heart.fbx
│   │   │   ├── Liver.fbx
│   │   │   ├── Lungs.fbx
│   │   │   └── Intestine.fbx
│   │   ├── Materials/              # Material wireframe Unity
│   │   │   └── WireframeMat.mat
│   │   ├── Scripts/                # C# scripts Unity
│   │   │   ├── AROrganManager.cs   # Kelola tampil/sembunyikan organ
│   │   │   ├── WireframeToggle.cs  # Toggle wireframe on/off
│   │   │   └── OrganInfoPanel.cs   # Tampilkan info nama organ
│   │   └── StreamingAssets/
│   │       └── Vuforia/            # Konfigurasi Vuforia database
│   └── ProjectSettings/
│
├── shared-assets/                  # Asset yang dipakai di kedua fase
│   ├── models-source/              # File sumber 3D model (format asli)
│   └── marker-images/              # Master gambar marker
│
└── docs/
    ├── README.md                   # Panduan penggunaan proyek
    └── setup-guide.md              # Panduan setup environment
```

---

## 3. Stack Teknologi

### Phase 1 — Web AR

| Kategori | Teknologi | Versi |
|----------|-----------|-------|
| **AR Framework** | MindAR.js | Latest Stable |
| **3D Rendering** | Three.js | r128+ |
| **3D Model Format** | glTF / GLB | 2.0 |
| **Bahasa** | HTML5, CSS3, JavaScript (ES6+) |  |
| **Hosting** | GitHub Pages / Netlify / Vercel | Gratis |
| **Editor** | VS Code + Live Server Extension | |

### Phase 2 — Native App

| Kategori | Teknologi | Versi |
|----------|-----------|-------|
| **Game Engine** | Unity | 2022 LTS+ |
| **AR SDK** | Vuforia Engine | 10.x+ |
| **Bahasa** | C# | |
| **Build Target** | Android (APK) / iOS (IPA) | |
| **3D Model Format** | FBX atau OBJ | |
| **IDE Tambahan** | Android Studio (untuk build Android) | |

### Tools Umum (Kedua Fase)

- **3D Model Editor:** Blender (gratis) — untuk edit model dan set wireframe
- **Marker Compiler:** MindAR Image Target Compiler (online, gratis) — untuk Phase 1
- **Vuforia Target Manager:** portal.vuforia.com — untuk Phase 2
- **3D Model Sumber:** Sketchfab, BodyParts3D, atau NIH 3D Print Exchange (gratis)

---

## 4. Penjelasan Teknologi Inti

### 🔵 MindAR.js (Phase 1)

MindAR.js adalah library JavaScript open-source untuk membuat Web AR berbasis image tracking. Cara kerjanya:
- Pengguna upload gambar marker (foto anatomi tubuh)
- MindAR compile gambar menjadi file `.mind` (tracking database)
- Saat kamera mendeteksi gambar tersebut, Three.js menampilkan objek 3D di atasnya

### 🟡 Three.js (Phase 1)

Three.js adalah library JavaScript untuk rendering 3D di browser menggunakan WebGL. Digunakan untuk:
- Load model 3D organ (format GLB/glTF)
- Mengaplikasikan material wireframe (`MeshWireframeGeometry` atau `WireframeGeometry`)
- Animasi rotate / pulse pada model 3D

### 🟠 Vuforia Engine (Phase 2)

Vuforia adalah AR SDK paling populer untuk Unity. Mendukung:
- Image Target (scan gambar) — cocok untuk kasus ini
- Extended Tracking — model tetap terlihat meskipun marker tertutup sebagian
- Multi-target — bisa scan beberapa gambar berbeda untuk organ berbeda

### 🟢 Wireframe Effect

Efek wireframe (model terlihat seperti kerangka garis-garis) dibuat dengan:
- **Three.js:** `new THREE.WireframeGeometry(geometry)` + `LineSegments`
- **Unity:** Custom Shader Graph atau material dengan `Wireframe` shader
- Bisa dikombinasikan: model solid transparan + wireframe di atasnya

---

## 5. Workflow Operasional

**Persiapan Marker:**
Desain atau siapkan gambar anatomi tubuh yang akan dijadikan target scan. Gambar harus memiliki banyak detail/tekstur agar mudah dideteksi kamera. Hindari gambar polos atau terlalu simetris.

**Persiapan 3D Model:**
Download model 3D organ dari Sketchfab atau sumber gratis lainnya. Import ke Blender untuk cleaning, resize, dan pengaturan material wireframe. Export ke format GLB (Phase 1) atau FBX (Phase 2).

**Compile Marker (Phase 1):**
Upload gambar marker ke MindAR Image Target Compiler di `hiukim.github.io/mind-ar-js-doc/tools/compile`. Hasil download berupa file `.mind` yang digunakan di aplikasi web.

**Develop Web AR (Phase 1):**
Buat `index.html` dengan integrasi MindAR.js dan Three.js. Load file `.mind` sebagai tracking target. Saat marker terdeteksi, tampilkan 3D model organ dengan material wireframe di atas marker.

**Setup Unity + Vuforia (Phase 2):**
Install Unity + Vuforia package. Daftarkan gambar marker di Vuforia Target Manager untuk mendapatkan rating tracking (bintang 1–5). Import 3D model organ dan buat scene AR dengan Image Target Vuforia.

**Testing:**
Phase 1: buka di browser HP, arahkan ke gambar marker.
Phase 2: build APK, install di HP Android, arahkan ke gambar marker.

---

## 6. Pipeline AR (Alur Lengkap)

```
Gambar Marker (Kartu Anatomi Tubuh)
        ↓
[DETEKSI MARKER]
  Kamera HP menangkap gambar
  MindAR.js / Vuforia mendeteksi marker
  Kalkulasi posisi & orientasi marker (pose estimation)
        ↓
[TRACKING]
  Sistem melacak posisi marker secara real-time
  Model 3D "dikunci" mengikuti posisi marker
        ↓
[RENDERING 3D]
  Load model organ (GLB / FBX)
  Aplikasikan material wireframe
  Three.js / Unity render model di atas marker
        ↓
[OUTPUT AR]
  🫀 Model Jantung 3D wireframe muncul
  🫁 Model Paru-paru 3D wireframe muncul
  + Label nama organ (opsional)
  + Animasi rotate / pulse (opsional)
  + Info organ saat di-tap (opsional)
```

---

## 7. Kode Dasar Phase 1 (Web AR)

### index.html — Struktur Dasar

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>AnatomAR</title>
    <!-- MindAR + Three.js -->
    <script src="https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-three.prod.js"></script>
  </head>
  <body style="margin:0; overflow:hidden;">
    <div id="container" style="width:100vw; height:100vh;"></div>

    <script type="module">
      import { loadOrgan } from './js/organ-loader.js';

      const mindarThree = new window.MINDAR.IMAGE.MindARThree({
        container: document.querySelector('#container'),
        imageTargetSrc: './mind-target/anatomy.mind',  // file target marker
      });

      const { renderer, scene, camera } = mindarThree;

      // Anchor = posisi di mana 3D muncul saat marker terdeteksi
      const anchor = mindarThree.addAnchor(0);

      // Load model organ dengan wireframe
      loadOrgan('./assets/models/heart.glb', anchor.group);

      // Jalankan AR
      await mindarThree.start();
      renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
      });
    </script>
  </body>
</html>
```

### organ-loader.js — Load Model + Wireframe

```javascript
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function loadOrgan(modelPath, parentGroup) {
  const loader = new GLTFLoader();

  loader.load(modelPath, (gltf) => {
    const model = gltf.scene;

    // Terapkan material wireframe ke semua mesh dalam model
    model.traverse((child) => {
      if (child.isMesh) {
        // Wireframe geometry
        const wireframe = new THREE.WireframeGeometry(child.geometry);
        const lineMat = new THREE.LineBasicMaterial({
          color: 0x00ffff,   // warna garis (cyan)
          linewidth: 1,
        });
        const wireframeMesh = new THREE.LineSegments(wireframe, lineMat);

        // Model asli transparan
        child.material = new THREE.MeshPhongMaterial({
          color: 0x00ffff,
          transparent: true,
          opacity: 0.1,
          wireframe: false,
        });

        child.add(wireframeMesh);
      }
    });

    // Skala dan posisi model
    model.scale.set(0.05, 0.05, 0.05);
    model.rotation.x = -Math.PI / 2;

    parentGroup.add(model);
  });
}
```

---

## 8. Setup Vuforia — Phase 2

### Langkah Daftar & Upload Marker

```
1. Buka portal.vuforia.com → Login / Daftar akun
2. Pilih "Target Manager" → "Add Database" → beri nama "AnatomAR"
3. Pilih tipe "Device" → Add Target
4. Upload gambar marker (JPG/PNG, min. 320px)
5. Set width = 0.1 (ukuran dalam meter, sesuaikan dengan ukuran cetak)
6. Download database → pilih "Unity Editor"
7. Import file .unitypackage ke project Unity
```

### Rating Target Vuforia
- ⭐⭐⭐⭐⭐ = Sangat bagus (gambar detail, banyak fitur)
- ⭐⭐⭐ = Cukup (masih bisa digunakan)
- ⭐ atau ⭐⭐ = Kurang bagus (perlu redesign gambar marker)

> **Target:** Gunakan gambar marker dengan rating minimal ⭐⭐⭐

### AROrganManager.cs — Script Unity

```csharp
using UnityEngine;
using Vuforia;

public class AROrganManager : MonoBehaviour
{
    public GameObject organModel;     // 3D model organ yang ditampilkan
    public Material wireframeMat;     // Material wireframe

    private ObserverBehaviour mObserverBehaviour;

    void Start()
    {
        mObserverBehaviour = GetComponent<ObserverBehaviour>();

        if (mObserverBehaviour)
        {
            mObserverBehaviour.OnTargetStatusChanged += OnTargetStatusChanged;
        }
    }

    private void OnTargetStatusChanged(ObserverBehaviour behaviour, TargetStatus targetStatus)
    {
        // Tampilkan model saat marker terdeteksi
        if (targetStatus.Status == Status.TRACKED ||
            targetStatus.Status == Status.EXTENDED_TRACKED)
        {
            organModel.SetActive(true);
        }
        else
        {
            organModel.SetActive(false);
        }
    }

    void Update()
    {
        // Animasi rotasi model
        if (organModel.activeSelf)
        {
            organModel.transform.Rotate(Vector3.up * 30f * Time.deltaTime);
        }
    }
}
```

---

## 9. Panduan 3D Model

### Sumber Download Model Gratis

| Sumber | URL | Format | Catatan |
|--------|-----|--------|---------|
| Sketchfab | sketchfab.com | GLB, FBX, OBJ | Filter "Free" dan "Downloadable" |
| BodyParts3D | lifesciencedb.jp/bp3d | OBJ | Spesifik anatomi tubuh |
| NIH 3D Print Exchange | 3d.nih.gov | STL, OBJ | Model medis akurat |
| Thingiverse | thingiverse.com | STL | Perlu konversi format |

### Workflow Blender (Edit Model)

```
1. Import model ke Blender (File → Import → pilih format)
2. Bersihkan geometry: Remove Doubles, Fix Normals
3. Resize model ke skala yang wajar
4. Tambah material wireframe (opsional di Blender, bisa dilakukan di code)
5. Export:
   - Phase 1 → Export as GLB (File → Export → glTF 2.0)
   - Phase 2 → Export as FBX (File → Export → FBX)
```

### Ukuran File yang Disarankan

| Model | Target Ukuran File |
|-------|--------------------|
| Per organ (Web AR) | < 5 MB (agar load cepat di browser) |
| Per organ (Native) | < 20 MB |
| Tekstur | < 2 MB per file |

---

## 10. Desain Marker (Gambar Target)

### Syarat Gambar Marker yang Baik

- **Detail tinggi:** Gambar anatomi dengan banyak detail (vena, tulang, organ) lebih mudah dideteksi
- **Kontras kuat:** Hindari gambar terlalu terang atau terlalu gelap
- **Tidak simetris:** Gambar yang simetris menyulitkan tracking orientasi
- **Resolusi:** Minimal 500 × 500 pixel, disarankan 1000 × 1000 pixel
- **Format:** JPG atau PNG

### Contoh Marker yang Cocok

```
✅ Ilustrasi anatomi torso manusia dengan organ berwarna
✅ Diagram medis dengan label organ
✅ Foto model anatomi 3D yang dicetak
❌ Gambar polos satu warna
❌ Gambar terlalu gelap/terlalu terang
❌ Gambar yang sangat simetris (misal: wajah tampak depan penuh)
```

---

## 11. Environment Variables & Konfigurasi

### Phase 1 (Web AR) — config.js

```javascript
// js/config.js
const CONFIG = {
  MARKER_PATH: './mind-target/anatomy.mind',
  ORGAN_COLOR: 0x00ffff,           // Warna wireframe (hex) — cyan
  ORGAN_OPACITY: 0.15,             // Transparansi model solid
  ROTATION_SPEED: 0.3,             // Kecepatan rotasi animasi (radian/detik)
  ORGAN_SCALE: 0.05,               // Skala model (sesuaikan per model)
  SHOW_LABEL: true,                // Tampilkan label nama organ
};

export default CONFIG;
```

### Phase 2 (Unity) — AppConfig.cs

```csharp
// Scripts/AppConfig.cs
public static class AppConfig
{
    public static Color WireframeColor = new Color(0f, 1f, 1f); // Cyan
    public static float RotationSpeed = 30f;     // Derajat per detik
    public static float OrganScale = 0.05f;
    public static bool ShowOrganLabel = true;
}
```

---

## 12. Timeline Pengembangan

| Minggu | Phase | Target |
|--------|-------|--------|
| 1 | Setup | Install VS Code, Node.js, setup folder proyek Phase 1 |
| 2 | Phase 1 | Download 3D model organ, edit di Blender, export GLB |
| 3 | Phase 1 | Desain gambar marker, compile ke file `.mind` di MindAR |
| 4 | Phase 1 | Buat `index.html` + integrasi MindAR.js + Three.js |
| 5 | Phase 1 | Implementasi wireframe material + animasi rotasi |
| 6 | Phase 1 | Testing di HP, perbaikan skala & posisi model, deploy ke GitHub Pages |
| 7 | Phase 2 | Install Unity + Vuforia, setup project, upload marker ke Vuforia |
| 8 | Phase 2 | Import 3D model ke Unity, buat material wireframe |
| 9 | Phase 2 | Implementasi C# script (tracking, tampil/sembunyikan organ) |
| 10 | Phase 2 | Tambah fitur: label organ, info panel, animasi |
| 11 | Phase 2 | Build APK Android, testing di HP, bug fixing |
| 12 | Finalisasi | Dokumentasi, demo presentasi, finalisasi kedua fase |

---

## 13. Alur Penggunaan (User Flow)

```
=== PHASE 1 — WEB AR ===

1. Developer compile gambar marker → upload ke MindAR compiler → download file .mind
2. Developer siapkan model 3D organ (GLB) dengan material wireframe
3. Developer deploy aplikasi ke GitHub Pages / Netlify
4. User buka link web di HP (Chrome / Safari)
5. User izinkan akses kamera
6. User arahkan kamera ke gambar anatomi tubuh
7. Organ 3D wireframe muncul di atas gambar secara real-time ✅

=== PHASE 2 — NATIVE APP ===

1. Developer upload marker ke Vuforia Target Manager
2. Developer import 3D model ke Unity + setup scene AR
3. Developer build APK → install di HP Android
4. User buka app → izinkan akses kamera
5. User arahkan kamera ke gambar anatomi tubuh
6. Organ 3D wireframe muncul dengan kualitas lebih smooth ✅
7. User tap organ → muncul info nama & fungsi organ (opsional)
```

---

## 14. Fitur Opsional (Enhancement)

| Fitur | Kesulitan | Tools |
|-------|-----------|-------|
| Label nama organ melayang | Mudah | CSS overlay / Unity UI |
| Animasi organ berdenyut (jantung) | Sedang | Three.js AnimationMixer / Unity Animator |
| Tap organ untuk melihat info | Sedang | Raycasting + popup UI |
| Multi-marker (organ berbeda per kartu) | Sedang | MindAR multi-target / Vuforia multi-target |
| Suara narasi nama organ | Mudah | HTML5 Audio / Unity AudioSource |
| Efek partikel/glow pada organ | Sulit | Three.js Shader / Unity Particle System |
| Mode X-Ray (toggle wireframe) | Mudah | Toggle material di Three.js / Unity |

---

## 15. Troubleshooting Umum

| Masalah | Kemungkinan Penyebab | Solusi |
|---------|----------------------|--------|
| Marker tidak terdeteksi | Gambar kurang detail / pencahayaan buruk | Ganti gambar marker, perbaiki pencahayaan |
| Model 3D tidak muncul | Path file salah / format tidak didukung | Cek console browser, pastikan format GLB |
| Model terlalu besar/kecil | Scale tidak tepat | Sesuaikan `ORGAN_SCALE` di config |
| AR lag/lambat di HP | Model 3D terlalu berat (polygon banyak) | Reduce polygon di Blender, compress texture |
| Kamera tidak bisa diakses | Browser tidak dapat izin kamera | Buka di HTTPS, bukan HTTP |
| Vuforia rating rendah | Gambar marker kurang detail | Redesain marker dengan lebih banyak fitur visual |

---

## 16. Dependensi Phase 1 (Web AR)

```html
<!-- CDN — tambahkan di <head> index.html -->

<!-- MindAR.js (Image Tracking) -->
<script src="https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-three.prod.js"></script>

<!-- Three.js (jika perlu import terpisah) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
```

```
npm packages (jika pakai bundler seperti Vite):
mind-ar                 # AR image tracking
three                   # 3D rendering
@google/model-viewer    # Opsional: tampil model 3D tanpa AR
```

### Unity Packages (Phase 2)

```
- Vuforia Engine AR        → via Unity Package Manager
- TextMeshPro              → untuk UI label organ
- Universal Render Pipeline (URP) → untuk wireframe shader yang bagus
```

---

## 17. Catatan Khusus

- **Kualitas marker adalah kunci:** Sama seperti dataset di ML, marker yang buruk = tracking yang buruk. Investasikan waktu untuk membuat/memilih gambar marker yang baik.
- **Phase 1 harus HTTPS:** MindAR.js membutuhkan akses kamera, dan browser hanya mengizinkan akses kamera di halaman HTTPS. Gunakan GitHub Pages atau Netlify yang otomatis HTTPS.
- **Optimalkan model 3D:** Model organ dengan jutaan polygon akan membuat web AR lag. Target maksimal 50.000 polygon per organ untuk Phase 1 (web).
- **Reuse model:** 3D model yang dibuat untuk Phase 1 bisa digunakan ulang di Phase 2 — cukup convert format dari GLB ke FBX menggunakan Blender.
- **Test di HP nyata, bukan emulator:** AR harus ditest di HP fisik karena membutuhkan kamera nyata. Emulator tidak cukup.
- **Vuforia gratis dengan batas:** Vuforia memiliki tier gratis dengan watermark. Untuk produk komersial, perlu lisensi berbayar.
- **Simpan semua iterasi:** Screenshot dan rekam setiap milestone (marker terdeteksi, model muncul, wireframe aktif) untuk dokumentasi dan presentasi.
- **Pertimbangkan UX:** Tambahkan instruksi singkat di layar ("Arahkan kamera ke gambar anatomi") agar pengguna tahu cara menggunakannya.

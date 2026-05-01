# AnatomAR

AnatomAR adalah proyek Web AR berbasis MindAR.js dan Three.js untuk menampilkan model 3D organ tubuh manusia di atas marker gambar anatomi.

## Fitur

- Web AR berbasis browser.
- Deteksi marker gambar menggunakan MindAR.
- Menampilkan model 3D organ dalam format GLB.
- Efek wireframe cyan dengan material transparan.
- Overlay UI sederhana untuk instruksi pengguna.

## Struktur Project

```text
anatomiar/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── config.js
│   ├── main.js
│   ├── organ-loader.js
│   └── wireframe-material.js
├── assets/
│   ├── markers/
│   │   └── anatomy-card.jpg
│   ├── models/
│   │   ├── heart.glb
│   │   ├── liver.glb
│   │   ├── lungs.glb
│   │   ├── intestine.glb
│   │   └── kidney.glb
│   └── textures/
└── mind-target/
    └── anatomy.mind
```

## Kebutuhan

- Browser modern yang mendukung ES Modules dan WebGL.
- Kamera perangkat untuk mode AR.
- Server lokal atau hosting statis. Jangan buka langsung dengan `file://` karena module import akan gagal.

## Cara Menjalankan

### Opsi 1: VS Code Live Server

1. Buka folder project di VS Code.
2. Install extension Live Server jika belum ada.
3. Klik kanan `index.html`.
4. Pilih **Open with Live Server**.
5. Izinkan akses kamera saat diminta.

### Opsi 2: Server lokal sederhana

Jika kamu memakai server statis lain, pastikan root yang disajikan adalah folder `anatomiar`.

## Cara Kerja

1. Browser memuat `index.html`.
2. MindAR membaca file target di `mind-target/anatomy.mind`.
3. Saat marker terdeteksi, model `heart.glb` dimuat ke anchor.
4. `organ-loader.js` menambahkan wireframe ke model.
5. `css/style.css` menampilkan overlay instruksi di layar.

## Konfigurasi Utama

Pengaturan utama ada di `js/config.js`.

- `MARKER_PATH`: lokasi file target MindAR.
- `ORGAN_COLOR`: warna wireframe organ.
- `ORGAN_OPACITY`: transparansi material solid.
- `ROTATION_SPEED`: kecepatan rotasi animasi.
- `ORGAN_SCALE`: skala model 3D.
- `SHOW_LABEL`: opsi tampilan label organ.

## Asset yang Tersedia

- Marker gambar: `assets/markers/anatomy-card.jpg`
- Target MindAR: `mind-target/anatomy.mind`
- Model 3D:
  - `assets/models/heart.glb`
  - `assets/models/liver.glb`
  - `assets/models/lungs.glb`
  - `assets/models/intestine.glb`
  - `assets/models/kidney.glb`

## Catatan Teknis

- Project ini memakai import map untuk Three.js dan MindAR.
- Import `three/addons/` sudah dipetakan di `index.html` agar modul addon Three.js bisa di-resolve dengan benar.
- Jika kamu mengganti model, pastikan skala dan orientasinya disesuaikan di `js/organ-loader.js` dan `js/config.js`.

## Lisensi

Belum ditentukan.

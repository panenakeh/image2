# Aplikasi Text-to-Image Gratis dan Unlimited

Aplikasi text-to-image ringan yang dapat menghasilkan gambar line art dari deskripsi teks. Aplikasi ini dirancang agar bisa berjalan baik secara online (di hosting) maupun offline (tanpa hosting), tanpa membebani PC, dan mendukung penggunaan unlimited.

## Fitur Utama

- **Gratis dan Unlimited**: Tidak ada batasan penggunaan atau biaya berlangganan
- **Ringan**: Dapat berjalan di browser tanpa membutuhkan resource berat
- **Fleksibel**: Bisa dipasang di hosting atau dijalankan secara lokal
- **Line Art Generator**: Fokus pada pembuatan gambar line art dari deskripsi teks
- **Multi-style**: Mendukung berbagai gaya line art (simple, detailed, cartoon, anime)

## Struktur Direktori

```
text_to_image_app/
├── architecture_design.md   # Desain arsitektur aplikasi
├── model_evaluation.md      # Evaluasi model text-to-image
├── prototype/               # Prototype aplikasi
│   ├── assets/              # Aset aplikasi (JS, CSS, model)
│   │   └── app.js           # Logika aplikasi
│   └── index.html           # Halaman utama aplikasi
├── README.md                # Dokumentasi utama (file ini)
└── todo.md                  # Daftar tugas pengembangan
```

## Cara Menggunakan

### Menjalankan Secara Lokal

1. Clone atau download repository ini
2. Buka file `prototype/index.html` di browser
3. Masukkan deskripsi gambar yang diinginkan
4. Pilih gaya line art
5. Klik tombol "Generate Line Art"

### Menjalankan di Hosting

1. Upload seluruh isi folder `prototype` ke hosting Anda
2. Akses melalui URL hosting Anda
3. Aplikasi siap digunakan

## Teknologi yang Digunakan

- HTML5, CSS3, dan JavaScript murni (tanpa framework)
- Web Storage API untuk penyimpanan lokal
- Desain responsif untuk desktop dan mobile
- Mendukung PWA untuk penggunaan offline (dalam pengembangan)

## Pengembangan Lanjutan

Aplikasi ini masih dalam tahap prototype. Beberapa fitur yang akan ditambahkan:

1. Integrasi model AI line art ringan yang sebenarnya
2. Optimasi performa untuk perangkat dengan resource terbatas
3. Fitur penyimpanan dan ekspor hasil
4. Dukungan PWA lengkap untuk penggunaan offline
5. Backend opsional untuk peningkatan performa

## Lisensi

Aplikasi ini bersifat open source dan dapat digunakan untuk keperluan pribadi maupun komersial.

## Kontak

Jika Anda memiliki pertanyaan atau saran, silakan hubungi pengembang melalui pesan.

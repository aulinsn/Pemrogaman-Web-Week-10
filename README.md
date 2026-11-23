# Manajemen Produk — Fullstack (Express + Prisma + React)

Aplikasi manajemen produk fullstack dengan ExpressJS, PostgreSQL (Prisma ORM), React Router, Tailwind CSS, dan arsitektur Atomic Design.

## Fitur Utama (Tugas 4)

- **Dashboard (`/`)**: Ringkasan total produk, total nilai aset, dan daftar produk terbaru.
- **Manajemen Produk (`/products`)**: Pencarian produk serta operasi CRUD lengkap (Tambah, Lihat, Edit, Hapus) yang terintegrasi langsung dengan REST API backend.
- **Detail Produk (`/products/:id`)**: Halaman detail dinamis menggunakan `useParams` dengan penanganan error jika ID tidak ditemukan.
- **Halaman 404 (`*`)**: Halaman fallback saat mengakses URL yang tidak terdaftar.
- **Layout Bersama (`Outlet`)**: Sidebar navigasi responsif dengan Tailwind CSS.

## Cara Menjalankan Aplikasi

### 1. Menjalankan Backend (Root Repository)

```bash
npm install
npx prisma migrate deploy
npm run dev
```

Backend berjalan secara default di `http://localhost:3000`.

### 2. Menjalankan Frontend (`frontend/`)

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Buka alamat Vite yang muncul di terminal 

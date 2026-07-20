# 🚀 Project Planning: Tikinaja

**Tikinaja** adalah web *application* untuk mengunduh video TikTok tanpa *watermark* (dan audio MP3) dengan cepat dan mudah. Proyek ini mengutamakan kecepatan, UI/UX yang modern, dan animasi yang *smooth*.

## 🛠️ Tech Stack & Infrastructure

Berdasarkan arsitektur yang direncanakan, berikut adalah teknologi yang akan digunakan:

### Frontend & Core Framework
*   **Framework:** Next.js 15.1.11 (React)
*   **Styling:** Tailwind CSS (untuk modern UI/UX & *rapid styling*)
*   **Animations:** Framer Motion (untuk transisi halaman dan interaksi elemen yang *smooth*)

### API & Data
*   **Data Source:** TikWM API (`https://www.tikwm.com/`) untuk *fetch* data video tanpa *watermark*.

### Deployment, Hosting, & Performance
*   **PaaS:** Vercel (Hosting utama, *seamless integration* dengan Next.js)
*   **CDN & Security:** Cloudflare
*   **Performance & Network:** HTTP/3, Priority Hints (untuk optimasi *loading speed*)

---

## 🎯 Core Features (MVP)

1.  **Search Bar & URL Parsing:** Input *field* untuk memasukkan link TikTok.
2.  **Video Preview:** Menampilkan *thumbnail*, nama *creator*, dan deskripsi singkat dari video yang akan diunduh.
3.  **Download Options:**
    *   Download Video (No Watermark).
    *   Download Audio (MP3).
4.  **Loading & Error States:** Animasi *loading* dengan Framer Motion dan penanganan *error* (misal: URL tidak valid atau API *down*).

---

## 📅 Development Phases

### Phase 1: Setup & Initialization 
*   [ ] Inisiasi *project* Next.js 15.
*   [ ] Setup Tailwind CSS dan konfigurasi tema (warna, tipografi).
*   [ ] *Install* dependensi tambahan: `framer-motion`, `axios` (atau menggunakan *native* `fetch`), `lucide-react` (untuk ikon).
*   [ ] Setup repository (GitHub) dan hubungkan ke Vercel untuk CI/CD.

### Phase 2: UI/UX & Layouting 
*   [ ] Buat *layout* utama (Navbar, Footer, Main Container).
*   [ ] Desain *Hero section* dengan *Search Bar* yang interaktif.
*   [ ] Buat *component* `VideoCard` untuk menampilkan hasil *fetch*.
*   [ ] Tambahkan animasi *micro-interactions* menggunakan Framer Motion (efek *hover* pada tombol, *fade-in* saat *loading* selesai).

### Phase 3: API Integration (TikWM) 
*   [ ] Buat *utility function* atau *API Route* di Next.js untuk memanggil TikWM API.
*   [ ] *Handle* proses *parsing* URL TikTok.
*   [ ] Implementasi logika *fetching* data saat tombol "Download" ditekan.
*   [ ] *State management* untuk menyimpan hasil data (*thumbnail*, URL *download*).

### Phase 4: Optimization & Deployment 
*   [ ] Konfigurasi DNS di Cloudflare untuk domain `tikinaja` (misal: `tikinaja.com` atau `.io`).
*   [ ] Aktifkan HTTP/3 di Cloudflare.
*   [ ] Implementasi **Priority Hints** (`fetchpriority="high"`) pada *Hero image* atau skrip krusial untuk LCP (*Largest Contentful Paint*) yang lebih baik.
*   [ ] *Testing mobile responsiveness* dan performa secara keseluruhan.
*   [ ] *Go Live*! 🎉

---

## 📝 Catatan Tambahan
*   Pastikan untuk menangani CORS jika melakukan *fetch* langsung dari *client-side*. Jika ada kendala, gunakan Next.js API Routes sebagai *proxy*.
*   Fokus pada desain *landing page* yang *clean* dan intuitif agar *user* bisa langsung paham cara pakainya dalam 3 detik pertama.
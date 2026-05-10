# Plan Pengembangan Website Program Studi

## Stack Teknologi
- **Frontend:** Next.js + Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** MySQL
- **Auth:** NextAuth.js
- **Storage:** Local / S3-compatible (foto dosen, fasilitas, PDF)
- **Deployment:** VPS / Shared Hosting + Nginx


## Komponen UI (Prioritas Build)

### Fase 1 – Layout Dasar
- [ ] Navbar (sticky, dropdown Visi Misi, hamburger mobile)
- [ ] Footer (3 kolom, sosmed, copyright bar)
- [ ] Wave divider SVG component
- [ ] Loading skeleton

### Fase 2 – Halaman Beranda
- [ ] HeroSection (foto + overlay + judul + tagline)
- [ ] StatistikCard x3 (Pendaftar, Diterima, Lulusan)
- [ ] GrafikMahasiswa (bar chart – Recharts / Chart.js)
- [ ] JadwalPerkuliaanPanel (info semester + tombol unduh)
- [ ] KalenderMini (navigasi bulan)
- [ ] KunjunganCounter
- [ ] FeatureCard x3 (Dosen, Kurikulum, Fasilitas)
- [ ] FeedBerita slider (RSS / manual)

### Fase 3 – Halaman Visi Misi
- [ ] PageHeader component (reusable)
- [ ] KartuVisiMisi x7 (border kiri biru, bullet list)

### Fase 4 – Halaman Profil Dosen
- [ ] DosenCard (foto, badge status, keahlian tag, karya, CTA)
- [ ] DosenGrid (responsive 4→2→1 kolom)
- [ ] Placeholder avatar fallback

### Fase 5 – Halaman Kurikulum
- [ ] TabelCPL (kode klikable + deskripsi)
- [ ] SemesterAccordion x8 (header badge SKS + tabel MK)
- [ ] BadgeJenisMK (wajib/pilihan/praktikum)
- [ ] Tombol unduh kurikulum PDF

### Fase 6 – Halaman Fasilitas
- [ ] TabFilter (Fasilitas / Tri Dharma)
- [ ] FasilitasCard (foto, judul, deskripsi, CTA)
- [ ] FasilitasGrid (responsive 3→2→1 kolom)
- [ ] Halaman detail fasilitas

### Fase 7 – Portal Login & Admin Panel
- [ ] Form login (email + password)
- [ ] Dashboard admin (sidebar navigasi)
- [ ] CRUD Dosen (form + tabel + upload foto)
- [ ] CRUD Mata Kuliah (form + tabel per semester)
- [ ] CRUD Fasilitas (form + upload foto)
- [ ] Input Statistik Mahasiswa
- [ ] Upload Jadwal Kuliah PDF

---

## Checklist Sebelum Go-Live

- [ ] Semua konten nyata sudah dimasukkan (dosen, MK, fasilitas)
- [ ] Foto dikompresi (WebP, max 200KB per gambar)
- [ ] SSL/HTTPS aktif
- [ ] SEO: meta title & description per halaman
- [ ] OG tags untuk sharing media sosial
- [ ] PageSpeed mobile ≥ 80
- [ ] Test di Chrome, Firefox, Safari, mobile Android & iOS
- [ ] Backup database terjadwal
- [ ] Variabel environment production sudah diset (.env)
- [ ] Domain & DNS sudah diarahkan ke server
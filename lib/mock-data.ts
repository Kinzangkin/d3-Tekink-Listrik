import { 
  Dosen, 
  Keahlian, 
  StatistikMahasiswa, 
  JadwalPerkuliahan, 
  Publikasi, 
  Penelitian, 
  Pengabdian, 
  BukuAjar, 
  Hki, 
  Sertifikat, 
  Fasilitas, 
  TriDharma 
} from "./types"

export const mockKeahlian: Keahlian[] = [
  { id: 1, nama_keahlian: "IoT" },
  { id: 2, nama_keahlian: "Robotika" },
  { id: 3, nama_keahlian: "Kontroler" },
  { id: 4, nama_keahlian: "Keamanan Jaringan" },
  { id: 5, nama_keahlian: "Jaringan Komputer" },
  { id: 6, nama_keahlian: "Web Programming" },
  { id: 7, nama_keahlian: "Mobile Programming" },
  { id: 8, nama_keahlian: "Basis Data" },
  { id: 9, nama_keahlian: "Elektronika Analog" },
  { id: 10, nama_keahlian: "Data Science" },
  { id: 11, nama_keahlian: "Kecerdasan Buatan" },
  { id: 12, nama_keahlian: "Sistem Tertanam" },
  { id: 13, nama_keahlian: "Cloud Computing" }
]

export const mockDosen: Dosen[] = [
  {
    id: "dosen-1",
    user_id: "user-1",
    nama: "Dr. Budi Santoso, S.T., M.Eng.",
    nidn: "0012345678",
    jabatan_fungsional: "Lektor Kepala",
    pangkat_golongan: "IV/a",
    email: "budi.santoso@polimdo.ac.id",
    no_hp: "081234567890",
    foto_url: "https://i.pravatar.cc/150?u=dosen-1",
    created_at: "2024-01-01T00:00:00Z",
    keahlian: [mockKeahlian[0], mockKeahlian[11]]
  },
  {
    id: "dosen-2",
    user_id: "user-2",
    nama: "Ir. Andi Wijaya, M.T.",
    nidn: "0023456789",
    jabatan_fungsional: "Lektor",
    pangkat_golongan: "III/c",
    email: "andi.wijaya@polimdo.ac.id",
    no_hp: "082345678901",
    foto_url: "https://i.pravatar.cc/150?u=dosen-2",
    created_at: "2024-01-02T00:00:00Z",
    keahlian: [mockKeahlian[2], mockKeahlian[8]]
  },
  {
    id: "dosen-3",
    user_id: "user-3",
    nama: "Siti Rahmawati, S.Kom., M.Cs.",
    nidn: "0034567890",
    jabatan_fungsional: "Asisten Ahli",
    pangkat_golongan: "III/b",
    email: "siti.rahmawati@polimdo.ac.id",
    no_hp: "083456789012",
    foto_url: "https://i.pravatar.cc/150?u=dosen-3",
    created_at: "2024-01-03T00:00:00Z",
    keahlian: [mockKeahlian[5], mockKeahlian[7]]
  },
  {
    id: "dosen-4",
    user_id: "user-4",
    nama: "Ali Akbar, S.T., M.T.",
    nidn: "0045678901",
    jabatan_fungsional: "Lektor",
    pangkat_golongan: "III/d",
    email: "ali.akbar@polimdo.ac.id",
    no_hp: "084567890123",
    foto_url: "https://i.pravatar.cc/150?u=dosen-4",
    created_at: "2024-01-04T00:00:00Z",
    keahlian: [mockKeahlian[1], mockKeahlian[10]]
  }
]

export const mockStatistik: StatistikMahasiswa[] = [
  { id: 1, tahun: 2020, jumlah_pendaftar: 250, jumlah_diterima: 120, jumlah_lulusan: 105, created_at: "2024-01-01T00:00:00Z" },
  { id: 2, tahun: 2021, jumlah_pendaftar: 310, jumlah_diterima: 150, jumlah_lulusan: 110, created_at: "2024-01-01T00:00:00Z" },
  { id: 3, tahun: 2022, jumlah_pendaftar: 356, jumlah_diterima: 180, jumlah_lulusan: 162, created_at: "2024-01-01T00:00:00Z" },
  { id: 4, tahun: 2023, jumlah_pendaftar: 410, jumlah_diterima: 178, jumlah_lulusan: 180, created_at: "2024-01-01T00:00:00Z" },
  { id: 5, tahun: 2024, jumlah_pendaftar: 445, jumlah_diterima: 192, jumlah_lulusan: 195, created_at: "2024-01-01T00:00:00Z" }
]

export const mockJadwal: JadwalPerkuliahan[] = [
  { id: 1, nama_jadwal: "Jadwal Semester Ganjil 2024/2025", tanggal_upload: "2024-08-01", file_url: "#", created_at: "2024-08-01T00:00:00Z" },
  { id: 2, nama_jadwal: "Jadwal Semester Genap 2023/2024", tanggal_upload: "2024-02-01", file_url: "#", created_at: "2024-02-01T00:00:00Z" },
  { id: 3, nama_jadwal: "Jadwal Ujian Akhir Semester Genap 2023/2024", tanggal_upload: "2024-06-15", file_url: "#", created_at: "2024-06-15T00:00:00Z" }
]

export const mockPublikasi: Publikasi[] = [
  {
    id: "pub-1",
    dosen_id: "dosen-1",
    judul: "Implementasi IoT pada Smart Grid berbasis Mikrokontroler",
    nama_jurnal_konferensi: "Jurnal Teknologi Informasi Vol. 12",
    deskripsi: "Penelitian tentang implementasi IoT pada sistem jaringan listrik pintar.",
    link_tautan: "https://doi.org/10.1234/jti.2024.01",
    tahun: 2024,
    created_at: "2024-04-01T00:00:00Z"
  },
  {
    id: "pub-2",
    dosen_id: "dosen-1",
    judul: "Analisis Efisiensi Panel Surya Monokristalin di Manado",
    nama_jurnal_konferensi: "Seminar Nasional Teknik Elektro",
    deskripsi: "Studi kasus efisiensi panel surya di kondisi iklim tropis.",
    link_tautan: "https://doi.org/10.1234/snte.2023.15",
    tahun: 2023,
    created_at: "2023-11-15T00:00:00Z"
  },
  {
    id: "pub-3",
    dosen_id: "dosen-4",
    judul: "Design and Development of an Internet of Autonomous City Light",
    nama_jurnal_konferensi: "International Journal of Engineering",
    deskripsi: "Pengembangan sistem pencahayaan kota otonom.",
    link_tautan: "https://doi.org/10.1234/ije.2023.42",
    tahun: 2023,
    created_at: "2023-06-10T00:00:00Z"
  }
]

export const mockPenelitian: Penelitian[] = [
  {
    id: "pen-1",
    dosen_id: "dosen-1",
    judul: "Sistem Monitoring Energi Berbasis IoT untuk Skala Rumah Tangga",
    tahun: 2024,
    deskripsi: "Penelitian terapan untuk membuat prototipe smart meter murah.",
    created_at: "2024-02-10T00:00:00Z",
    media_count: 2,
    anggota: [
      { dosen_id: "dosen-1", nama_dosen: "Dr. Budi Santoso", peran: "Ketua" },
      { dosen_id: "dosen-2", nama_dosen: "Ir. Andi Wijaya", peran: "Anggota" }
    ]
  },
  {
    id: "pen-2",
    dosen_id: "dosen-4",
    judul: "Otomasi Building Management System menggunakan PLC",
    tahun: 2023,
    deskripsi: "Riset otomasi gedung hemat energi.",
    created_at: "2023-05-20T00:00:00Z",
    media_count: 5,
    anggota: [
      { dosen_id: "dosen-4", nama_dosen: "Ali Akbar", peran: "Ketua" }
    ]
  }
]

export const mockPengabdian: Pengabdian[] = [
  {
    id: "peng-1",
    dosen_id: "dosen-1",
    judul_pengabdian: "Pelatihan Instalasi Listrik Aman untuk Warga Desa X",
    deskripsi: "Kegiatan penyuluhan dan pelatihan praktis.",
    tahun: 2024,
    created_at: "2024-03-12T00:00:00Z",
    media_count: 3
  },
  {
    id: "peng-2",
    dosen_id: "dosen-3",
    judul_pengabdian: "Pembuatan Web Profil UMKM di Kota Manado",
    deskripsi: "Membantu UMKM lokal untuk go digital.",
    tahun: 2023,
    created_at: "2023-08-25T00:00:00Z",
    media_count: 1
  }
]

export const mockBukuAjar: BukuAjar[] = [
  {
    id: "buku-1",
    dosen_id: "dosen-1",
    judul: "Dasar-Dasar Internet of Things (IoT)",
    tahun: 2023,
    deskripsi: "Buku panduan lengkap untuk mahasiswa D3.",
    peran_penulis: "Penulis Ketua",
    created_at: "2023-09-10T00:00:00Z"
  },
  {
    id: "buku-2",
    dosen_id: "dosen-2",
    judul: "Praktik Instalasi Listrik Industri",
    tahun: 2022,
    deskripsi: "Modul praktikum berstandar industri.",
    peran_penulis: "Penulis Ketua",
    created_at: "2022-12-05T00:00:00Z"
  }
]

export const mockHki: Hki[] = [
  {
    id: "hki-1",
    dosen_id: "dosen-1",
    judul_invensi: "Alat Penghemat Energi Listrik Rumah Tangga Pintar",
    inventor: "Dr. Budi Santoso, Ir. Andi Wijaya",
    jenis_hki: "Paten Sederhana",
    nomor_paten: "IDP000012345",
    tahun: 2024,
    file_url: "#",
    created_at: "2024-01-15T00:00:00Z"
  }
]

export const mockSertifikat: Sertifikat[] = [
  {
    id: "sert-1",
    dosen_id: "dosen-1",
    judul_sertifikat: "Certified IoT Specialist (CIS)",
    tahun: 2023,
    file_url: "#",
    created_at: "2023-11-20T00:00:00Z"
  },
  {
    id: "sert-2",
    dosen_id: "dosen-4",
    judul_sertifikat: "Siemens PLC Programmer Certification",
    tahun: 2022,
    file_url: "#",
    created_at: "2022-07-10T00:00:00Z"
  }
]

export const mockFasilitas: Fasilitas[] = [
  {
    id: "fas-1",
    judul_fasilitas: "Laboratorium Listrik Dasar",
    deskripsi: "Fasilitas untuk praktikum rangkaian listrik dasar.",
    created_at: "2024-01-01T00:00:00Z",
    media_count: 4,
    thumbnail_url: "https://picsum.photos/seed/lab1/400/300"
  },
  {
    id: "fas-2",
    judul_fasilitas: "Lab Sistem Kontrol & PLC",
    deskripsi: "Dilengkapi dengan kit PLC Schneider dan Siemens.",
    created_at: "2024-01-01T00:00:00Z",
    media_count: 6,
    thumbnail_url: "https://picsum.photos/seed/lab3/400/300"
  }
]

export const mockTriDharma: TriDharma[] = [
  {
    id: "tri-1",
    judul: "Hibah Kompetisi Inovasi Elektrok",
    deskripsi: "Prestasi dosen dan mahasiswa dalam meraih pendanaan riset nasional.",
    tanggal: "2024-02-15",
    created_at: "2024-02-16T00:00:00Z",
    media_count: 2,
    thumbnail_url: "https://picsum.photos/seed/award/400/300"
  }
]

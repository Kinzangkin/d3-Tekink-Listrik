export type Role = "admin" | "dosen" | "user"

export interface User {
  id: string
  email: string
  nama: string
  role: Role
  is_active: boolean
  last_login_at?: string
  created_at: string
}

export interface Keahlian {
  id: number
  nama_keahlian: string
}

export interface Dosen {
  id: string
  user_id?: string
  nama: string
  nidn: string | null
  jabatan_fungsional: string | null
  pangkat_golongan: string | null
  email: string | null
  no_hp: string | null
  foto_url: string | null
  created_at: string
  keahlian: Keahlian[]
}

export interface StatistikMahasiswa {
  id: number
  tahun: number
  jumlah_pendaftar: number
  jumlah_diterima: number
  jumlah_lulusan: number
  created_at: string
}

export interface JadwalPerkuliahan {
  id: number
  nama_jadwal: string
  tanggal_upload: string
  file_url: string
  created_at: string
}

export interface Publikasi {
  id: string
  dosen_id: string
  judul: string
  nama_jurnal_konferensi: string | null
  deskripsi: string | null
  link_tautan: string | null
  tahun: number | null
  created_at: string
}

export interface DosenAnggota {
  dosen_id: string
  nama_dosen: string
  peran: "Ketua" | "Anggota"
}

export interface Penelitian {
  id: string
  dosen_id: string
  judul: string
  tahun: number | null
  deskripsi: string | null
  created_at: string
  anggota: DosenAnggota[]
  media_count?: number
}

export interface Pengabdian {
  id: string
  dosen_id: string
  judul_pengabdian: string
  deskripsi: string | null
  tahun: number | null
  created_at: string
  media_count?: number
}

export interface BukuAjar {
  id: string
  dosen_id: string
  judul: string
  tahun: number | null
  deskripsi: string | null
  peran_penulis: "Penulis Ketua" | "Anggota"
  created_at: string
}

export interface Hki {
  id: string
  dosen_id: string
  judul_invensi: string
  inventor: string | null
  jenis_hki: string | null
  nomor_paten: string | null
  tahun: number | null
  file_url: string | null
  created_at: string
}

export interface Sertifikat {
  id: string
  dosen_id: string
  judul_sertifikat: string
  tahun: number | null
  file_url: string | null
  created_at: string
}

export interface Fasilitas {
  id: string
  judul_fasilitas: string
  deskripsi: string | null
  created_at: string
  media_count?: number
  // Untuk visualisasi sementara di UI
  thumbnail_url?: string
}

export interface TriDharma {
  id: string
  dosen_id: string
  jenis: "Penelitian" | "Pengabdian" | "Buku Ajar" | "Publikasi" | "HKI" | "Sertifikat"
  judul: string
  deskripsi: string | null
  tahun: number | null
  file_url: string | null
  anggota: DosenAnggota[]
  created_at: string
  media_count?: number
  thumbnail_url?: string
}

export interface Media {
  id: string
  entity_type: "penelitian" | "pengabdian" | "fasilitas" | "tri_dharma"
  entity_id: string
  file_url: string
  tipe_file: "image" | "pdf" | "video"
  urutan: number
  created_at: string
}

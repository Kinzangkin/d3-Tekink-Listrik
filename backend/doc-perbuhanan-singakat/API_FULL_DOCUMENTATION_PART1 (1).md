# 📘 API FULL DOCUMENTATION — Sistem Informasi Prodi D3 Teknik Listrik
# PART 1: Auth, Dosen, Keahlian, Statistik, Jadwal, Fasilitas, Tri Dharma

> **Base URL**: `https://ktorbackend-elektropoli.up.railway.app/api/v1`
> **Stack**: Ktor + Supabase (PostgreSQL) + JWT
> **Java**: 22.0.2

---

## 📌 Standar Response Wrapper

Semua response menggunakan format `ApiResponse<T>`:

### ✅ Sukses
```json
{
  "success": true,
  "message": "Pesan sukses",
  "data": { ... },
  "errors": null
}
```

### ❌ Gagal
```json
{
  "success": false,
  "message": "Pesan error",
  "data": null,
  "errors": null
}
```

### ❌ Forbidden (403)
```json
{
  "success": false,
  "message": "Akses ditolak: Role 'dosen' tidak memiliki ijin.",
  "data": null,
  "errors": null
}
```

### ❌ Unauthorized - Token Missing (401)
```json
{
  "success": false,
  "message": "Header Authorization (Bearer Token) tidak ditemukan",
  "data": null,
  "errors": null
}
```

### ❌ Unauthorized - Token Invalid (401)
```json
{
  "success": false,
  "message": "Token tidak valid, expired, atau Secret server tidak cocok.",
  "data": null,
  "errors": null
}
```

### ❌ Unauthorized - Format Salah (401)
```json
{
  "success": false,
  "message": "Format token salah. Gunakan 'Bearer <token>'",
  "data": null,
  "errors": null
}
```

### ❌ Not Found (404)
```json
{
  "success": false,
  "message": "Resource tidak ditemukan",
  "data": null,
  "errors": null
}
```

### ❌ Bad Request - Validasi Tahun (400)
```json
{
  "success": false,
  "message": "Tahun tidak valid (1900-2100)",
  "data": null,
  "errors": null
}
```

### ❌ Bad Request - Judul Kosong (400)
```json
{
  "success": false,
  "message": "Judul wajib diisi",
  "data": null,
  "errors": null
}
```

### ❌ Rate Limited (429)
```json
{
  "success": false,
  "message": "Too many requests",
  "data": null,
  "errors": null
}
```

---

## 🔐 A. AUTENTIKASI

### `POST /api/v1/auth/login`
- **Akses**: Public (Rate Limited: 5 req/60 detik per IP)
- **Content-Type**: `application/json`

**Request Body:**
```json
{
  "email": "admin@polimdo.ac.id",
  "password": "admin123"
}
```

**✅ Response 200 OK — Login Berhasil:**
```json
{
  "success": true,
  "message": "Login Berhasil",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "email": null,
    "role": null,
    "expiresAt": 1713837493000
  }
}
```

**❌ Response 403 Forbidden — Email/Password Salah:**
```json
{
  "success": false,
  "message": "Email atau password salah",
  "data": null,
  "errors": null
}
```

> **JWT Claims** (di dalam token):
> - `userId`: UUID user
> - `email`: email user
> - `role`: "admin" | "dosen" | "user"
> Token berlaku 24 jam

---

### `POST /api/v1/auth/forgot-password`
- **Akses**: Public (Rate Limited)
- **Content-Type**: `application/json`

**Request Body:**
```json
{
  "email": "dosen@polimdo.ac.id"
}
```

**✅ Response 200 OK:**
```json
{
  "success": true,
  "message": "Email reset password telah dikirim"
}
```
> **Catatan Teknis (PENTING)**: 
> - Pengiriman email menggunakan **Mailjet API** (Anti-Blokir Cloud).
> - Token dikirim **MURNI** via email. API tidak lagi mengembalikan token di response body demi keamanan.
> - Pastikan email pengirim yang terdaftar di Mailjet adalah `polimdoe@gmail.com`.

**❌ Response 400:**
```json
{ "success": false, "message": "Email tidak terdaftar" }
```

---

### `POST /api/v1/auth/resend-forgot-password`
- **Akses**: Public (Rate Limited)
- **Content-Type**: `application/json`

**Request Body:**
```json
{
  "email": "dosen@polimdo.ac.id"
}
```

**✅ Response 200 OK:**
```json
{
  "success": true,
  "message": "Email reset password telah dikirim ulang"
}
```

**❌ Response 400:**
```json
{ "success": false, "message": "Email tidak terdaftar" }
```

---

### `POST /api/v1/auth/reset-password`
- **Akses**: Public (Rate Limited)
- **Content-Type**: `application/json`

**Request Body:**
```json
{
  "token": "uuid-reset-token-dari-forgot-password",
  "new_password": "passwordBaru123"
}
```

**✅ Response 200 OK:**
```json
{ "success": true, "message": "Password berhasil diubah" }
```

**Alur Kerja Frontend:**
1. User input email di form "Lupa Password".
2. Frontend tembak `POST /auth/forgot-password`.
3. Backend kirim email via Mailjet ke user (isi email ada Token UUID).
4. User buka Gmail, copy Token.
5. User input Token dan Password Baru di form "Reset Password".
6. Frontend tembak `POST /auth/reset-password`.
7. Selesai. Password resmi berubah.

---

## 👨‍🏫 B. DOSEN

### `GET /api/v1/dosen`
- **Akses**: Public
- **Content-Type**: -

**✅ Response 200 OK:**
```json
{
  "success": true,
  "message": "Data dosen berhasil diambil",
  "data": [
    {
      "id": "uuid-dosen-1",
      "nama": "Dr. Budi Santoso",
      "nidn": "0012345678",
      "jabatanFungsional": "Lektor Kepala",
      "pangkatGolongan": "IV/a",
      "email": "budi@polimdo.ac.id",
      "noHp": "08123456789",
      "fotoUrl": "https://xxx.supabase.co/storage/v1/object/public/prodi-files/dosen/uuid.jpg",
      "created_at": "2024-04-01T00:00:00+00:00",
      "updated_at": "2024-04-01T00:00:00+00:00",
      "role": "dosen",
      "keahlian": [
        { "id": 1, "nama_keahlian": "IoT" },
        { "id": 5, "nama_keahlian": "Jaringan Komputer" }
      ]
    }
  ]
}
```

---

### `GET /api/v1/dosen/{id}`
- **Akses**: Public
- **Path Param**: `id` (UUID dosen)

**✅ Response 200 OK:**
```json
{
  "success": true,
  "message": "Berhasil mengambil detail dosen",
  "data": {
    "id": "uuid-dosen-1",
    "nama": "Dr. Budi Santoso",
    "nidn": "0012345678",
    "jabatanFungsional": "Lektor Kepala",
    "pangkatGolongan": "IV/a",
    "email": "budi@polimdo.ac.id",
    "noHp": "08123456789",
    "fotoUrl": "https://xxx.supabase.co/...",
    "created_at": "2024-04-01T00:00:00+00:00",
    "updated_at": "2024-04-01T00:00:00+00:00",
    "role": "dosen",
    "keahlian": [
      { "id": 1, "nama_keahlian": "IoT" }
    ]
  }
}
```

**❌ Response 404 Not Found:**
```json
{
  "success": false,
  "message": "Dosen tidak ditemukan",
  "data": null,
  "errors": null
}
```

---

### `GET /api/v1/dosen/me`
- **Akses**: Authenticated (Admin/Dosen)
- **Header**: `Authorization: Bearer <token>`

**✅ Response 200 OK:** (sama format seperti GET dosen/{id})

**❌ Response 401:**
```json
{
  "success": false,
  "message": "Token tidak valid",
  "data": null,
  "errors": null
}
```

---

### `PUT /api/v1/dosen/me` *(BARU)*
- **Akses**: Authenticated (Dosen/Admin — Edit Profil Sendiri)
- **Header**: `Authorization: Bearer <token>`
- **Content-Type**: `multipart/form-data`

**Form Fields:**
| Field | Tipe | Wajib | Keterangan |
|---|---|---|---|
| `nama` | Text | ❌ | Nama lengkap |
| `nidn` | Text | ❌ | NIDN |
| `jabatan_fungsional` | Text | ❌ | Jabatan fungsional |
| `pangkat_golongan` | Text | ❌ | Pangkat/golongan |
| `email` | Text | ❌ | Email |
| `no_hp` | Text | ❌ | Nomor HP |
| `file` | File | ❌ | Foto profil baru |

> **Catatan**: Dosen bisa mengubah **semua** field profil mereka sendiri. Endpoint ini otomatis mengidentifikasi dosen berdasarkan token JWT, tanpa perlu kirim ID.

**✅ Response 200 OK:**
```json
{
  "success": true,
  "message": "Profil berhasil diperbarui",
  "data": {
    "id": "uuid-dosen",
    "nama": "Nama Baru",
    "nidn": "0012345678",
    "jabatanFungsional": "Lektor Kepala",
    "pangkatGolongan": "IV/a",
    "email": "dosen@polimdo.ac.id",
    "noHp": "08123456789",
    "fotoUrl": "https://xxx.supabase.co/storage/v1/object/public/prodi-files/dosen/uuid-baru.jpg",
    "role": "dosen",
    "keahlian": [...]
  }
}
```

**❌ Response 400:**
```json
{ "success": false, "message": "Token tidak valid" }
```

---

### `POST /api/v1/dosen`
- **Akses**: Admin Only
- **Header**: `Authorization: Bearer <token>`
- **Content-Type**: `multipart/form-data`

**Form Fields:**
| Field | Tipe | Wajib | Keterangan |
|---|---|---|---|
| `nama` | Text | ✅ | Nama lengkap dosen |
| `nidn` | Text | ❌ | NIDN (unique) |
| `jabatan_fungsional` | Text | ❌ | Jabatan fungsional |
| `pangkat_golongan` | Text | ❌ | Pangkat/golongan |
| `email` | Text | ❌ | Email dosen |
| `no_hp` | Text | ❌ | Nomor HP |
| `password` | Text | ✅ | Password untuk akun login |
| `file` | File | ❌ | Foto profil dosen |

**✅ Response 201 Created:**
```json
{
  "success": true,
  "message": "Dosen dan Akun berhasil ditambahkan",
  "data": { "id": "uuid-baru", "nama": "...", "keahlian": [] }
}
```

**❌ Response 400 — Password Kosong:**
```json
{ "success": false, "message": "Password wajib diisi" }
```

**❌ Response 403 — Bukan Admin:**
```json
{ "success": false, "message": "Akses ditolak: Role 'dosen' tidak memiliki ijin." }
```

---

### `PUT /api/v1/dosen/{id}`
- **Akses**: Admin Only
- **Content-Type**: `multipart/form-data`
- **Form Fields**: Sama seperti POST **tanpa** `password`

**✅ Response 200 OK:**
```json
{ "success": true, "message": "Data dosen berhasil diperbarui", "data": { ... } }
```

---

### `DELETE /api/v1/dosen/{id}`
- **Akses**: Admin Only

**✅ Response 200 OK:**
```json
{ "success": true, "message": "Dosen berhasil dihapus", "data": null }
```

---

## 🎯 C. KEAHLIAN

### `GET /api/v1/keahlian`
- **Akses**: Public

**✅ Response 200 OK:**
```json
{
  "success": true,
  "message": "Berhasil mengambil master keahlian",
  "data": [
    { "id": 1, "nama_keahlian": "IoT" },
    { "id": 2, "nama_keahlian": "Robotika" }
  ]
}
```

---

### `POST /api/v1/admin/keahlian`
- **Akses**: Admin Only
- **Content-Type**: `application/json`

**Request Body:**
```json
{ "nama_keahlian": "Machine Learning" }
```

**✅ Response 201 Created:**
```json
{ "success": true, "message": "Master keahlian berhasil ditambah", "data": { "id": 14, "nama_keahlian": "Machine Learning" } }
```

**❌ Response 403:**
```json
{ "success": false, "message": "FORBIDDEN: Hanya admin yang bisa menambahkan keahlian" }
```

---

### `POST /api/v1/admin/keahlian/assign`
- **Akses**: Admin Only
- **Content-Type**: `application/json`

**Request Body:**
```json
{ "dosen_id": "uuid-dosen", "keahlian_id": 1 }
```

**✅ Response 201:**
```json
{ "success": true, "message": "Admin berhasil menugaskan keahlian ke Dosen" }
```

---

### `GET /api/v1/dosen/keahlian`
- **Akses**: Authenticated (Dosen)

**✅ Response 200 OK:**
```json
{
  "success": true,
  "message": "Berhasil",
  "data": [
    { "id": 1, "dosen_id": "uuid", "keahlian_id": 1, "nama_keahlian": "IoT" }
  ]
}
```

---

### `POST /api/v1/dosen/keahlian`
- **Akses**: Authenticated (Dosen)
- **Content-Type**: `application/json`

**Request Body:**
```json
{ "keahlian_id": 3 }
```
atau (testing mode):
```json
{ "keahlian_id": 3, "dosen_id": "uuid-dosen" }
```

**✅ Response 201:**
```json
{ "success": true, "message": "Keahlian berhasil ditambahkan" }
```

---

### `DELETE /api/v1/dosen/keahlian/{id}`
- **Akses**: Authenticated (Dosen)
- **Path Param**: `id` (Int — keahlian_id)

**✅ Response 200:**
```json
{ "success": true, "message": "Keahlian berhasil dihapus dari profil Anda" }
```

---

## 📊 D. STATISTIK MAHASISWA

### `GET /api/v1/statistik`
- **Akses**: Public

**✅ Response 200 OK:**
```json
{
  "success": true,
  "message": "Data statistik berhasil diambil",
  "data": [
    { "id": 1, "tahun": 2022, "jumlah_pendaftar": 356, "jumlah_diterima": 180, "jumlah_lulusan": 162 },
    { "id": 2, "tahun": 2023, "jumlah_pendaftar": 410, "jumlah_diterima": 178, "jumlah_lulusan": 180 }
  ]
}
```

---

### `POST /api/v1/statistik`
- **Akses**: Admin Only
- **Content-Type**: `application/json`

**Request Body:**
```json
{
  "tahun": 2026,
  "jumlah_pendaftar": 500,
  "jumlah_diterima": 200,
  "jumlah_lulusan": 190
}
```

**✅ Response 201 Created:**
```json
{
  "success": true,
  "message": "Statistik berhasil ditambahkan",
  "data": { "id": 5, "tahun": 2026, "jumlah_pendaftar": 500, "jumlah_diterima": 200, "jumlah_lulusan": 190 }
}
```

---

### `PUT /api/v1/statistik/{id}`
- **Akses**: Admin Only
- **Content-Type**: `application/json`
- **Path Param**: `id` (Int)

**Request Body:** (sama seperti POST)

**✅ Response 200:**
```json
{ "success": true, "message": "Statistik berhasil diperbarui", "data": { ... } }
```

---

### `DELETE /api/v1/statistik/{id}`
- **Akses**: Admin Only

**✅ Response 200:**
```json
{ "success": true, "message": "Statistik berhasil dihapus" }
```

---

## 📅 E. JADWAL PERKULIAHAN

### `GET /api/v1/jadwal`
- **Akses**: Public

**✅ Response 200 OK:**
```json
{
  "success": true,
  "message": "Data jadwal berhasil diambil",
  "data": [
    { "id": 1, "nama_jadwal": "Jadwal Semester Ganjil 2024", "tanggal_upload": "2024-08-01", "file_url": "https://xxx.supabase.co/..." }
  ]
}
```

---

### `POST /api/v1/jadwal`
- **Akses**: Admin Only
- **Content-Type**: `multipart/form-data`

**Form Fields:**
| Field | Tipe | Wajib | Keterangan |
|---|---|---|---|
| `nama_jadwal` | Text | ✅ | Nama jadwal |
| `file` | File | ✅ | File dokumen jadwal (PDF, dll) |

**✅ Response 201 Created:**
```json
{ "success": true, "message": "Jadwal berhasil ditambahkan", "data": { "id": 2, "nama_jadwal": "...", "tanggal_upload": "2024-04-28", "file_url": "https://..." } }
```

**❌ Response 400 — File Kosong:**
```json
{ "success": false, "message": "File jadwal wajib diunggah" }
```

**❌ Response 403:**
```json
{ "success": false, "message": "FORBIDDEN: Hanya Admin yang dapat menambah jadwal" }
```

---

### `PUT /api/v1/jadwal/{id}`
- **Akses**: Admin Only
- **Content-Type**: `multipart/form-data`
- **Path Param**: `id` (Int)

**Form Fields:**
| Field | Tipe | Wajib |
|---|---|---|
| `nama_jadwal` | Text | ❌ |

**✅ Response 200:**
```json
{ "success": true, "message": "Jadwal berhasil diperbarui", "data": { ... } }
```

---

### `DELETE /api/v1/jadwal/{id}`
- **Akses**: Admin Only

**✅ Response 200:**
```json
{ "success": true, "message": "Jadwal berhasil dihapus" }
```

---

## 🏗️ F. FASILITAS

### `GET /api/v1/fasilitas`
- **Akses**: Public

**✅ Response 200 OK:**
```json
{
  "success": true,
  "message": "Berhasil mengambil data fasilitas",
  "data": [
    {
      "id": "uuid-fasilitas",
      "nama_fasilitas": "Lab IoT",
      "deskripsi": "Laboratorium Internet of Things",
      "created_at": "2024-04-01T00:00:00+00:00",
      "media": [
        { "id": "uuid-media", "file_url": "https://xxx.supabase.co/..." }
      ]
    }
  ]
}
```

---

### `GET /api/v1/fasilitas/{id}`
- **Akses**: Public

**✅ Response 200:** (single object, format sama)

**❌ Response 404:**
```json
{ "success": false, "message": "Fasilitas tidak ditemukan" }
```

---

### `POST /api/v1/fasilitas`
- **Akses**: Admin Only
- **Content-Type**: `multipart/form-data`

**Form Fields:**
| Field | Tipe | Wajib | Keterangan |
|---|---|---|---|
| `judul_fasilitas` atau `nama_fasilitas` | Text | ✅ | Nama fasilitas |
| `deskripsi` | Text | ❌ | Deskripsi |
| `file` | File | ❌ | Foto fasilitas (bisa multiple) |

**✅ Response 201:**
```json
{ "success": true, "message": "Fasilitas berhasil ditambahkan", "data": { ... } }
```

**❌ Response 400:**
```json
{ "success": false, "message": "Judul fasilitas wajib diisi" }
```

**❌ Response 403:**
```json
{ "success": false, "message": "FORBIDDEN: Hanya Admin yang dapat menambah fasilitas" }
```

---

### `PUT /api/v1/fasilitas/{id}` | `DELETE /api/v1/fasilitas/{id}`
- **Akses**: Admin Only
- PUT: `multipart/form-data` (fields sama, semua opsional)
- DELETE: Tidak perlu body

**✅ PUT Response 200:**
```json
{ "success": true, "message": "Fasilitas berhasil diperbarui", "data": { ... } }
```

**✅ DELETE Response 200:**
```json
{ "success": true, "message": "Fasilitas berhasil dihapus" }
```

---

## 🎓 G. TRI DHARMA

### `GET /api/v1/tri-dharma`
- **Akses**: Public
- **Query Param (Opsional)**: `?jenis=Penelitian` atau `?jenis=Buku Ajar` atau `?jenis=Pengabdian` atau `?jenis=Publikasi` atau `?jenis=HKI` atau `?jenis=Sertifikat`

**✅ Response 200 OK:**
```json
{
  "success": true,
  "message": "Berhasil",
  "data": [
    {
      "id": "uuid",
      "dosen_id": "uuid-dosen",
      "jenis": "Penelitian",
      "judul": "Analisis Data Sensor IoT",
      "deskripsi": "Penelitian mengenai ...",
      "tahun": 2024,
      "file_url": "https://...",
      "anggota": [
        { "dosen_id": "uuid-dosen", "nama_dosen": "Dr. Budi", "peran": "Ketua" },
        { "dosen_id": "uuid-dosen-2", "nama_dosen": "Dr. Ani", "peran": "Anggota" }
      ],
      "created_at": "2024-04-01T00:00:00+00:00"
    }
  ]
}
```

---

### `GET /api/v1/tri-dharma/my`
- **Akses**: Authenticated (Dosen/Admin)
- **Query Param (Opsional)**: `?jenis=Penelitian`

**✅ Response 200 OK:** (Format data sama seperti list GET, tetapi hanya milik dosen yang login).

---

### `GET /api/v1/tri-dharma/{id}`
- **Akses**: Public

**✅ Response 200:** (single object)

**❌ Response 404:**
```json
{ "success": false, "message": "Not Found" }
```

---

### `POST /api/v1/tri-dharma`
- **Akses**: Dosen & Admin
- **Content-Type**: `multipart/form-data`

**Form Fields:**
| Field | Tipe | Wajib | Keterangan |
|---|---|---|---|
| `jenis` | Text | ✅ | "Buku Ajar", "Penelitian", "Pengabdian", "Publikasi", "HKI", atau "Sertifikat" |
| `judul` | Text | ✅ | Judul kegiatan |
| `tahun` | Text (angka) | ❌ | Tahun publikasi/kegiatan |
| `deskripsi` | Text | ❌ | Deskripsi kegiatan |
| `file` | File | ❌ | Dokumen (maks. 1 file/record) |
| `anggota_dosen_ids` | Text | ❌ | Comma-separated UUID dosen anggota. Contoh: `"uuid-1,uuid-2"` |

**✅ Response 201:**
```json
{ "success": true, "message": "Berhasil membuat data Tri Dharma", "data": { ... } }
```

**❌ Response 400:**
```json
{ "success": false, "message": "Jenis Tri Dharma tidak valid (Buku Ajar/Penelitian/Pengabdian/Publikasi/HKI/Sertifikat)" }
```

---

### `PUT /api/v1/tri-dharma/{id}`
- **Akses**: Dosen (Milik Sendiri) & Admin
- **Content-Type**: `multipart/form-data`

**Form Fields:** Semua opsional. Jika mengirim file baru, file lama akan tertimpa di Storage.
**Aturan**: Dosen HANYA BISA mengedit data yang `dosen_id` nya sama dengan akun mereka. Admin bisa edit semua.

**✅ Response 200:**
```json
{ "success": true, "message": "Berhasil memperbarui data Tri Dharma", "data": { ... } }
```

**❌ Response 403 (Jika dosen edit milik dosen lain):**
```json
{ "success": false, "message": "FORBIDDEN: Anda tidak berhak mengubah data Tri Dharma milik dosen lain" }
```

---

### `DELETE /api/v1/tri-dharma/{id}`
- **Akses**: Dosen (Milik Sendiri) & Admin

**Aturan**: Sama seperti PUT.

**✅ Response 200:**
```json
{ "success": true, "message": "Berhasil menghapus data Tri Dharma" }
```

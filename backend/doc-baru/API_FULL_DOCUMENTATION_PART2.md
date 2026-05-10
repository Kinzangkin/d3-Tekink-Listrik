# 📘 API FULL DOCUMENTATION — PART 2
# Media, Ringkasan Endpoint, Validasi & Error

> **Base URL**: `https://ktorbackend-elektropoli.up.railway.app/api/v1`
> **Auth Header**: `Authorization: Bearer <token_jwt>`

---

> **CATATAN**: Tabel `publikasi`, `hki`, dan `sertifikat` telah **DIHAPUS** dan dikonsolidasikan ke dalam tabel `tri_dharma`.
> Untuk menambahkan Publikasi, HKI, atau Sertifikat, gunakan endpoint `/tri-dharma` dengan `jenis` yang sesuai.
> Contoh: `jenis=Publikasi`, `jenis=HKI`, `jenis=Sertifikat`.

---

## 🖼️ N. MEDIA (Manajemen Gambar/File)

> **Catatan Penting**: Endpoint ini untuk mengelola file/gambar yang disimpan di tabel `media` (polymorphic). Entity yang menggunakan tabel ini: **Fasilitas** dan **Tri Dharma**.

### `GET /api/v1/media/entity/{entityType}/{entityId}`
- **Akses**: Public
- **Path Params**:
  - `entityType`: `fasilitas` | `tri_dharma`
  - `entityId`: UUID entity

**✅ Response 200 OK:**
```json
{
  "success": true,
  "message": "Berhasil",
  "data": [
    { "id": "uuid-media-1", "file_url": "https://xxx.supabase.co/storage/v1/object/public/prodi-files/fasilitas/uuid.jpg" }
  ]
}
```

---

### `DELETE /api/v1/media/{mediaId}`
- **Akses**: Admin & Dosen (Authenticated)
- **Header**: `Authorization: Bearer <token>`
- **Path Param**: `mediaId` (UUID media dari tabel `media`)
- **Deskripsi**: Hapus satu file/gambar spesifik. File dihapus dari **Supabase Storage** DAN record dihapus dari **database**.

**Aturan Ownership:**

| Entity Type | Admin | Dosen (pemilik) | Dosen (bukan pemilik) |
|---|---|---|---|
| `fasilitas` | ✅ Bisa | ❌ 403 (admin only) | ❌ 403 |
| `tri_dharma` | ✅ Bisa | ✅ Bisa | ❌ 403 |

**✅ Response 200 OK:**
```json
{ "success": true, "message": "Media berhasil dihapus" }
```

**❌ Response 404 — Media Tidak Ditemukan:**
```json
{ "success": false, "message": "Media tidak ditemukan" }
```

**❌ Response 403 — Bukan Pemilik:**
```json
{ "success": false, "message": "FORBIDDEN: Anda tidak berhak menghapus media ini" }
```

---

## 🔄 PERILAKU FILE SAAT PUT (UPDATE)

> **Penting untuk Frontend Developer**: Berikut cara kerja file replacement saat update di setiap entity.

### Entity dengan Single File (kolom `file_url`):
| Entity | PUT behavior |
|---|---|
| **Tri Dharma** | Upload file baru → file lama **TETAP** di Storage, field `file_url` diupdate ✅ |
| **Jadwal** | Sama — file lama **DIHAPUS**, diganti file baru ✅ |
| **Dosen (foto)** | Sama — foto lama **DIHAPUS**, diganti foto baru ✅ |

### Entity dengan Multiple File (tabel `media`):
| Entity | PUT behavior |
|---|---|
| **Fasilitas** | File baru **DITAMBAHKAN** ke list media. Untuk **hapus** gambar spesifik → gunakan `DELETE /media/{mediaId}` |

### Entity tanpa File:
| Entity | Keterangan |
|---|---|
| **Statistik** | Tidak ada file upload (pure angka) |

---

## 📋 RINGKASAN ENDPOINT

| # | Method | Endpoint | Akses | Content-Type |
|---|---|---|---|---|
| 1 | POST | `/auth/login` | Public (Rate Limited) | `application/json` |
| 2 | POST | `/auth/forgot-password` | Public (Rate Limited) | `application/json` |
| 3 | POST | `/auth/resend-forgot-password` | Public (Rate Limited) | `application/json` |
| 4 | POST | `/auth/reset-password` | Public (Rate Limited) | `application/json` |
| 5 | GET | `/dosen` | Public | - |
| 6 | GET | `/dosen/{id}` | Public | - |
| 7 | GET | `/dosen/me` | Auth (Admin/Dosen) | - |
| 8 | POST | `/dosen` | Admin | `multipart/form-data` |
| 9 | PUT | `/dosen/{id}` | Admin | `multipart/form-data` |
| 10 | DELETE | `/dosen/{id}` | Admin | - |
| 11 | GET | `/keahlian` | Public | - |
| 12 | POST | `/admin/keahlian` | Admin | `application/json` |
| 13 | POST | `/admin/keahlian/assign` | Admin | `application/json` |
| 14 | GET | `/dosen/keahlian` | Auth (Dosen) | - |
| 15 | POST | `/dosen/keahlian` | Auth (Dosen) | `application/json` |
| 16 | DELETE | `/dosen/keahlian/{id}` | Auth (Dosen) | - |
| 17 | GET | `/statistik` | Public | - |
| 18 | POST | `/statistik` | Admin | `application/json` |
| 19 | PUT | `/statistik/{id}` | Admin | `application/json` |
| 20 | DELETE | `/statistik/{id}` | Admin | - |
| 21 | GET | `/jadwal` | Public | - |
| 22 | POST | `/jadwal` | Admin | `multipart/form-data` |
| 23 | PUT | `/jadwal/{id}` | Admin | `multipart/form-data` |
| 24 | DELETE | `/jadwal/{id}` | Admin | - |
| 25 | GET | `/fasilitas` | Public | - |
| 26 | GET | `/fasilitas/{id}` | Public | - |
| 27 | POST | `/fasilitas` | Admin | `multipart/form-data` |
| 28 | PUT | `/fasilitas/{id}` | Admin | `multipart/form-data` |
| 29 | DELETE | `/fasilitas/{id}` | Admin | - |
| 30 | GET | `/tri-dharma` | Public | - |
| 31 | GET | `/tri-dharma/{id}` | Public | - |
| 32 | GET | `/tri-dharma/my` | Auth (Dosen/Admin) | - |
| 33 | POST | `/tri-dharma` | Dosen/Admin | `multipart/form-data` |
| 34 | PUT | `/tri-dharma/{id}` | Dosen/Admin (Owner) | `multipart/form-data` |
| 35 | DELETE | `/tri-dharma/{id}` | Dosen/Admin (Owner) | - |
| 36 | GET | `/media/entity/{entityType}/{entityId}` | Public | - |
| 37 | DELETE | `/media/{mediaId}` | Admin/Dosen | - |

> **Total: 37 endpoint aktif**. Semua endpoint Publikasi, HKI, dan Sertifikat telah dilebur ke `/tri-dharma`.

---

## 🔒 VALIDASI & ERROR GLOBAL

### Validasi Input
| Rule | Pesan Error | HTTP Code |
|---|---|---|
| Judul wajib diisi | `"Judul wajib diisi"` | 400 |
| Tahun harus 2000-2100 | `"Tahun tidak valid"` | 400 |
| Jenis Tri Dharma invalid | `"Jenis Tri Dharma tidak valid (Buku Ajar/Penelitian/Pengabdian/Publikasi/HKI/Sertifikat)"` | 400 |
| Password wajib (create dosen) | `"Password wajib diisi"` | 400 |
| File jadwal wajib | `"File jadwal wajib diunggah"` | 400 |
| ID parameter missing | `"ID diperlukan"` | 400 |
| Email tidak terdaftar (forgot pw) | `"Email tidak terdaftar"` | 400 |
| Token reset invalid | `"Token reset password tidak valid atau sudah kadaluarsa"` | 400 |

### Authorization Error
| Kondisi | Pesan Error | HTTP Code |
|---|---|---|
| Token tidak ada | `"Header Authorization (Bearer Token) tidak ditemukan"` | 401 |
| Token format salah | `"Format token salah. Gunakan 'Bearer <token>'"` | 401 |
| Token expired/invalid | `"Token tidak valid, expired, atau Secret server tidak cocok."` | 401 |
| Role tidak cocok | `"Akses ditolak: Role 'dosen' tidak memiliki ijin."` | 403 |
| Dosen akses data orang lain | `"FORBIDDEN: Anda tidak berhak mengubah data Tri Dharma milik dosen lain"` | 403 |
| Dosen hapus media bukan miliknya | `"FORBIDDEN: Anda tidak berhak menghapus media ini"` | 403 |
| Dosen hapus media admin-only | `"FORBIDDEN: Hanya Admin yang dapat menghapus media fasilitas"` | 403 |

### Server Error
| Kondisi | HTTP Code |
|---|---|
| Internal Server Error | 500 |
| Rate Limit Exceeded | 429 |

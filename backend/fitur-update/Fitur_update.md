# 🚀 UPDATE FITUR TERBARU UNTUK FRONTEND (24 Mei 2026)

Dokumen ini berisi ringkasan pembaruan terbaru di sisi Backend yang perlu diintegrasikan oleh tim Frontend. Terdapat **2 pembaruan utama**: Fitur Visi Misi & Tujuan (Profil Prodi), dan Sistem Keamanan (Rate Limiter) pada form Login.

---

## 1. 🏛️ FITUR BARU: Profil Prodi (Visi, Misi, Tujuan)

Backend telah menyediakan endpoint baru khusus untuk mengelola Profil Prodi. Semua data Visi, Misi, dan Tujuan sekarang disimpan dalam satu tabel dan diakses melalui endpoint yang sama.

### 🗄️ Struktur Database Baru (`profil_prodi`)
Saya telah menambahkan satu tabel baru di Supabase khusus untuk menampung data ini agar lebih rapi (tidak perlu 3 tabel terpisah).
- **`id`**: Integer (Auto Increment)
- **`tipe`**: String (Hanya menerima `"Visi"`, `"Misi"`, atau `"Tujuan"`)
- **`deskripsi`**: Text (Isi teks visi/misi/tujuannya)
- **`urutan`**: Integer (Bisa digunakan oleh Frontend untuk mengurutkan Misi ke-1, Misi ke-2, dst. Default 0).
- **`created_at` & `updated_at`**: Timestamp.

### 📌 Ringkasan Endpoint `/api/v1/profil-prodi`

| Method | Endpoint | Akses | Keterangan |
|---|---|---|---|
| `GET` | `/profil-prodi` | **Public** | Ambil semua data (Bisa pakai query `?tipe=Visi` / `Misi` / `Tujuan`) |
| `POST` | `/profil-prodi` | **Admin Only** | Tambah data baru |
| `PUT` | `/profil-prodi/{id}` | **Admin Only** | Edit data |
| `DELETE`| `/profil-prodi/{id}` | **Admin Only** | Hapus data |

### 💡 Contoh Integrasi di Frontend:
**A. Menampilkan khusus "Visi" di Halaman Landing Page:**
Frontend cukup melakukan HTTP GET dengan query param `tipe=Visi`.
```http
GET /api/v1/profil-prodi?tipe=Visi
```
**Response JSON:**
```json
{
  "success": true,
  "message": "Data berhasil diambil",
  "data": [
    { 
      "id": 1, 
      "tipe": "Visi", 
      "deskripsi": "Menjadi prodi teknik unggulan di tahun 2030", 
      "urutan": 1 
    }
  ]
}
```

**B. Form Tambah Data (Dashboard Admin):**
Saat admin menambah data, pastikan mengirim `tipe` dengan *exact string* (Case Sensitive): `"Visi"`, `"Misi"`, atau `"Tujuan"`.
```json
// POST /api/v1/profil-prodi
{
  "tipe": "Misi",
  "deskripsi": "Menyelenggarakan pendidikan Vokasi yang berkualitas...",
  "urutan": 1
}
```

---

## 2. 🛡️ KEAMANAN BARU: Rate Limit pada Form Login

Untuk mencegah serangan *Brute-Force* (bot yang mencoba menebak password ribuan kali), backend sekarang menerapkan **Rate Limiter** ketat khusus untuk endpoint `POST /api/v1/auth/login`.

### 📌 Aturan Rate Limit:
- **Batas Maksimal:** 10 kali percobaan login.
- **Waktu Reset (Cooldown):** 5 Menit.
- **Logika:** Jika user (berdasarkan IP) gagal/mencoba login lebih dari 10 kali dalam kurun waktu 5 menit, request ke-11 akan langsung **DITOLAK/DIBLOKIR** oleh server selama sisa waktu 5 menit tersebut.

### 🛑 HTTP Error Code & Response (Jika Kena Blokir):
Backend akan mengembalikan HTTP Status **`429 Too Many Requests`**. (PENTING: Frontend harus menangkap HTTP Code 429 ini, bukan 400 atau 500).

```json
// Response Body dari Backend
{
  "success": false,
  "message": "Too many requests",
  "data": null,
  "errors": null
}
```

### 💡 Rekomendasi Logika UI/UX untuk Frontend:
1. **Tangkap Error 429**: Di dalam blok `catch` atau interceptor axios, cek jika `error.response.status === 429`.
2. **Tampilkan Peringatan**: Munculkan alert/toast merah: *"Anda telah mencoba login terlalu banyak. Silakan tunggu 5 menit sebelum mencoba lagi."*
3. **Disable Tombol Login**: (Opsional tapi disarankan) Matikan (disable) tombol "Login" sementara waktu, atau buat *countdown timer* agar user tahu mereka sedang diblokir sementara.

---
*Silakan sesuaikan state management dan UI logic di Frontend dengan panduan di atas. Happy coding! 💻*

# 🧭 GAMBARAN ALUR RESET PASSWORD (MAILJET ENGINE)

Dokumen ini menjelaskan alur teknis pengiriman email reset password menggunakan Mailjet API di backend Ktor.

## 🏗️ Arsitektur Alur

```mermaid
sequenceDiagram
    participant User as 👤 User (Dosen)
    participant FE as 💻 Frontend (Next.js/React)
    participant BE as ⚙️ Backend (Ktor)
    participant MJ as 📧 Mailjet API
    participant DB as 🗄️ Database (Supabase)

    Note over User, DB: PROSES LUPA PASSWORD
    User->>FE: Input Email (polimdoe@gmail.com)
    FE->>BE: POST /auth/forgot-password
    BE->>DB: Buat Reset Token (UUID) & Simpan
    BE->>MJ: Kirim Email via HTTP API (Bukan SMTP)
    MJ-->>User: Kirim Email (Inbox Gmail)
    BE-->>FE: Response {success: true}
    FE-->>User: "Cek Email Kamu!"

    Note over User, DB: PROSES RESET PASSWORD
    User->>User: Copy Token dari Gmail
    User->>FE: Input Token & Password Baru
    FE->>BE: POST /auth/reset-password {token, new_password}
    BE->>DB: Validasi Token & Update Password
    BE-->>FE: Response {success: true}
    FE-->>User: "Password Berhasil Diubah!"
```

## 🔑 Key Configuration (Production)
Untuk memastikan sistem ini jalan di server (Railway), pastikan variabel berikut sudah terpasang:

| Variable | Value |
|---|---|
| `MAILJET_API_KEY` | `3dabba37ee14469b987c3ae90e931ef1` |
| `MAILJET_SECRET_KEY` | `2f3fe3fa4b860eba7ce0c1410716cced` |

## 🧪 Cara Testing di Postman
1. **Endpoint Forgot**: Tembak email kamu.
2. **Cek Gmail**: Buka email dari "Sistem Akademik Kampus".
3. **Endpoint Reset**: Masukkan token dari email dan buat password baru.
4. **Login**: Coba login pake password baru. **BOOM! Berhasil.**

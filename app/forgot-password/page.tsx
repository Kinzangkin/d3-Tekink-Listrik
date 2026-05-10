"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { HiArrowLeft, HiMail, HiKey, HiLockClosed } from "react-icons/hi"
import { apiPost } from "@/services/api"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [token, setToken] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleRequestToken = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return alert("Email harus diisi")
    
    setIsLoading(true)
    try {
      const res = await apiPost('/auth/forgot-password', { email })
      if (res?.data?.success) {
        setStep(2)
      } else {
        alert(res?.data?.message || "Gagal mengirim email reset password. Pastikan email Anda terdaftar.")
      }
    } catch (error) {
      console.error(error)
      alert("Terjadi kesalahan koneksi server.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token || !newPassword || !confirmPassword) {
      return alert("Mohon lengkapi semua isian")
    }
    if (newPassword !== confirmPassword) {
      return alert("Password baru dan konfirmasi tidak cocok")
    }
    
    setIsLoading(true)
    try {
      const res = await apiPost('/auth/reset-password', { token, new_password: newPassword })
      if (res?.data?.success) {
        alert("Password berhasil diubah! Silakan login dengan password baru.")
        router.push("/login")
      } else {
        alert(res?.data?.message || "Token tidak valid atau sudah kadaluarsa.")
      }
    } catch (error) {
      console.error(error)
      alert("Terjadi kesalahan saat memproses permintaan.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendToken = async () => {
    if (!email) return
    setIsLoading(true)
    try {
      const res = await apiPost('/auth/resend-forgot-password', { email })
      if (res?.data?.success) {
        alert("Token baru telah berhasil dikirim ulang ke email Anda.")
      } else {
        alert(res?.data?.message || "Gagal mengirim ulang token.")
      }
    } catch (error) {
      console.error(error)
      alert("Terjadi kesalahan koneksi server.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex bg-[#0f172a] relative overflow-hidden">
      {/* Background blobs for premium look */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
        backgroundSize: "48px 48px"
      }} />

      <div className="container mx-auto flex items-center justify-center px-4 py-12 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Link 
            href="/login" 
            className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors text-sm font-medium group"
          >
            <HiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            KEMBALI KE LOGIN
          </Link>

          <Card className="border-none bg-white/95 backdrop-blur-md shadow-2xl overflow-hidden rounded-3xl">
            <div className="h-2 bg-primary w-full" />
            <CardHeader className="space-y-1 pb-8 pt-8 text-center">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 border border-primary/20">
                <HiKey className="text-primary text-2xl" />
              </div>
              <CardTitle className="text-2xl font-black tracking-tight text-neutral-800 uppercase">
                {step === 1 ? "Lupa Password" : "Reset Password"}
              </CardTitle>
              <CardDescription className="text-neutral-500 font-medium px-4">
                {step === 1 
                  ? "Masukkan email akun Anda untuk menerima kode token reset password." 
                  : "Silakan cek inbox/spam email Anda. Masukkan token yang diterima untuk membuat password baru."}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.form 
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    onSubmit={handleRequestToken} 
                    className="space-y-5"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-neutral-700 font-bold text-xs uppercase tracking-widest">Email Anda</Label>
                      <div className="relative">
                        <HiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                        <Input 
                          id="email" 
                          placeholder="dosen@polimdo.ac.id" 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={isLoading}
                          className="pl-10 h-12 border-neutral-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl"
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" disabled={isLoading} className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-black tracking-widest rounded-xl shadow-lg shadow-primary/20 transition-all uppercase mt-2">
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                          MEMPROSES...
                        </div>
                      ) : "KIRIM TOKEN RESET"}
                    </Button>
                  </motion.form>
                )}

                {step === 2 && (
                  <motion.form 
                    key="step2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    onSubmit={handleResetPassword} 
                    className="space-y-5"
                  >
                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl mb-4">
                      <p className="text-xs text-blue-800 font-medium text-center">
                        Token telah dikirim ke <strong>{email}</strong>.<br/>
                        Pastikan untuk memeriksa folder Spam jika tidak ada di Inbox.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="token" className="text-neutral-700 font-bold text-xs uppercase tracking-widest">Token Reset</Label>
                      <div className="relative">
                        <HiKey className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                        <Input 
                          id="token" 
                          placeholder="Masukkan token dari email" 
                          type="text" 
                          value={token}
                          onChange={(e) => setToken(e.target.value)}
                          disabled={isLoading}
                          className="pl-10 h-12 border-neutral-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword" className="text-neutral-700 font-bold text-xs uppercase tracking-widest">Password Baru</Label>
                      <div className="relative">
                        <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                        <Input 
                          id="newPassword" 
                          placeholder="••••••••" 
                          type="password" 
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          disabled={isLoading}
                          className="pl-10 h-12 border-neutral-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-neutral-700 font-bold text-xs uppercase tracking-widest">Konfirmasi Password</Label>
                      <div className="relative">
                        <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                        <Input 
                          id="confirmPassword" 
                          placeholder="••••••••" 
                          type="password" 
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          disabled={isLoading}
                          className="pl-10 h-12 border-neutral-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl"
                          required
                        />
                      </div>
                    </div>

                    <Button type="submit" disabled={isLoading} className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-black tracking-widest rounded-xl shadow-lg shadow-primary/20 transition-all uppercase mt-2">
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                          MEMPROSES...
                        </div>
                      ) : "SIMPAN PASSWORD BARU"}
                    </Button>

                    <div className="pt-2 text-center">
                      <button 
                        type="button" 
                        onClick={handleResendToken}
                        disabled={isLoading}
                        className="text-xs font-bold text-primary hover:underline"
                      >
                        Belum menerima email? Kirim Ulang Token
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
          
          <p className="text-center mt-8 text-white/30 text-[10px] font-bold tracking-[0.2em] uppercase">
            &copy; 2026 D3 Teknik Listrik - Politeknik Negeri Manado
          </p>
        </motion.div>
      </div>
    </div>
  )
}

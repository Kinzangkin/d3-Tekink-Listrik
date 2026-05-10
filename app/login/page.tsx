"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { HiArrowLeft, HiLockClosed, HiMail } from "react-icons/hi"
import KarakterKerja from "@/components/sections/Login/KarakterKerja"
import { apiPost } from "@/services/api"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    try {
      const res = await apiPost('/auth/login', { email, password })
      
      if (res && res.status === 200 && res.data && res.data.success) {
        const { token, expiresAt, role: responseRole } = res.data.data
        
        localStorage.setItem('token', token)
        if (expiresAt) {
          localStorage.setItem('expiresAt', expiresAt.toString())
        }
        
        // Attempt to extract role from JWT if backend returns null
        let userRole = responseRole
        if (!userRole) {
          try {
            const payload = JSON.parse(atob(token.split('.')[1]))
            userRole = payload.role || payload.Role || payload.ROLE
          } catch (e) {
            console.error("Gagal membaca JWT", e)
          }
        }
        
        // Simpan role ke local storage untuk membantu Route Guard client-side
        if (userRole) {
          localStorage.setItem('role', userRole.toLowerCase())
        }

        if (userRole?.toLowerCase() === 'admin') {
          router.push('/dashboard/admin')
        } else {
          router.push('/dashboard/dosen')
        }
      } else {
        alert(res?.data?.message || "Email atau password salah.")
      }
    } catch (error) {
      console.error("Login error:", error)
      alert("Gagal terhubung ke server.")
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

      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-24 px-4 py-12 z-10">
        
        {/* Left Side: Animation (Hidden on small mobile if needed, or stacked) */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 hidden md:flex items-center justify-center w-full max-w-lg"
        >
          <div className="w-full">
            <KarakterKerja className="md:block hidden" />
            <div className="mt-8 text-center">
              <h2 className="text-white text-2xl font-black uppercase tracking-[0.2em] mb-2">Build The Future</h2>
              <p className="text-white/50 text-sm font-medium">Sistem Informasi Akademik Terintegrasi D3TL</p>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors text-sm font-medium group"
          >
            <HiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            KEMBALI KE BERANDA
          </Link>

          <Card className="border-none bg-white/95 backdrop-blur-md shadow-2xl overflow-hidden rounded-3xl">
            <div className="h-2 bg-primary w-full" />
            <CardHeader className="space-y-1 pb-10 pt-8 text-center">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 border border-primary/20">
                <span className="text-primary font-black text-2xl tracking-tighter">D3<span className="text-blue-400 font-black">TL</span></span>
              </div>
              <CardTitle className="text-3xl font-black tracking-tight text-neutral-800 uppercase">Selamat Datang</CardTitle>
              <CardDescription className="text-neutral-500 font-medium">
                Portal Akademik D3 Teknik Listrik
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 px-8">
              <form onSubmit={onSubmit} className="space-y-5" autoComplete="off">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-neutral-700 font-bold text-xs uppercase tracking-widest">Email / NIP</Label>
                  <div className="relative">
                    <HiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                    <Input 
                      id="email" 
                      placeholder="nama@unixe.edu" 
                      type="text" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoCapitalize="none"
                      autoComplete="off"
                      autoCorrect="off"
                      disabled={isLoading}
                      className="pl-10 h-12 border-neutral-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password" className="text-neutral-700 font-bold text-xs uppercase tracking-widest">Password</Label>
                    <Link href="/forgot-password" className="text-xs font-bold text-primary hover:underline">
                      Lupa Password?
                    </Link>
                  </div>
                  <div className="relative">
                    <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                    <Input 
                      id="password" 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      autoComplete="new-password"
                      placeholder="••••••••"
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
                  ) : "MASUK KE PORTAL"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 pb-8 pt-2">
              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-neutral-100" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white/95 px-2 text-neutral-400 font-medium">Bantuan Login</span>
                </div>
              </div>
              <p className="text-center text-xs text-neutral-500 leading-relaxed max-w-[240px] mx-auto">
                Kesulitan masuk? Silakan hubungi bagian IT atau Admin Prodi di Ruang Jurusan.
              </p>
            </CardFooter>
          </Card>
          
          <p className="text-center mt-8 text-white/30 text-[10px] font-bold tracking-[0.2em] uppercase">
            &copy; 2026 D3 Teknik Listrik - Politeknik Negeri Manado
          </p>
        </motion.div>
      </div>
    </div>
  )
}

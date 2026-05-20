"use client"

import { PageHeader } from "@/components/dashboard/PageHeader"
import { StatCard } from "@/components/dashboard/StatCard"
import { BookOpen, FileText, Users, Award, ExternalLink } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

import { useEffect, useState } from "react"
import { apiGet } from "@/services/api"
import { Loader2 } from "lucide-react"

export default function DosenOverviewPage() {
  const [dosen, setDosen] = useState<any>(null)
  const [triDharmaList, setTriDharmaList] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // 1. Fetch Profile
        const resMe = await apiGet('/dosen/me')
        if (resMe?.data?.success && resMe.data.data) {
          const userData = resMe.data.data
          setDosen(userData)
          
          // 2. Fetch My Tri Dharma (Automatic based on login)
          const resTD = await apiGet('/tri-dharma/my')
          if (resTD?.data?.success && resTD.data.data) {
            setTriDharmaList(resTD.data.data)
          } else {
            setTriDharmaList([])
          }
        } else {
          console.error("Failed to fetch profile or success is false", resMe?.data)
          setDosen(null)
        }
      } catch (err) {
        console.error("Gagal mengambil data overview", err)
        setDosen(null)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <p className="text-neutral-500 font-black animate-pulse uppercase tracking-widest text-xs">Menyusun Data Anda...</p>
      </div>
    )
  }

  if (!dosen && !isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mb-2">
          <Users size={32} />
        </div>
        <h3 className="font-black text-neutral-800 uppercase tracking-tight">Sesi Berakhir</h3>
        <p className="text-neutral-500 text-sm max-w-xs font-medium">Gagal mengambil data profil Anda. Silakan coba login kembali untuk memperbarui sesi.</p>
        <Link href="/login" className="px-6 py-2 bg-primary text-white font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-primary/90 transition-all">
          Kembali ke Login
        </Link>
      </div>
    )
  }

  // Calculate stats
  const list = Array.isArray(triDharmaList) ? triDharmaList : []
  const countPublikasi = list.filter(t => t.jenis === "Publikasi").length
  const countPenelitian = list.filter(t => t.jenis === "Penelitian").length
  const countPengabdian = list.filter(t => t.jenis === "Pengabdian").length
  const countHKI = list.filter(t => t.jenis === "HKI" || t.jenis === "Paten").length

  const lastPublikasi = list
    .filter(t => t.jenis === "Publikasi")
    .sort((a, b) => (b.tahun || 0) - (a.tahun || 0))
    .slice(0, 3)


  return (
    <div className="space-y-6">
      <PageHeader 
        title="Dosen Overview" 
        description="Ringkasan aktivitas Tri Dharma dan publikasi Anda." 
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-neutral-100 flex flex-col items-center text-center h-full relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-primary/10" />
            
            <Avatar className="w-24 h-24 border-4 border-white shadow-md relative z-10 mt-6 mb-4">
              <AvatarImage src={dosen.foto_url || dosen.fotoUrl || undefined} className="object-cover" />
              <AvatarFallback className="text-2xl bg-primary text-white">
                {dosen.nama?.substring(0, 2) || "DS"}
              </AvatarFallback>
            </Avatar>

            
            <h3 className="font-black text-neutral-800 text-lg uppercase tracking-tight">{dosen.nama}</h3>
            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-4">
              {dosen.jabatan_fungsional || dosen.jabatanFungsional || "Dosen"} 
              {dosen.pangkat_golongan ? ` - ${dosen.pangkat_golongan}` : ""}
            </p>

            
            <div className="flex flex-wrap justify-center gap-1 mb-6">
              {dosen.keahlian && Array.isArray(dosen.keahlian) ? dosen.keahlian.map((k: any, i: number) => (
                <Badge key={i} variant="secondary" className="text-[9px] font-black uppercase tracking-tighter px-2">
                  {typeof k === 'string' ? k : k.nama_keahlian}
                </Badge>
              )) : (
                <p className="text-[10px] text-neutral-400 italic">Belum ada data keahlian</p>
              )}
            </div>


            <div className="w-full space-y-2 mt-auto text-sm text-neutral-600">
              <div className="flex justify-between py-2 border-b border-neutral-50">
                <span className="font-medium">NIDN</span>
                <span className="font-bold text-neutral-800">{dosen.nidn}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-neutral-50">
                <span className="font-medium">Email</span>
                <span className="font-bold text-neutral-800">{dosen.email}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatCard 
              title="Publikasi" 
              value={countPublikasi.toString()} 
              icon={<BookOpen size={20} />} 
              description="Jurnal & Konferensi"
            />
            <StatCard 
              title="Penelitian" 
              value={countPenelitian.toString()} 
              icon={<FileText size={20} />} 
              description="Riset aktif & selesai"
            />
            <StatCard 
              title="Pengabdian" 
              value={countPengabdian.toString()} 
              icon={<Users size={20} />} 
              description="Kegiatan pengabdian"
            />
            {/* 
            <StatCard 
              title="HKI & Paten" 
              value={countHKI.toString()} 
              icon={<Award size={20} />} 
              description="Hak Kekayaan Intelektual"
            />
            */}

          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-neutral-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-black text-neutral-800 uppercase tracking-tight text-lg">Publikasi Terakhir</h3>
              <Link href="/dashboard/dosen/publikasi" className="text-xs font-bold text-primary hover:underline uppercase tracking-widest flex items-center gap-1">
                Lihat Semua <ExternalLink size={12} />
              </Link>
            </div>
            
            <div className="space-y-4">
              {lastPublikasi.length > 0 ? lastPublikasi.map((pub) => (
                <div key={pub.id} className="flex flex-col gap-1 p-4 rounded-2xl bg-neutral-50 border border-neutral-100 hover:border-primary/20 transition-colors">
                  <div className="flex justify-between items-start gap-4">
                    <span className="font-bold text-neutral-800 line-clamp-2">{pub.judul}</span>
                    <Badge variant="outline" className="shrink-0 text-[10px] font-black">{pub.tahun}</Badge>
                  </div>
                  <span className="text-[10px] font-black uppercase text-neutral-400 tracking-widest">{pub.jenis}</span>
                </div>
              )) : (
                <div className="text-center py-10">
                  <p className="text-xs text-neutral-400 italic">Belum ada riwayat publikasi.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

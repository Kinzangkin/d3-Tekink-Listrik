"use client"

import { PageHeader } from "@/components/dashboard/PageHeader"
import { StatCard } from "@/components/dashboard/StatCard"
import { BookOpen, FileText, Users, Award, ExternalLink } from "lucide-react"
import { mockPublikasi, mockDosen } from "@/lib/mock-data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function DosenOverviewPage() {
  const dosen = mockDosen[0] // Mock current user

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
              <AvatarImage src={dosen.foto_url || undefined} />
              <AvatarFallback className="text-2xl bg-primary text-white">
                {dosen.nama.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            
            <h3 className="font-black text-neutral-800 text-lg">{dosen.nama}</h3>
            <p className="text-sm font-medium text-neutral-500 mb-4">{dosen.jabatan_fungsional} - {dosen.pangkat_golongan}</p>
            
            <div className="flex flex-wrap justify-center gap-1 mb-6">
              {dosen.keahlian.map(k => (
                <Badge key={k.id} variant="secondary" className="text-[10px] font-bold">
                  {k.nama_keahlian}
                </Badge>
              ))}
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
              value="12" 
              icon={<BookOpen size={20} />} 
              description="Jurnal & Konferensi"
            />
            <StatCard 
              title="Penelitian" 
              value="4" 
              icon={<FileText size={20} />} 
              description="Riset aktif & selesai"
            />
            <StatCard 
              title="Pengabdian" 
              value="3" 
              icon={<Users size={20} />} 
              description="Kegiatan pengabdian"
            />
            <StatCard 
              title="HKI & Paten" 
              value="2" 
              icon={<Award size={20} />} 
              description="Hak Kekayaan Intelektual"
            />
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-neutral-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-black text-neutral-800 uppercase tracking-tight text-lg">Publikasi Terakhir</h3>
              <Link href="/dashboard/dosen/publikasi" className="text-xs font-bold text-primary hover:underline uppercase tracking-widest flex items-center gap-1">
                Lihat Semua <ExternalLink size={12} />
              </Link>
            </div>
            
            <div className="space-y-4">
              {mockPublikasi.slice(0, 3).map((pub) => (
                <div key={pub.id} className="flex flex-col gap-1 p-4 rounded-2xl bg-neutral-50 border border-neutral-100 hover:border-primary/20 transition-colors">
                  <div className="flex justify-between items-start gap-4">
                    <span className="font-bold text-neutral-800 line-clamp-2">{pub.judul}</span>
                    <Badge variant="outline" className="shrink-0 text-[10px]">{pub.tahun}</Badge>
                  </div>
                  <span className="text-xs text-neutral-500">{pub.nama_jurnal_konferensi}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

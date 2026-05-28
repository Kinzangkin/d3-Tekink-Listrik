"use client"

import React, { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Navbar } from "@/components/layout/Navbar/Navbar"
import { apiGet } from "@/services/api"
import { 
  HiArrowLeft, 
  HiMail, 
  HiLibrary, 
  HiAcademicCap, 
  HiOutlineDocumentSearch,
  HiOutlineLightBulb,
  HiCheckCircle
} from "react-icons/hi"
import { FaLinkedin, FaGoogleScholar } from "react-icons/fa6"
import { Loader2 } from "lucide-react"

interface DosenDetail {
  id: string
  nama: string
  nidn: string
  jabatanFungsional?: string
  jabatan_fungsional?: string
  keahlian: string[]
  fotoUrl?: string
  foto_url?: string
  email: string
  status: string
}



interface TriDharma {
  id: string
  dosen_id: string
  jenis: string
  judul: string
  deskripsi: string
  tahun: number
  file_url: string
  anggota?: { dosen_id: string; nama_dosen: string; peran: string }[]
}

export default function DosenDetailPage() {
  const params = useParams()
  const router = useRouter()
  // ID from url can be UUID or NIP depending on how the grid routes, 
  // assume UUID since that's what the API uses
  const id = params.id as string

  const [dosen, setDosen] = useState<DosenDetail | null>(null)
  const [triDharmaList, setTriDharmaList] = useState<TriDharma[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // 1. Fetch Dosen Profile
        // Note: Check if backend uses NIP or UUID for this endpoint
        const resDosen = await apiGet(`/dosen/${id}`)
        let lecturerUuid = id
        if (resDosen && resDosen.data && resDosen.data.success) {
          const dosenData = resDosen.data.data
          setDosen(dosenData)
          lecturerUuid = dosenData.id || id
        } else {
          // Fallback or error handling
          setDosen(null)
        }

        // 2. Fetch Tri Dharma
        // We pass dosen_id if backend supports it. If it returns all, we filter manually.
        const resTriDharma = await apiGet(`/tri-dharma?dosen_id=${lecturerUuid}`)
        if (resTriDharma && resTriDharma.data && resTriDharma.data.success) {
          const allData: TriDharma[] = resTriDharma.data.data || []
          // Manual filter check for both root dosen_id and the anggota (members) list
          const filtered = allData.filter(item => 
            item.dosen_id === lecturerUuid ||
            (item as any).dosenId === lecturerUuid ||
            (item as any).anggota?.some((member: any) => member.dosen_id === lecturerUuid || member.dosenId === lecturerUuid)
          )
          setTriDharmaList(filtered)
        }
      } catch (error) {
        console.error("Failed to fetch detail:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (id) fetchData()
  }, [id])

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4 bg-neutral-50">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <p className="text-neutral-500 font-bold animate-pulse">Memuat Profil Dosen...</p>
      </div>
    )
  }

  if (!dosen) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl font-bold text-neutral-800 uppercase tracking-widest">Dosen Tidak Ditemukan</h1>
        <Button onClick={() => router.push("/dosen")} className="bg-primary hover:bg-primary/90">
          KEMBALI KE DIREKTORI
        </Button>
      </div>
    )
  }

  // Filter tri dharma based on jenis (case-insensitive and trimmed)
  const penelitian = triDharmaList.filter(t => {
    const jenis = t.jenis?.trim().toLowerCase()
    return jenis === "penelitian" || jenis === "publikasi"
  })
  const pengabdian = triDharmaList.filter(t => t.jenis?.trim().toLowerCase() === "pengabdian")
  const bukuAjar = triDharmaList.filter(t => t.jenis?.trim().toLowerCase() === "buku ajar")

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      <Navbar />
      <div className="bg-[#0f172a] pt-32 pb-48 relative overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Background" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-linear-to-b from-[#0f172a]/80 via-[#0f172a]/90 to-[#0f172a]" />
        </div>

        
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 transform origin-top-right z-10" />
        <div className="container mx-auto px-4 relative z-20">
          <Link 
            href="/dosen" 
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors text-sm font-bold tracking-widest uppercase"
          >
            <HiArrowLeft /> KEMBALI KE DIREKTORI
          </Link>

          
          <div className="flex flex-col md:flex-row items-center md:items-end gap-8 md:gap-12">
            {/* Photo Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative w-48 h-64 md:w-56 md:h-72 rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl bg-neutral-200 shrink-0"
            >
              <Image
                src={dosen.fotoUrl || dosen.foto_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(dosen.nama)}&size=500`}
                alt={dosen.nama}
                fill
                className="object-cover object-top"
              />

            </motion.div>

            {/* Basic Info */}
            <div className="text-center md:text-left flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Badge className="mb-4 bg-amber-400 text-amber-950 hover:bg-amber-400 uppercase font-black text-[10px] tracking-widest px-3">
                  STAF PENGAJAR PRODI D3TL
                </Badge>
                <h1 className="text-3xl md:text-5xl font-black text-white mb-2 leading-tight uppercase tracking-tight">
                  {dosen.nama}
                </h1>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-white/80 text-sm md:text-base font-medium mb-6">
                  <span className="flex items-center gap-2">
                    <HiCheckCircle className="text-green-400" /> NIDN: {dosen.nidn || "-"}
                  </span>
                  <span className="flex items-center gap-2">
                    <HiAcademicCap className="text-blue-400" /> {dosen.jabatanFungsional || dosen.jabatan_fungsional || "Dosen"}
                  </span>

                </div>

                {/* Social/Contact Quick Links */}
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <Button size="sm" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-primary rounded-xl gap-2 h-10 px-4">
                    <HiMail size={18} /> {dosen.email}
                  </Button>
                  <Button size="icon" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-blue-600 hover:border-blue-600 rounded-xl w-10 h-10">
                    <FaLinkedin size={18} />
                  </Button>
                  <Button size="icon" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-emerald-600 hover:border-emerald-600 rounded-xl w-10 h-10">
                    <FaGoogleScholar size={18} />
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="container mx-auto px-4 -mt-20 relative z-20">
        <Tabs defaultValue="penelitian" className="w-full">
          <TabsList className="w-full bg-white/40 backdrop-blur-md p-2 rounded-[2rem] shadow-sm border border-white/20 flex overflow-x-auto lg:overflow-visible scrollbar-hide h-20 mb-12 relative">
            <TabsTrigger 
              value="penelitian" 
              className="relative z-10 rounded-full data-[state=active]:text-white transition-all duration-300 flex-1 min-w-[170px] font-black text-xs tracking-widest uppercase h-full data-[state=active]:bg-primary data-[state=active]:shadow-lg p-2 shadow-primary/20"
            >
              Penelitian & Publikasi
            </TabsTrigger>
            <TabsTrigger 
              value="pengabdian" 
              className="relative z-10 rounded-full data-[state=active]:text-white transition-all duration-300 flex-1 min-w-[170px] font-black text-xs tracking-widest uppercase h-full data-[state=active]:bg-primary data-[state=active]:shadow-lg p-2 shadow-primary/20"
            >
              Pengabdian
            </TabsTrigger>
            <TabsTrigger 
              value="buku-ajar" 
              className="relative z-10 rounded-full data-[state=active]:text-white transition-all duration-300 flex-1 min-w-[170px] font-black text-xs tracking-widest uppercase h-full data-[state=active]:bg-primary data-[state=active]:shadow-lg p-2 shadow-primary/20"
            >
              Buku Ajar
            </TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Tabs Content */}
            <div className="lg:col-span-2">
              <TabsContent value="penelitian" className="mt-0 space-y-8">
                <h3 className="text-xl font-black text-neutral-800 uppercase tracking-tight mb-6 flex items-center gap-3">
                  <HiOutlineDocumentSearch className="text-primary" /> Riwayat Penelitian & Publikasi
                </h3>
                {penelitian.length > 0 ? penelitian.map((pub, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="border-none shadow-sm rounded-3xl overflow-hidden group hover:shadow-md transition-all">
                      <CardContent className="p-8 flex gap-6">
                        <div className="text-2xl font-black text-neutral-200 group-hover:text-primary/20 transition-colors pt-1">
                          {pub.tahun}
                        </div>
                        <div className="space-y-3">
                          <Badge variant="outline" className="border-neutral-200 text-neutral-400 text-[10px] font-bold uppercase tracking-widest">
                            {pub.jenis}
                          </Badge>
                          <h4 className="text-lg font-bold text-neutral-800 leading-tight group-hover:text-primary transition-colors">
                            {pub.judul}
                          </h4>
                          {pub.deskripsi && (
                            <p className="text-sm text-neutral-500 leading-relaxed italic">
                              {pub.deskripsi}
                            </p>
                          )}
                          {pub.anggota && pub.anggota.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-2 items-center">
                              <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider mr-1">Tim Anggota:</span>
                              {pub.anggota.map((ang: any, idxAng: number) => (
                                <Badge key={idxAng} variant="secondary" className="text-[9px] font-black uppercase tracking-tight py-0.5 px-2 bg-neutral-100 text-neutral-600 border-none">
                                  {ang.nama_dosen} ({ang.peran})
                                </Badge>
                              ))}
                            </div>
                          )}
                          {pub.file_url && (
                            <a href={pub.file_url} target="_blank" rel="noreferrer" className="text-xs font-bold text-primary italic hover:underline">
                              Lihat Dokumen
                            </a>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )) : (
                  <Card className="border-none shadow-sm rounded-3xl overflow-hidden p-12 text-center bg-white">
                     <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-6 text-neutral-300">
                      <HiOutlineDocumentSearch size={40} />
                     </div>
                     <h3 className="text-xl font-bold text-neutral-800 uppercase italic">Belum Ada Data</h3>
                     <p className="text-neutral-500 max-w-sm mx-auto mt-2">Dosen ini belum memiliki catatan penelitian/publikasi di sistem.</p>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="pengabdian" className="mt-0 space-y-6">
                {pengabdian.length > 0 ? pengabdian.map((pub, idx) => (
                  <Card key={idx} className="border-none shadow-sm rounded-3xl overflow-hidden group hover:shadow-md transition-all">
                    <CardContent className="p-8 flex gap-6">
                      <div className="text-2xl font-black text-neutral-200 group-hover:text-primary/20 transition-colors pt-1">
                        {pub.tahun}
                      </div>
                      <div className="space-y-3">
                        <Badge variant="outline" className="border-neutral-200 text-neutral-400 text-[10px] font-bold uppercase tracking-widest">
                          {pub.jenis}
                        </Badge>
                        <h4 className="text-lg font-bold text-neutral-800 leading-tight group-hover:text-primary transition-colors">
                          {pub.judul}
                        </h4>
                        {pub.deskripsi && <p className="text-sm text-neutral-500 leading-relaxed">{pub.deskripsi}</p>}
                        {pub.anggota && pub.anggota.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-2 items-center">
                            <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider mr-1">Tim Anggota:</span>
                            {pub.anggota.map((ang: any, idxAng: number) => (
                              <Badge key={idxAng} variant="secondary" className="text-[9px] font-black uppercase tracking-tight py-0.5 px-2 bg-neutral-100 text-neutral-600 border-none">
                                {ang.nama_dosen} ({ang.peran})
                              </Badge>
                            ))}
                          </div>
                        )}
                        {pub.file_url && (
                          <div className="pt-2">
                            <a href={pub.file_url} target="_blank" rel="noreferrer" className="text-xs font-bold text-primary italic hover:underline">
                              Lihat Dokumen
                            </a>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )) : (
                  <Card className="border-none shadow-sm rounded-3xl overflow-hidden p-12 text-center bg-white">
                     <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-6 text-neutral-300">
                      <HiLibrary size={40} />
                     </div>
                     <h3 className="text-xl font-bold text-neutral-800 uppercase italic">Belum Ada Data</h3>
                     <p className="text-neutral-500 max-w-sm mx-auto mt-2">Data pengabdian masyarakat belum tersedia.</p>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="buku-ajar" className="mt-0 space-y-6">
                {bukuAjar.length > 0 ? bukuAjar.map((pub, idx) => (
                  <Card key={idx} className="border-none shadow-sm rounded-3xl overflow-hidden group hover:shadow-md transition-all">
                    <CardContent className="p-8 flex gap-6">
                      <div className="text-2xl font-black text-neutral-200 group-hover:text-primary/20 transition-colors pt-1">
                        {pub.tahun}
                      </div>
                      <div className="space-y-3">
                        <Badge variant="outline" className="border-neutral-200 text-neutral-400 text-[10px] font-bold uppercase tracking-widest">
                          {pub.jenis}
                        </Badge>
                        <h4 className="text-lg font-bold text-neutral-800 leading-tight group-hover:text-primary transition-colors">
                          {pub.judul}
                        </h4>
                        {pub.deskripsi && <p className="text-sm text-neutral-500 leading-relaxed">{pub.deskripsi}</p>}
                        {pub.file_url && (
                          <div className="pt-2">
                            <a href={pub.file_url} target="_blank" rel="noreferrer" className="text-xs font-bold text-primary italic hover:underline">
                              Lihat Buku
                            </a>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )) : (
                  <Card className="border-none shadow-sm rounded-3xl overflow-hidden p-12 text-center bg-white">
                     <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-6 text-neutral-300">
                      <HiLibrary size={40} />
                     </div>
                     <h3 className="text-xl font-bold text-neutral-800 uppercase italic">Belum Ada Buku Ajar</h3>
                  </Card>
                )}
              </TabsContent>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-8">
              <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
                <div className="h-1.5 bg-primary w-full" />
                <CardContent className="p-8">
                  <h4 className="text-sm font-black text-neutral-800 uppercase tracking-widest mb-6">Kompetensi Ahli</h4>
                  <div className="flex flex-wrap gap-2">
                    {dosen.keahlian && dosen.keahlian.length > 0 ? dosen.keahlian.map((tag, i) => (
                      <Badge key={i} className="bg-primary/5 text-primary hover:bg-primary/10 border-none px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider">
                        {typeof tag === 'string' ? tag : (tag as any)?.nama_keahlian || ""}
                      </Badge>
                    )) : (
                      <p className="text-xs text-neutral-400 italic">Belum ada data kompetensi</p>
                    )}
                  </div>
                  
                  <Separator className="my-8 bg-neutral-100" />
                  
                  <h4 className="text-sm font-black text-neutral-800 uppercase tracking-widest mb-6">Informasi Kontak</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 group cursor-pointer">
                      <div className="w-10 h-10 rounded-xl bg-neutral-50 flex items-center justify-center text-neutral-400 group-hover:bg-primary group-hover:text-white transition-colors">
                        <HiMail size={20} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-neutral-300 uppercase tracking-widest">Email Resmi</span>
                        <span className="text-sm font-bold text-neutral-700">{dosen.email}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Status Snapshot */}
              <div className="relative rounded-3xl overflow-hidden bg-primary p-8 text-white">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
                <HiOutlineLightBulb size={32} className="text-amber-400 mb-6" />
                <h4 className="text-xl font-black uppercase leading-tight mb-4">Status Dosen</h4>
                <p className="text-white/90 text-lg leading-relaxed font-bold mb-6 uppercase tracking-wider">
                  {dosen.status}
                </p>
                <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/70">
                  SISTEM INFORMASI D3TL
                </div>
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

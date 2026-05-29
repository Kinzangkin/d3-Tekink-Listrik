"use client"

import React, { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/layout/Navbar/Navbar"
import { Footer } from "@/components/layout/Footer/Footer"

import { apiGet } from "@/services/api"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { 
  HiArrowLeft, 
  HiLightningBolt, 
  HiCheckCircle, 
  HiCamera, 
  HiX, 
  HiChevronLeft, 
  HiChevronRight,
  HiOutlineClipboardList
} from "react-icons/hi"
// Helper to extract specifications dynamically from description
function extractSpec(text: string, labelPattern: string, fallback: string): string {
  if (!text) return fallback
  
  // Try pattern like "Kapasitas: 40 Mahasiswa" or "Kapasitas 40"
  const regexes = [
    new RegExp(`(?:${labelPattern})\\s*[:=]\\s*([^\\n|.,;]+)`, 'i'),
    new RegExp(`(?:${labelPattern})\\s+([^\\n|.,;]+)`, 'i')
  ]
  
  for (const regex of regexes) {
    const match = text.match(regex)
    if (match && match[1]) {
      return match[1].trim()
    }
  }
  return fallback
}

// Helper to extract equipment list from description
function extractPeralatan(text: string, fallback: string[]): string[] {
  if (!text) return fallback
  
  // Look for "Peralatan:" or similar keyword followed by items
  const match = text.match(/(?:peralatan|daftar peralatan|alat-alat|alat|dilengkapi dengan)\\s*[:=]?\\s*([^\\n.]+)/i)
  if (match && match[1]) {
    const items = match[1].split(/[,;]/).map(item => item.trim()).filter(Boolean)
    if (items.length > 0) return items
  }
  return fallback
}

export default function FasilitasDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const [item, setItem] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchItem = async () => {
      // Coba fetch dari fasilitas dulu
      try {
        const resFasilitas = await apiGet(`/fasilitas/${id}`)
        if (resFasilitas?.data?.success && resFasilitas.data.data) {
          const f = resFasilitas.data.data
          setItem({
            id: f.id,
            title: f.nama_fasilitas || f.nama || f.judul_fasilitas,
            description: f.deskripsi || "Fasilitas penunjang D3 Teknik Listrik.",
            image: f.foto_url || f.image_url || (f.media && f.media.length > 0 ? f.media[0].file_url : "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=800&q=80"),
            category: f.kategori || "Fasilitas",
            media: f.media || []
          })
          setIsLoading(false)
          return
        }
      } catch (e) {
        // Abaikan dan coba tri-dharma
      }

      // Jika tidak ada, fetch dari backend tri-dharma
      try {
        const res = await apiGet(`/tri-dharma/${id}`)
        if (res?.data?.success && res.data.data) {
          const fetchedData = res.data.data
          setItem({
            id: fetchedData.id,
            title: fetchedData.judul,
            description: fetchedData.deskripsi || "Penelitian dan Pengabdian Dosen D3 Teknik Listrik.",
            image: fetchedData.file_url || (fetchedData.media && fetchedData.media.length > 0 ? fetchedData.media[0].file_url : "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80"),
            category: fetchedData.jenis,
            media: fetchedData.media || []
          })
        }
      } catch (e) {
        console.error("Gagal memuat detail fasilitas/tridharma", e)
      } finally {
        setIsLoading(false)
      }
    }
    fetchItem()
  }, [id])

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4 bg-neutral-50">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <p className="text-neutral-500 font-bold animate-pulse">Memuat Detail...</p>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-black text-neutral-800 uppercase tracking-widest mb-4">Data Tidak Ditemukan</h1>
        <Button onClick={() => router.push("/fasilitas")} className="bg-primary hover:bg-primary/90">
          KEMBALI
        </Button>
      </div>
    )
  }

  // Extract specs dynamically from database description field, with robust fallbacks
  const spesifikasi = [
    { label: "Kapasitas", value: extractSpec(item.description, "kapasitas", "30 Mahasiswa") },
    { label: "Luas Area", value: extractSpec(item.description, "luas area|luas", "120 m²") },
    { label: "Standard", value: extractSpec(item.description, "standard|standar", "ISO 9001:2015") },
    { label: "Status", value: extractSpec(item.description, "status", "Tersertifikasi") },
  ]

  // Extract equipment dynamically from database description field, with robust fallbacks
  const peralatan = extractPeralatan(item.description, [
    "Digital Multimeter (Fluke)",
    "Oscilloscope 100MHz",
    "Kit PLC Schneider TM221",
    "Motor AC 3 Fasa 1.5 HP",
    "Inverter VFD PowerFlex",
    "Powe Quality Analyzer",
  ])

  // Get gallery images dynamically from database media, ensuring featured image is first and no duplicates exist
  const dbImages = item.media && item.media.length > 0
    ? item.media.map((m: any) => m.file_url || m.fileUrl)
    : []
  const galeri = Array.from(new Set([item.image, ...dbImages])).filter(Boolean) as string[]

  const navigateImage = (direction: 'next' | 'prev') => {
    if (selectedImage === null) return
    if (direction === 'next') {
      setSelectedImage((selectedImage + 1) % galeri.length)
    } else {
      setSelectedImage((selectedImage - 1 + galeri.length) % galeri.length)
    }
  }

  return (
    <main className="min-h-screen bg-neutral-50">
      <Navbar />
      
      {/* Hero Header */}
      <section className="relative h-[75vh] min-h-[600px] w-full mt-0">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
          priority
        />
        {/* Top-down overlay for navbar readability */}
        <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-neutral-950/80 via-neutral-950/40 to-transparent pointer-events-none z-10" />

        <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/40 to-transparent flex items-end">
          <div className="container mx-auto px-4 md:px-6 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Link 
                href="/fasilitas" 
                className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors font-black text-xs tracking-widest uppercase"
              >
                <HiArrowLeft /> Kembali ke Daftar
              </Link>
              <Badge className="mb-4 bg-primary text-white border-none px-4 py-2 rounded-xl font-black text-[10px] tracking-widest uppercase shadow-lg">
                FAKULTAS TEKNIK &bull; {item.category}
              </Badge>
              <h1 className="text-4xl md:text-7xl font-black text-white leading-none tracking-tight uppercase max-w-4xl">
                {item.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* Left: Info & Specs */}
            <div className="lg:col-span-2 space-y-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-black text-neutral-800 uppercase tracking-tight flex items-center gap-3">
                  <HiLightningBolt className="text-primary" /> Deskripsi Unit
                </h2>
                <p className="text-lg text-neutral-600 leading-relaxed font-medium">
                  {item.description}
                  {" "}Fasilitas ini dirancang khusus untuk memenuhi standar kompetensi industri modern, memberikan pengalaman praktis yang mendalam bagi mahasiswa prodi D3 Teknik Listrik.
                </p>
              </div>

              <Separator className="bg-neutral-200" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Spesifikasi Card */}
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-neutral-800 uppercase tracking-tight flex items-center gap-3">
                    <HiOutlineClipboardList className="text-primary" /> Spesifikasi Utama
                  </h3>
                  <div className="space-y-4">
                    {spesifikasi.map((spec, idx) => (
                      <div key={idx} className="flex justify-between items-center p-4 bg-white rounded-2xl border border-neutral-100 shadow-sm">
                        <span className="font-bold text-neutral-400 text-xs tracking-widest uppercase">{spec.label}</span>
                        <span className="font-black text-neutral-700">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Peralatan List */}
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-neutral-800 uppercase tracking-tight flex items-center gap-3">
                    <HiCheckCircle className="text-primary" /> Daftar Peralatan
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {peralatan.map((alat, idx) => (
                      <div key={idx} className="flex items-center gap-3 font-bold text-neutral-600">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        {alat}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Gallery Sidebar Preview */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-[2rem] border border-neutral-100 shadow-sm space-y-8">
                <h3 className="text-xl font-bold text-neutral-800 uppercase tracking-tight flex items-center gap-3">
                  <HiCamera className="text-primary" /> Galeri Fasilitas
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {galeri.map((src, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setSelectedImage(idx)}
                      className="relative h-24 rounded-2xl overflow-hidden cursor-zoom-in bg-neutral-100 shadow-sm"
                    >
                      <Image
                        src={src}
                        alt="Gallery preview"
                        fill
                        className="object-cover"
                      />
                      {idx === 3 && galeri.length > 4 && (
                        <div className="absolute inset-0 bg-primary/80 flex items-center justify-center text-white font-black">
                          +{galeri.length - 4}
                        </div>
                      )}
                    </motion.div>
                  )).slice(0, 4)}
                </div>
                <Button 
                  onClick={() => setSelectedImage(0)}
                  className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 font-black tracking-widest uppercase text-xs"
                >
                  LIHAT SEMUA FOTO
                </Button>
              </div>

              {/* Training Info Card */}
              <Card className="border-none bg-blue-600 text-white rounded-[2rem] overflow-hidden">
                <CardContent className="p-10 space-y-4">
                  <HiOutlineClipboardList size={32} className="text-blue-200" />
                  <h4 className="text-2xl font-black uppercase leading-tight">Standar Industri</h4>
                  <p className="text-blue-100 text-sm font-medium leading-relaxed">
                    Setiap unit fasilitas telah melewati audit keselamatan kelistrikan tahunan untuk menjamin keamanan praktikum.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-1000 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4"
          >
            <div className="absolute top-10 right-10 flex items-center gap-6 z-1001">
              <span className="text-white/40 font-mono tracking-widest text-sm">{selectedImage + 1} / {galeri.length}</span>
              <button 
                onClick={() => setSelectedImage(null)}
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white flex items-center justify-center transition-colors"
              >
                <HiX size={24} />
              </button>
            </div>

            {/* Nav */}
            <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-1001">
              <button onClick={() => navigateImage('prev')} className="w-14 h-14 rounded-full bg-white/5 border border-white/10 hover:bg-white/20 text-white flex items-center justify-center pointer-events-auto transition-all active:scale-95">
                <HiChevronLeft size={32} />
              </button>
              <button onClick={() => navigateImage('next')} className="w-14 h-14 rounded-full bg-white/5 border border-white/10 hover:bg-white/20 text-white flex items-center justify-center pointer-events-auto transition-all active:scale-95">
                <HiChevronRight size={32} />
              </button>
            </div>

            <motion.div key={selectedImage} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative w-full max-w-5xl aspect-video">
              <Image
                src={galeri[selectedImage]}
                alt="Fullscreen Preview"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

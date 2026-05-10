"use client"

import React, { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { HiArrowLeft, HiCalendar, HiX, HiChevronLeft, HiChevronRight, HiCollection, HiArrowRight } from "react-icons/hi"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/layout/Navbar/Navbar"
import { Footer } from "@/components/layout/Footer/Footer"

const galleryDetails = {
  "gallery-1": {
    title: "Kunjungan Industri PT. PLN Nusantara Power",
    date: "15 Maret 2024",
    category: "Kunjungan Industri",
    images: [
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837",
      "https://images.unsplash.com/photo-1498084393753-b411b2d26b34",
      "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5",
      "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0",
      "https://images.unsplash.com/photo-1555664424-778a1e5e1b48",
      "https://images.unsplash.com/photo-1504917595217-d4dc5f566fab",
      "https://images.unsplash.com/photo-1563986768609-322da13575f3",
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789",
    ]
  },
  "gallery-2": {
    title: "Praktikum Instalasi Motor Listrik",
    date: "10 Februari 2024",
    category: "Akademik",
    images: [
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e",
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528",
      "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    ]
  },
  // Default values for other galleries to simplify
}

export default function GalleryDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const gallery = galleryDetails[id as keyof typeof galleryDetails] || {
    title: "Momen Kegiatan Mahasiswa",
    date: "Kegiatan Terbaru",
    category: "Aktivitas",
    images: Array.from({ length: 8 }).map((_, i) => `https://images.unsplash.com/photo-${1500000000000 + i * 1000}`)
  }

  const navigateImage = (direction: 'next' | 'prev') => {
    if (selectedImage === null) return
    if (direction === 'next') {
      setSelectedImage((selectedImage + 1) % gallery.images.length)
    } else {
      setSelectedImage((selectedImage - 1 + gallery.images.length) % gallery.images.length)
    }
  }

  return (
    <main className="min-h-screen bg-neutral-50">
      <Navbar />
      <div className="px-4 py-32 md:px-6">
        <div className="container mx-auto">
        
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <Link href="/galeri" className="group flex items-center gap-2 text-neutral-400 hover:text-primary transition-colors font-black text-xs tracking-widest uppercase">
            <HiArrowLeft className="group-hover:-translate-x-2 transition-transform" /> Kembali ke Galeri
          </Link>
          <div className="flex items-center gap-4">
            <Badge className="bg-primary/5 text-primary border-none px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
              {gallery.category}
            </Badge>
          </div>
        </div>

        <div className="max-w-4xl mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-neutral-800 uppercase tracking-tight leading-[0.9] mb-6">
            {gallery.title}
          </h1>
          <div className="flex flex-wrap gap-8">
            <div className="flex items-center gap-3 text-neutral-400 font-bold uppercase tracking-widest text-xs">
              <HiCalendar className="text-primary" size={20} />
              {gallery.date}
            </div>
            <div className="flex items-center gap-3 text-neutral-400 font-bold uppercase tracking-widest text-xs">
              <HiCollection className="text-primary" size={20} />
              {gallery.images.length} Foto
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {gallery.images.map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
              onClick={() => setSelectedImage(idx)}
              className="relative group cursor-zoom-in overflow-hidden rounded-3xl"
            >
              <img 
                src={`${src}?auto=format&fit=crop&q=80&w=800`}
                alt={`${gallery.title} - ${idx + 1}`}
                className="w-full h-auto object-cover rounded-3xl transition-all duration-500 group-hover:scale-110 group-hover:brightness-75"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                 <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/40">
                  <HiArrowRight className="-rotate-45" size={24} />
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Overlay */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-1000 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
          >
            <div className="absolute top-10 right-10 flex items-center gap-4 z-1001">
              <span className="text-white/40 font-mono text-sm tracking-widest">{selectedImage + 1} / {gallery.images.length}</span>
              <button 
                onClick={() => setSelectedImage(null)}
                className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors border border-white/10"
              >
                <HiX size={24} />
              </button>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-1001">
              <button 
                onClick={(e) => { e.stopPropagation(); navigateImage('prev') }}
                className="w-16 h-16 rounded-full bg-white/5 hover:bg-white/20 text-white flex items-center justify-center transition-all border border-white/10 pointer-events-auto active:scale-90"
              >
                <HiChevronLeft size={32} />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); navigateImage('next') }}
                className="w-16 h-16 rounded-full bg-white/5 hover:bg-white/20 text-white flex items-center justify-center transition-all border border-white/10 pointer-events-auto active:scale-90"
              >
                <HiChevronRight size={32} />
              </button>
            </div>

            {/* Image Container */}
            <motion.div 
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", damping: 20 }}
              className="relative w-full max-w-6xl h-full flex flex-col items-center justify-center"
            >
              <div className="relative w-full aspect-4/3 md:aspect-video">
                <Image
                  src={gallery.images[selectedImage]}
                  alt="Gallery detail view"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="mt-8 text-center max-w-2xl px-6">
                <h4 className="text-white font-black text-xs md:text-sm tracking-[0.3em] uppercase opacity-60 mb-2">
                  {gallery.category} &bull; {gallery.date}
                </h4>
                <p className="text-white font-bold text-lg md:text-xl uppercase tracking-tighter leading-tight">
                  {gallery.title}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
      <Footer />
    </main>
  )
}

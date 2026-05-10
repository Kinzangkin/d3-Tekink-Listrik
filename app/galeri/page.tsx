"use client"

import React from "react"
import { PageHero } from "@/components/sections/VisiMisi/PageHero"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HiCamera, HiArrowRight, HiCalendar } from "react-icons/hi"
import { Navbar } from "@/components/layout/Navbar/Navbar"

const galleries = [
  {
    id: "gallery-1",
    title: "Kunjungan Industri PT. PLN Nusantara Power",
    date: "15 Maret 2024",
    category: "Kunjungan Industri",
    cover: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800",
    count: 12
  },
  {
    id: "gallery-2",
    title: "Praktikum Instalasi Motor Listrik",
    date: "10 Februari 2024",
    category: "Akademik",
    cover: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800",
    count: 8
  },
  {
    id: "gallery-3",
    title: "Wisuda Sarjana Terapan Angkatan 2023",
    date: "20 Desember 2023",
    category: "Seremoni",
    cover: "https://images.unsplash.com/photo-1541339907198-e08756ebafe1?auto=format&fit=crop&q=80&w=800",
    count: 24
  },
  {
    id: "gallery-4",
    title: "Workshop PLC & SCADA Dasar",
    date: "5 November 2023",
    category: "Pelatihan",
    cover: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800",
    count: 15
  },
  {
    id: "gallery-5",
    title: "Pengabdian Masyarakat: Desa Mandiri Energi",
    date: "12 Oktober 2023",
    category: "Pengabdian",
    cover: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800",
    count: 10
  },
  {
    id: "gallery-6",
    title: "Electrical Engineering Sport Day",
    date: "1 September 2023",
    category: "Kemahasiswaan",
    cover: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800",
    count: 20
  }
]

export default function GaleriPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageHero 
        title="Galeri Kegiatan"
        subtitle="Momen dan Aktivitas Civitas Akademika Progra Studi D3 Teknik Listrik"
      />

      <section className="py-24 container mx-auto px-4 md:px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              Visual Journey
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-neutral-800 lg:text-6xl tracking-tight leading-none uppercase">
              Abadikan <span className="text-primary">Setiap Momen</span> Berharga
            </h2>
          </div>
          <div className="flex items-center gap-4 text-neutral-400 font-bold uppercase tracking-widest text-sm">
            <HiCamera className="text-primary" size={24} />
            <span>{galleries.length} Album Tersedia</span>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleries.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/galeri/${item.id}`}>
                <Card className="group border-none shadow-none bg-transparent cursor-pointer overflow-hidden rounded-[2rem]">
                  <CardContent className="p-0">
                    <div className="relative h-[400px] overflow-hidden rounded-[1.5rem] md:rounded-[2rem]">
                      <Image
                        src={item.cover}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700 brightness-[0.85] group-hover:brightness-100"
                      />
                      
                      {/* Overlay Info */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end">
                        <Badge className="w-fit mb-3 bg-white/20 backdrop-blur-md text-white border-white/20 uppercase font-black text-[10px] tracking-widest">
                          {item.category}
                        </Badge>
                        <h3 className="text-xl font-bold text-white mb-4 line-clamp-2 group-hover:text-amber-400 transition-colors uppercase leading-tight tracking-tight">
                          {item.title}
                        </h3>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-white/20">
                          <div className="flex items-center gap-2 text-white/60 text-xs font-bold uppercase tracking-widest">
                            <HiCalendar className="text-amber-400" />
                            {item.date}
                          </div>
                          <div className="flex items-center gap-2 text-white group-hover:gap-4 transition-all">
                            <span className="text-xs font-black uppercase tracking-widest">{item.count} FOTO</span>
                            <HiArrowRight size={16} className="text-amber-400" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  )
}

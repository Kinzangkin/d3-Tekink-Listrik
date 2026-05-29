"use client"

import { useEffect, useState } from "react"
import { SectionHeader } from "@/components/ui/section-header"
import { StatistikCard } from "./StatistikCard"
import Image from "next/image"
import { apiGet } from "@/services/api"

interface StatistikData {
  total_dosen: number
  total_mahasiswa: number
  total_alumni: number
  [key: string]: number // fallback for others
}

export function StatistikSection() {
  const [data, setData] = useState<StatistikData>({
    total_dosen: 0,
    total_mahasiswa: 0,
    total_alumni: 0
  })

  useEffect(() => {
    const fetchRealData = async () => {
      try {
        // 1. Ambil Jumlah Dosen Nyata dari Database
        const resDosen = await apiGet("/dosen")
        let totalDosen = 24 // Fallback jika DB kosong
        if (resDosen && resDosen.data && resDosen.data.success) {
          const dosenArray = resDosen.data.data || []
          totalDosen = dosenArray.length || totalDosen
        }

        // 2. Ambil Data Statistik untuk Menghitung Mahasiswa Aktif & Total Lulusan
        const resStatistik = await apiGet("/statistik")
        let totalMahasiswa = 450 // Fallback
        let totalAlumni = 3500 // Fallback

        if (resStatistik && resStatistik.data && resStatistik.data.success) {
          const statsArray: any[] = resStatistik.data.data || []
          if (statsArray.length > 0) {
            // Urutkan tahun dari yang terbaru
            const sortedStats = [...statsArray].sort((a, b) => b.tahun - a.tahun)
            
            // D3 adalah program 3 tahun: hitung jumlah mahasiswa yang diterima dalam 3 angkatan terbaru
            const calculatedStudents = sortedStats
              .slice(0, 3)
              .reduce((sum, item) => sum + (item.jumlah_diterima || 0), 0)
              
            if (calculatedStudents > 0) {
              totalMahasiswa = calculatedStudents
            }

            // Total Alumni = Baseline historis (3000) + Semua lulusan yang tercatat di database
            const calculatedGraduates = statsArray.reduce((sum, item) => sum + (item.jumlah_lulusan || 0), 0)
            if (calculatedGraduates > 0) {
              totalAlumni = 3000 + calculatedGraduates
            }
          }
        }

        setData({
          total_dosen: totalDosen,
          total_mahasiswa: totalMahasiswa,
          total_alumni: totalAlumni
        })
      } catch (error) {
        console.error("Gagal memuat data statistik beranda:", error)
      }
    }
    fetchRealData()
  }, [])

  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content & Stats */}
          <div>
            <SectionHeader 
              subtitle="TENTANG KAMI"
              title="MEMBANGUN KOMPETENSI, MENGINSPIRASI MASA DEPAN"
              align="left"
            />
            <p className="text-neutral-600 mb-12 text-lg leading-relaxed max-w-xl">
              Program Studi D3 Teknik Listrik mempersiapkan tenaga kerja profesional yang tangguh. Melalui pendidikan berbasis praktik langsung dan kurikulum yang sejalan dengan standar industri, lulusan kami siap memberikan solusi kelistrikan terbaik di berbagai sektor.
            </p>
            
            <div className="grid grid-cols-3 gap-8 border-t border-neutral-100 pt-8">
              <StatistikCard 
                label="Mahasiswa" 
                value={data.total_mahasiswa || 450} 
                suffix="+" 
                delay={0.1} 
              />
              <StatistikCard 
                label="Dosen" 
                value={data.total_dosen || 24} 
                delay={0.2} 
              />
              <StatistikCard 
                label="Alumni" 
                value={data.total_alumni || 3500} 
                suffix="+" 
                delay={0.3} 
              />
            </div>
          </div>

          {/* Right Column - Image Collage */}
          <div className="grid grid-cols-2 gap-4 h-[500px]">
            <div className="flex flex-col gap-4">
              <div className="relative h-2/5 w-full rounded-2xl overflow-hidden">
                <Image 
                  src="public/gambar/gambar 20.jpg" 
                  alt="Students learning" 
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="relative h-3/5 w-full rounded-2xl overflow-hidden">
                <Image 
                  src="/gambar/gambar 29.jpg" 
                  alt="Campus building" 
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="relative h-full w-full rounded-2xl overflow-hidden mt-8">
              <Image 
                src="public/gambar/gambar 28.jpg" 
                alt="Graduate student" 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

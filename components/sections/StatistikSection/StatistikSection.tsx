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
    const fetchStatistik = async () => {
      try {
        const res = await apiGet("/statistik")
        if (res && res.data && res.data.success) {
          setData(res.data.data)
        }
      } catch (error) {
        console.error("Failed to fetch statistik:", error)
      }
    }
    fetchStatistik()
  }, [])

  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content & Stats */}
          <div>
            <SectionHeader 
              subtitle="TENTANG KAMI"
              title="MEMBENTUK MINDA, MENGINSPIRASI MASA DEPAN"
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
                  src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=800&q=80" 
                  alt="Students learning" 
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="relative h-3/5 w-full rounded-2xl overflow-hidden">
                <Image 
                  src="https://images.unsplash.com/photo-1504917595217-d4dc5f566fab?auto=format&fit=crop&w=800&q=80" 
                  alt="Campus building" 
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="relative h-full w-full rounded-2xl overflow-hidden mt-8">
              <Image 
                src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=1200" 
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

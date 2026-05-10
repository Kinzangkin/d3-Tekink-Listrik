"use client"

import { useEffect, useState } from "react"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { StatCard } from "@/components/dashboard/StatCard"
import { Users, BookOpen, Building2, GraduationCap, Loader2, Clock } from "lucide-react"
import { GrafikMahasiswa } from "@/components/sections/AkademikSection/GrafikMahasiswa"
import { apiGet } from "@/services/api"

export default function AdminOverviewPage() {
  const [stats, setStats] = useState({
    dosen: 0,
    mahasiswa: 0,
    publikasi: 0,
    fasilitas: 0
  })
  const [recentActivities, setRecentActivities] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [resDosen, resStatistik, resTriDharma, resFasilitas] = await Promise.all([
          apiGet('/dosen'),
          apiGet('/statistik'),
          apiGet('/tri-dharma'),
          apiGet('/fasilitas')
        ])

        const totalDosen = resDosen?.data?.data?.length || 0
        const totalFasilitas = resFasilitas?.data?.data?.length || 0
        const triDharmaData = resTriDharma?.data?.data || []
        const totalPublikasi = triDharmaData.length
        
        let totalMahasiswa = 0
        const statsList = resStatistik?.data?.data || []
        if (statsList.length > 0) {
           totalMahasiswa = statsList.reduce((acc: number, curr: any) => acc + (curr.jumlah_diterima || 0), 0)
        }

        setStats({
          dosen: totalDosen,
          mahasiswa: totalMahasiswa,
          publikasi: totalPublikasi,
          fasilitas: totalFasilitas
        })

        // Map recent tri-dharma as activities
        const recent = [...triDharmaData].reverse().slice(0, 5)
        setRecentActivities(recent)

      } catch (e) {
        console.error("Failed fetching dashboard data", e)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchDashboardData()
  }, [])

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Admin Overview" 
        description="Ringkasan data sistem informasi akademik program studi D3 Teknik Listrik." 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard 
          title="Total Dosen" 
          value={isLoading ? "-" : stats.dosen.toString()} 
          icon={<Users size={20} />} 
          description="Dosen terdaftar"
        />
        <StatCard 
          title="Total Mahasiswa" 
          value={isLoading ? "-" : stats.mahasiswa.toString()} 
          icon={<GraduationCap size={20} />} 
          description="Total mahasiswa diterima"
        />
        <StatCard 
          title="Total Kegiatan" 
          value={isLoading ? "-" : stats.publikasi.toString()} 
          icon={<BookOpen size={20} />} 
          description="Tri Dharma tercatat"
        />
        <StatCard 
          title="Fasilitas Lab" 
          value={isLoading ? "-" : stats.fasilitas.toString()} 
          icon={<Building2 size={20} />} 
          description="Fasilitas & ruangan"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="w-full min-h-[400px]">
          <GrafikMahasiswa />
        </div>
        
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-neutral-100 flex flex-col min-h-[400px]">
          <h3 className="text-lg font-black text-neutral-800 uppercase tracking-widest mb-6">Aktivitas Tri Dharma Terbaru</h3>
          {isLoading ? (
            <div className="flex-1 flex justify-center items-center">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : recentActivities.length > 0 ? (
            <div className="space-y-4">
              {recentActivities.map((act, idx) => (
                <div key={idx} className="flex gap-4 items-start pb-4 border-b border-neutral-50 last:border-0">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <Clock size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-neutral-800 line-clamp-1">{act.judul}</p>
                    <p className="text-xs text-neutral-500 mt-1">
                      {act.dosen_nama ? `Ditambahkan untuk ${act.dosen_nama}` : "Data Tri Dharma Baru"} • <span className="font-bold">{act.jenis}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-neutral-400 font-medium">Belum ada aktivitas terbaru</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

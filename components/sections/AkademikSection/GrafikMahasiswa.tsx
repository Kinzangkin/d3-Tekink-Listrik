"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import React, { useEffect, useState } from "react"
import { apiGet } from "@/services/api"
import { Loader2 } from "lucide-react"

export function GrafikMahasiswa() {
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStatistik = async () => {
      try {
        const res = await apiGet('/statistik')
        if (res?.data?.success) {
          const formattedData = res.data.data.map((item: any) => ({
            year: item.tahun.toString(),
            pendaftar: item.jumlah_pendaftar,
            diterima: item.jumlah_diterima,
            lulusan: item.jumlah_lulusan
          }))
          // Urutkan berdasarkan tahun ascending
          formattedData.sort((a: any, b: any) => a.year.localeCompare(b.year))
          setData(formattedData)
        }
      } catch (error) {
        console.error("Gagal mengambil statistik:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchStatistik()
  }, [])

  return (
    <Card className="w-full h-full shadow-md border-neutral-100">
      <CardHeader>
        <CardTitle className="text-lg font-black text-neutral-800 uppercase tracking-widest">
          Statistik Pendaftaran
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full mt-4 flex items-center justify-center" style={{ minHeight: 300, minWidth: 0 }}>
          {isLoading ? (
            <div className="flex flex-col items-center text-neutral-400">
              <Loader2 className="w-8 h-8 animate-spin mb-2" />
              <p className="text-sm">Memuat statistik...</p>
            </div>
          ) : data.length === 0 ? (
            <div className="text-neutral-400 text-sm">Belum ada data statistik</div>
          ) : (
            <ResponsiveContainer width="100%" height="100%" minHeight={300} minWidth={0}>
              <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: '#F3F4F6' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="pendaftar" name="Pendaftar" fill="#2563EB" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar dataKey="diterima" name="Diterima" fill="#60A5FA" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

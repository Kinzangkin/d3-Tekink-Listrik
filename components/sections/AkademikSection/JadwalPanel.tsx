"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FaFilePdf, FaCalendarAlt } from "react-icons/fa"
import { Loader2 } from "lucide-react"
import { apiGet } from "@/services/api"

export function JadwalPanel() {
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchJadwal() {
      try {
        const res = await apiGet("/jadwal")
        if (res?.data?.success) {
          setData(res.data.data || [])
        }
      } catch (e) {
        console.error("Gagal memuat jadwal kuliah:", e)
      } finally {
        setIsLoading(false)
      }
    }
    fetchJadwal()
  }, [])

  // Fallback data default jika admin belum mengunggah jadwal di database
  const listJadwal = data.length > 0 ? data : [
    { 
      id: "default-ganjil", 
      nama_jadwal: "Semester Ganjil 2026/2027", 
      status: "Aktif",
      file_url: "#" 
    },
    { 
      id: "default-genap", 
      nama_jadwal: "Semester Genap 2025/2026", 
      status: "Selesai",
      file_url: "#" 
    }
  ]

  const getStatus = (item: any) => {
    if (item.status) return item.status
    const nameLower = (item.nama_jadwal || "").toLowerCase()
    if (nameLower.includes("ganjil 2026/2027") || nameLower.includes("2026") || nameLower.includes("2027")) {
      return "Aktif"
    }
    return "Selesai"
  }

  const handleDownload = (fileUrl: string) => {
    if (fileUrl && fileUrl !== "#") {
      window.open(fileUrl, "_blank")
    } else {
      alert("Maaf, file dokumen jadwal fisik belum diunggah untuk semester ini.")
    }
  }

  return (
    <Card className="shadow-md border-neutral-100 mb-6">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-black text-neutral-800 uppercase tracking-widest flex items-center gap-2">
          <FaCalendarAlt className="text-primary" />
          Jadwal Perkuliahan
        </CardTitle>
        <CardDescription>Unduh jadwal kelas untuk setiap semester.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : (
          listJadwal.map((sem, idx) => {
            const status = getStatus(sem)
            return (
              <div key={sem.id || idx} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg border border-neutral-100">
                <div>
                  <p className="font-bold text-sm text-neutral-800">{sem.nama_jadwal || sem.title}</p>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-neutral-200 text-neutral-600'} inline-block mt-2`}>
                    {status}
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2 shrink-0 cursor-pointer"
                  onClick={() => handleDownload(sem.file_url)}
                >
                  <FaFilePdf className="text-red-500" /> Unduh PDF
                </Button>
              </div>
            )
          })
        )}
      </CardContent>
    </Card>
  )
}

"use client"

import React, { useEffect, useState } from "react"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { apiGet, apiPost, apiDelete } from "@/services/api"
import { Settings, Plus, X, Loader2 } from "lucide-react"

interface Keahlian {
  id: number
  nama_keahlian: string
}

interface DosenKeahlian {
  id: number
  dosen_id: string
  keahlian_id: number
  nama_keahlian: string
}

export default function DosenKeahlianPage() {
  const [masterKeahlian, setMasterKeahlian] = useState<Keahlian[]>([])
  const [myKeahlian, setMyKeahlian] = useState<DosenKeahlian[]>([])
  const [selectedKeahlian, setSelectedKeahlian] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // In a real scenario without mock data, we will fetch from API
  // For now, we will simulate the fetch to the backend.
  // If the backend is running, this will work. If not, it will show an error or empty state.
  
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      // 1. Fetch Master Keahlian (Public)
      const resMaster = await apiGet('/keahlian')
      if (resMaster && resMaster.data && resMaster.data.success) {
        setMasterKeahlian(resMaster.data.data)
      }

      // 2. Fetch My Keahlian (Auth Required)
      const resMy = await apiGet('/dosen/keahlian')
      if (resMy && resMy.data && resMy.data.success) {
        setMyKeahlian(resMy.data.data)
      }
    } catch (error) {
      console.error("Failed to fetch data", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddKeahlian = async () => {
    if (!selectedKeahlian) return

    setIsSubmitting(true)
    try {
      const res = await apiPost('/dosen/keahlian', { keahlian_id: parseInt(selectedKeahlian) })
      
      if (res && res.data && res.data.success) {
        // alert(res.data.message)
        setSelectedKeahlian("")
        await fetchData() // Refresh data
      } else if (res) {
        alert(res.data.message)
      }
    } catch (error) {
      console.error("Failed to add keahlian", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRemoveKeahlian = async (keahlianId: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus keahlian ini dari profil Anda?")) return

    setIsLoading(true)
    try {
      const res = await apiDelete(`/dosen/keahlian/${keahlianId}`)
      if (res && res.data && res.data.success) {
        await fetchData() // Refresh data
      } else if (res) {
        alert(res.data.message)
      }
    } catch (error) {
      console.error("Failed to remove keahlian", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Filter out keahlian that the dosen already has
  const availableKeahlian = masterKeahlian.filter(
    (mk) => !myKeahlian.some((my) => my.keahlian_id === mk.id)
  )

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Kompetensi Saya" 
        description="Kelola bidang kompetensi dan spesialisasi Anda sebagai dosen."
        icon={<Settings className="text-primary w-8 h-8" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Current Skills */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-sm bg-white overflow-hidden rounded-3xl">
            <CardHeader className="bg-neutral-50/50 border-b border-neutral-100">
              <CardTitle className="text-xl font-black text-neutral-800">Daftar Kompetensi</CardTitle>
              <CardDescription>Bidang kompetensi yang saat ini tercatat di profil Anda.</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
              ) : myKeahlian.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {myKeahlian.map((k) => (
                    <Badge 
                      key={k.id} 
                      variant="secondary" 
                      className="px-4 py-2 text-sm font-bold bg-primary/10 text-primary border border-primary/20 flex items-center gap-2 group hover:bg-primary/20 transition-colors"
                    >
                      {k.nama_keahlian}
                      <button 
                        onClick={() => handleRemoveKeahlian(k.keahlian_id)}
                        className="opacity-50 hover:opacity-100 hover:text-red-500 transition-opacity focus:outline-none ml-1"
                        title="Hapus Kompetensi"
                      >
                        <X size={14} />
                      </button>
                    </Badge>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border-2 border-dashed border-neutral-200 rounded-2xl">
                  <Settings className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                  <p className="text-neutral-500 font-medium">Anda belum menambahkan kompetensi apapun.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Col: Add New Skill */}
        <div className="space-y-6">
          <Card className="border-none shadow-sm bg-white overflow-hidden rounded-3xl">
            <CardHeader className="bg-neutral-50/50 border-b border-neutral-100">
              <CardTitle className="text-lg font-black text-neutral-800">Tambah Kompetensi</CardTitle>
              <CardDescription>Pilih dari daftar master kompetensi.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                  Pilih Bidang
                </label>
                <Select value={selectedKeahlian} onValueChange={(val) => setSelectedKeahlian(val || "")} disabled={isLoading || availableKeahlian.length === 0}>

                  <SelectTrigger className="w-full h-12 rounded-xl">
                    <SelectValue placeholder={
                      isLoading ? "Memuat data..." : 
                      availableKeahlian.length === 0 ? "Semua kompetensi sudah dipilih" : "Pilih kompetensi..."
                    } />
                  </SelectTrigger>
                  <SelectContent>
                    {availableKeahlian.map((k) => (
                      <SelectItem key={k.id} value={k.id.toString()}>{k.nama_keahlian}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold tracking-wide cursor-pointer"
                onClick={handleAddKeahlian}
                disabled={!selectedKeahlian || isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <Plus className="w-5 h-5 mr-2" />
                )}
                Tambah ke Profil
              </Button>
            </CardContent>
          </Card>
          
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
            <p className="text-xs text-blue-800 font-medium leading-relaxed">
              <strong>Info:</strong> Jika kompetensi yang Anda cari tidak ada dalam daftar, silakan hubungi Admin Prodi untuk menambahkannya ke dalam Master Data Kompetensi.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

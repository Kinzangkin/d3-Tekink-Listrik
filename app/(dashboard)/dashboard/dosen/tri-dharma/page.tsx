"use client"

import React, { useState, useEffect, useRef } from "react"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { apiGet, apiPost, apiDelete } from "@/services/api"
import { GraduationCap, Plus, FileText, Search, Loader2, Trash2, ExternalLink } from "lucide-react"
import { format } from "date-fns"

const JENIS_TRI_DHARMA = ["Penelitian", "Pengabdian", "Buku Ajar", "Publikasi", "HKI", "Sertifikat"]

interface TriDharma {
  id: string
  jenis: string
  judul: string
  deskripsi: string
  tahun: number
  file_url: string
  created_at: string
}

export default function DosenTriDharmaPage() {
  const [activeTab, setActiveTab] = useState(JENIS_TRI_DHARMA[0])
  const [data, setData] = useState<TriDharma[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Form State
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    judul: "",
    tahun: new Date().getFullYear().toString(),
    deskripsi: "",
    jenis: activeTab
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchData(activeTab)
    setFormData(prev => ({ ...prev, jenis: activeTab }))
  }, [activeTab])

  const fetchData = async (jenis: string) => {
    setIsLoading(true)
    try {
      const res = await apiGet(`/tri-dharma/my?jenis=${jenis}`)
      if (res && res.data && res.data.success) {
        setData(res.data.data || [])
      } else {
        setData([]) // Fallback if API fails
      }
    } catch (error) {
      console.error("Failed to fetch data", error)
      setData([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus data ini?")) return
    try {
      const res = await apiDelete(`/tri-dharma/${id}`)
      if (res && res.data && res.data.success) {
        fetchData(activeTab)
      } else if (res) {
        alert(res.data.message)
      }
    } catch (error) {
      console.error("Failed to delete", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formPayload = new FormData()
    formPayload.append("jenis", formData.jenis)
    formPayload.append("judul", formData.judul)
    formPayload.append("tahun", formData.tahun)
    formPayload.append("deskripsi", formData.deskripsi)
    
    if (fileInputRef.current?.files?.[0]) {
      formPayload.append("file", fileInputRef.current.files[0])
    }

    try {
      const res = await apiPost('/tri-dharma', formPayload, true)
      if (res && res.data && res.data.success) {
        setIsDialogOpen(false)
        setFormData({ judul: "", tahun: new Date().getFullYear().toString(), deskripsi: "", jenis: activeTab })
        if (fileInputRef.current) fileInputRef.current.value = ""
        fetchData(activeTab)
      } else if (res) {
        alert(res.data.message)
      }
    } catch (error) {
      console.error("Failed to submit", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const filteredData = data.filter(item => 
    item.judul.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (item.deskripsi && item.deskripsi.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <PageHeader 
          title="Tri Dharma & Portofolio" 
          description="Kelola seluruh catatan Penelitian, Publikasi, Pengabdian, dan karya Anda dalam satu tempat terpadu."
          icon={<GraduationCap className="text-primary w-8 h-8" />}
        />

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-xl px-6 shadow-lg shadow-primary/20">
              <Plus className="mr-2 h-5 w-5" />
              Tambah Data
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] rounded-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black text-neutral-800">Tambah Data Baru</DialogTitle>
              <DialogDescription>
                Masukkan detail kegiatan Tri Dharma Anda. Form ini mendukung upload dokumen/bukti.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="jenis" className="text-xs font-bold text-neutral-500 uppercase">Jenis Kegiatan</Label>
                  <Select value={formData.jenis} onValueChange={(val) => setFormData(prev => ({...prev, jenis: val || ""}))}>

                    <SelectTrigger className="h-12 rounded-xl border-neutral-200">
                      <SelectValue placeholder="Pilih Jenis" />
                    </SelectTrigger>
                    <SelectContent>
                      {JENIS_TRI_DHARMA.map(j => (
                        <SelectItem key={j} value={j}>{j}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2 col-span-2 sm:col-span-1">
                  <Label htmlFor="judul" className="text-xs font-bold text-neutral-500 uppercase">Judul / Nama Kegiatan</Label>
                  <Input 
                    id="judul" 
                    required 
                    value={formData.judul}
                    onChange={(e) => setFormData(prev => ({...prev, judul: e.target.value}))}
                    className="h-12 rounded-xl border-neutral-200 focus:border-primary" 
                    placeholder="Contoh: Analisis Sistem IoT..." 
                  />
                </div>
                
                <div className="space-y-2 col-span-2 sm:col-span-1">
                  <Label htmlFor="tahun" className="text-xs font-bold text-neutral-500 uppercase">Tahun</Label>
                  <Input 
                    id="tahun" 
                    type="number" 
                    required 
                    value={formData.tahun}
                    onChange={(e) => setFormData(prev => ({...prev, tahun: e.target.value}))}
                    className="h-12 rounded-xl border-neutral-200 focus:border-primary" 
                  />
                </div>

                <div className="space-y-2 col-span-2">
                  <Label htmlFor="deskripsi" className="text-xs font-bold text-neutral-500 uppercase">Deskripsi (Opsional)</Label>
                  <Textarea 
                    id="deskripsi" 
                    value={formData.deskripsi}
                    onChange={(e) => setFormData(prev => ({...prev, deskripsi: e.target.value}))}
                    className="min-h-[100px] rounded-xl border-neutral-200 focus:border-primary resize-none" 
                    placeholder="Tuliskan deksripsi singkat mengenai kegiatan ini..." 
                  />
                </div>

                <div className="space-y-2 col-span-2">
                  <Label htmlFor="file" className="text-xs font-bold text-neutral-500 uppercase">File Bukti / Dokumen (Opsional)</Label>
                  <div className="flex items-center gap-4">
                    <Input 
                      id="file" 
                      type="file" 
                      ref={fileInputRef}
                      className="h-12 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer" 
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline" className="h-12 rounded-xl font-bold">Batal</Button>
                </DialogClose>
                <Button type="submit" disabled={isSubmitting} className="h-12 rounded-xl font-bold bg-primary hover:bg-primary/90 text-white px-8">
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Simpan Data"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-none shadow-sm bg-white overflow-hidden rounded-3xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6 pt-6 pb-2 border-b border-neutral-100 overflow-x-auto">
            <TabsList className="h-12 w-full justify-start bg-transparent p-0 gap-2 min-w-max">
              {JENIS_TRI_DHARMA.map((jenis) => (
                <TabsTrigger 
                  key={jenis} 
                  value={jenis}
                  className="h-10 px-6 rounded-full data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md font-bold text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 transition-all"
                >
                  {jenis}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black text-neutral-800">Daftar {activeTab} Anda</h3>
              <div className="relative max-w-sm w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
                <Input 
                  placeholder={`Cari ${activeTab.toLowerCase()}...`} 
                  className="pl-10 h-10 rounded-xl bg-neutral-50 border-transparent focus:bg-white focus:border-primary transition-colors"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <TabsContent value={activeTab} className="m-0 focus-visible:outline-none focus-visible:ring-0">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                  <p className="text-neutral-500 font-medium">Memuat data {activeTab}...</p>
                </div>
              ) : filteredData.length > 0 ? (
                <div className="grid gap-4">
                  {filteredData.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-neutral-100 bg-white hover:border-primary/30 hover:shadow-md transition-all group">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <FileText className="w-6 h-6" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-bold text-neutral-800 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                            {item.judul}
                          </h4>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500">
                            <Badge variant="secondary" className="font-bold text-[10px] bg-neutral-100">{item.tahun}</Badge>
                            {item.deskripsi && <span className="line-clamp-1">{item.deskripsi}</span>}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 sm:self-center self-end">
                        {item.file_url && (
                          <Button variant="outline" size="sm" className="h-9 rounded-lg font-bold border-neutral-200 hover:border-primary hover:text-primary" asChild>
                            <a href={item.file_url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Dokumen
                            </a>
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-9 w-9 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50"
                          onClick={() => handleDelete(item.id)}
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 border-2 border-dashed border-neutral-200 rounded-3xl bg-neutral-50/50">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-neutral-100">
                    <FileText className="w-8 h-8 text-neutral-300" />
                  </div>
                  <h3 className="text-lg font-black text-neutral-800 mb-2">Belum Ada Data</h3>
                  <p className="text-neutral-500 font-medium max-w-sm mx-auto">
                    Anda belum memiliki catatan untuk {activeTab}. Silakan tambahkan data baru melalui tombol di atas.
                  </p>
                </div>
              )}
            </TabsContent>
          </div>
        </Tabs>
      </Card>
    </div>
  )
}

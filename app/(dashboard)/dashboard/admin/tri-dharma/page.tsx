"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { DataTable } from "@/components/dashboard/DataTable"
import { FormDialog } from "@/components/dashboard/FormDialog"
import { DeleteConfirmDialog } from "@/components/dashboard/DeleteConfirmDialog"
import { FileUploadZone } from "@/components/dashboard/FileUploadZone"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit2, Trash2, CalendarDays, Loader2 } from "lucide-react"

import { apiGet, apiPost, apiDelete } from "@/services/api"

import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function AdminTriDharmaPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  
  const [data, setData] = useState<any[]>([])
  const [dosenList, setDosenList] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form State
  const [formData, setFormData] = useState({
    jenis: "Penelitian",
    judul: "",
    tahun: new Date().getFullYear().toString(),
    deskripsi: "",
    dosen_id: ""
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const res = await apiGet('/tri-dharma')
      if (res?.data?.success) {
        setData(res.data.data || [])
      }
    } catch (err) {
      console.error("Gagal memuat tri dharma", err)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchDosen = async () => {
    try {
      const res = await apiGet('/dosen')
      if (res?.data?.success) {
        setDosenList(res.data.data || [])
      }
    } catch (err) {
      console.error("Gagal memuat dosen", err)
    }
  }

  useEffect(() => {
    fetchData()
    fetchDosen()
  }, [])

  const handleDelete = async () => {
    if (!selectedId) return
    setIsSubmitting(true)
    try {
      const res = await apiDelete(`/tri-dharma/${selectedId}`)
      if (res?.data?.success) {
        setIsDeleteDialogOpen(false)
        fetchData()
      } else {
        alert(res?.data?.message || "Gagal menghapus data")
      }
    } catch (err) {
      console.error("Error deleting", err)
    } finally {
      setIsSubmitting(false)
      setSelectedId(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const payload = new FormData()
    payload.append("jenis", formData.jenis)
    payload.append("judul", formData.judul)
    payload.append("tahun", formData.tahun)
    payload.append("deskripsi", formData.deskripsi)
    
    // Admin WAJIB mengisi dosen
    if (!formData.dosen_id) {
      alert("Harap pilih dosen!")
      setIsSubmitting(false)
      return
    }
    payload.append("anggota_dosen_ids", formData.dosen_id)

    if (selectedFile) {
      payload.append("file", selectedFile)
    }

    try {
      const res = await apiPost('/tri-dharma', payload, true)
      if (res?.data?.success) {
        setIsFormOpen(false)
        setFormData({ jenis: "Penelitian", judul: "", tahun: new Date().getFullYear().toString(), deskripsi: "", dosen_id: "" })
        setSelectedFile(null)
        fetchData()
      } else {
        alert(res?.data?.message || "Gagal menyimpan data")
      }
    } catch (err) {
      console.error("Error submitting", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const columns = [
    {
      header: "Kegiatan",
      cell: (item: any) => (
        <div className="flex items-start gap-4 max-w-sm">
          {item.thumbnail_url ? (
            <div className="w-16 h-12 rounded-lg bg-neutral-100 overflow-hidden shrink-0 relative border border-neutral-200">
              <img src={item.thumbnail_url} alt="" className="object-cover w-full h-full" />
            </div>
          ) : (
            <div className="w-16 h-12 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0 border border-neutral-200 text-neutral-400">
              <CalendarDays size={20} />
            </div>
          )}
          <div className="flex flex-col gap-1">
            <span className="font-bold text-neutral-800 line-clamp-1">{item.judul}</span>
            <span className="text-xs text-neutral-500 line-clamp-1">{item.deskripsi}</span>
          </div>
        </div>
      )
    },
    {
      header: "Dosen & Jenis",
      cell: (item: any) => (
        <div className="flex flex-col gap-1">
          <span className="text-sm font-bold text-neutral-800">{item.dosen_nama || "Banyak Dosen"}</span>
          <Badge variant="outline" className="w-fit text-[10px] uppercase font-bold tracking-widest">{item.jenis}</Badge>
        </div>
      )
    },
    {
      header: "Tahun",
      cell: (item: any) => (
        <span className="text-sm font-medium text-neutral-600">
          {item.tahun}
        </span>
      )
    },
    {
      header: "File",
      cell: (item: any) => (
        item.file_url ? (
          <a href={item.file_url} target="_blank" rel="noreferrer" className="text-xs font-bold text-primary hover:underline">
            Lihat File
          </a>
        ) : <span className="text-xs text-neutral-400">Tidak ada</span>
      )
    },
    {
      header: "Aksi",
      className: "text-right",
      cell: (item: any) => (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-xl">
              <DropdownMenuItem className="cursor-pointer font-medium text-neutral-600" onClick={() => setIsFormOpen(true)}>
                <Edit2 className="mr-2 h-4 w-4" />
                Edit Data
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer font-medium text-rose-600 focus:text-rose-600" onClick={() => {
                setSelectedId(item.id)
                setIsDeleteDialogOpen(true)
              }}>
                <Trash2 className="mr-2 h-4 w-4" />
                Hapus
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    }
  ]

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Tri Dharma" 
        description="Kelola dokumentasi kegiatan Tri Dharma (Pendidikan, Penelitian, Pengabdian)." 
        action={
          <FormDialog
            isOpen={isFormOpen}
            onOpenChange={setIsFormOpen}
            title="Tambah Kegiatan"
            description="Dokumentasikan kegiatan Tri Dharma baru."
            onSubmit={handleSubmit}
            trigger={
              <Button className="bg-primary hover:bg-primary/90 text-white font-bold tracking-wider uppercase text-xs rounded-xl shadow-lg shadow-primary/20 gap-2 h-10 px-4">
                <Plus size={16} /> Tambah Kegiatan
              </Button>
            }
          >
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase text-neutral-500">Pilih Dosen</Label>
                <select 
                  className="flex h-10 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  value={formData.dosen_id}
                  onChange={(e) => setFormData({...formData, dosen_id: e.target.value})}
                  required
                >
                  <option value="" disabled>-- Pilih Dosen --</option>
                  {dosenList.map(d => (
                    <option key={d.id} value={d.id}>{d.nama} ({d.nidn || d.nip})</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase text-neutral-500">Jenis Kegiatan</Label>
                <select 
                  className="flex h-10 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  value={formData.jenis}
                  onChange={(e) => setFormData({...formData, jenis: e.target.value})}
                >
                  <option value="Penelitian">Penelitian</option>
                  <option value="Pengabdian">Pengabdian</option>
                  <option value="Buku Ajar">Buku Ajar</option>
                  <option value="Publikasi">Publikasi</option>
                  <option value="HKI">HKI</option>
                  <option value="Sertifikat">Sertifikat</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="judul" className="text-xs font-bold uppercase text-neutral-500">Judul Kegiatan</Label>
                <Input id="judul" required value={formData.judul} onChange={(e) => setFormData({...formData, judul: e.target.value})} placeholder="Cth: Workshop IoT untuk Siswa SMK" className="rounded-xl bg-neutral-50 border-neutral-200" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tahun" className="text-xs font-bold uppercase text-neutral-500">Tahun</Label>
                <Input id="tahun" type="number" required value={formData.tahun} onChange={(e) => setFormData({...formData, tahun: e.target.value})} className="rounded-xl bg-neutral-50 border-neutral-200" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deskripsi" className="text-xs font-bold uppercase text-neutral-500">Deskripsi Singkat</Label>
                <Textarea id="deskripsi" value={formData.deskripsi} onChange={(e) => setFormData({...formData, deskripsi: e.target.value})} placeholder="Tulis deskripsi singkat kegiatan..." className="rounded-xl bg-neutral-50 border-neutral-200 resize-none h-24" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase text-neutral-500 block mb-2">Dokumen Pendukung (PDF/Image)</Label>
                <Input type="file" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} className="rounded-xl bg-neutral-50 border-neutral-200" />
              </div>
            </div>
            {isSubmitting && <div className="mt-2 text-sm text-primary flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin"/> Memproses...</div>}
          </FormDialog>
        }
      />

      {isLoading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      ) : (
        <DataTable 
          columns={columns} 
          data={data} 
          searchPlaceholder="Cari judul kegiatan..." 
        />
      )}

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Hapus Kegiatan?"
        onConfirm={handleDelete}
        trigger={<button className="hidden"></button>}
      />
    </div>
  )
}

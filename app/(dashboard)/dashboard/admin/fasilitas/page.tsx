"use client"

import { useEffect, useState } from "react"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { FormDialog } from "@/components/dashboard/FormDialog"
import { DeleteConfirmDialog } from "@/components/dashboard/DeleteConfirmDialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit2, Trash2, Image as ImageIcon, Loader2 } from "lucide-react"
import { apiGet, apiPost, apiPut, apiDelete } from "@/services/api"
import Image from "next/image"

export default function AdminFasilitasPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({ judul_fasilitas: "", deskripsi: "" })
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const res = await apiGet('/fasilitas')
      if (res?.data?.success) {
        setData(res.data.data || [])
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const resetForm = () => {
    setFormData({ judul_fasilitas: "", deskripsi: "" })
    setSelectedFiles([])
    setIsEditMode(false)
    setSelectedId(null)
  }

  const handleDelete = async () => {
    if (!selectedId) return
    setIsSubmitting(true)
    try {
      const res = await apiDelete(`/fasilitas/${selectedId}`)
      if (res?.data?.success) {
        setIsDeleteDialogOpen(false)
        fetchData()
      } else {
        alert(res?.data?.message || "Gagal menghapus fasilitas")
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsSubmitting(false)
      setSelectedId(null)
    }
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    if (!formData.judul_fasilitas) {
      alert("Nama fasilitas wajib diisi")
      return
    }

    setIsSubmitting(true)
    const payload = new FormData()
    payload.append("judul_fasilitas", formData.judul_fasilitas)
    if (formData.deskripsi) payload.append("deskripsi", formData.deskripsi)
    
    if (selectedFiles.length > 0) {
      selectedFiles.forEach((f) => payload.append("file", f))
    }

    try {
      const res = isEditMode
        ? await apiPut(`/fasilitas/${selectedId}`, payload, true)
        : await apiPost('/fasilitas', payload, true)

      if (res?.data?.success) {
        setIsFormOpen(false)
        resetForm()
        fetchData()
      } else {
        alert(res?.data?.message || `Gagal ${isEditMode ? "memperbarui" : "menambah"} fasilitas`)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Fasilitas" 
        description="Kelola galeri dan informasi fasilitas program studi." 
        action={
          <FormDialog
            isOpen={isFormOpen}
            onOpenChange={(open) => {
              setIsFormOpen(open)
              if (!open) resetForm()
            }}
            title={isEditMode ? "Edit Fasilitas" : "Tambah Fasilitas"}
            description={isEditMode ? "Perbarui informasi fasilitas. Foto baru akan ditambahkan ke galeri." : "Tambahkan informasi dan foto fasilitas baru."}
            onSubmit={handleSubmit}
            trigger={
              <Button 
                onClick={() => resetForm()}
                className="bg-primary hover:bg-primary/90 text-white font-bold tracking-wider uppercase text-xs rounded-xl shadow-lg shadow-primary/20 gap-2 h-10 px-4"
              >
                <Plus size={16} /> Tambah Fasilitas
              </Button>
            }
          >
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="judul" className="text-xs font-bold uppercase text-neutral-500">Nama Fasilitas</Label>
                <Input id="judul" required value={formData.judul_fasilitas} onChange={(e) => setFormData({...formData, judul_fasilitas: e.target.value})} placeholder="Cth: Laboratorium IoT" className="rounded-xl bg-neutral-50 border-neutral-200" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deskripsi" className="text-xs font-bold uppercase text-neutral-500">Deskripsi Singkat</Label>
                <Textarea id="deskripsi" value={formData.deskripsi} onChange={(e) => setFormData({...formData, deskripsi: e.target.value})} placeholder="Jelaskan fungsi dan peralatan di fasilitas ini..." className="rounded-xl bg-neutral-50 border-neutral-200 resize-none h-24" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase text-neutral-500 block mb-2">
                  Foto / Media {isEditMode && <span className="text-neutral-400 normal-case">— Foto baru akan ditambahkan ke galeri</span>}
                </Label>
                <Input type="file" accept="image/*" multiple onChange={(e) => setSelectedFiles(Array.from(e.target.files || []))} className="rounded-xl bg-neutral-50 border-neutral-200" />
              </div>
            </div>
            {isSubmitting && <div className="mt-2 text-sm text-primary flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin"/> Memproses...</div>}
          </FormDialog>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
        ) : data.length > 0 ? data.map((item) => {
          const imageUrl = item.media?.[0]?.file_url || item.foto_url || item.image_url
          const title = item.judul_fasilitas || item.nama_fasilitas || item.nama
          return (
            <div key={item.id} className="bg-white rounded-3xl overflow-hidden border border-neutral-100 shadow-sm group">
              <div className="relative h-48 bg-neutral-100 w-full overflow-hidden">
                {imageUrl ? (
                  <Image 
                    src={imageUrl} 
                    alt={title || "Fasilitas"} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-neutral-300">
                    <ImageIcon size={48} />
                  </div>
                )}
                {item.media && item.media.length > 0 && (
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                    {item.media.length} Foto
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-black text-lg text-neutral-800 mb-2 truncate" title={title}>
                  {title}
                </h3>
                <p className="text-sm text-neutral-500 line-clamp-2 mb-6 h-10">
                  {item.deskripsi || "Tidak ada deskripsi."}
                </p>
                
                <div className="flex items-center gap-2 pt-4 border-t border-neutral-100">
                  <Button variant="outline" className="flex-1 rounded-xl h-10 text-xs font-bold uppercase tracking-widest text-neutral-600 hover:text-primary hover:bg-primary/5 border-neutral-200" onClick={() => {
                    setIsEditMode(true)
                    setSelectedId(item.id)
                    setFormData({
                      judul_fasilitas: item.judul_fasilitas || item.nama_fasilitas || item.nama || "",
                      deskripsi: item.deskripsi || ""
                    })
                    setSelectedFiles([])
                    setIsFormOpen(true)
                  }}>
                    <Edit2 size={14} className="mr-2" /> Edit
                  </Button>
                  <Button variant="outline" className="flex-1 rounded-xl h-10 text-xs font-bold uppercase tracking-widest text-rose-500 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 border-neutral-200" onClick={() => {
                    setSelectedId(item.id)
                    setIsDeleteDialogOpen(true)
                  }}>
                    <Trash2 size={14} className="mr-2" /> Hapus
                  </Button>
                </div>
              </div>
            </div>
          )
        }) : (
          <div className="col-span-full text-center py-12 text-neutral-400 font-medium">Belum ada fasilitas.</div>
        )}
      </div>

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Hapus Fasilitas?"
        onConfirm={handleDelete}
        trigger={<button className="hidden"></button>}
      />
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { DataTable } from "@/components/dashboard/DataTable"
import { FormDialog } from "@/components/dashboard/FormDialog"
import { DeleteConfirmDialog } from "@/components/dashboard/DeleteConfirmDialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit2, Trash2, ExternalLink, Loader2, Award } from "lucide-react"
import { apiGet, apiPost, apiPut, apiDelete } from "@/services/api"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

export default function DosenSertifikatPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [user, setUser] = useState<any>(null)

  const [formData, setFormData] = useState({
    judul: "",
    jenis: "Sertifikat",
    deskripsi: "",
    tahun: new Date().getFullYear(),
    file_url: ""
  })

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const resMe = await apiGet('/auth/me')
      if (resMe?.data?.success) {
        const userData = resMe.data.data
        setUser(userData)
        const resTD = await apiGet(`/tri-dharma?dosen_id=${userData.id}&jenis=Sertifikat`)
        if (resTD?.data?.success) {
          setData(resTD.data.data || [])
        }
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

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!user) return

    setIsSubmitting(true)
    try {
      const payload = {
        ...formData,
        dosen_id: user.id,
        tahun: Number(formData.tahun)
      }

      const res = isEditMode 
        ? await apiPut(`/tri-dharma/${selectedId}`, payload)
        : await apiPost('/tri-dharma', payload)

      if (res?.data?.success) {
        setIsFormOpen(false)
        fetchData()
      } else {
        alert(res?.data?.message || "Gagal menyimpan data")
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsSubmitting(false)
    }
  }

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
    } catch (e) {
      console.error(e)
    } finally {
      setIsSubmitting(false)
      setSelectedId(null)
    }
  }

  const columns = [
    {
      header: "Tahun",
      accessorKey: "tahun",
      className: "w-20 font-black text-neutral-300 text-lg"
    },
    {
      header: "Sertifikat / Kompetensi",
      cell: (item: any) => (
        <div className="flex items-center gap-3 max-w-lg">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
            <Award size={20} />
          </div>
          <span className="font-bold text-neutral-800 leading-snug">{item.judul}</span>
        </div>
      )
    },
    {
      header: "File",
      cell: (item: any) => item.file_url ? (
        <a href={item.file_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline bg-primary/5 px-3 py-1.5 rounded-lg">
          Unduh Sertifikat <ExternalLink size={12} />
        </a>
      ) : <span className="text-xs text-neutral-400 italic">Tidak ada file</span>
    },
    {
      header: "Aksi",
      className: "text-right",
      cell: (item: any) => (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger className="h-8 w-8 rounded-md hover:bg-neutral-100 flex items-center justify-center">
              <MoreHorizontal className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-xl">
              <DropdownMenuItem className="cursor-pointer font-medium text-neutral-600" onClick={() => {
                setIsEditMode(true)
                setSelectedId(item.id)
                setFormData({
                  judul: item.judul,
                  jenis: item.jenis,
                  deskripsi: item.deskripsi || "",
                  tahun: item.tahun,
                  file_url: item.file_url || ""
                })
                setIsFormOpen(true)
              }}>
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
        title="Sertifikat & Kompetensi" 
        description="Kelola dokumen sertifikat profesi atau kompetensi keahlian Anda." 
        action={
          <FormDialog
            isOpen={isFormOpen}
            onOpenChange={setIsFormOpen}
            title={isEditMode ? "Edit Sertifikat" : "Tambah Sertifikat"}
            description="Upload sertifikat kompetensi Anda."
            onSubmit={handleSubmit}
            trigger={
              <Button 
                onClick={() => {
                  setIsEditMode(false)
                  setFormData({ judul: "", jenis: "Sertifikat", deskripsi: "", tahun: new Date().getFullYear(), file_url: "" })
                }}
                className="bg-primary hover:bg-primary/90 text-white font-bold tracking-wider uppercase text-xs rounded-xl shadow-lg shadow-primary/20 gap-2 h-10 px-4"
              >
                <Plus size={16} /> Tambah Sertifikat
              </Button>
            }
          >
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="judul" className="text-xs font-bold uppercase text-neutral-500">Nama Sertifikat</Label>
                <Input 
                  id="judul" 
                  required
                  value={formData.judul}
                  onChange={(e) => setFormData({...formData, judul: e.target.value})}
                  placeholder="Cth: Certified IoT Specialist (CIS)" 
                  className="rounded-xl bg-neutral-50 border-neutral-200" 
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tahun" className="text-xs font-bold uppercase text-neutral-500">Tahun Perolehan</Label>
                  <Input 
                    id="tahun" 
                    type="number" 
                    required
                    value={formData.tahun}
                    onChange={(e) => setFormData({...formData, tahun: Number(e.target.value)})}
                    placeholder="Cth: 2024" 
                    className="rounded-xl bg-neutral-50 border-neutral-200" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="link" className="text-xs font-bold uppercase text-neutral-500">Link Sertifikat (URL)</Label>
                  <Input 
                    id="link" 
                    value={formData.file_url}
                    onChange={(e) => setFormData({...formData, file_url: e.target.value})}
                    placeholder="https://drive.google.com/..." 
                    className="rounded-xl bg-neutral-50 border-neutral-200" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="deskripsi" className="text-xs font-bold uppercase text-neutral-500">Keterangan (Opsional)</Label>
                <Textarea 
                  id="deskripsi" 
                  value={formData.deskripsi}
                  onChange={(e) => setFormData({...formData, deskripsi: e.target.value})}
                  placeholder="Tuliskan keterangan singkat jika ada..." 
                  className="rounded-xl bg-neutral-50 border-neutral-200 resize-none h-24" 
                />
              </div>
            </div>
            {isSubmitting && <div className="mt-2 text-xs text-primary font-bold flex items-center gap-2"><Loader2 size={14} className="animate-spin" /> Sedang memproses...</div>}
          </FormDialog>
        }
      />

      {isLoading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-12 h-12 text-primary animate-spin" /></div>
      ) : (
        <DataTable 
          columns={columns} 
          data={data} 
          searchPlaceholder="Cari sertifikat..." 
        />
      )}

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Hapus Sertifikat?"
        onConfirm={handleDelete}
        trigger={<button className="hidden"></button>}
      />
    </div>
  )
}

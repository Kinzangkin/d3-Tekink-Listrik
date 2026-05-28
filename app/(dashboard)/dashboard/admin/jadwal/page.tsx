"use client"

import { useEffect, useState } from "react"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { DataTable } from "@/components/dashboard/DataTable"
import { FormDialog } from "@/components/dashboard/FormDialog"
import { DeleteConfirmDialog } from "@/components/dashboard/DeleteConfirmDialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Edit2, Trash2, FileText, Download, Loader2 } from "lucide-react"
import { apiGet, apiPost, apiPut, apiDelete } from "@/services/api"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

export default function AdminJadwalPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({ nama_jadwal: "" })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const res = await apiGet('/jadwal')
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
    setFormData({ nama_jadwal: "" })
    setSelectedFile(null)
    setIsEditMode(false)
    setSelectedId(null)
  }

  const handleDelete = async () => {
    if (!selectedId) return
    setIsSubmitting(true)
    try {
      const res = await apiDelete(`/jadwal/${selectedId}`)
      if (res?.data?.success) {
        setIsDeleteDialogOpen(false)
        fetchData()
      } else {
        alert(res?.data?.message || "Gagal menghapus jadwal")
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

    if (!formData.nama_jadwal) {
      alert("Nama jadwal wajib diisi")
      return
    }

    // File wajib hanya saat tambah baru
    if (!isEditMode && !selectedFile) {
      alert("File jadwal wajib diunggah")
      return
    }

    setIsSubmitting(true)
    const payload = new FormData()
    payload.append("nama_jadwal", formData.nama_jadwal)
    if (selectedFile) {
      payload.append("file", selectedFile)
    }

    try {
      const res = isEditMode
        ? await apiPut(`/jadwal/${selectedId}`, payload, true)
        : await apiPost('/jadwal', payload, true)

      if (res?.data?.success) {
        setIsFormOpen(false)
        resetForm()
        fetchData()
      } else {
        alert(res?.data?.message || `Gagal ${isEditMode ? "memperbarui" : "upload"} jadwal`)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const columns = [
    {
      header: "Nama Jadwal",
      cell: (item: any) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
            <FileText size={20} />
          </div>
          <span className="font-bold text-neutral-800">{item.nama_jadwal}</span>
        </div>
      )
    },
    {
      header: "Tanggal Upload",
      cell: (item: any) => {
        const date = new Date(item.tanggal_upload)
        return (
          <span className="text-sm font-medium text-neutral-600">
            {date.toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        )
      }
    },
    {
      header: "File",
      cell: (item: any) => (
        <Button variant="outline" size="sm" className="rounded-lg h-8 text-xs font-bold gap-2" onClick={() => window.open(item.file_url, '_blank')}>
          <Download size={14} /> Unduh
        </Button>
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
              <DropdownMenuItem className="cursor-pointer font-medium text-neutral-600" onClick={() => {
                setIsEditMode(true)
                setSelectedId(item.id)
                setFormData({ nama_jadwal: item.nama_jadwal || "" })
                setSelectedFile(null)
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
        title="Jadwal Perkuliahan" 
        description="Kelola dokumen jadwal perkuliahan dan ujian." 
        action={
          <FormDialog
            isOpen={isFormOpen}
            onOpenChange={(open) => {
              setIsFormOpen(open)
              if (!open) resetForm()
            }}
            title={isEditMode ? "Edit Jadwal" : "Upload Jadwal Baru"}
            description={isEditMode ? "Perbarui nama atau file dokumen jadwal." : "Tambahkan dokumen jadwal perkuliahan atau ujian baru."}
            onSubmit={handleSubmit}
            trigger={
              <Button 
                onClick={() => resetForm()}
                className="bg-primary hover:bg-primary/90 text-white font-bold tracking-wider uppercase text-xs rounded-xl shadow-lg shadow-primary/20 gap-2 h-10 px-4"
              >
                <Plus size={16} /> Upload Jadwal
              </Button>
            }
          >
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="nama" className="text-xs font-bold uppercase text-neutral-500">Nama Jadwal</Label>
                <Input id="nama" required value={formData.nama_jadwal} onChange={(e) => setFormData({nama_jadwal: e.target.value})} placeholder="Cth: Jadwal Semester Ganjil 2024" className="rounded-xl bg-neutral-50 border-neutral-200" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase text-neutral-500 block mb-2">
                  Dokumen (PDF) {isEditMode && <span className="text-neutral-400 normal-case">— Kosongkan jika tidak ingin mengganti file</span>}
                </Label>
                <Input type="file" accept=".pdf" required={!isEditMode} onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} className="rounded-xl bg-neutral-50 border-neutral-200" />
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
          searchPlaceholder="Cari jadwal..." 
        />
      )}

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Hapus Jadwal?"
        onConfirm={handleDelete}
        trigger={<button className="hidden"></button>}
      />
    </div>
  )
}

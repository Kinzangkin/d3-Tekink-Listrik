"use client"

import { useEffect, useState } from "react"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { DataTable } from "@/components/dashboard/DataTable"
import { FormDialog } from "@/components/dashboard/FormDialog"
import { DeleteConfirmDialog } from "@/components/dashboard/DeleteConfirmDialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Edit2, Trash2, Loader2 } from "lucide-react"
import { apiGet, apiPost, apiPut, apiDelete } from "@/services/api"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

export default function AdminStatistikPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    tahun: "",
    jumlah_pendaftar: "",
    jumlah_diterima: "",
    jumlah_lulusan: ""
  })

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const res = await apiGet('/statistik')
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
    setFormData({ tahun: "", jumlah_pendaftar: "", jumlah_diterima: "", jumlah_lulusan: "" })
    setIsEditMode(false)
    setSelectedId(null)
  }

  const handleDelete = async () => {
    if (!selectedId) return
    setIsSubmitting(true)
    try {
      const res = await apiDelete(`/statistik/${selectedId}`)
      if (res?.data?.success) {
        setIsDeleteDialogOpen(false)
        fetchData()
      } else {
        alert(res?.data?.message || "Gagal menghapus data statistik")
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

    if (!formData.tahun) {
      alert("Tahun wajib diisi")
      return
    }

    setIsSubmitting(true)

    const payload = {
      tahun: parseInt(formData.tahun),
      jumlah_pendaftar: parseInt(formData.jumlah_pendaftar) || 0,
      jumlah_diterima: parseInt(formData.jumlah_diterima) || 0,
      jumlah_lulusan: parseInt(formData.jumlah_lulusan) || 0
    }

    try {
      const res = isEditMode
        ? await apiPut(`/statistik/${selectedId}`, payload)
        : await apiPost('/statistik', payload)

      if (res?.data?.success) {
        setIsFormOpen(false)
        resetForm()
        fetchData()
      } else {
        alert(res?.data?.message || `Gagal ${isEditMode ? "memperbarui" : "menambah"} data statistik`)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsSubmitting(false)
    }
  }

  const columns = [
    {
      header: "Tahun Akademik",
      accessorKey: "tahun",
      className: "font-bold text-primary"
    },
    {
      header: "Pendaftar",
      accessorKey: "jumlah_pendaftar"
    },
    {
      header: "Diterima",
      accessorKey: "jumlah_diterima"
    },
    {
      header: "Lulusan",
      accessorKey: "jumlah_lulusan"
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
                setFormData({
                  tahun: item.tahun?.toString() || "",
                  jumlah_pendaftar: item.jumlah_pendaftar?.toString() || "0",
                  jumlah_diterima: item.jumlah_diterima?.toString() || "0",
                  jumlah_lulusan: item.jumlah_lulusan?.toString() || "0"
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
        title="Statistik Mahasiswa" 
        description="Kelola data jumlah pendaftar, diterima, dan lulusan per tahun." 
        action={
          <FormDialog
            isOpen={isFormOpen}
            onOpenChange={(open) => {
              setIsFormOpen(open)
              if (!open) resetForm()
            }}
            title={isEditMode ? "Edit Data Statistik" : "Tambah Data Statistik"}
            description={isEditMode ? "Perbarui data statistik mahasiswa." : "Masukkan data statistik mahasiswa untuk tahun tertentu."}
            onSubmit={handleSubmit}
            trigger={
              <Button 
                onClick={() => {
                  resetForm()
                }}
                className="bg-primary hover:bg-primary/90 text-white font-bold tracking-wider uppercase text-xs rounded-xl shadow-lg shadow-primary/20 gap-2 h-10 px-4"
              >
                <Plus size={16} /> Tambah Data
              </Button>
            }
          >
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="tahun" className="text-xs font-bold uppercase text-neutral-500">Tahun</Label>
                <Input id="tahun" type="number" placeholder="Cth: 2024" required value={formData.tahun} onChange={(e) => setFormData({...formData, tahun: e.target.value})} className="rounded-xl bg-neutral-50 border-neutral-200" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pendaftar" className="text-xs font-bold uppercase text-neutral-500">Jumlah Pendaftar</Label>
                <Input id="pendaftar" type="number" placeholder="0" value={formData.jumlah_pendaftar} onChange={(e) => setFormData({...formData, jumlah_pendaftar: e.target.value})} className="rounded-xl bg-neutral-50 border-neutral-200" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="diterima" className="text-xs font-bold uppercase text-neutral-500">Jumlah Diterima</Label>
                <Input id="diterima" type="number" placeholder="0" value={formData.jumlah_diterima} onChange={(e) => setFormData({...formData, jumlah_diterima: e.target.value})} className="rounded-xl bg-neutral-50 border-neutral-200" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lulusan" className="text-xs font-bold uppercase text-neutral-500">Jumlah Lulusan</Label>
                <Input id="lulusan" type="number" placeholder="0" value={formData.jumlah_lulusan} onChange={(e) => setFormData({...formData, jumlah_lulusan: e.target.value})} className="rounded-xl bg-neutral-50 border-neutral-200" />
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
          searchPlaceholder="Cari berdasarkan tahun..." 
        />
      )}

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Hapus Data Statistik?"
        onConfirm={handleDelete}
        trigger={<button className="hidden"></button>}
      />
    </div>
  )
}

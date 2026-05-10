"use client"

import { useState } from "react"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { DataTable } from "@/components/dashboard/DataTable"
import { DeleteConfirmDialog } from "@/components/dashboard/DeleteConfirmDialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Trash2, Loader2 } from "lucide-react"
import { apiGet, apiPost, apiDelete } from "@/services/api"
import { useEffect } from "react"

export default function AdminKeahlianPage() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [newKeahlian, setNewKeahlian] = useState("")

  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const res = await apiGet('/keahlian')
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

  const handleDelete = async () => {
    if (!selectedId) return
    setIsSubmitting(true)
    try {
      // Coba delete via admin route
      const res = await apiDelete(`/admin/keahlian/${selectedId}`)
      if (res?.data?.success || res?.status === 200) {
        setIsDeleteDialogOpen(false)
        fetchData()
      } else {
        // Fallback jika bukan admin route
        const fallbackRes = await apiDelete(`/keahlian/${selectedId}`)
        if (fallbackRes?.data?.success || fallbackRes?.status === 200) {
          setIsDeleteDialogOpen(false)
          fetchData()
        } else {
          alert(res?.data?.message || "Gagal menghapus keahlian")
        }
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsSubmitting(false)
      setSelectedId(null)
    }
  }

  const handleSubmit = async () => {
    if (!newKeahlian.trim()) return
    setIsSubmitting(true)
    try {
      const res = await apiPost('/admin/keahlian', { nama_keahlian: newKeahlian })
      if (res?.data?.success) {
        setNewKeahlian("")
        fetchData()
      } else {
        alert(res?.data?.message || "Gagal menambah keahlian")
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const columns = [
    {
      header: "ID",
      accessorKey: "id",
      className: "w-20 text-neutral-400 font-medium"
    },
    {
      header: "Nama Keahlian",
      accessorKey: "nama_keahlian",
      className: "font-bold text-neutral-800"
    },
    {
      header: "Aksi",
      className: "text-right w-24",
      cell: (item: any) => (
        <div className="flex justify-end">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg h-8 px-2"
            onClick={() => {
              setSelectedId(item.id)
              setIsDeleteDialogOpen(true)
            }}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      )
    }
  ]

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Master Keahlian" 
        description="Kelola daftar referensi bidang keahlian dosen." 
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-neutral-100 sticky top-24">
            <h3 className="font-black text-neutral-800 uppercase tracking-tight mb-4 text-lg">Tambah Keahlian</h3>
            <div className="space-y-4">
              <div>
                <Input 
                  placeholder="Cth: Machine Learning" 
                  value={newKeahlian}
                  onChange={(e) => setNewKeahlian(e.target.value)}
                  className="rounded-xl bg-neutral-50 border-neutral-200 h-12"
                />
              </div>
              <Button 
                onClick={handleSubmit} 
                disabled={isSubmitting || !newKeahlian.trim()} 
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold tracking-wider uppercase text-xs rounded-xl shadow-lg shadow-primary/20 h-12"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus size={16} className="mr-2" />}
                {isSubmitting ? "Memproses..." : "Simpan Baru"}
              </Button>
            </div>
            
            <div className="mt-8 p-4 bg-amber-50 rounded-2xl border border-amber-100">
              <h4 className="text-amber-800 font-bold text-sm mb-2">Informasi</h4>
              <p className="text-amber-700/80 text-xs font-medium leading-relaxed">
                Data master ini digunakan sebagai referensi saat dosen memilih bidang keahlian mereka. Hapus dengan hati-hati jika data sudah digunakan.
              </p>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          {isLoading ? (
            <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
          ) : (
            <DataTable 
              columns={columns} 
              data={data} 
              searchPlaceholder="Cari master keahlian..." 
            />
          )}
        </div>
      </div>

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Hapus Master Keahlian?"
        description="Perhatian: Jika keahlian ini sedang digunakan oleh dosen, relasinya juga akan terhapus. Lanjutkan?"
        onConfirm={handleDelete}
        trigger={<button className="hidden"></button>}
      />
    </div>
  )
}

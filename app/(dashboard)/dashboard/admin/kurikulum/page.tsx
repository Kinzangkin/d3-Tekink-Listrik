"use client"

import { useEffect, useState } from "react"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { FormDialog } from "@/components/dashboard/FormDialog"
import { DeleteConfirmDialog } from "@/components/dashboard/DeleteConfirmDialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit2, Trash2, Loader2, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"

interface MataKuliah {
  id: string
  kode: string
  nama: string
  sks: number
  jenis: "Wajib" | "Pilihan" | "Praktikum"
  semester: number
}

export default function AdminKurikulumPage() {
  const [data, setData] = useState<MataKuliah[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState<number | "all">("all")

  // Modal States
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  // Form States
  const [formData, setFormData] = useState({
    kode: "",
    nama: "",
    sks: 3,
    jenis: "Wajib" as "Wajib" | "Pilihan" | "Praktikum",
    semester: 1,
  })

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/kurikulum")
      const json = await res.json()
      if (json.success) {
        setData(json.data || [])
      } else {
        console.error("Gagal memuat data kurikulum:", json.message)
      }
    } catch (e) {
      console.error("Error fetching data:", e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const resetForm = () => {
    setFormData({
      kode: "",
      nama: "",
      sks: 3,
      jenis: "Wajib",
      semester: 1,
    })
    setIsEditMode(false)
    setSelectedId(null)
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    if (!formData.kode || !formData.nama || !formData.sks || !formData.jenis || !formData.semester) {
      alert("Semua kolom input wajib diisi")
      return
    }

    setIsSubmitting(true)
    try {
      const endpoint = isEditMode ? `/api/kurikulum/${selectedId}` : "/api/kurikulum"
      const method = isEditMode ? "PUT" : "POST"

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const json = await res.json()
      if (json.success) {
        setIsFormOpen(false)
        resetForm()
        fetchData()
      } else {
        alert(json.message || "Terjadi kesalahan saat memproses data.")
      }
    } catch (e) {
      console.error(e)
      alert("Gagal menghubungi server.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedId) return
    setIsSubmitting(true)
    try {
      const res = await fetch(`/api/kurikulum/${selectedId}`, {
        method: "DELETE",
      })
      const json = await res.json()
      if (json.success) {
        setIsDeleteDialogOpen(false)
        fetchData()
      } else {
        alert(json.message || "Gagal menghapus data.")
      }
    } catch (e) {
      console.error(e)
      alert("Gagal menghubungi server.")
    } finally {
      setIsSubmitting(false)
      setSelectedId(null)
    }
  }

  // Filtered list
  const filteredData = activeTab === "all"
    ? data
    : data.filter((item) => item.semester === activeTab)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Kurikulum & Mata Kuliah"
        description="Kelola kurikulum akademik dan daftar mata kuliah per semester."
        action={
          <FormDialog
            isOpen={isFormOpen}
            onOpenChange={(open) => {
              setIsFormOpen(open)
              if (!open) resetForm()
            }}
            title={isEditMode ? "Edit Mata Kuliah" : "Tambah Mata Kuliah"}
            description={isEditMode ? "Ubah data detail untuk mata kuliah terpilih." : "Tambahkan mata kuliah baru ke dalam kurikulum studi."}
            onSubmit={handleSubmit}
            trigger={
              <Button
                onClick={() => resetForm()}
                className="bg-primary hover:bg-primary/90 text-white font-bold tracking-wider uppercase text-xs rounded-xl shadow-lg shadow-primary/20 gap-2 h-10 px-4"
              >
                <Plus size={16} /> Tambah MK
              </Button>
            }
          >
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="kode" className="text-xs font-bold uppercase text-neutral-500">Kode MK</Label>
                  <Input
                    id="kode"
                    required
                    value={formData.kode}
                    onChange={(e) => setFormData({ ...formData, kode: e.target.value.toUpperCase() })}
                    placeholder="Cth: EE101"
                    className="rounded-xl bg-neutral-50 border-neutral-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sks" className="text-xs font-bold uppercase text-neutral-500">Jumlah SKS</Label>
                  <Input
                    id="sks"
                    type="number"
                    min={1}
                    max={6}
                    required
                    value={formData.sks}
                    onChange={(e) => setFormData({ ...formData, sks: parseInt(e.target.value) || 0 })}
                    className="rounded-xl bg-neutral-50 border-neutral-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nama" className="text-xs font-bold uppercase text-neutral-500">Nama Mata Kuliah</Label>
                <Input
                  id="nama"
                  required
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  placeholder="Cth: Matematika Teknik I"
                  className="rounded-xl bg-neutral-50 border-neutral-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="jenis" className="text-xs font-bold uppercase text-neutral-500">Jenis</Label>
                  <select
                    id="jenis"
                    value={formData.jenis}
                    onChange={(e) => setFormData({ ...formData, jenis: e.target.value as any })}
                    className="w-full rounded-xl bg-neutral-50 border border-neutral-200 h-10 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="Wajib">Wajib</option>
                    <option value="Pilihan">Pilihan</option>
                    <option value="Praktikum">Praktikum</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="semester" className="text-xs font-bold uppercase text-neutral-500">Semester</Label>
                  <select
                    id="semester"
                    value={formData.semester}
                    onChange={(e) => setFormData({ ...formData, semester: parseInt(e.target.value) || 1 })}
                    className="w-full rounded-xl bg-neutral-50 border border-neutral-200 h-10 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>Semester {num}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            {isSubmitting && (
              <div className="mt-2 text-sm text-primary flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Memproses...
              </div>
            )}
          </FormDialog>
        }
      />

      {/* Tabs Filter Semester */}
      <div className="flex gap-2 pb-2 overflow-x-auto custom-scrollbar border-b border-neutral-200/60">
        <button
          onClick={() => setActiveTab("all")}
          className={cn(
            "px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300",
            activeTab === "all"
              ? "bg-primary text-white shadow-md shadow-primary/20"
              : "bg-white text-neutral-500 hover:text-neutral-800 border border-neutral-100"
          )}
        >
          Semua Semester
        </button>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
          <button
            key={sem}
            onClick={() => setActiveTab(sem)}
            className={cn(
              "px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 shrink-0",
              activeTab === sem
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "bg-white text-neutral-500 hover:text-neutral-800 border border-neutral-100"
            )}
          >
            Sem. {sem}
          </button>
        ))}
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredData.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-neutral-50/50">
                <TableRow>
                  <TableHead className="font-bold text-neutral-800 uppercase tracking-widest text-[11px] w-[140px]">Kode MK</TableHead>
                  <TableHead className="font-bold text-neutral-800 uppercase tracking-widest text-[11px]">Nama Mata Kuliah</TableHead>
                  <TableHead className="font-bold text-neutral-800 uppercase tracking-widest text-[11px] text-center w-[80px]">SKS</TableHead>
                  <TableHead className="font-bold text-neutral-800 uppercase tracking-widest text-[11px] text-center w-[120px]">Semester</TableHead>
                  <TableHead className="font-bold text-neutral-800 uppercase tracking-widest text-[11px] text-center w-[120px]">Jenis</TableHead>
                  <TableHead className="font-bold text-neutral-800 uppercase tracking-widest text-[11px] text-right w-[180px]">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id} className="transition-colors hover:bg-neutral-50/30">
                    <TableCell className="font-mono text-sm font-bold text-neutral-800">{item.kode}</TableCell>
                    <TableCell className="font-medium text-neutral-700">{item.nama}</TableCell>
                    <TableCell className="text-center font-bold text-neutral-800">{item.sks}</TableCell>
                    <TableCell className="text-center">
                      <span className="text-sm font-semibold text-neutral-500">Semester {item.semester}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="secondary"
                        className={cn(
                          "text-[10px] font-bold uppercase px-2 py-0.5",
                          item.jenis === "Wajib" && "bg-neutral-100 text-neutral-600",
                          item.jenis === "Praktikum" && "bg-blue-50 text-blue-600",
                          item.jenis === "Pilihan" && "bg-amber-50 text-amber-600"
                        )}
                      >
                        {item.jenis}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-xl h-9 text-xs font-bold uppercase tracking-widest text-neutral-600 hover:text-primary hover:bg-primary/5 border-neutral-200"
                          onClick={() => {
                            setIsEditMode(true)
                            setSelectedId(item.id)
                            setFormData({
                              kode: item.kode,
                              nama: item.nama,
                              sks: item.sks,
                              jenis: item.jenis,
                              semester: item.semester,
                            })
                            setIsFormOpen(true)
                          }}
                        >
                          <Edit2 size={13} className="mr-1.5" /> Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-xl h-9 text-xs font-bold uppercase tracking-widest text-rose-500 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 border-neutral-200"
                          onClick={() => {
                            setSelectedId(item.id)
                            setIsDeleteDialogOpen(true)
                          }}
                        >
                          <Trash2 size={13} className="mr-1.5" /> Haps
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-neutral-400 space-y-4">
            <div className="w-12 h-12 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-300">
              <BookOpen size={24} />
            </div>
            <div className="text-center">
              <p className="font-bold text-neutral-600">Belum ada data mata kuliah</p>
              <p className="text-xs text-neutral-400 mt-1">Gunakan tombol 'Tambah MK' untuk menambahkan data baru.</p>
            </div>
          </div>
        )}
      </div>

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Hapus Mata Kuliah?"
        description="Mata kuliah akan dihapus secara permanen dari basis data kurikulum dan tidak dapat dikembalikan."
        onConfirm={handleDelete}
        isDeleting={isSubmitting}
        trigger={<button className="hidden"></button>}
      />
    </div>
  )
}

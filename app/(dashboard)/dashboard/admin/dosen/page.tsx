"use client"

import { useEffect, useState } from "react"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { DataTable } from "@/components/dashboard/DataTable"
import { FormDialog } from "@/components/dashboard/FormDialog"
import { DeleteConfirmDialog } from "@/components/dashboard/DeleteConfirmDialog"
import { FileUploadZone } from "@/components/dashboard/FileUploadZone"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Edit2, Trash2, Loader2 } from "lucide-react"
import { apiGet, apiPost, apiPut, apiDelete } from "@/services/api"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

export default function AdminDosenPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    nama: "", nidn: "", jabatan_fungsional: "", pangkat_golongan: "", email: "", password: "", no_hp: ""
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const res = await apiGet('/dosen')
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
      const res = await apiDelete(`/dosen/${selectedId}`)
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

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!isEditMode && !formData.password) {
      alert("Password wajib diisi untuk dosen baru")
      return
    }

    setIsSubmitting(true)

    const payload = new FormData()
    payload.append("nama", formData.nama)
    if (formData.nidn) payload.append("nidn", formData.nidn)
    if (formData.jabatan_fungsional) payload.append("jabatan_fungsional", formData.jabatan_fungsional)
    if (formData.pangkat_golongan) payload.append("pangkat_golongan", formData.pangkat_golongan)
    if (formData.email) payload.append("email", formData.email)
    
    // Password: wajib saat POST, opsional saat PUT
    if (formData.password) {
      payload.append("password", formData.password)
    }
    
    if (formData.no_hp) payload.append("no_hp", formData.no_hp)
    
    if (selectedFile) {
      payload.append("file", selectedFile)
    }

    try {
      const endpoint = isEditMode ? `/dosen/${selectedId}` : '/dosen'
      const res = isEditMode ? await apiPut(endpoint, payload, true) : await apiPost(endpoint, payload, true)
      
      if (res?.data?.success) {
        setIsFormOpen(false)
        setFormData({ nama: "", nidn: "", jabatan_fungsional: "", pangkat_golongan: "", email: "", password: "", no_hp: "" })
        setSelectedFile(null)
        fetchData()
      } else {
        alert(res?.data?.message || `Gagal ${isEditMode ? "memperbarui" : "menambah"} data dosen`)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsSubmitting(false)
    }
  }

  const columns = [
    {
      header: "Dosen",
      cell: (item: any) => (
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10 border border-neutral-100">
            <AvatarImage src={item.fotoUrl || item.foto_url} />
            <AvatarFallback>{item.nama.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-bold text-neutral-800">{item.nama}</span>
            <span className="text-xs text-neutral-500">NIDN: {item.nidn || "-"}</span>
          </div>
        </div>
      )
    },
    {
      header: "Jabatan & Golongan",
      cell: (item: any) => (
        <div className="flex flex-col">
          <span className="font-bold text-neutral-700">{item.jabatanFungsional || item.jabatan_fungsional || "-"}</span>
          <span className="text-xs text-neutral-500">{item.pangkatGolongan || item.pangkat_golongan || "-"}</span>
        </div>
      )
    },
    {
      header: "Kontak",
      cell: (item: any) => (
        <div className="flex flex-col">
          <span className="text-sm text-neutral-700">{item.email || "-"}</span>
          <span className="text-xs text-neutral-500">{item.noHp || item.no_hp || "-"}</span>
        </div>
      )
    },
    {
      header: "Kompetensi",
      cell: (item: any) => (
        <div className="flex flex-wrap gap-1">
          {item.keahlian?.slice(0, 2).map((k: any) => (
            <Badge key={k.id} variant="secondary" className="text-[10px] font-bold">
              {k.nama_keahlian}
            </Badge>
          ))}
          {item.keahlian?.length > 2 && (
            <Badge variant="outline" className="text-[10px] font-bold border-neutral-200 text-neutral-500">
              +{item.keahlian.length - 2}
            </Badge>
          )}
        </div>
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
                setFormData({
                  nama: item.nama || "",
                  nidn: item.nidn || "",
                  jabatan_fungsional: item.jabatanFungsional || item.jabatan_fungsional || "",
                  pangkat_golongan: item.pangkatGolongan || item.pangkat_golongan || "",
                  email: item.email || "",
                  password: "",
                  no_hp: item.noHp || item.no_hp || ""
                })
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
        title="Data Dosen" 
        description="Kelola data profil dosen dan akun login." 
        action={
          <FormDialog
            isOpen={isFormOpen}
            onOpenChange={setIsFormOpen}
            title={isEditMode ? "Edit Data Dosen" : "Tambah Dosen Baru"}
            description={isEditMode ? "Perbarui informasi profil dosen." : "Lengkapi data profil dan akun login untuk dosen baru."}
            onSubmit={handleSubmit}
            trigger={
              <Button 
                onClick={() => {
                  setIsEditMode(false)
                  setSelectedId(null)
                  setFormData({ nama: "", nidn: "", jabatan_fungsional: "", pangkat_golongan: "", email: "", password: "", no_hp: "" })
                  setSelectedFile(null)
                }}
                className="bg-primary hover:bg-primary/90 text-white font-bold tracking-wider uppercase text-xs rounded-xl shadow-lg shadow-primary/20 gap-2 h-10 px-4"
              >
                <Plus size={16} /> Tambah Dosen
              </Button>
            }
          >
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nama" className="text-xs font-bold uppercase text-neutral-500">Nama Lengkap & Gelar</Label>
                  <Input id="nama" required value={formData.nama} onChange={(e) => setFormData({...formData, nama: e.target.value})} placeholder="Cth: Dr. Budi Santoso, M.T." className="rounded-xl bg-neutral-50 border-neutral-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nidn" className="text-xs font-bold uppercase text-neutral-500">NIDN</Label>
                  <Input id="nidn" value={formData.nidn} onChange={(e) => setFormData({...formData, nidn: e.target.value})} placeholder="Nomor Induk Dosen Nasional" className="rounded-xl bg-neutral-50 border-neutral-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jabatan" className="text-xs font-bold uppercase text-neutral-500">Jabatan Fungsional</Label>
                  <select 
                    id="jabatan" 
                    required
                    value={formData.jabatan_fungsional} 
                    onChange={(e) => setFormData({...formData, jabatan_fungsional: e.target.value})} 
                    className="w-full rounded-xl bg-neutral-50 border border-neutral-200 h-10 px-3 focus:outline-none focus:ring-1 focus:ring-primary text-sm font-semibold text-neutral-700"
                  >
                    <option value="" disabled>Pilih Jabatan Fungsional</option>
                    <option value="Asisten Ahli">Asisten Ahli</option>
                    <option value="Lektor">Lektor</option>
                    <option value="Lektor Kepala">Lektor Kepala</option>
                    <option value="Guru Besar">Guru Besar</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="golongan" className="text-xs font-bold uppercase text-neutral-500">Pangkat / Golongan</Label>
                  <select 
                    id="golongan" 
                    required
                    value={formData.pangkat_golongan} 
                    onChange={(e) => setFormData({...formData, pangkat_golongan: e.target.value})} 
                    className="w-full rounded-xl bg-neutral-50 border border-neutral-200 h-10 px-3 focus:outline-none focus:ring-1 focus:ring-primary text-sm font-semibold text-neutral-700"
                  >
                    <option value="" disabled>Pilih Pangkat / Golongan</option>
                    <option value="III/a">III/a (Penata Muda)</option>
                    <option value="III/b">III/b (Penata Muda Tk. I)</option>
                    <option value="III/c">III/c (Penata)</option>
                    <option value="III/d">III/d (Penata Tk. I)</option>
                    <option value="IV/a">IV/a (Pembina)</option>
                    <option value="IV/b">IV/b (Pembina Tk. I)</option>
                    <option value="IV/c">IV/c (Pembina Utama Muda)</option>
                    <option value="IV/d">IV/d (Pembina Utama Madya)</option>
                    <option value="IV/e">IV/e (Pembina Utama)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-bold uppercase text-neutral-500">Email Login</Label>
                  <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="email@polimdo.ac.id" className="rounded-xl bg-neutral-50 border-neutral-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-xs font-bold uppercase text-neutral-500">
                    {isEditMode ? "Ubah Password (Opsional)" : "Password Sementara"}
                  </Label>
                  <Input 
                    id="password" 
                    type="password" 
                    required={!isEditMode} 
                    value={formData.password} 
                    onChange={(e) => setFormData({...formData, password: e.target.value})} 
                    placeholder={isEditMode ? "Kosongkan jika tidak ingin mengubah" : "Minimal 6 karakter"} 
                    className="rounded-xl bg-neutral-50 border-neutral-200" 
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-xs font-bold uppercase text-neutral-500 block mb-2">Foto Profil</Label>
                  <Input type="file" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} className="rounded-xl bg-neutral-50 border-neutral-200" />
                </div>
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
          searchPlaceholder="Cari berdasarkan nama atau NIDN..." 
        />
      )}

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Hapus Data Dosen?"
        onConfirm={handleDelete}
        trigger={<button className="hidden"></button>}
      />
    </div>
  )
}

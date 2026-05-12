"use client"

import { useEffect, useState } from "react"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { FileUploadZone } from "@/components/dashboard/FileUploadZone"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { apiGet, apiPut } from "@/services/api"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Save, Loader2 } from "lucide-react"

export default function DosenProfilPage() {
  const [dosen, setDosen] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<any>({
    nama: "",
    nidn: "",
    jabatan_fungsional: "",
    pangkat_golongan: "",
    email: "",
    no_hp: ""
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const fetchProfile = async () => {
    setIsLoading(true)
    try {
      const res = await apiGet('/dosen/me')
      if (res?.data?.success) {
        const data = res.data.data
        setDosen(data)
        setFormData({
          nama: data.nama || "",
          nidn: data.nidn || "",
          jabatan_fungsional: data.jabatan_fungsional || data.jabatanFungsional || "",
          pangkat_golongan: data.pangkat_golongan || data.pangkatGolongan || "",
          email: data.email || "",
          no_hp: data.no_hp || data.noHp || ""
        })
      }
    } catch (err) {
      console.error("Gagal mengambil profil", err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  const handleSave = async () => {
    if (!dosen) return
    setIsSubmitting(true)
    try {
      const payload = new FormData()
      payload.append("nama", formData.nama)
      payload.append("nidn", formData.nidn)
      payload.append("jabatan_fungsional", formData.jabatan_fungsional)
      payload.append("pangkat_golongan", formData.pangkat_golongan)
      payload.append("email", formData.email)
      payload.append("no_hp", formData.no_hp)
      
      if (selectedFile) {
        payload.append("file", selectedFile)
      }

      const res = await apiPut(`/dosen/${dosen.id}`, payload, true)
      if (res?.data?.success) {
        alert("Profil berhasil diperbarui")
        fetchProfile()
      } else {
        alert(res?.data?.message || "Gagal memperbarui profil")
      }
    } catch (err) {
      console.error(err)
      alert("Terjadi kesalahan saat menyimpan profil")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <p className="text-neutral-500 font-black animate-pulse uppercase tracking-widest text-xs">Memuat Profil...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Profil Saya" 
        description="Kelola informasi profil dan data akademik Anda." 
        action={
          <Button 
            onClick={handleSave} 
            disabled={isSubmitting}
            className="bg-primary hover:bg-primary/90 text-white font-bold tracking-wider uppercase text-xs rounded-xl shadow-lg shadow-primary/20 gap-2 h-10 px-6"
          >
            {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} 
            {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-neutral-100 flex flex-col items-center">
            <Avatar className="w-32 h-32 border-4 border-neutral-50 shadow-md mb-6">
              <AvatarImage src={dosen?.foto_url || dosen?.fotoUrl || undefined} className="object-cover" />
              <AvatarFallback className="text-3xl bg-primary text-white">
                {dosen?.nama?.substring(0, 2) || "DS"}
              </AvatarFallback>
            </Avatar>
            <div className="w-full">
              <FileUploadZone 
                onChange={(files) => setSelectedFile(files[0])} 
                accept="image/*" 
                label="Ubah Foto Profil" 
                maxSize={2} 
              />
              {selectedFile && (
                <p className="mt-2 text-[10px] font-bold text-primary uppercase text-center">
                  File terpilih: {selectedFile.name}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-neutral-100">
            <h3 className="font-black text-neutral-800 uppercase tracking-tight text-lg mb-6 border-b border-neutral-100 pb-4">Data Pribadi & Akademik</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nama" className="text-xs font-bold uppercase text-neutral-500">Nama Lengkap & Gelar</Label>
                <Input 
                  id="nama" 
                  value={formData.nama} 
                  onChange={(e) => setFormData({...formData, nama: e.target.value})} 
                  className="rounded-xl bg-neutral-50 border-neutral-200" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nidn" className="text-xs font-bold uppercase text-neutral-500">NIDN</Label>
                <Input 
                  id="nidn" 
                  value={formData.nidn} 
                  onChange={(e) => setFormData({...formData, nidn: e.target.value})} 
                  className="rounded-xl bg-neutral-50 border-neutral-200" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jabatan" className="text-xs font-bold uppercase text-neutral-500">Jabatan Fungsional</Label>
                <Input 
                  id="jabatan" 
                  value={formData.jabatan_fungsional} 
                  onChange={(e) => setFormData({...formData, jabatan_fungsional: e.target.value})} 
                  className="rounded-xl bg-neutral-50 border-neutral-200" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="golongan" className="text-xs font-bold uppercase text-neutral-500">Pangkat / Golongan</Label>
                <Input 
                  id="golongan" 
                  value={formData.pangkat_golongan} 
                  onChange={(e) => setFormData({...formData, pangkat_golongan: e.target.value})} 
                  className="rounded-xl bg-neutral-50 border-neutral-200" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold uppercase text-neutral-500">Email Utama</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={(e) => setFormData({...formData, email: e.target.value})} 
                  className="rounded-xl bg-neutral-50 border-neutral-200" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nohp" className="text-xs font-bold uppercase text-neutral-500">Nomor HP</Label>
                <Input 
                  id="nohp" 
                  value={formData.no_hp} 
                  onChange={(e) => setFormData({...formData, no_hp: e.target.value})} 
                  className="rounded-xl bg-neutral-50 border-neutral-200" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


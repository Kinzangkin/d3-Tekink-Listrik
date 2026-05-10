"use client"

import { useState } from "react"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { FileUploadZone } from "@/components/dashboard/FileUploadZone"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { mockDosen, mockKeahlian } from "@/lib/mock-data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Save } from "lucide-react"

export default function DosenProfilPage() {
  const dosen = mockDosen[0] // Mock current user
  const [selectedKeahlian, setSelectedKeahlian] = useState(dosen.keahlian)

  const handleRemoveKeahlian = (id: number) => {
    setSelectedKeahlian(selectedKeahlian.filter(k => k.id !== id))
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Profil Saya" 
        description="Kelola informasi profil dan bidang keahlian Anda." 
        action={
          <Button className="bg-primary hover:bg-primary/90 text-white font-bold tracking-wider uppercase text-xs rounded-xl shadow-lg shadow-primary/20 gap-2 h-10 px-6">
            <Save size={16} /> Simpan Perubahan
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Photo & Basic */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-neutral-100 flex flex-col items-center">
            <Avatar className="w-32 h-32 border-4 border-neutral-50 shadow-md mb-6">
              <AvatarImage src={dosen.foto_url || undefined} />
              <AvatarFallback className="text-3xl bg-primary text-white">
                {dosen.nama.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="w-full">
              <FileUploadZone accept="image/*" label="Ubah Foto Profil" maxSize={2} />
            </div>
          </div>
        </div>

        {/* Right Column - Forms */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-neutral-100">
            <h3 className="font-black text-neutral-800 uppercase tracking-tight text-lg mb-6 border-b border-neutral-100 pb-4">Data Pribadi & Akademik</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nama" className="text-xs font-bold uppercase text-neutral-500">Nama Lengkap & Gelar</Label>
                <Input id="nama" defaultValue={dosen.nama} className="rounded-xl bg-neutral-50 border-neutral-200" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nidn" className="text-xs font-bold uppercase text-neutral-500">NIDN</Label>
                <Input id="nidn" defaultValue={dosen.nidn || ""} className="rounded-xl bg-neutral-50 border-neutral-200" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jabatan" className="text-xs font-bold uppercase text-neutral-500">Jabatan Fungsional</Label>
                <Input id="jabatan" defaultValue={dosen.jabatan_fungsional || ""} className="rounded-xl bg-neutral-50 border-neutral-200" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="golongan" className="text-xs font-bold uppercase text-neutral-500">Pangkat / Golongan</Label>
                <Input id="golongan" defaultValue={dosen.pangkat_golongan || ""} className="rounded-xl bg-neutral-50 border-neutral-200" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold uppercase text-neutral-500">Email Utama</Label>
                <Input id="email" type="email" defaultValue={dosen.email || ""} className="rounded-xl bg-neutral-50 border-neutral-200" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nohp" className="text-xs font-bold uppercase text-neutral-500">Nomor HP</Label>
                <Input id="nohp" defaultValue={dosen.no_hp || ""} className="rounded-xl bg-neutral-50 border-neutral-200" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-neutral-100">
            <h3 className="font-black text-neutral-800 uppercase tracking-tight text-lg mb-6 border-b border-neutral-100 pb-4">Bidang Keahlian</h3>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedKeahlian.map(k => (
                <Badge key={k.id} className="bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-2">
                  {k.nama_keahlian}
                  <button onClick={() => handleRemoveKeahlian(k.id)} className="hover:bg-primary/20 rounded-full p-0.5">
                    <X size={12} />
                  </button>
                </Badge>
              ))}
              {selectedKeahlian.length === 0 && (
                <span className="text-sm text-neutral-400 font-medium italic">Belum ada keahlian yang dipilih</span>
              )}
            </div>

            <div className="space-y-3">
              <Label className="text-xs font-bold uppercase text-neutral-500">Pilih dari Master Keahlian</Label>
              <div className="flex flex-wrap gap-2">
                {mockKeahlian
                  .filter(k => !selectedKeahlian.find(sk => sk.id === k.id))
                  .map(k => (
                    <button
                      key={k.id}
                      onClick={() => setSelectedKeahlian([...selectedKeahlian, k])}
                      className="text-xs font-bold px-3 py-1.5 rounded-lg border border-neutral-200 text-neutral-600 hover:border-primary hover:text-primary transition-colors flex items-center gap-1 bg-white"
                    >
                      <Plus size={12} /> {k.nama_keahlian}
                    </button>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

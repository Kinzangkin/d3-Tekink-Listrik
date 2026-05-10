"use client"

import { useState } from "react"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { DataTable } from "@/components/dashboard/DataTable"
import { FormDialog } from "@/components/dashboard/FormDialog"
import { DeleteConfirmDialog } from "@/components/dashboard/DeleteConfirmDialog"
import { FileUploadZone } from "@/components/dashboard/FileUploadZone"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit2, Trash2, Download } from "lucide-react"
import { mockHki } from "@/lib/mock-data"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function DosenHkiPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  
  const columns = [
    {
      header: "Tahun",
      accessorKey: "tahun",
      className: "w-20 font-black text-neutral-300 text-lg"
    },
    {
      header: "Informasi HKI",
      cell: (item: any) => (
        <div className="flex flex-col gap-1 max-w-lg">
          <span className="font-bold text-neutral-800 leading-snug">{item.judul_invensi}</span>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className="text-[10px] text-primary border-primary/20 bg-primary/5">
              {item.jenis_hki}
            </Badge>
            <span className="text-xs text-neutral-500">No: {item.nomor_paten || "-"}</span>
          </div>
        </div>
      )
    },
    {
      header: "Inventor",
      accessorKey: "inventor",
      className: "text-sm text-neutral-600"
    },
    {
      header: "Sertifikat",
      cell: (item: any) => (
        <Button variant="outline" size="sm" className="rounded-lg h-8 text-xs font-bold gap-2">
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
              <DropdownMenuItem className="cursor-pointer font-medium text-neutral-600" onClick={() => setIsFormOpen(true)}>
                <Edit2 className="mr-2 h-4 w-4" />
                Edit Data
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer font-medium text-rose-600 focus:text-rose-600" onClick={() => setIsDeleteDialogOpen(true)}>
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
        title="Hak Kekayaan Intelektual" 
        description="Kelola daftar paten, hak cipta, dan HKI lainnya." 
        action={
          <FormDialog
            isOpen={isFormOpen}
            onOpenChange={setIsFormOpen}
            title="Tambah HKI"
            description="Masukkan informasi Hak Kekayaan Intelektual baru."
            onSubmit={() => {
              setIsFormOpen(false)
            }}
            trigger={
              <Button className="bg-primary hover:bg-primary/90 text-white font-bold tracking-wider uppercase text-xs rounded-xl shadow-lg shadow-primary/20 gap-2 h-10 px-4">
                <Plus size={16} /> Tambah HKI
              </Button>
            }
          >
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="judul" className="text-xs font-bold uppercase text-neutral-500">Judul Invensi / Ciptaan</Label>
                <Textarea id="judul" placeholder="Cth: Alat Penghemat Energi Listrik..." className="rounded-xl bg-neutral-50 border-neutral-200 resize-none h-20" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="inventor" className="text-xs font-bold uppercase text-neutral-500">Nama Inventor / Pencipta</Label>
                <Input id="inventor" placeholder="Cth: Dr. Budi Santoso, Ir. Andi Wijaya" className="rounded-xl bg-neutral-50 border-neutral-200" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="jenis" className="text-xs font-bold uppercase text-neutral-500">Jenis HKI</Label>
                  <Select defaultValue="Paten Sederhana">
                    <SelectTrigger id="jenis" className="rounded-xl bg-neutral-50 border-neutral-200">
                      <SelectValue placeholder="Pilih Jenis" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="Hak Cipta">Hak Cipta</SelectItem>
                      <SelectItem value="Paten">Paten</SelectItem>
                      <SelectItem value="Paten Sederhana">Paten Sederhana</SelectItem>
                      <SelectItem value="Desain Industri">Desain Industri</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tahun" className="text-xs font-bold uppercase text-neutral-500">Tahun Terdaftar</Label>
                  <Input id="tahun" type="number" placeholder="Cth: 2024" className="rounded-xl bg-neutral-50 border-neutral-200" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nomor" className="text-xs font-bold uppercase text-neutral-500">Nomor Paten / Pendaftaran</Label>
                <Input id="nomor" placeholder="Cth: IDP000012345" className="rounded-xl bg-neutral-50 border-neutral-200" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase text-neutral-500 block mb-2">Sertifikat HKI (PDF)</Label>
                <FileUploadZone accept=".pdf" label="Upload sertifikat atau bukti pendaftaran" maxSize={5} />
              </div>
            </div>
          </FormDialog>
        }
      />

      <DataTable 
        columns={columns} 
        data={mockHki} 
        searchPlaceholder="Cari judul invensi atau inventor..." 
      />

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Hapus HKI?"
        onConfirm={() => {
          setIsDeleteDialogOpen(false)
        }}
        trigger={<button className="hidden"></button>}
      />
    </div>
  )
}

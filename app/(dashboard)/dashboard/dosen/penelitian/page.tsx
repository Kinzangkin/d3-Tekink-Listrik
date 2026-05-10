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
import { Plus, Edit2, Trash2 } from "lucide-react"
import { mockPenelitian } from "@/lib/mock-data"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function DosenPenelitianPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  
  const columns = [
    {
      header: "Informasi Penelitian",
      cell: (item: any) => (
        <div className="flex flex-col gap-1 max-w-lg">
          <span className="font-bold text-neutral-800 leading-snug">{item.judul}</span>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className="text-[10px]">{item.tahun}</Badge>
            <span className="text-xs text-neutral-500 line-clamp-1">{item.deskripsi}</span>
          </div>
        </div>
      )
    },
    {
      header: "Tim Peneliti",
      cell: (item: any) => (
        <div className="flex flex-col gap-1">
          {item.anggota?.map((a: any, i: number) => (
            <span key={i} className="text-xs text-neutral-600">
              <span className={`font-bold ${a.peran === "Ketua" ? "text-primary" : ""}`}>
                {a.nama_dosen}
              </span> ({a.peran})
            </span>
          ))}
        </div>
      )
    },
    {
      header: "Media",
      cell: (item: any) => (
        <Badge variant="secondary" className="font-bold">
          {item.media_count || 0} File
        </Badge>
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
        title="Penelitian" 
        description="Kelola data penelitian yang sedang atau telah Anda laksanakan." 
        action={
          <FormDialog
            isOpen={isFormOpen}
            onOpenChange={setIsFormOpen}
            title="Tambah Penelitian"
            description="Masukkan informasi dan anggota tim penelitian baru."
            onSubmit={() => {
              setIsFormOpen(false)
            }}
            trigger={
              <Button className="bg-primary hover:bg-primary/90 text-white font-bold tracking-wider uppercase text-xs rounded-xl shadow-lg shadow-primary/20 gap-2 h-10 px-4">
                <Plus size={16} /> Tambah Penelitian
              </Button>
            }
          >
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="judul" className="text-xs font-bold uppercase text-neutral-500">Judul Penelitian</Label>
                <Textarea id="judul" placeholder="Cth: Sistem Monitoring Energi Berbasis IoT..." className="rounded-xl bg-neutral-50 border-neutral-200 resize-none h-20" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tahun" className="text-xs font-bold uppercase text-neutral-500">Tahun Pelaksanaan</Label>
                <Input id="tahun" type="number" placeholder="Cth: 2024" className="rounded-xl bg-neutral-50 border-neutral-200" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deskripsi" className="text-xs font-bold uppercase text-neutral-500">Deskripsi Singkat</Label>
                <Textarea id="deskripsi" placeholder="Tuliskan deskripsi singkat penelitian..." className="rounded-xl bg-neutral-50 border-neutral-200 resize-none h-24" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase text-neutral-500 block mb-2">Dokumen Pendukung</Label>
                <FileUploadZone accept=".pdf,image/*" multiple label="Upload file proposal atau laporan" maxSize={10} />
              </div>
            </div>
          </FormDialog>
        }
      />

      <DataTable 
        columns={columns} 
        data={mockPenelitian} 
        searchPlaceholder="Cari judul penelitian..." 
      />

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Hapus Penelitian?"
        onConfirm={() => {
          setIsDeleteDialogOpen(false)
        }}
        trigger={<button className="hidden"></button>}
      />
    </div>
  )
}

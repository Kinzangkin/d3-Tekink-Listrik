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
import { Plus, Edit2, Trash2, Award, Download } from "lucide-react"
import { mockSertifikat } from "@/lib/mock-data"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

export default function DosenSertifikatPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  
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
          <span className="font-bold text-neutral-800 leading-snug">{item.judul_sertifikat}</span>
        </div>
      )
    },
    {
      header: "File",
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
        title="Sertifikat & Kompetensi" 
        description="Kelola dokumen sertifikat profesi atau kompetensi keahlian Anda." 
        action={
          <FormDialog
            isOpen={isFormOpen}
            onOpenChange={setIsFormOpen}
            title="Tambah Sertifikat"
            description="Upload sertifikat kompetensi baru."
            onSubmit={() => {
              setIsFormOpen(false)
            }}
            trigger={
              <Button className="bg-primary hover:bg-primary/90 text-white font-bold tracking-wider uppercase text-xs rounded-xl shadow-lg shadow-primary/20 gap-2 h-10 px-4">
                <Plus size={16} /> Tambah Sertifikat
              </Button>
            }
          >
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="judul" className="text-xs font-bold uppercase text-neutral-500">Nama Sertifikat</Label>
                <Input id="judul" placeholder="Cth: Certified IoT Specialist (CIS)" className="rounded-xl bg-neutral-50 border-neutral-200" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tahun" className="text-xs font-bold uppercase text-neutral-500">Tahun Perolehan</Label>
                <Input id="tahun" type="number" placeholder="Cth: 2024" className="rounded-xl bg-neutral-50 border-neutral-200" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase text-neutral-500 block mb-2">Dokumen Sertifikat (PDF/Gambar)</Label>
                <FileUploadZone accept=".pdf,image/*" label="Upload scan/foto sertifikat" maxSize={5} />
              </div>
            </div>
          </FormDialog>
        }
      />

      <DataTable 
        columns={columns} 
        data={mockSertifikat} 
        searchPlaceholder="Cari sertifikat..." 
      />

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Hapus Sertifikat?"
        onConfirm={() => {
          setIsDeleteDialogOpen(false)
        }}
        trigger={<button className="hidden"></button>}
      />
    </div>
  )
}

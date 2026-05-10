"use client"

import { useState } from "react"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { DataTable } from "@/components/dashboard/DataTable"
import { FormDialog } from "@/components/dashboard/FormDialog"
import { DeleteConfirmDialog } from "@/components/dashboard/DeleteConfirmDialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit2, Trash2, ExternalLink } from "lucide-react"
import { mockPublikasi } from "@/lib/mock-data"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

export default function DosenPublikasiPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  
  const columns = [
    {
      header: "Tahun",
      accessorKey: "tahun",
      className: "w-20 font-black text-neutral-300 text-lg"
    },
    {
      header: "Informasi Publikasi",
      cell: (item: any) => (
        <div className="flex flex-col gap-1 max-w-lg">
          <span className="font-bold text-neutral-800 leading-snug">{item.judul}</span>
          <span className="text-xs text-primary font-bold">{item.nama_jurnal_konferensi}</span>
          <span className="text-sm text-neutral-500 line-clamp-2 mt-1">{item.deskripsi}</span>
        </div>
      )
    },
    {
      header: "Tautan",
      cell: (item: any) => (
        <a href={item.link_tautan} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline bg-primary/5 px-3 py-1.5 rounded-lg">
          Buka Tautan <ExternalLink size={12} />
        </a>
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
        title="Publikasi Ilmiah" 
        description="Kelola daftar publikasi jurnal dan konferensi Anda." 
        action={
          <FormDialog
            isOpen={isFormOpen}
            onOpenChange={setIsFormOpen}
            title="Tambah Publikasi"
            description="Masukkan informasi publikasi jurnal atau konferensi baru."
            onSubmit={() => {
              setIsFormOpen(false)
            }}
            trigger={
              <Button className="bg-primary hover:bg-primary/90 text-white font-bold tracking-wider uppercase text-xs rounded-xl shadow-lg shadow-primary/20 gap-2 h-10 px-4">
                <Plus size={16} /> Tambah Publikasi
              </Button>
            }
          >
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="judul" className="text-xs font-bold uppercase text-neutral-500">Judul Publikasi</Label>
                <Textarea id="judul" placeholder="Cth: Implementasi IoT pada Smart Grid..." className="rounded-xl bg-neutral-50 border-neutral-200 resize-none h-20" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jurnal" className="text-xs font-bold uppercase text-neutral-500">Nama Jurnal / Konferensi</Label>
                <Input id="jurnal" placeholder="Cth: Jurnal Teknologi Informasi Vol. 12" className="rounded-xl bg-neutral-50 border-neutral-200" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tahun" className="text-xs font-bold uppercase text-neutral-500">Tahun Terbit</Label>
                  <Input id="tahun" type="number" placeholder="Cth: 2024" className="rounded-xl bg-neutral-50 border-neutral-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="link" className="text-xs font-bold uppercase text-neutral-500">Link Tautan (DOI / URL)</Label>
                  <Input id="link" placeholder="https://doi.org/..." className="rounded-xl bg-neutral-50 border-neutral-200" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="deskripsi" className="text-xs font-bold uppercase text-neutral-500">Deskripsi / Abstrak Singkat</Label>
                <Textarea id="deskripsi" placeholder="Tuliskan deskripsi atau abstrak singkat..." className="rounded-xl bg-neutral-50 border-neutral-200 resize-none h-24" />
              </div>
            </div>
          </FormDialog>
        }
      />

      <DataTable 
        columns={columns} 
        data={mockPublikasi} 
        searchPlaceholder="Cari judul publikasi atau jurnal..." 
      />

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Hapus Publikasi?"
        onConfirm={() => {
          setIsDeleteDialogOpen(false)
        }}
        trigger={<button className="hidden"></button>}
      />
    </div>
  )
}

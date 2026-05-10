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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit2, Trash2 } from "lucide-react"
import { mockBukuAjar } from "@/lib/mock-data"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

export default function DosenBukuAjarPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  
  const columns = [
    {
      header: "Tahun",
      accessorKey: "tahun",
      className: "w-20 font-black text-neutral-300 text-lg"
    },
    {
      header: "Informasi Buku",
      cell: (item: any) => (
        <div className="flex flex-col gap-1 max-w-lg">
          <span className="font-bold text-neutral-800 leading-snug">{item.judul}</span>
          <span className="text-xs text-neutral-500 line-clamp-2 mt-1">{item.deskripsi}</span>
        </div>
      )
    },
    {
      header: "Peran Penulis",
      cell: (item: any) => (
        <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${item.peran_penulis === 'Penulis Ketua' ? 'bg-primary/10 text-primary' : 'bg-neutral-100 text-neutral-600'}`}>
          {item.peran_penulis}
        </span>
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
        title="Buku Ajar" 
        description="Kelola daftar buku ajar, modul, atau buku referensi yang diterbitkan." 
        action={
          <FormDialog
            isOpen={isFormOpen}
            onOpenChange={setIsFormOpen}
            title="Tambah Buku Ajar"
            description="Masukkan informasi buku ajar baru."
            onSubmit={() => {
              setIsFormOpen(false)
            }}
            trigger={
              <Button className="bg-primary hover:bg-primary/90 text-white font-bold tracking-wider uppercase text-xs rounded-xl shadow-lg shadow-primary/20 gap-2 h-10 px-4">
                <Plus size={16} /> Tambah Buku
              </Button>
            }
          >
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="judul" className="text-xs font-bold uppercase text-neutral-500">Judul Buku</Label>
                <Textarea id="judul" placeholder="Cth: Dasar-Dasar Internet of Things..." className="rounded-xl bg-neutral-50 border-neutral-200 resize-none h-20" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tahun" className="text-xs font-bold uppercase text-neutral-500">Tahun Terbit</Label>
                  <Input id="tahun" type="number" placeholder="Cth: 2024" className="rounded-xl bg-neutral-50 border-neutral-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="peran" className="text-xs font-bold uppercase text-neutral-500">Peran Penulis</Label>
                  <Select defaultValue="Penulis Ketua">
                    <SelectTrigger id="peran" className="rounded-xl bg-neutral-50 border-neutral-200">
                      <SelectValue placeholder="Pilih Peran" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="Penulis Ketua">Penulis Ketua</SelectItem>
                      <SelectItem value="Anggota">Anggota</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="deskripsi" className="text-xs font-bold uppercase text-neutral-500">Deskripsi / Penerbit</Label>
                <Textarea id="deskripsi" placeholder="Tuliskan penerbit atau deskripsi singkat buku..." className="rounded-xl bg-neutral-50 border-neutral-200 resize-none h-24" />
              </div>
            </div>
          </FormDialog>
        }
      />

      <DataTable 
        columns={columns} 
        data={mockBukuAjar} 
        searchPlaceholder="Cari judul buku..." 
      />

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Hapus Buku Ajar?"
        onConfirm={() => {
          setIsDeleteDialogOpen(false)
        }}
        trigger={<button className="hidden"></button>}
      />
    </div>
  )
}

"use client"

import { useState } from "react"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { DataTable } from "@/components/dashboard/DataTable"
import { FormDialog } from "@/components/dashboard/FormDialog"
import { DeleteConfirmDialog } from "@/components/dashboard/DeleteConfirmDialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Edit2, Trash2 } from "lucide-react"
import { mockStatistik } from "@/lib/mock-data"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

export default function AdminStatistikPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  
  const columns = [
    {
      header: "Tahun Akademik",
      accessorKey: "tahun",
      className: "font-bold text-primary"
    },
    {
      header: "Pendaftar",
      accessorKey: "jumlah_pendaftar"
    },
    {
      header: "Diterima",
      accessorKey: "jumlah_diterima"
    },
    {
      header: "Lulusan",
      accessorKey: "jumlah_lulusan"
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
        title="Statistik Mahasiswa" 
        description="Kelola data jumlah pendaftar, diterima, dan lulusan per tahun." 
        action={
          <FormDialog
            isOpen={isFormOpen}
            onOpenChange={setIsFormOpen}
            title="Tambah Data Statistik"
            description="Masukkan data statistik mahasiswa untuk tahun tertentu."
            onSubmit={() => {
              setIsFormOpen(false)
            }}
            trigger={
              <Button className="bg-primary hover:bg-primary/90 text-white font-bold tracking-wider uppercase text-xs rounded-xl shadow-lg shadow-primary/20 gap-2 h-10 px-4">
                <Plus size={16} /> Tambah Data
              </Button>
            }
          >
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="tahun" className="text-xs font-bold uppercase text-neutral-500">Tahun</Label>
                <Input id="tahun" type="number" placeholder="Cth: 2024" className="rounded-xl bg-neutral-50 border-neutral-200" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pendaftar" className="text-xs font-bold uppercase text-neutral-500">Jumlah Pendaftar</Label>
                <Input id="pendaftar" type="number" placeholder="0" className="rounded-xl bg-neutral-50 border-neutral-200" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="diterima" className="text-xs font-bold uppercase text-neutral-500">Jumlah Diterima</Label>
                <Input id="diterima" type="number" placeholder="0" className="rounded-xl bg-neutral-50 border-neutral-200" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lulusan" className="text-xs font-bold uppercase text-neutral-500">Jumlah Lulusan</Label>
                <Input id="lulusan" type="number" placeholder="0" className="rounded-xl bg-neutral-50 border-neutral-200" />
              </div>
            </div>
          </FormDialog>
        }
      />

      {/* Chart preview placeholder */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-neutral-100 mb-6 flex items-center justify-center h-[200px]">
        <p className="text-neutral-400 font-medium">Preview Chart Statistik (Recharts)</p>
      </div>

      <DataTable 
        columns={columns} 
        data={mockStatistik} 
        searchPlaceholder="Cari berdasarkan tahun..." 
      />

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Hapus Data Statistik?"
        onConfirm={() => {
          setIsDeleteDialogOpen(false)
        }}
        trigger={<button className="hidden"></button>}
      />
    </div>
  )
}

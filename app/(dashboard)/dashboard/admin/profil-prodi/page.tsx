"use client"

import React, { useEffect, useState } from "react"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { FormDialog } from "@/components/dashboard/FormDialog"
import { DeleteConfirmDialog } from "@/components/dashboard/DeleteConfirmDialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { apiGet, apiPost, apiPut, apiDelete } from "@/services/api"
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Loader2, 
  Target, 
  Compass, 
  Award,
  MoreHorizontal,
  ChevronUp,
  ChevronDown
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface ProfilProdiItem {
  id: number
  tipe: "Visi" | "Misi" | "Tujuan"
  deskripsi: string
  urutan: number
}

type TabType = "Visi" | "Misi" | "Tujuan"

export default function AdminProfilProdiPage() {
  const [data, setData] = useState<ProfilProdiItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTab, setSelectedTab] = useState<TabType>("Visi")
  
  // Dialog States
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState<ProfilProdiItem | null>(null)
  
  // Form States
  const [tipe, setTipe] = useState<TabType>("Visi")
  const [deskripsi, setDeskripsi] = useState("")
  const [urutan, setUrutan] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch Data
  const fetchData = async () => {
    setIsLoading(true)
    try {
      const res = await apiGet("/profil-prodi")
      if (res && res.data && res.data.success) {
        setData(res.data.data || [])
      }
    } catch (err) {
      console.error("Gagal memuat data profil prodi:", err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Open Form for Adding
  const handleAdd = () => {
    setCurrentItem(null)
    setTipe(selectedTab)
    setDeskripsi("")
    // Set next urutan based on existing items in current tab
    const tabItems = data.filter((item) => item.tipe === selectedTab)
    const nextUrutan = tabItems.length > 0 ? Math.max(...tabItems.map(i => i.urutan)) + 1 : 1
    setUrutan(nextUrutan)
    setIsFormOpen(true)
  }

  // Open Form for Editing
  const handleEdit = (item: ProfilProdiItem) => {
    setCurrentItem(item)
    setTipe(item.tipe)
    setDeskripsi(item.deskripsi)
    setUrutan(item.urutan)
    setIsFormOpen(true)
  }

  // Open Delete Confirmation
  const handleDeleteClick = (item: ProfilProdiItem) => {
    setCurrentItem(item)
    setIsDeleteDialogOpen(true)
  }

  // Submit Form (Create / Update)
  const handleSubmit = async () => {
    if (!deskripsi.trim()) {
      alert("Deskripsi wajib diisi")
      return
    }

    setIsSubmitting(true)
    const payload = { tipe, deskripsi, urutan }

    try {
      let res
      if (currentItem) {
        // Edit Mode
        res = await apiPut(`/profil-prodi/${currentItem.id}`, payload)
      } else {
        // Add Mode
        res = await apiPost("/profil-prodi", payload)
      }

      if (res && res.data && res.data.success) {
        setIsFormOpen(false)
        await fetchData()
      } else {
        alert(res?.data?.message || "Operasi gagal.")
      }
    } catch (err) {
      console.error("Gagal menyimpan profil prodi:", err)
      alert("Terjadi kesalahan koneksi.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Confirm Delete
  const handleConfirmDelete = async () => {
    if (!currentItem) return
    setIsSubmitting(true)
    try {
      const res = await apiDelete(`/profil-prodi/${currentItem.id}`)
      if (res && res.data && res.data.success) {
        setIsDeleteDialogOpen(false)
        await fetchData()
      } else {
        alert(res?.data?.message || "Gagal menghapus data.")
      }
    } catch (err) {
      console.error("Gagal menghapus profil prodi:", err)
      alert("Terjadi kesalahan koneksi.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Filter & Sort current data
  const filteredData = data
    .filter((item) => item.tipe === selectedTab)
    .sort((a, b) => a.urutan - b.urutan)

  // Tab Helper details
  const getTabIcon = (tab: TabType) => {
    switch (tab) {
      case "Visi": return <Compass className="w-4 h-4" />
      case "Misi": return <Target className="w-4 h-4" />
      case "Tujuan": return <Award className="w-4 h-4" />
    }
  }

  const getTabColor = (tab: TabType) => {
    switch (tab) {
      case "Visi": return "text-blue-500 bg-blue-50 border-blue-100"
      case "Misi": return "text-primary bg-primary/10 border-primary/20"
      case "Tujuan": return "text-amber-500 bg-amber-50 border-amber-100"
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Visi, Misi & Tujuan" 
        description="Kelola landasan visi, misi strategis, dan sasaran tujuan program studi." 
        action={
          <Button 
            onClick={handleAdd}
            className="bg-primary hover:bg-primary/90 text-white font-bold tracking-wider uppercase text-xs rounded-xl shadow-lg shadow-primary/20 gap-2 h-10 px-4"
          >
            <Plus size={16} /> Tambah Item
          </Button>
        }
      />

      {/* Modern Sleek Tab Navigation */}
      <div className="flex border-b border-neutral-100 gap-2 overflow-x-auto pb-px scrollbar-none">
        {(["Visi", "Misi", "Tujuan"] as TabType[]).map((tab) => {
          const isActive = selectedTab === tab
          const count = data.filter((item) => item.tipe === tab).length
          
          return (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={cn(
                "relative flex items-center gap-2 px-6 py-4 text-sm font-black uppercase tracking-widest transition-all duration-300 outline-none border-b-2 border-transparent",
                isActive 
                  ? tab === "Visi" ? "text-blue-500 border-blue-500" : tab === "Misi" ? "text-primary border-primary" : "text-amber-500 border-amber-500"
                  : "text-neutral-400 hover:text-neutral-600"
              )}
            >
              {getTabIcon(tab)}
              <span>{tab}</span>
              <span className={cn(
                "ml-1 text-[10px] font-bold px-2 py-0.5 rounded-full border",
                isActive 
                  ? tab === "Visi" 
                    ? "bg-blue-50 border-blue-100 text-blue-500" 
                    : tab === "Misi" 
                      ? "bg-primary/15 border-primary/25 text-primary" 
                      : "bg-amber-50 border-amber-100 text-amber-500"
                  : "bg-neutral-50 border-neutral-200 text-neutral-400"
              )}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Main Content Area */}
      {isLoading ? (
        <div className="bg-white p-24 rounded-3xl shadow-sm border border-neutral-100 flex flex-col items-center justify-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
          <p className="text-neutral-400 text-xs font-bold uppercase tracking-widest">Memuat data...</p>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {filteredData.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white p-16 rounded-3xl shadow-sm border border-neutral-100 text-center"
              >
                <div className="mx-auto w-16 h-16 bg-neutral-50 border border-neutral-100 text-neutral-400 rounded-2xl flex items-center justify-center mb-4">
                  {getTabIcon(selectedTab)}
                </div>
                <h3 className="font-bold text-neutral-800 text-lg mb-1">Belum Ada Data {selectedTab}</h3>
                <p className="text-neutral-500 text-sm max-w-sm mx-auto">
                  Silakan tambahkan poin {selectedTab} pertama untuk program studi D3 Teknik Listrik.
                </p>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 gap-4"
              >
                {filteredData.map((item, index) => {
                  const hasColon = item.deskripsi.includes(":")
                  let itemTitle = ""
                  let itemContent = item.deskripsi

                  if (hasColon) {
                    const parts = item.deskripsi.split(":")
                    itemTitle = parts[0].trim()
                    itemContent = parts.slice(1).join(":").trim()
                  }

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md hover:border-neutral-200 transition-all duration-300 flex items-start gap-5 relative group"
                    >
                      {/* Order Badge */}
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs shadow-inner shrink-0",
                        selectedTab === "Visi" ? "bg-blue-50 text-blue-500" : selectedTab === "Misi" ? "bg-primary/10 text-primary" : "bg-amber-50 text-amber-500"
                      )}>
                        {String(item.urutan).padStart(2, "0")}
                      </div>

                      {/* Content Description */}
                      <div className="flex-1 min-w-0 pr-12">
                        {itemTitle && (
                          <h4 className="font-black text-sm uppercase tracking-widest text-neutral-800 mb-1">
                            {itemTitle}
                          </h4>
                        )}
                        <p className="text-neutral-600 text-sm leading-relaxed font-medium">
                          {itemContent}
                        </p>
                      </div>

                      {/* Float Action Buttons */}
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleEdit(item)}
                          className="h-9 w-9 text-neutral-500 hover:text-primary hover:bg-primary/10 rounded-xl"
                        >
                          <Edit2 size={14} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDeleteClick(item)}
                          className="h-9 w-9 text-neutral-500 hover:text-rose-500 hover:bg-rose-50 rounded-xl"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* FormDialog for Create & Edit */}
      <FormDialog
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        title={currentItem ? `Edit ${selectedTab}` : `Tambah ${selectedTab}`}
        description="Harap isi rincian di bawah ini dengan lengkap. Gunakan tanda titik dua (:) untuk memisahkan judul tebal dengan deskripsinya (Cth: Pendidikan Tinggi: Menyelenggarakan...)."
        onSubmit={handleSubmit}
        submitLabel={currentItem ? "Simpan Perubahan" : "Tambah Item"}
        isSubmitting={isSubmitting}
        trigger={<button className="hidden"></button>}
      >
        <div className="space-y-4 py-2">
          {/* Tipe Selector */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase text-neutral-500">Tipe Profil</Label>
            <div className="grid grid-cols-3 gap-2">
              {(["Visi", "Misi", "Tujuan"] as TabType[]).map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setTipe(t)}
                  className={cn(
                    "py-2.5 rounded-xl border text-xs font-bold uppercase tracking-widest transition-all",
                    tipe === t 
                      ? t === "Visi" 
                        ? "bg-blue-500 border-blue-500 text-white shadow-md shadow-blue-500/20" 
                        : t === "Misi" 
                          ? "bg-primary border-primary text-white shadow-md shadow-primary/20" 
                          : "bg-amber-500 border-amber-500 text-white shadow-md shadow-amber-500/20"
                      : "bg-neutral-50 border-neutral-200 text-neutral-500 hover:bg-neutral-100"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Deskripsi */}
          <div className="space-y-2">
            <Label htmlFor="deskripsi" className="text-xs font-bold uppercase text-neutral-500">Deskripsi / Konten</Label>
            <Textarea 
              id="deskripsi" 
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              placeholder="Cth: Pendidikan Berkualitas: Menyelenggarakan pendidikan vokasi..." 
              rows={4}
              className="rounded-xl bg-neutral-50 border-neutral-200 focus:border-primary focus:ring-1 focus:ring-primary font-medium"
            />
          </div>

          {/* Urutan */}
          <div className="space-y-2">
            <Label htmlFor="urutan" className="text-xs font-bold uppercase text-neutral-500">Urutan Tampilan</Label>
            <div className="flex gap-2 items-center">
              <Input 
                id="urutan" 
                type="number" 
                value={urutan}
                onChange={(e) => setUrutan(parseInt(e.target.value) || 0)}
                className="rounded-xl bg-neutral-50 border-neutral-200 focus:border-primary focus:ring-1 focus:ring-primary w-24 text-center font-bold" 
              />
              <span className="text-xs text-neutral-400 font-medium">Urutan tampilan pada halaman utama (kecil ke besar)</span>
            </div>
          </div>
        </div>
      </FormDialog>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title={`Hapus ${selectedTab}?`}
        description={`Apakah Anda yakin ingin menghapus data ${selectedTab} ini secara permanen dari sistem? Tindakan ini tidak dapat dibatalkan.`}
        onConfirm={handleConfirmDelete}
        isDeleting={isSubmitting}
        trigger={<button className="hidden"></button>}
      />
    </div>
  )
}

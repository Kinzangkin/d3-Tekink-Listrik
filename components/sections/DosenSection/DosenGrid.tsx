"use client"

import React, { useState, useMemo, useEffect } from "react"
import { DosenCard } from "./DosenCard"
import { Input } from "@/components/ui/input"
import { HiSearch } from "react-icons/hi"
import { apiGet } from "@/services/api"
import { Loader2 } from "lucide-react"

export interface Dosen {
  id: string
  nama: string
  nidn: string
  jabatanFungsional?: string
  jabatan_fungsional?: string
  keahlian: string[]
  foto_url?: string
  fotoUrl?: string
  email: string
  status: "Aktif" | "Tugas Belajar" | string
}



export function DosenGrid() {
  const [searchQuery, setSearchQuery] = useState("")
  const [dosenList, setDosenList] = useState<Dosen[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDosen = async () => {
      try {
        const res = await apiGet("/dosen")
        if (res && res.data && res.data.success) {
          setDosenList(res.data.data)
        }
      } catch (error) {
        console.error("Failed to fetch dosen:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchDosen()
  }, [])

  const filteredDosen = useMemo(() => {
    return dosenList.filter((dosen) => {
      const searchLower = searchQuery.toLowerCase()
      const matchName = dosen.nama?.toLowerCase().includes(searchLower) || false
      const matchExpertise = dosen.keahlian?.some(k => {
        const text = typeof k === 'string' ? k : (k as any)?.nama_keahlian || ""
        return text.toLowerCase().includes(searchLower)
      }) || false
      const matchNip = dosen.nidn?.toLowerCase().includes(searchLower) || false
      return matchName || matchExpertise || matchNip
    })
  }, [searchQuery, dosenList])

  if (isLoading) {
    return (
      <div className="py-32 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-neutral-500 font-bold animate-pulse">Memuat Data Dosen...</p>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      {/* Search Input */}
      <div className="max-w-2xl mx-auto">
        <div className="relative group">
          <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary transition-colors" size={20} />
          <Input
            type="text"
            placeholder="Cari nama dosen, keahlian, atau NIP..."
            className="pl-12 h-14 bg-white border-neutral-200 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary rounded-2xl text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <p className="text-center text-neutral-400 text-sm mt-4 font-medium italic">
          Menampilkan {filteredDosen.length} dari {dosenList.length} Dosen
        </p>
      </div>

      {/* Grid */}
      {filteredDosen.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDosen.map((dosen, index) => (
            <DosenCard 
              key={dosen.id} 
              id={dosen.id}
              index={index} 
              nama={dosen.nama}
              nip={dosen.nidn}
              jabatan={dosen.jabatanFungsional || dosen.jabatan_fungsional || "Dosen"}
              keahlian={(dosen.keahlian || []).map(k => typeof k === 'string' ? k : (k as any)?.nama_keahlian || "")}

              foto={dosen.foto_url || dosen.fotoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(dosen.nama)}&background=random`}
              email={dosen.email}
              status={dosen.status as any}
            />

          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-neutral-50 rounded-3xl border-2 border-dashed border-neutral-200">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-neutral-100 rounded-full mb-4">
            <HiSearch size={24} className="text-neutral-400" />
          </div>
          <h3 className="text-xl font-bold text-neutral-800 uppercase mb-2">Dosen Tidak Ditemukan</h3>
          <p className="text-neutral-500">Coba gunakan kata kunci pencarian yang berbeda.</p>
        </div>
      )}
    </div>
  )
}

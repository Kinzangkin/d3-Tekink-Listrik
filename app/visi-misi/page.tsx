"use client"

import React, { useEffect, useState } from "react"
import { Navbar } from "@/components/layout/Navbar/Navbar"
import { Footer } from "@/components/layout/Footer/Footer"
import { PageHero } from "@/components/sections/VisiMisi/PageHero"
import { KartuVisiMisi } from "@/components/sections/VisiMisi/KartuVisiMisi"
import { SectionHeader } from "@/components/ui/section-header"
import { apiGet } from "@/services/api"
import { Loader2 } from "lucide-react"

interface ProfilProdiItem {
  id: number
  tipe: "Visi" | "Misi" | "Tujuan"
  deskripsi: string
  urutan: number
}

export default function VisiMisiPage() {
  const [data, setData] = useState<ProfilProdiItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await apiGet("/profil-prodi")
        if (res && res.data && res.data.success) {
          setData(res.data.data || [])
        } else {
          setError(res?.data?.message || "Gagal mengambil data profil prodi.")
        }
      } catch (err) {
        console.error("Error fetching profil prodi:", err)
        setError("Gagal terhubung ke server.")
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  // Process Visi
  const visiRaw = data
    .filter((item) => item.tipe === "Visi")
    .sort((a, b) => a.urutan - b.urutan)

  const parsedVisiData = visiRaw.length > 0
    ? visiRaw.map((item, index) => {
        const hasColon = item.deskripsi.includes(":")
        if (hasColon) {
          const parts = item.deskripsi.split(":")
          return {
            id: `visi-${item.id}`,
            title: parts[0].trim(),
            items: [parts.slice(1).join(":").trim()],
          }
        }
        return {
          id: `visi-${item.id}`,
          title: `Visi Utama ${index + 1}`,
          items: [item.deskripsi.trim()],
        }
      })
    : [
        {
          id: "default-visi-1",
          title: "Visi Utama 1",
          items: [
            "Menjadi program studi unggulan di bidang teknik listrik yang menghasilkan lulusan berdaya saing tinggi di tingkat nasional dan internasional.",
          ],
        },
        {
          id: "default-visi-2",
          title: "Visi Utama 2",
          items: [
            "Mengembangkan ilmu pengetahuan dan teknologi kelistrikan yang inovatif, adaptif, dan berwawasan lingkungan.",
          ],
        },
      ]

  // Process Misi
  const misiRaw = data
    .filter((item) => item.tipe === "Misi")
    .sort((a, b) => a.urutan - b.urutan)

  const parsedMisiData = misiRaw.length > 0
    ? misiRaw.map((item, index) => {
        const hasColon = item.deskripsi.includes(":")
        if (hasColon) {
          const parts = item.deskripsi.split(":")
          return {
            id: `misi-${item.id}`,
            title: parts[0].trim(),
            items: [parts.slice(1).join(":").trim()],
          }
        }
        return {
          id: `misi-${item.id}`,
          title: `Langkah Strategis ${index + 1}`,
          items: [item.deskripsi.trim()],
        }
      })
    : [
        {
          id: "default-misi-1",
          title: "Pendidikan Berkualitas",
          items: [
            "Menyelenggarakan pendidikan tinggi yang bermutu dalam bidang teknik listrik dengan kurikulum berbasis kompetensi dan kebutuhan industri.",
          ],
        },
        {
          id: "default-misi-2",
          title: "Penelitian & Pengembangan",
          items: [
            "Melaksanakan penelitian terapan di bidang teknik listrik yang berkontribusi pada pengembangan ilmu pengetahuan dan teknologi.",
          ],
        },
        {
          id: "default-misi-3",
          title: "Pengabdian Masyarakat",
          items: [
            "Melaksanakan pengabdian kepada masyarakat melalui penerapan ilmu teknik listrik untuk meningkatkan kesejahteraan masyarakat.",
          ],
        },
      ]

  // Process Tujuan
  const tujuanRaw = data
    .filter((item) => item.tipe === "Tujuan")
    .sort((a, b) => a.urutan - b.urutan)

  const parsedTujuanData = tujuanRaw.length > 0
    ? tujuanRaw.map((item, index) => {
        const hasColon = item.deskripsi.includes(":")
        if (hasColon) {
          const parts = item.deskripsi.split(":")
          return {
            id: `tujuan-${item.id}`,
            title: parts[0].trim(),
            items: [parts.slice(1).join(":").trim()],
          }
        }
        return {
          id: `tujuan-${item.id}`,
          title: `Sasaran Utama ${index + 1}`,
          items: [item.deskripsi.trim()],
        }
      })
    : []

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <PageHero
        title="VISI & MISI"
        subtitle="D3 Teknik Listrik"
        description="Landasan nilai dan tujuan yang menjadi pedoman dalam menjalankan program studi untuk mencetak lulusan terbaik di bidang teknik listrik."
      />

      {isLoading ? (
        <div className="py-32 flex flex-col items-center justify-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
          <p className="text-neutral-500 font-bold uppercase tracking-widest text-xs">Memuat Data Profil...</p>
        </div>
      ) : error ? (
        <div className="py-32 text-center">
          <p className="text-red-500 font-bold mb-2">Error: {error}</p>
          <p className="text-neutral-500 text-sm">Menampilkan data default prodi.</p>
        </div>
      ) : null}

      {!isLoading && (
        <>
          {/* Visi Section */}
          <section className="py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6">
              <SectionHeader
                subtitle="PANDANGAN KE DEPAN"
                title="VISI KAMI"
                align="left"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                {parsedVisiData.map((item, index) => (
                  <KartuVisiMisi
                    key={item.id}
                    title={item.title}
                    items={item.items}
                    index={index}
                    variant="visi"
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Misi Section */}
          <section className="py-24 bg-neutral-50">
            <div className="container mx-auto px-4 md:px-6">
              <SectionHeader
                subtitle="LANGKAH STRATEGIS"
                title="MISI KAMI"
                align="left"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                {parsedMisiData.map((item, index) => (
                  <KartuVisiMisi
                    key={item.id}
                    title={item.title}
                    items={item.items}
                    index={index}
                    variant="misi"
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Tujuan Section */}
          {parsedTujuanData.length > 0 && (
            <section className="py-24 bg-white">
              <div className="container mx-auto px-4 md:px-6">
                <SectionHeader
                  subtitle="TARGET & SASARAN"
                  title="TUJUAN KAMI"
                  align="left"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  {parsedTujuanData.map((item, index) => (
                    <KartuVisiMisi
                      key={item.id}
                      title={item.title}
                      items={item.items}
                      index={index}
                      variant="visi"
                    />
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      <Footer />
    </main>
  )
}

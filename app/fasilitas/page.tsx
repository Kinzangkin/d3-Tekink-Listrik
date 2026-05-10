"use client"

import { Navbar } from "@/components/layout/Navbar/Navbar"
import { Footer } from "@/components/layout/Footer/Footer"
import { PageHero } from "@/components/sections/VisiMisi/PageHero"
import { SectionHeader } from "@/components/ui/section-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FasilitasCard } from "@/components/sections/FasilitasSection/FasilitasCard"
import { useEffect, useState } from "react"
import { apiGet } from "@/services/api"
import { Loader2 } from "lucide-react"





export default function FasilitasPage() {
  const [dynamicFasilitas, setDynamicFasilitas] = useState<any[]>([])
  const [dynamicTriDharma, setDynamicTriDharma] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true)
      try {
        const [resTriDharma, resFasilitas] = await Promise.all([
          apiGet('/tri-dharma'),
          apiGet('/fasilitas')
        ])
        
        if (resTriDharma?.data?.success) {
          const mappedTD = resTriDharma.data.data.map((item: any) => ({
            id: item.id,
            title: item.judul,
            description: item.deskripsi || "Penelitian dan Pengabdian Dosen D3 Teknik Listrik.",
            image: item.file_url || "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
            category: item.jenis
          }))
          setDynamicTriDharma(mappedTD)
        }

        if (resFasilitas?.data?.success) {
          const mappedFasilitas = resFasilitas.data.data.map((item: any) => ({
            id: item.id,
            title: item.nama_fasilitas || item.nama,
            description: item.deskripsi || "Fasilitas penunjang pendidikan berkualitas.",
            image: item.foto_url || item.image_url || "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=800&q=80",
            category: item.kategori || "Fasilitas"
          }))
          setDynamicFasilitas(mappedFasilitas)
        }
      } catch (e) {
        console.error("Gagal mengambil data fasilitas", e)
      } finally {
        setIsLoading(false)
      }
    }
    fetchAllData()
  }, [])

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <PageHero
        title="FASILITAS & TRI DHARMA"
        subtitle="Lingkungan & Kontribusi"
        description="Fasilitas penunjang pendidikan berkualitas dan rekam jejak kontribusi nyata melalui penelitian serta pengabdian masyarakat."
      />

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <Tabs defaultValue="fasilitas" className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
              <SectionHeader
                subtitle="UNIT PENUNJANG"
                title="GALERI KEGIATAN"
                align="left"
                className="mb-0"
              />
              <TabsList className="bg-neutral-100 p-1 h-auto rounded-xl">
                <TabsTrigger 
                  value="fasilitas" 
                  className="px-8 py-3 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg font-black tracking-widest text-xs uppercase transition-all"
                >
                  Fasilitas Fisik
                </TabsTrigger>
                <TabsTrigger 
                  value="tridharma" 
                  className="px-8 py-3 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg font-black tracking-widest text-xs uppercase transition-all"
                >
                  Tri Dharma
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="fasilitas" className="mt-0">
              {isLoading ? (
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="w-12 h-12 text-primary animate-spin" />
                </div>
              ) : dynamicFasilitas.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {dynamicFasilitas.map((item, index) => (
                    <FasilitasCard key={item.id} item={item} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-neutral-50 rounded-3xl border-2 border-dashed border-neutral-200">
                  <h3 className="text-xl font-bold text-neutral-800 uppercase mb-2">Belum Ada Data</h3>
                  <p className="text-neutral-500">Data Fasilitas Fisik belum tersedia di database.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="tridharma" className="mt-0">
              {isLoading ? (
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="w-12 h-12 text-primary animate-spin" />
                </div>
              ) : dynamicTriDharma.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {dynamicTriDharma.map((item, index) => (
                    <FasilitasCard key={item.id} item={item} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-neutral-50 rounded-3xl border-2 border-dashed border-neutral-200">
                  <h3 className="text-xl font-bold text-neutral-800 uppercase mb-2">Belum Ada Data</h3>
                  <p className="text-neutral-500">Karya Tri Dharma belum tersedia di database.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </main>
  )
}

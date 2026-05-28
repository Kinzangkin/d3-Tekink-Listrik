import { SectionHeader } from "@/components/ui/section-header"
import { GrafikMahasiswa } from "./GrafikMahasiswa"
import { JadwalPanel } from "./JadwalPanel"
import { KalenderWidget } from "./KalenderWidget"

export function AkademikSection() {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader 
          subtitle="INFORMASI AKADEMIK"
          title="STATISTIK & KEGIATAN PERKULIAHAN"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
          <div className="lg:col-span-2 flex flex-col min-h-[400px]">
            <GrafikMahasiswa />
          </div>
          <div className="flex flex-col gap-6">
            <JadwalPanel />
            <KalenderWidget />
          </div>
        </div>
      </div>
    </section>
  )
}

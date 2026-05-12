import { Navbar } from "@/components/layout/Navbar/Navbar"
import { Footer } from "@/components/layout/Footer/Footer"
import { PageHero } from "@/components/sections/VisiMisi/PageHero"
import { DosenGrid } from "@/components/sections/DosenSection/DosenGrid"
import { SectionHeader } from "@/components/ui/section-header"

export default function DosenPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <PageHero
        title="PROFILE DOSEN"
        subtitle="D3 Teknik Listrik"
        description="Kenali para dosen pengajar berpengalaman yang siap membimbing Anda menuju masa depan cerah di bidang teknik listrik."
        bgImage="/img/hero-bg.png"
      />


      {/* Dosen Grid Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader
            subtitle="TIM PENGAJAR"
            title="DOSEN TETAP PROGRAM STUDI"
          />
          <DosenGrid />
        </div>
      </section>

      <Footer />
    </main>
  )
}

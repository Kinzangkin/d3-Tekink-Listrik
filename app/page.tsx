import { Navbar } from "@/components/layout/Navbar/Navbar"
import { Footer } from "@/components/layout/Footer/Footer"
import { HeroSection } from "@/components/sections/HeroSection/HeroSection"
import { StatistikSection } from "@/components/sections/StatistikSection/StatistikSection"
import { FeatureSection } from "@/components/sections/FeatureSection/FeatureSection"
import { AkademikSection } from "@/components/sections/AkademikSection/AkademikSection"
import { BeritaSection } from "@/components/sections/BeritaSection/BeritaSection"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <HeroSection />
      <StatistikSection />
      <FeatureSection />
      
      {/* Visual Break / Banner */}
      <section className="relative h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-primary/80 z-10 mix-blend-multiply" />
          <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}
          />
        </div>
        <div className="relative z-20 text-center text-white px-4">
          <h2 className="text-sm md:text-base font-bold tracking-[0.2em] mb-4">MENGAPA MEMILIH KAMI</h2>
          <p className="text-3xl md:text-5xl font-black uppercase tracking-tight max-w-3xl leading-tight">
            TEKNIK LISTRIK UNIXE UNIVERSITY DALAM PERGERAKAN
          </p>
          <Button variant="outline" className="mt-8 bg-transparent text-white border-white hover:bg-white hover:text-primary rounded-none font-bold tracking-widest px-8 py-6">
            PUTAR VIDEO
          </Button>
        </div>
      </section>

      <BeritaSection />
      <AkademikSection />

      {/* Final CTA Section */}
      <section className="pt-32 pb-24 text-center bg-linear-to-b from-white to-neutral-50 px-4">
        <h3 className="text-primary font-bold tracking-[0.2em] text-sm md:text-base mb-4 uppercase">
          PROSES PENDAFTARAN
        </h3>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-neutral-800 uppercase tracking-tight mb-8 max-w-4xl mx-auto leading-tight">
          AMBIL LANGKAH PERTAMA MENUJU MASA DEPAN CERAHMU
        </h2>
        <p className="text-neutral-500 max-w-2xl mx-auto mb-10 text-lg">
          Jangan lewatkan kesempatan untuk bergabung bersama ribuan mahasiswa terbaik. Pendaftaran mahasiswa baru segera dibuka.
        </p>
        <Button size="lg" className="h-14 px-10 text-lg font-bold tracking-widest hover:scale-105 transition-transform">
          DAFTAR SEKARANG
        </Button>
      </section>

      <Footer />
    </main>
  )
}

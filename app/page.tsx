import { Navbar } from "@/components/layout/Navbar/Navbar"
import { Footer } from "@/components/layout/Footer/Footer"
import { HeroSection } from "@/components/sections/HeroSection/HeroSection"
import { StatistikSection } from "@/components/sections/StatistikSection/StatistikSection"
import { FeatureSection } from "@/components/sections/FeatureSection/FeatureSection"
import { AkademikSection } from "@/components/sections/AkademikSection/AkademikSection"
import { BeritaSection } from "@/components/sections/BeritaSection/BeritaSection"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <HeroSection />
      
      <ScrollReveal variant="fade-up" duration={0.8} threshold={0.1}>
        <StatistikSection />
      </ScrollReveal>
      
      <ScrollReveal variant="scale" duration={0.8} threshold={0.1}>
        <FeatureSection />
      </ScrollReveal>
      
      {/* Visual Break / Banner */}
      <ScrollReveal variant="fade" duration={1.0} threshold={0.15}>
        <section className="relative h-[400px] flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-primary/80 z-10 mix-blend-multiply" />
            <div 
              className="absolute inset-0 bg-cover bg-center bg-fixed"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}
            />
          </div>
          <div className="relative z-20 text-center text-white px-4">
            <h2 className="text-sm md:text-base font-bold tracking-[0.2em] mb-4 uppercase">MENGAPA MEMILIH KAMI</h2>
            <p className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight max-w-4xl leading-tight">
              Membangun Generasi Teknik yang Siap Industri dan Teknologi Masa Depan
            </p>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal variant="fade-up" duration={0.8} threshold={0.1}>
        <AkademikSection />
      </ScrollReveal>
      
      <ScrollReveal variant="fade-up" duration={0.8} threshold={0.1}>
        <BeritaSection />
      </ScrollReveal>

      <Footer />
    </main>
  )
}

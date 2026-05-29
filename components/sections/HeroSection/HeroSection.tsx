"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { SectionDivider } from "@/components/ui/section-divider"
import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0f172a]/70 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/img/GKT.jpg')" }}
        />
      </div>

      <div className="container relative z-20 mx-auto px-4 text-center flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-blue-300 font-bold tracking-[0.2em] uppercase text-sm md:text-base mb-6"
        >
          D3 Teknik Listrik
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] max-w-4xl tracking-tight mb-8"
        >
          GERBANG MENUJU PERJALANAN KEUNGGULAN YANG <span className="text-primary">TAK TERBATAS</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-gray-200 text-lg md:text-xl max-w-2xl mb-12"
        >
          Mencetak tenaga ahli madya yang kompeten, inovatif, dan siap bersaing di industri kelistrikan masa depan.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link href="/visi-misi" passHref>
            <Button 
              size="lg" 
              className="h-14 px-8 text-lg font-bold bg-primary hover:bg-primary/90 text-white cursor-pointer"
            >
              VISI & MISI
            </Button>
          </Link>
        </motion.div>
      </div>

      <SectionDivider position="bottom" variant="white" />
    </section>
  )
}

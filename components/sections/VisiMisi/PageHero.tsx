"use client"

import { motion } from "framer-motion"

interface PageHeroProps {
  title: string
  subtitle: string
  description?: string
}

export function PageHero({ title, subtitle, description }: PageHeroProps) {
  return (
    <section className="relative w-full pt-32 pb-20 bg-[#0f172a] overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "40px 40px"
        }} />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-blue-300 font-bold tracking-[0.2em] uppercase text-sm mb-4"
        >
          {subtitle}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight max-w-3xl leading-tight"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-gray-300 mt-6 text-lg max-w-2xl leading-relaxed"
          >
            {description}
          </motion.p>
        )}
      </div>

      {/* Diagonal cut at bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none translate-y-px">
        <svg className="relative block w-full h-[60px] md:h-[80px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0 120L1200 0V120H0Z" className="fill-background" />
        </svg>
      </div>
    </section>
  )
}

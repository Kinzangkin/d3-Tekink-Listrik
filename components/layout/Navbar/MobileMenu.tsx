"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Home, Info, Users, BookOpen, Layers, LogIn, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { navLinks } from "./DesktopMenu"

import Image from "next/image"

export function MobileMenu({ isScrolled }: { isScrolled: boolean }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()

  // Prevent scroll when menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  // Map icons to links
  const getIcon = (name: string) => {
    switch (name) {
      case "BERANDA": return <Home size={20} />
      case "VISI MISI": return <Info size={20} />
      case "PROFILE DOSEN": return <Users size={20} />
      // case "KURIKULUM": return <BookOpen size={20} />
      case "FASILITAS & TRI DHARMA": return <Layers size={20} />
      default: return <ChevronRight size={20} />
    }
  }

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "relative z-50 inline-flex items-center justify-center rounded-xl p-2 transition-all duration-300 active:scale-95",
          isScrolled ? "text-primary bg-primary/5 shadow-sm" : "text-white bg-white/10 backdrop-blur-sm"
        )}
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">Buka Menu</span>
      </button>

      {/* Full Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-999 w-screen h-screen bg-[#0f172a] flex flex-col overflow-hidden"
          >
            {/* Background Decorative Elements */}
            <div className="absolute top-0 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "32px 32px"
            }} />

            {/* Header Area */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-white/5 relative z-10">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10">
                  <Image
                    src="/img/Logo_Politeknik_Negeri_Manado.png"
                    alt="Logo Polimdo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-lg text-white tracking-widest uppercase leading-none">D3 TEKNIK</span>
                  <span className="font-black text-lg text-blue-400 tracking-widest uppercase leading-none">LISTRIK</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                aria-label="Tutup Menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Links Container */}
            <nav className="flex-1 px-6 py-12 flex flex-col justify-center gap-4 relative z-10">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "group flex items-center justify-between p-4 rounded-2xl transition-all duration-300 relative overflow-hidden",
                        isActive ? "bg-primary text-white" : "text-white/60 hover:text-white hover:bg-white/5"
                      )}
                    >
                      <div className="flex items-center gap-5">
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                          isActive ? "bg-white/20" : "bg-white/5 group-hover:bg-primary/20 group-hover:text-primary"
                        )}>
                          {getIcon(link.name)}
                        </div>
                        <span className="text-xl font-black uppercase tracking-widest">{link.name}</span>
                      </div>
                      <ChevronRight className={cn(
                        "transition-transform duration-300 mb-1",
                        isActive ? "opacity-100" : "opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0"
                      )} />
                    </Link>
                  </motion.div>
                )
              })}
            </nav>

            {/* Footer / CTA Area */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="p-8 border-t border-white/5 relative z-10"
            >
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-3 w-full h-16 bg-white text-primary font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all text-sm"
              >
                <LogIn size={20} />
                MASUK KE PORTAL
              </Link>
              <p className="text-center mt-6 text-white/20 text-[10px] font-bold tracking-[0.3em] uppercase">
                &copy; 2026 D3 Teknik Listrik
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

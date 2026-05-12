"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { DesktopMenu } from "./DesktopMenu"
import { MobileMenu } from "./MobileMenu"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"

import Image from "next/image"

export function Navbar() {
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = React.useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  return (
    <motion.header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500",
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-md py-0" 
          : " to-transparent py-2"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 z-50">
          <div className="relative w-12 h-12">
            <Image
              src="/img/Logo_Politeknik_Negeri_Manado.png"
              alt="Logo Polimdo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className={cn(
            "font-black text-xl tracking-tight leading-tight transition-colors flex flex-col",
            isScrolled ? "text-primary" : "text-white"
          )}>
            <span>D3 TEKNIK</span>
            <span className={cn(isScrolled ? "text-blue-600" : "text-blue-400")}>LISTRIK</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <DesktopMenu isScrolled={isScrolled} />
          
          {(() => {
            // Client-side session check
            const [isLoggedIn, setIsLoggedIn] = React.useState(false)
            const [role, setRole] = React.useState<string | null>(null)
            
            React.useEffect(() => {
              const token = localStorage.getItem('token')
              const savedRole = localStorage.getItem('role')
              if (token) {
                setIsLoggedIn(true)
                setRole(savedRole)
              }
            }, [])

            if (isLoggedIn) {
              return (
                <Link
                  href={role === 'admin' ? "/dashboard/admin" : "/dashboard/dosen"}
                  className={cn(
                    "px-5 py-2 font-bold rounded-md transition-colors",
                    isScrolled 
                      ? "bg-primary text-white hover:bg-primary/90" 
                      : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
                  )}
                >
                  DASHBOARD
                </Link>
              )
            }

            return (
              <Link
                href="/login"
                className={cn(
                  "px-5 py-2 font-bold rounded-md transition-colors",
                  isScrolled 
                    ? "bg-primary text-white hover:bg-primary/90" 
                    : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
                )}
              >
                MASUK
              </Link>
            )
          })()}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <MobileMenu isScrolled={isScrolled} />
        </div>
      </div>
    </motion.header>
  )
}

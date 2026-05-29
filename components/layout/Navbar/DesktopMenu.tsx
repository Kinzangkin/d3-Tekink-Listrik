"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export const navLinks = [
  { name: "BERANDA", href: "/" },
  { name: "VISI MISI", href: "/visi-misi" },
  { name: "PROFILE DOSEN", href: "/dosen" },
  // { name: "KURIKULUM", href: "/kurikulum" },
  { name: "FASILITAS & TRI DHARMA", href: "/fasilitas" },
]

export function DesktopMenu({ isScrolled }: { isScrolled: boolean }) {
  const pathname = usePathname()

  return (
    <nav className="flex items-center gap-8">
      {navLinks.map((link) => {
        const isActive = pathname === link.href
        return (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              "text-[10px] font-black tracking-[0.2em] transition-all duration-300 relative py-2 group",
              isScrolled 
                ? (isActive ? "text-primary" : "text-neutral-500 hover:text-primary") 
                : (isActive ? "text-white" : "text-white/60 hover:text-white")
            )}
          >
            {link.name}
            <span className={cn(
              "absolute bottom-0 left-0 h-[2px] transition-all duration-300 rounded-full",
              isActive ? "w-full" : "w-0 group-hover:w-full",
              isScrolled ? "bg-primary" : "bg-white"
            )} />
          </Link>
        )
      })}
    </nav>
  )
}

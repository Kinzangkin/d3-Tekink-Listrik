"use client"

import { Bell, Search } from "lucide-react"
import { apiGet } from "@/services/api"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export function DashboardHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const pathRole = pathname.startsWith("/dashboard/dosen") ? "dosen" : "admin"

  const [userState, setUserState] = useState({
    role: pathRole,
    email: pathRole === "admin" ? "admin@polimdo.ac.id" : "dosen@polimdo.ac.id",
    name: pathRole === "admin" ? "Administrator" : "Dosen"
  })

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiGet('/auth/me')
        if (res && res.data && res.data.success) {
          const userData = res.data.data
          setUserState({
            role: userData.role?.toLowerCase() || pathRole,
            email: userData.email || "",
            name: userData.nama || userData.name || (pathRole === "admin" ? "Administrator" : "Dosen")
          })
          
          // Sync localStorage
          localStorage.setItem('role', userData.role?.toLowerCase() || pathRole)
          localStorage.setItem('email', userData.email || "")
        }
      } catch (err) {
        console.error("Failed to fetch user data", err)
        // Fallback to localStorage if API fails
        const role = localStorage.getItem("role") || pathRole
        const email = localStorage.getItem("email") || ""
        setUserState(prev => ({
          ...prev,
          role,
          email
        }))
      }
    }

    fetchUser()
  }, [pathRole])


  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    localStorage.removeItem("email")
    router.replace("/login")
  }

  const handleProfile = () => {
    if (userState.role === "dosen") {
      router.push("/dashboard/dosen/profil")
    } else {
      // Untuk admin tidak ada page profil khusus saat ini
      alert("Halaman pengaturan admin belum tersedia.")
    }
  }

  return (
    <header className="h-16 border-b border-neutral-100 bg-white/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8">
      <div className="flex items-center gap-4 flex-1">
        <SidebarTrigger className="text-neutral-500 hover:text-primary hover:bg-primary/10" />
        
        {/* Search - Decorative */}
        <div className="relative max-w-md w-full hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
          <Input 
            placeholder="Cari menu atau data..." 
            className="pl-9 h-9 bg-neutral-50/50 border-neutral-200 rounded-full focus:border-primary focus:ring-1 focus:ring-primary text-sm shadow-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="text-neutral-500 hover:text-primary rounded-full relative">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </Button>

        <div className="h-6 w-px bg-neutral-200 mx-1 hidden sm:block" />

        <DropdownMenu>
          <DropdownMenuTrigger className="relative h-9 rounded-full pl-2 pr-4 gap-2 hidden sm:flex bg-neutral-50 hover:bg-neutral-100 border border-neutral-100 items-center">
            <Avatar className="h-6 w-6">
              <AvatarImage 
                src={userState.role === "admin" ? "/Logo_Politeknik_Negeri_Manado.svg" : "https://i.pravatar.cc/150?u=dosen"} 
                alt="@user" 
                className="object-contain"
              />
              <AvatarFallback className="bg-primary text-white text-[10px]">{userState.role === "admin" ? "AD" : "DS"}</AvatarFallback>
            </Avatar>

            <span className="text-xs font-bold text-neutral-700">{userState.role === "admin" ? "Admin" : "Dosen"}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 rounded-2xl" align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-normal p-3">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-bold text-neutral-800">{userState.name}</p>
                  <p className="text-xs text-neutral-500 font-medium">{userState.email}</p>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-neutral-100" />
            <DropdownMenuItem onClick={handleProfile} className="p-3 text-xs font-bold uppercase tracking-wider text-neutral-600 focus:bg-neutral-50 focus:text-primary cursor-pointer">
              Pengaturan Akun
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout} className="p-3 text-xs font-bold uppercase tracking-wider text-rose-500 focus:bg-rose-50 focus:text-rose-600 cursor-pointer">
              Keluar Sistem
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Mobile Avatar only */}
        <Avatar className="h-8 w-8 sm:hidden">
          <AvatarImage 
            src={userState.role === "admin" ? "/Logo_Politeknik_Negeri_Manado.svg" : "https://i.pravatar.cc/150?u=dosen"} 
            alt="@user" 
            className="object-contain"
          />
          <AvatarFallback className="bg-primary text-white text-[10px]">{userState.role === "admin" ? "AD" : "DS"}</AvatarFallback>
        </Avatar>

      </div>
    </header>
  )
}

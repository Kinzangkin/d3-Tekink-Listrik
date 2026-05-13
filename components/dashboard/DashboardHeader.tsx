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
    name: pathRole === "admin" ? "Administrator" : "Dosen",
    fotoUrl: pathRole === "admin" ? "/img/Logo_Politeknik_Negeri_Manado.png" : ""
  })

  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)
  
  const adminMenu = [
    { title: "Overview", url: "/dashboard/admin" },
    { title: "Data Dosen", url: "/dashboard/admin/dosen" },
    { title: "Statistik Mahasiswa", url: "/dashboard/admin/statistik" },
    { title: "Jadwal Kuliah", url: "/dashboard/admin/jadwal" },
    { title: "Fasilitas", url: "/dashboard/admin/fasilitas" },
    { title: "Tri Dharma", url: "/dashboard/admin/tri-dharma" },
    { title: "Master Keahlian", url: "/dashboard/admin/keahlian" },
  ]

  const dosenMenu = [
    { title: "Overview", url: "/dashboard/dosen" },
    { title: "Profil Saya", url: "/dashboard/dosen/profil" },
    { title: "Keahlian", url: "/dashboard/dosen/keahlian" },
    { title: "Tri Dharma", url: "/dashboard/dosen/tri-dharma" },
    { title: "Publikasi", url: "/dashboard/dosen/publikasi" },
    { title: "Penelitian", url: "/dashboard/dosen/penelitian" },
    { title: "Pengabdian", url: "/dashboard/dosen/pengabdian" },
    { title: "Buku Ajar", url: "/dashboard/dosen/buku-ajar" },
    { title: "HKI", url: "/dashboard/dosen/hki" },
    { title: "Sertifikat", url: "/dashboard/dosen/sertifikat" },
  ]

  const menuItems = userState.role === "admin" ? adminMenu : dosenMenu
  const filteredResults = searchQuery 
    ? menuItems.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : []


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiGet('/dosen/me')
        if (res && res.data && res.data.success) {
          const userData = res.data.data
          setUserState({
            role: userData.role?.toLowerCase() || pathRole,
            email: userData.email || "",
            name: userData.nama || userData.name || (pathRole === "admin" ? "Administrator" : "Dosen"),
            fotoUrl: pathRole === "admin" ? "/img/Logo_Politeknik_Negeri_Manado.png" : (userData.foto_url || userData.fotoUrl || "")
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
        
        {/* Search - Functional */}
        <div className="relative max-w-md w-full hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
          <Input 
            placeholder="Cari menu atau data..." 
            className="pl-9 h-9 bg-neutral-50/50 border-neutral-200 rounded-full focus:border-primary focus:ring-1 focus:ring-primary text-sm shadow-none"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setShowSearchResults(true)
            }}
            onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
            onFocus={() => setShowSearchResults(true)}
          />
          {showSearchResults && searchQuery && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-neutral-100 overflow-hidden z-50">
              <div className="p-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 px-3 py-2">Hasil Pencarian Menu</p>
                {filteredResults.length > 0 ? filteredResults.map((result) => (
                  <button
                    key={result.url}
                    onClick={() => {
                      router.push(result.url)
                      setSearchQuery("")
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm font-bold text-neutral-700 hover:bg-primary/5 hover:text-primary rounded-xl transition-colors flex items-center justify-between group"
                  >
                    {result.title}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Search size={14} className="text-primary/50" />
                    </div>
                  </button>
                )) : (
                  <p className="px-4 py-3 text-sm text-neutral-500 italic">Menu tidak ditemukan...</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>


      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger className="h-9 w-9 flex items-center justify-center text-neutral-500 hover:text-primary hover:bg-neutral-100 rounded-full relative transition-colors">
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-80 rounded-3xl p-0 overflow-hidden">
            <div className="p-4 border-b border-neutral-100 bg-neutral-50/50">
              <h4 className="font-black text-sm uppercase tracking-tight text-neutral-800">Notifikasi Terkini</h4>
            </div>
            <div className="max-h-80 overflow-y-auto">
              <div className="p-4 text-center py-8">
                <div className="w-12 h-12 bg-neutral-50 rounded-2xl flex items-center justify-center mx-auto mb-3 text-neutral-300">
                  <Bell size={24} />
                </div>
                <p className="text-sm font-bold text-neutral-800 uppercase tracking-tight">Belum ada notifikasi baru</p>
                <p className="text-xs text-neutral-500 mt-1">Kami akan mengabari Anda jika ada pembaruan sistem atau data.</p>
              </div>
            </div>
            <div className="p-2 bg-neutral-50/50 border-t border-neutral-100 text-center">
              <Button variant="ghost" className="w-full text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-primary">
                Tandai Semua Sudah Dibaca
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>


        <div className="h-6 w-px bg-neutral-200 mx-1 hidden sm:block" />

        <DropdownMenu>
          <DropdownMenuTrigger className="relative h-9 rounded-full pl-2 pr-4 gap-2 hidden sm:flex bg-neutral-50 hover:bg-neutral-100 border border-neutral-100 items-center">
            <Avatar className="h-6 w-6">
              <AvatarImage 
                src={userState.fotoUrl || undefined} 
                alt="@user" 
                className="object-cover"
              />
              <AvatarFallback className="bg-primary text-white text-[10px] uppercase font-bold">
                {userState.name?.substring(0, 2) || "US"}
              </AvatarFallback>
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
            src={userState.fotoUrl || undefined} 
            alt="@user" 
            className="object-cover"
          />
          <AvatarFallback className="bg-primary text-white text-[10px] uppercase font-bold">
            {userState.name?.substring(0, 2) || "US"}
          </AvatarFallback>
        </Avatar>

      </div>
    </header>
  )
}

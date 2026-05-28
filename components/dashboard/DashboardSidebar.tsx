"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Users, 
  BarChart2, 
  Calendar, 
  Building2, 
  GraduationCap, 
  Award, 
  BookOpen, 
  FileText, 
  Briefcase,
  User,
  Settings,
  ChevronRight
} from "lucide-react"
import { apiGet } from "@/services/api"


import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

interface DashboardSidebarProps {
  role?: "admin" | "dosen"
}

export function DashboardSidebar({ role: propRole }: DashboardSidebarProps) {
  const pathname = usePathname()
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"
  
  // Determine role purely from pathname since SSR x-invoke-path is unreliable
  const role = pathname.startsWith("/dashboard/dosen") ? "dosen" : "admin"

  const adminMenu = [
    {
      title: "Overview",
      url: "/dashboard/admin",
      icon: BarChart2,
    },
    {
      title: "Data Dosen",
      url: "/dashboard/admin/dosen",
      icon: Users,
    },
    {
      title: "Statistik Mahasiswa",
      url: "/dashboard/admin/statistik",
      icon: BarChart2,
    },
    {
      title: "Visi & Misi",
      url: "/dashboard/admin/profil-prodi",
      icon: FileText,
    },
    {
      title: "Jadwal Kuliah",
      url: "/dashboard/admin/jadwal",
      icon: Calendar,
    },
    {
      title: "Fasilitas",
      url: "/dashboard/admin/fasilitas",
      icon: Building2,
    },
    {
      title: "Tri Dharma",
      url: "/dashboard/admin/tri-dharma",
      icon: GraduationCap,
    },
    {
      title: "Master Keahlian",
      url: "/dashboard/admin/keahlian",
      icon: Settings,
    },
  ]

  const dosenMenu = [
    {
      title: "Overview",
      url: "/dashboard/dosen",
      icon: BarChart2,
    },
    {
      title: "Profil Saya",
      url: "/dashboard/dosen/profil",
      icon: User,
    },
    {
      title: "Keahlian",
      url: "/dashboard/dosen/keahlian",
      icon: Settings, // Import already available from Admin Menu
    },
    {
      title: "Tri Dharma (Baru)",
      url: "/dashboard/dosen/tri-dharma",
      icon: GraduationCap, // Import already available from Admin Menu
    },
    // {
    //   title: "Publikasi",
    //   url: "/dashboard/dosen/publikasi",
    //   icon: BookOpen,
    // },
    // {
    //   title: "Penelitian",
    //   url: "/dashboard/dosen/penelitian",
    //   icon: FileText,
    // },
    // {
    //   title: "Pengabdian",
    //   url: "/dashboard/dosen/pengabdian",
    //   icon: Users,
    // },
    // {
    //   title: "Buku Ajar",
    //   url: "/dashboard/dosen/buku-ajar",
    //   icon: BookOpen,
    // },
    /* HKI & Sertifikat dinonaktifkan
    {
      title: "HKI",
      url: "/dashboard/dosen/hki",
      icon: Briefcase,
    },
    {
      title: "Sertifikat",
      url: "/dashboard/dosen/sertifikat",
      icon: Award,
    },
    */
  ]

  const [userState, setUserState] = React.useState({
    name: role === "admin" ? "Administrator" : "Dosen",
    role: role,
    foto: role === "admin" ? "/img/Logo_Politeknik_Negeri_Manado.png" : ""
  })

  React.useEffect(() => {
    if (role === "admin") {
      // Admin tidak memiliki profil dosen, gunakan default state
      return
    }

    const fetchUser = async () => {
      try {
        const res = await apiGet('/dosen/me')
        if (res && res.data && res.data.success) {
          const userData = res.data.data
          setUserState({
            name: userData.nama || userData.name || "Dosen",
            role: userData.role?.toLowerCase() || role,
            foto: userData.foto_url || userData.fotoUrl || ""
          })
        }
      } catch (err) {
        console.error("Failed to fetch user in sidebar", err)
      }
    }
    fetchUser()
  }, [role])
  const menuItems = role === "admin" ? adminMenu : dosenMenu

  return (
    <Sidebar collapsible="icon" className="border-r-0 shadow-lg" variant="sidebar">

      <SidebarHeader className="h-16 flex items-center justify-center px-4 py-4">
        {isCollapsed ? (
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-black text-xs">
            D3
          </div>
        ) : (
          <Link href="/" className="flex items-center gap-3 w-full px-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-black text-xs shrink-0">
              D3
            </div>
            <div className="flex flex-col truncate">
              <span className="font-black text-sm uppercase tracking-wider text-sidebar-foreground">Teknik Listrik</span>
              <span className="text-[10px] text-sidebar-foreground/50 font-bold uppercase tracking-widest">Portal Akademik</span>
            </div>
          </Link>
        )}
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-black uppercase tracking-widest text-sidebar-foreground/40 mb-2 px-2">
            {isCollapsed ? "..." : role === "admin" ? "Admin Menu" : "Dosen Menu"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = pathname === item.url || (item.url !== `/dashboard/${role}` && pathname.startsWith(item.url))
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      render={<Link href={item.url} />}
                      isActive={isActive}
                      tooltip={item.title}
                      className="font-bold tracking-wide"
                    >
                      <item.icon className={isActive ? "text-primary" : "text-sidebar-foreground/60"} />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <Avatar className="w-9 h-9 border border-sidebar-border shadow-sm">
            <AvatarImage 
              src={userState.foto || undefined} 
              className="object-cover"
            />
            <AvatarFallback className="bg-primary/10 text-primary font-black text-xs uppercase">
              {userState.name?.substring(0, 2) || "US"}
            </AvatarFallback>
          </Avatar>

          {!isCollapsed && (
            <div className="flex flex-col flex-1 truncate">
              <span className="text-sm font-bold text-sidebar-foreground truncate">
                {userState.name}
              </span>
              <span className="text-[10px] font-bold text-sidebar-foreground/50 uppercase tracking-widest">
                {userState.role === "admin" ? "Admin" : "Dosen"}
              </span>
            </div>
          )}

        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

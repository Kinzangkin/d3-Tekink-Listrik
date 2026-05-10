"use client"

import React, { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Loader2 } from "lucide-react"

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    // Check auth status from localStorage
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')

    if (!token) {
      console.warn("No token found, redirecting to login...")
      router.replace('/login')
      return
    }

    // Role-based route protection
    // Prevent non-admins from accessing admin routes
    if (pathname.includes('/dashboard/admin') && role !== 'admin') {
      console.warn("Unauthorized access to admin route, redirecting...")
      router.replace('/dashboard/dosen')
      return
    }

    setIsAuthorized(true)
  }, [pathname, router])

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 w-full z-50 fixed inset-0">
        <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
        <p className="text-neutral-500 font-bold animate-pulse tracking-widest uppercase text-sm">Verifikasi Akses...</p>
      </div>
    )
  }

  return <>{children}</>
}

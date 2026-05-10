import { ReactNode } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { AuthGuard } from "@/components/auth/AuthGuard"

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <AuthGuard>
      <SidebarProvider>
        <div className="flex min-h-screen bg-neutral-50 w-full overflow-hidden">
          <DashboardSidebar />
          <main className="flex-1 flex flex-col min-w-0">
            <DashboardHeader />
            <div className="flex-1 p-4 md:p-8 overflow-y-auto custom-scrollbar">
              <div className="mx-auto max-w-7xl w-full">
                {children}
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </AuthGuard>
  )
}

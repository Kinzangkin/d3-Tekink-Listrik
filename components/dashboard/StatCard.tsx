import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ReactNode } from "react"

interface StatCardProps {
  title: string
  value: string | number
  icon: ReactNode
  description?: string
  trend?: {
    value: number
    label: string
    isPositive: boolean
  }
}

export function StatCard({ title, value, icon, description, trend }: StatCardProps) {
  return (
    <Card className="rounded-2xl border-none shadow-sm overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
          {title}
        </CardTitle>
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-black text-neutral-800 tracking-tight">{value}</div>
        {description && (
          <p className="text-xs text-neutral-500 mt-1 font-medium">{description}</p>
        )}
        {trend && (
          <div className="flex items-center gap-2 mt-2">
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${trend.isPositive ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
              {trend.isPositive ? '+' : '-'}{trend.value}%
            </span>
            <span className="text-xs text-neutral-500 font-medium">{trend.label}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

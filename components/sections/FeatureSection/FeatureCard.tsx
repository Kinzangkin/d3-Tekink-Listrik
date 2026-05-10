import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
  isActive?: boolean
  link: string
}

export function FeatureCard({ title, description, icon, isActive, link }: FeatureCardProps) {
  return (
    <Card 
      className={cn(
        "group relative overflow-hidden transition-all duration-300 hover:shadow-xl border-t-4",
        isActive 
          ? "bg-primary text-white border-primary shadow-lg scale-105 z-10" 
          : "bg-white border-transparent hover:border-primary"
      )}
    >
      <CardContent className="p-8 h-full flex flex-col items-start gap-4">
        <div 
          className={cn(
            "p-4 rounded-full mb-4",
            isActive ? "bg-white/10" : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors"
          )}
        >
          {icon}
        </div>
        <h3 className="font-black text-xl md:text-2xl uppercase tracking-wider mb-2">
          {title}
        </h3>
        <p className={cn(
          "text-sm leading-relaxed mb-6 grow",
          isActive ? "text-white/90" : "text-neutral-500"
        )}>
          {description}
        </p>
        <Link 
          href={link}
          className={cn(
            "text-sm font-bold tracking-widest uppercase pb-1 border-b-2 transition-all",
            isActive 
              ? "border-white/50 hover:border-white" 
              : "border-primary/30 text-primary hover:border-primary"
          )}
        >
          Pelajari Lebih Lanjut
        </Link>
      </CardContent>
    </Card>
  )
}

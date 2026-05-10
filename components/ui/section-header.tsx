import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  align?: "left" | "center" | "right"
}

export function SectionHeader({
  title,
  subtitle,
  align = "center",
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div 
      className={cn(
        "flex flex-col gap-2 mb-12",
        align === "center" && "text-center items-center",
        align === "left" && "text-left items-start",
        align === "right" && "text-right items-end",
        className
      )}
      {...props}
    >
      {subtitle && (
        <span className="text-primary font-bold tracking-widest text-sm uppercase">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-foreground max-w-3xl">
        {title}
      </h2>
    </div>
  )
}

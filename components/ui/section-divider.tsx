import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: "top" | "bottom"
  variant?: "primary" | "white" | "dark"
}

export function SectionDivider({ 
  position = "top", 
  variant = "white",
  className, 
  ...props 
}: SectionDividerProps) {
  const getFillColor = () => {
    switch (variant) {
      case "primary": return "fill-primary"
      case "dark": return "fill-neutral-900"
      case "white":
      default: return "fill-background"
    }
  }

  // A diagonal polygon shape
  return (
    <div 
      className={cn(
        "absolute left-0 w-full overflow-hidden leading-none", 
        position === "top" ? "top-0 -translate-y-full" : "bottom-0 translate-y-full",
        position === "top" ? "rotate-180" : "",
        className
      )}
      {...props}
    >
      <svg
        className="relative block w-full h-[60px] md:h-[100px]"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 120L1200 0V120H0Z"
          className={getFillColor()}
        />
      </svg>
    </div>
  )
}

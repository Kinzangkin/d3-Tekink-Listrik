"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface KartuVisiMisiProps {
  title: string
  items: string[]
  index: number
  variant?: "visi" | "misi"
}

export function KartuVisiMisi({ title, items, index, variant = "misi" }: KartuVisiMisiProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className={cn(
        "relative p-8 rounded-xl bg-white border border-neutral-100 shadow-sm hover:shadow-lg transition-all duration-300 group",
        "border-l-4",
        variant === "visi" ? "border-l-blue-500" : "border-l-primary"
      )}
    >
      {/* Number badge */}
      <div className={cn(
        "absolute -top-4 -left-2 w-10 h-10 rounded-lg flex items-center justify-center text-white font-black text-sm shadow-md",
        variant === "visi" ? "bg-blue-500" : "bg-primary"
      )}>
        {String(index + 1).padStart(2, "0")}
      </div>

      <h3 className="font-bold text-lg text-neutral-800 mb-4 mt-2 uppercase tracking-wider">
        {title}
      </h3>

      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-neutral-600 text-sm leading-relaxed">
            <span className={cn(
              "mt-1.5 w-2 h-2 rounded-full shrink-0",
              variant === "visi" ? "bg-blue-400" : "bg-primary/60"
            )} />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

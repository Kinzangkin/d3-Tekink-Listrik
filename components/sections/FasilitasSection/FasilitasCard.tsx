"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"
import { HiArrowRight } from "react-icons/hi"

interface FasilitasItem {
  id: string
  title: string
  description: string
  image: string
  category?: string
}

interface FasilitasCardProps {
  item: FasilitasItem
  index: number
}

export function FasilitasCard({ item, index }: FasilitasCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Link href={`/fasilitas/${item.id}`}>
        <Card className="overflow-hidden bg-white border border-neutral-100 group hover:shadow-2xl transition-all duration-500 rounded-3xl cursor-pointer">
          <div className="relative h-72 w-full overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
            />
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-primary shadow-xl transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                <HiArrowRight size={24} />
              </div>
            </div>

            {item.category && (
              <div className="absolute top-6 left-6">
                <Badge className="bg-white/90 backdrop-blur-md text-primary border-none tracking-widest text-[10px] font-black px-4 py-2 rounded-xl shadow-lg">
                  {item.category.toUpperCase()}
                </Badge>
              </div>
            )}
          </div>
          <CardContent className="p-8">
            <h3 className="text-2xl font-black text-neutral-800 uppercase tracking-tight mb-4 group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            <p className="text-neutral-500 text-sm leading-relaxed line-clamp-3 mb-6">
              {item.description}
            </p>
            <div className="flex items-center gap-2 text-primary font-black text-[10px] tracking-[0.2em] uppercase">
              Lihat Detail Fasilitas <HiArrowRight />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}

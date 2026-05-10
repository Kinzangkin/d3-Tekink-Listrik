"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { FaEnvelope, FaGraduationCap, FaArrowRight } from "react-icons/fa"
import Link from "next/link"

interface DosenCardProps {
  id: string
  nama: string
  nip: string
  jabatan: string
  keahlian: string[]
  foto: string
  email: string
  status: "Aktif" | "Tugas Belajar" | "Cuti"
  index: number
}

export function DosenCard({
  id,
  nama,
  nip,
  jabatan,
  keahlian,
  foto,
  email,
  status,
  index,
}: DosenCardProps) {
  const statusColor = {
    Aktif: "bg-green-100 text-green-700",
    "Tugas Belajar": "bg-blue-100 text-blue-700",
    Cuti: "bg-amber-100 text-amber-700",
  }

  return (
    <Link href={`/dosen/${id}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.08 }}
        viewport={{ once: true, margin: "-50px" }}
        className="group bg-white rounded-xl border border-neutral-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col"
      >
        {/* Photo */}
        <div className="relative h-72 w-full overflow-hidden bg-neutral-100">
          <Image
            src={foto}
            alt={nama}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
          {/* Status badge */}
          <div className="absolute top-4 right-4">
            <span className={cn(
              "text-xs font-bold px-3 py-1 rounded-full",
              statusColor[status]
            )}>
              {status}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="font-bold text-lg text-neutral-800 mb-1 group-hover:text-primary transition-colors">
            {nama}
          </h3>
          <p className="text-xs text-neutral-400 mb-3 font-mono">{nip}</p>

          <div className="flex items-center gap-2 text-sm text-neutral-600 mb-4">
            <FaGraduationCap className="text-primary shrink-0" />
            <span>{jabatan}</span>
          </div>

          {/* Tags keahlian */}
          <div className="flex flex-wrap gap-2 mb-5">
            {keahlian.map((tag, i) => (
              <span
                key={i}
                className="text-xs bg-primary/5 text-primary font-semibold px-3 py-1 rounded-full border border-primary/10"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-auto flex items-center justify-between pt-4 border-t border-neutral-50">
            <span className="text-xs font-bold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
              LIHAT PROFIL <FaArrowRight size={10} />
            </span>
            <div className="w-8 h-8 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-400 group-hover:bg-primary group-hover:text-white transition-colors">
              <FaEnvelope size={12} />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

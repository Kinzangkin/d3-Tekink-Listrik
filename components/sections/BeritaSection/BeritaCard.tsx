import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

interface BeritaCardProps {
  title: string
  category: string
  image: string
  link: string
}

export function BeritaCard({ title, category, image, link }: BeritaCardProps) {
  return (
    <Card className="overflow-hidden bg-white border-transparent hover:shadow-xl transition-all duration-300 group h-full">
      <div className="relative h-60 w-full overflow-hidden">
        <Image 
          src={image} 
          alt={title} 
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-sm">
          {category}
        </div>
      </div>
      <CardContent className="p-6 flex flex-col h-[calc(100%-15rem)]">
        <h3 className="font-bold text-xl leading-snug mb-4 text-neutral-800 group-hover:text-primary transition-colors grow">
          {title}
        </h3>
        <Link 
          href={link} 
          target={link.startsWith("http") ? "_blank" : undefined}
          rel={link.startsWith("http") ? "noopener noreferrer" : undefined}
          className="text-primary font-bold text-sm uppercase tracking-widest inline-flex items-center gap-2 hover:gap-3 transition-all"
        >
          Baca Selengkapnya <span className="text-lg">→</span>
        </Link>
      </CardContent>
    </Card>
  )
}

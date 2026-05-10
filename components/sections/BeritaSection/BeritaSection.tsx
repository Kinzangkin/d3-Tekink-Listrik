"use client"

import { SectionHeader } from "@/components/ui/section-header"
import { BeritaCard } from "./BeritaCard"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function BeritaSection() {
  const news = [
    {
      title: "Sorotan Mahasiswa: Kisah Sukses Lulusan Universitas Unixe",
      category: "BERITA KAMPUS",
      image: "https://picsum.photos/seed/berita1/800/600",
      link: "#"
    },
    {
      title: "Universitas Unixe: Pusat Inovasi dan Penelitian Terdepan",
      category: "PENELITIAN",
      image: "https://picsum.photos/seed/berita2/800/600",
      link: "#"
    },
    {
      title: "Menjelajahi Dampak Universitas Unixe terhadap Masyarakat Lokal",
      category: "KOMUNITAS",
      image: "https://picsum.photos/seed/berita3/800/600",
      link: "#"
    },
    {
      title: "Peresmian Laboratorium Kelistrikan Tingkat Lanjut yang Baru",
      category: "FASILITAS",
      image: "https://picsum.photos/seed/berita4/800/600",
      link: "#"
    }
  ]

  return (
    <section id="news" className="pt-24 pb-12 bg-neutral-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <SectionHeader 
            subtitle="BERITA TERBARU"
            title="KABAR SEPUTAR PRODI"
            align="left"
            className="mb-0"
          />
          <Button variant="default" className="font-bold tracking-widest hidden md:flex">
            LIHAT SEMUA BERITA
          </Button>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 md:-ml-6">
            {news.map((item, index) => (
              <CarouselItem key={index} className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/3">
                <BeritaCard {...item} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-end gap-4 mt-8">
            <CarouselPrevious className="position-relative static translate-x-0 translate-y-0 text-primary border-primary hover:bg-primary hover:text-white h-12 w-12" />
            <CarouselNext className="position-relative static translate-x-0 translate-y-0 text-primary border-primary hover:bg-primary hover:text-white h-12 w-12" />
          </div>
        </Carousel>
        
        <Button variant="default" className="w-full mt-8 font-bold tracking-widest md:hidden">
          LIHAT SEMUA BERITA
        </Button>
      </div>
    </section>
  )
}

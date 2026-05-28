"use client"

import { useEffect, useState } from "react"
import { SectionHeader } from "@/components/ui/section-header"
import { BeritaCard } from "./BeritaCard"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface NewsItem {
  title: string
  category: string
  image: string
  link: string
}

interface RawNewsItem {
  title: string
  link: string
  contentSnippet?: string
  image?: {
    small?: string
    large?: string
  }
}

export function BeritaSection() {
  // Hand-picked high-quality electrical engineering fallbacks in case of network issues/loading
  const defaultNews: NewsItem[] = [
    {
      title: "Peluang Karir Lulusan D3 Teknik Listrik di Era Energi Baru Terbarukan",
      category: "PROSPEK KARIR",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
      link: "#"
    },
    {
      title: "Inovasi Sistem Kelistrikan Pintar (Smart Grid) Berbasis Internet of Things",
      category: "PENELITIAN",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
      link: "#"
    },
    {
      title: "Penerapan Keselamatan dan Kesehatan Kerja (K3) pada Sistem Instalasi Listrik",
      category: "K3 KELISTRIKAN",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
      link: "#"
    },
    {
      title: "Peresmian Laboratorium Kelistrikan Tingkat Lanjut Modern D3 Teknik Listrik",
      category: "FASILITAS",
      image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=80",
      link: "#"
    }
  ]

  const [news, setNews] = useState<NewsItem[]>(defaultNews)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchLiveNews = async () => {
      setIsLoading(true)
      try {
        const res = await fetch("/api/news")
        const json = await res.json()
        
        if (json && json.data && json.data.length > 0) {
          // Keywords relevant to electrical engineering, energy, automation, components
          const keywords = [
            "listrik", "nuklir", "energi", "pembangkit", "baterai", "pltn", "uranium", 
            "robot", "ai", "sensor", "satelit", "data center", "komputer", "processor", 
            "chip", "nasa", "teknologi", "komdigi", "internet"
          ]

          // Filter for highly relevant articles
          const relevantArticles = json.data.filter((item: RawNewsItem) => {
            const text = (item.title + " " + (item.contentSnippet || "")).toLowerCase()
            return keywords.some(kw => text.includes(kw))
          })

          // Fallback to all articles if not enough specific ones
          const sourceList = relevantArticles.length >= 3 ? relevantArticles : json.data

          const mappedNews = sourceList.slice(0, 8).map((item: RawNewsItem) => {
            let category = "TEKNOLOGI"
            const titleLower = item.title.toLowerCase()
            
            if (titleLower.includes("listrik") || titleLower.includes("pltn") || titleLower.includes("pembangkit")) {
              category = "TEKNOLOGI LISTRIK"
            } else if (titleLower.includes("energi") || titleLower.includes("nuklir") || titleLower.includes("uranium")) {
              category = "RISET ENERGI"
            } else if (titleLower.includes("robot") || titleLower.includes("ai") || titleLower.includes("nasa")) {
              category = "AUTOMASI & AI"
            } else if (titleLower.includes("baterai") || titleLower.includes("chip") || titleLower.includes("prosesor")) {
              category = "KOMPONEN LISTRIK"
            } else if (titleLower.includes("internet") || titleLower.includes("satelit") || titleLower.includes("data center")) {
              category = "KONEKTIVITAS"
            }

            return {
              title: item.title,
              category: category,
              image: item.image?.large || item.image?.small || "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=80",
              link: item.link
            }
          })

          setNews(mappedNews)
        }
      } catch (e) {
        console.error("Gagal memuat berita online Indonesia:", e)
        // Gracefully retains standard defaultNews list
      } finally {
        setIsLoading(false)
      }
    }

    fetchLiveNews()
  }, [])

  return (
    <section id="news" className="pt-24 pb-12 bg-neutral-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <SectionHeader 
            subtitle="BERITA TERBARU"
            title="KABAR SEPUTAR PRODI & TEKNOLOGI"
            align="left"
            className="mb-0"
          />
          <Button variant="default" className="font-bold tracking-widest hidden md:flex" onClick={() => window.open("https://www.cnnindonesia.com/teknologi", "_blank")}>
            LIHAT SEMUA BERITA
          </Button>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <span className="ml-3 font-bold text-neutral-500 uppercase tracking-widest">Memuat Berita Live...</span>
          </div>
        ) : (
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
        )}
        
        <Button variant="default" className="w-full mt-8 font-bold tracking-widest md:hidden" onClick={() => window.open("https://www.cnnindonesia.com/teknologi", "_blank")}>
          LIHAT SEMUA BERITA
        </Button>
      </div>
    </section>
  )
}

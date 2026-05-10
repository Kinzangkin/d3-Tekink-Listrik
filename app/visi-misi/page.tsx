import { Navbar } from "@/components/layout/Navbar/Navbar"
import { Footer } from "@/components/layout/Footer/Footer"
import { PageHero } from "@/components/sections/VisiMisi/PageHero"
import { KartuVisiMisi } from "@/components/sections/VisiMisi/KartuVisiMisi"
import { SectionHeader } from "@/components/ui/section-header"

const visiData = [
  {
    title: "Visi Program Studi",
    items: [
      "Menjadi program studi unggulan di bidang teknik listrik yang menghasilkan lulusan berdaya saing tinggi di tingkat nasional dan internasional.",
      "Mengembangkan ilmu pengetahuan dan teknologi kelistrikan yang inovatif, adaptif, dan berwawasan lingkungan.",
    ]
  }
]

const misiData = [
  {
    title: "Pendidikan Berkualitas",
    items: [
      "Menyelenggarakan pendidikan tinggi yang bermutu dalam bidang teknik listrik dengan kurikulum berbasis kompetensi dan kebutuhan industri.",
    ]
  },
  {
    title: "Penelitian & Pengembangan",
    items: [
      "Melaksanakan penelitian terapan di bidang teknik listrik yang berkontribusi pada pengembangan ilmu pengetahuan dan teknologi.",
    ]
  },
  {
    title: "Pengabdian Masyarakat",
    items: [
      "Melaksanakan pengabdian kepada masyarakat melalui penerapan ilmu teknik listrik untuk meningkatkan kesejahteraan masyarakat.",
    ]
  },
  {
    title: "Kerjasama Industri",
    items: [
      "Menjalin kerjasama yang luas dengan dunia industri, pemerintah, dan institusi pendidikan dalam negeri maupun luar negeri.",
    ]
  },
  {
    title: "Sumber Daya Manusia",
    items: [
      "Mengembangkan sumber daya manusia yang profesional, berintegritas, dan memiliki etos kerja tinggi dalam pengelolaan program studi.",
    ]
  },
  {
    title: "Karakter & Soft Skills",
    items: [
      "Membentuk lulusan yang berkarakter, beretika, dan memiliki jiwa kepemimpinan serta kemampuan berkomunikasi yang baik.",
    ]
  },
  {
    title: "Tata Kelola Modern",
    items: [
      "Menerapkan tata kelola program studi yang transparan, akuntabel, dan berorientasi pada peningkatan mutu berkelanjutan.",
    ]
  }
]

export default function VisiMisiPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <PageHero
        title="VISI & MISI"
        subtitle="D3 Teknik Listrik"
        description="Landasan nilai dan tujuan yang menjadi pedoman dalam menjalankan program studi untuk mencetak lulusan terbaik di bidang teknik listrik."
      />

      {/* Visi Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader
            subtitle="PANDANGAN KE DEPAN"
            title="VISI KAMI"
            align="left"
          />
          <div className="grid grid-cols-1 gap-8 mt-8">
            {visiData.map((item, index) => (
              <KartuVisiMisi
                key={index}
                title={item.title}
                items={item.items}
                index={index}
                variant="visi"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Misi Section */}
      <section className="py-24 bg-neutral-50">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader
            subtitle="LANGKAH STRATEGIS"
            title="MISI KAMI"
            align="left"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {misiData.map((item, index) => (
              <KartuVisiMisi
                key={index}
                title={item.title}
                items={item.items}
                index={index}
                variant="misi"
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

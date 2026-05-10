import { SectionHeader } from "@/components/ui/section-header"
import { FeatureCard } from "./FeatureCard"
import { FaChalkboardTeacher, FaBookOpen, FaBuilding } from "react-icons/fa"

export function FeatureSection() {
  const features = [
    {
      title: "Dosen Ahli",
      description: "Belajar langsung dari para praktisi dan akademisi berpengalaman di industri kelistrikan yang siap membimbing secara intensif.",
      icon: <FaChalkboardTeacher size={32} />,
      link: "/dosen",
      isActive: false
    },
    {
      title: "Kurikulum Terkini",
      description: "Kurikulum yang disesuaikan dengan kebutuhan industri 4.0, memastikan setiap lulusan memiliki kompetensi yang relevan.",
      icon: <FaBookOpen size={32} />,
      link: "/kurikulum",
      isActive: true
    },
    {
      title: "Fasilitas Modern",
      description: "Didukung dengan laboratorium kelistrikan berstandar industri untuk menunjang kegiatan praktik mahasiswa sehari-hari.",
      icon: <FaBuilding size={32} />,
      link: "/fasilitas",
      isActive: false
    }
  ]

  return (
    <section id="programs" className="py-24 bg-neutral-50 relative">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader 
          subtitle="KEUNGGULAN KAMI"
          title="MEMBERIKAN PENDIDIKAN TERBAIK DI BIDANGNYA"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 px-4 md:px-0">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              {...feature}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

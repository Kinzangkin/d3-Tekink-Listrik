import { Navbar } from "@/components/layout/Navbar/Navbar"
import { Footer } from "@/components/layout/Footer/Footer"
import { PageHero } from "@/components/sections/VisiMisi/PageHero"
import { SemesterAccordion } from "@/components/sections/KurikulumSection/SemesterAccordion"
import { SectionHeader } from "@/components/ui/section-header"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { FaDownload } from "react-icons/fa"

const cplData = [
  { kode: "CPL-01", deskripsi: "Mampu menerapkan matematika, sains, dan prinsip rekayasa untuk menyelesaikan masalah teknik kelistrikan yang kompleks." },
  { kode: "CPL-02", deskripsi: "Mampu merancang sistem, komponen, atau proses kelistrikan untuk memenuhi kebutuhan spesifik dengan batih yang tepat." },
  { kode: "CPL-03", deskripsi: "Mampu mengidentifikasi, merumuskan, dan menganalisis masalah teknik kelistrikan." },
  { kode: "CPL-04", deskripsi: "Mampu menggunakan teknik, keterampilan, dan peralatan teknik modern yang diperlukan untuk praktik teknik." },
  { kode: "CPL-05", deskripsi: "Memiliki tanggung jawab profesional dan etika." },
  { kode: "CPL-06", deskripsi: "Mampu berkomunikasi secara efektif baik lisan maupun tulisan." },
]

export default function KurikulumPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <PageHero
        title="KURIKULUM"
        subtitle="D3 Teknik Listrik"
        description="Struktur kurikulum pendidikan tinggi vokasi yang dirancang untuk membekali mahasiswa dengan keahlian teknis dan manajerial di bidang kelistrikan."
      />

      {/* CPL Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader
            subtitle="OUTPUT LULUSAN"
            title="CAPAIAN PEMBELAJARAN LULUSAN (CPL)"
            align="left"
          />
          <div className="border rounded-2xl overflow-hidden mt-8 shadow-sm">
            <Table>
              <TableHeader className="bg-neutral-50">
                <TableRow>
                  <TableHead className="w-[150px] font-bold text-neutral-800">KODE CPL</TableHead>
                  <TableHead className="font-bold text-neutral-800 text-left">DESKRIPSI CAPAIAN</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cplData.map((cpl) => (
                  <TableRow key={cpl.kode} className="transition-colors hover:bg-neutral-50/50">
                    <TableCell className="font-black text-primary">{cpl.kode}</TableCell>
                    <TableCell className="text-neutral-600 leading-relaxed py-6">
                      {cpl.deskripsi}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      {/* Semester Structure Section */}
      <section className="py-24 bg-neutral-50">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader
            subtitle="STRUKTUR MATA KULIAH"
            title="DISTRIBUSI PER SEMESTER"
            align="left"
          />
          <div className="mt-8">
            <SemesterAccordion />
          </div>

          <div className="mt-16 bg-primary rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-4">Unduh Dokumen Lengkap</h3>
              <p className="text-white/80">Dapatkan dokumen kurikulum akademik lengkap dalam format PDF untuk referensi Anda.</p>
            </div>
            <Button size="lg" className="bg-white text-primary hover:bg-neutral-100 h-14 px-8 font-black tracking-widest gap-2">
              <FaDownload size={18} /> UNDUH PDF
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

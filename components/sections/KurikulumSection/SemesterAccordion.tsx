"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface MataKuliah {
  kode: string
  nama: string
  sks: number
  jenis: "Wajib" | "Pilihan" | "Praktikum"
}

interface SemesterData {
  semester: number
  totalSks: number
  mataKuliah: MataKuliah[]
}

const curriculumData: SemesterData[] = [
  {
    semester: 1,
    totalSks: 20,
    mataKuliah: [
      { kode: "EE101", nama: "Matematika Teknik I", sks: 3, jenis: "Wajib" },
      { kode: "EE102", nama: "Fisika Dasar", sks: 3, jenis: "Wajib" },
      { kode: "EE103", nama: "Dasar Teknik Listrik", sks: 4, jenis: "Praktikum" },
      { kode: "EE104", nama: "Gambar Teknik", sks: 2, jenis: "Wajib" },
      { kode: "EE105", nama: "Keselamatan & Kesehatan Kerja (K3)", sks: 2, jenis: "Wajib" },
      { kode: "EE106", nama: "Bahasa Inggris Teknik", sks: 2, jenis: "Wajib" },
      { kode: "EE107", nama: "Kimia Dasar", sks: 2, jenis: "Wajib" },
    ]
  },
  {
    semester: 2,
    totalSks: 21,
    mataKuliah: [
      { kode: "EE201", nama: "Matematika Teknik II", sks: 3, jenis: "Wajib" },
      { kode: "EE202", nama: "Rangkaian Listrik I", sks: 4, jenis: "Praktikum" },
      { kode: "EE203", nama: "Elektronika Dasar", sks: 4, jenis: "Praktikum" },
      { kode: "EE204", nama: "Algoritma & Pemrograman", sks: 3, jenis: "Wajib" },
      { kode: "EE205", nama: "Bahan-Bahan Listrik", sks: 2, jenis: "Wajib" },
      { kode: "EE206", nama: "Medan Elektromagnetik", sks: 3, jenis: "Wajib" },
      { kode: "EE207", nama: "Pendidikan Agama", sks: 2, jenis: "Wajib" },
    ]
  },
  {
    semester: 3,
    totalSks: 20,
    mataKuliah: [
      { kode: "EE301", nama: "Rangkaian Listrik II", sks: 4, jenis: "Praktikum" },
      { kode: "EE302", nama: "Mesin Listrik Arus Bolak-Balik", sks: 4, jenis: "Praktikum" },
      { kode: "EE303", nama: "Elektronika Daya", sks: 3, jenis: "Wajib" },
      { kode: "EE304", nama: "Sistem Digital", sks: 3, jenis: "Wajib" },
      { kode: "EE305", nama: "Pengukuran Besaran Listrik", sks: 3, jenis: "Praktikum" },
      { kode: "EE306", nama: "Pendidikan Pancasila", sks: 3, jenis: "Wajib" },
    ]
  },
  {
    semester: 4,
    totalSks: 19,
    mataKuliah: [
      { kode: "EE401", nama: "Sistem Tenaga Listrik", sks: 4, jenis: "Wajib" },
      { kode: "EE402", nama: "Instalasi Listrik Industri", sks: 4, jenis: "Praktikum" },
      { kode: "EE403", nama: "Teknik Kendali Dasar", sks: 3, jenis: "Wajib" },
      { kode: "EE404", nama: "Mikrokontroler", sks: 3, jenis: "Praktikum" },
      { kode: "EE405", nama: "Transmisi & Distribusi", sks: 3, jenis: "Wajib" },
      { kode: "EE406", nama: "Kewirausahaan", sks: 2, jenis: "Wajib" },
    ]
  },
  // Semesters 5-8 simplified for brevity
  {
    semester: 5,
    totalSks: 20,
    mataKuliah: [
      { kode: "EE501", nama: "Pembangkit Energi Listrik", sks: 3, jenis: "Wajib" },
      { kode: "EE502", nama: "Proteksi Sistem Tenaga", sks: 3, jenis: "Wajib" },
      { kode: "EE503", nama: "Programmable Logic Controller (PLC)", sks: 4, jenis: "Praktikum" },
      { kode: "EE504", nama: "Pilihan I: Smart Grid", sks: 3, jenis: "Pilihan" },
      { kode: "EE505", nama: "Metodologi Penelitian", sks: 2, jenis: "Wajib" },
      { kode: "EE506", nama: "Magang Industri I", sks: 5, jenis: "Praktikum" },
    ]
  },
  {
    semester: 6,
    totalSks: 18,
    mataKuliah: [
      { kode: "EE601", nama: "Manajemen Energi", sks: 3, jenis: "Wajib" },
      { kode: "EE602", nama: "Audit Energi", sks: 3, jenis: "Wajib" },
      { kode: "EE603", nama: "Sistem otomasi Industri", sks: 4, jenis: "Praktikum" },
      { kode: "EE604", nama: "Pilihan II: Energi Terbarukan", sks: 3, jenis: "Pilihan" },
      { kode: "EE605", nama: "Pre-Proposal Proyek Akhir", sks: 2, jenis: "Wajib" },
      { kode: "EE606", nama: "Etika Profesi", sks: 3, jenis: "Wajib" },
    ]
  },
  {
    semester: 7,
    totalSks: 12,
    mataKuliah: [
      { kode: "EE701", nama: "Magang Industri II (Semester Penuh)", sks: 12, jenis: "Praktikum" },
    ]
  },
  {
    semester: 8,
    totalSks: 6,
    mataKuliah: [
      { kode: "EE801", nama: "Proyek Akhir / Skripsi", sks: 6, jenis: "Wajib" },
    ]
  }
]

export function SemesterAccordion() {
  return (
    <Accordion className="w-full space-y-4">
      {curriculumData.map((sem) => (
        <AccordionItem 
          key={sem.semester} 
          value={`semester-${sem.semester}`}
          className="border rounded-xl px-4 bg-white shadow-sm overflow-hidden"
        >
          <AccordionTrigger className="hover:no-underline py-6">
            <div className="flex items-center justify-between w-full pr-4 text-left">
              <span className="font-black text-xl text-neutral-800 uppercase tracking-tight">
                Semester {sem.semester}
              </span>
              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 font-bold">
                {sem.totalSks} SKS TOTAL
              </Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[100px] font-bold text-neutral-800">KODE</TableHead>
                    <TableHead className="font-bold text-neutral-800">MATA KULIAH</TableHead>
                    <TableHead className="w-[80px] text-center font-bold text-neutral-800">SKS</TableHead>
                    <TableHead className="w-[120px] text-right font-bold text-neutral-800">JENIS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sem.mataKuliah.map((mk) => (
                    <TableRow key={mk.kode} className="group transition-colors hover:bg-neutral-50/50">
                      <TableCell className="font-mono text-sm">{mk.kode}</TableCell>
                      <TableCell className="font-medium text-neutral-700">{mk.nama}</TableCell>
                      <TableCell className="text-center font-bold">{mk.sks}</TableCell>
                      <TableCell className="text-right">
                        <Badge 
                          variant="secondary" 
                          className={cn(
                            "text-[10px] font-bold uppercase",
                            mk.jenis === "Wajib" && "bg-neutral-100 text-neutral-600",
                            mk.jenis === "Praktikum" && "bg-blue-100 text-blue-700",
                            mk.jenis === "Pilihan" && "bg-amber-100 text-amber-700"
                          )}
                        >
                          {mk.jenis}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}


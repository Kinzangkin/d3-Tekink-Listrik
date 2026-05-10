import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FaFilePdf, FaCalendarAlt } from "react-icons/fa"

export function JadwalPanel() {
  const semesters = [
    { title: "Semester Ganjil 2026/2027", status: "Aktif", file: "#" },
    { title: "Semester Genap 2025/2026", status: "Selesai", file: "#" },
  ]

  return (
    <Card className="shadow-md border-neutral-100 mb-6">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-black text-neutral-800 uppercase tracking-widest flex items-center gap-2">
          <FaCalendarAlt className="text-primary" />
          Jadwal Perkuliahan
        </CardTitle>
        <CardDescription>Unduh jadwal kelas untuk setiap semester.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {semesters.map((sem, idx) => (
          <div key={idx} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg border border-neutral-100">
            <div>
              <p className="font-bold text-sm text-neutral-800">{sem.title}</p>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${sem.status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-neutral-200 text-neutral-600'} inline-block mt-2`}>
                {sem.status}
              </span>
            </div>
            <Button variant="outline" size="sm" className="gap-2 shrink-0">
              <FaFilePdf className="text-red-500" /> Unduh PDF
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

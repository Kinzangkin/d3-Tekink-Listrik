import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function KalenderWidget() {
  return (
    <Card className="shadow-md border-neutral-100">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-black text-neutral-800 uppercase tracking-widest">
          Kalender Akademik Mini
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-neutral-50 rounded-lg p-6 flex flex-col items-center justify-center border border-neutral-100 min-h-[150px]">
          <p className="text-neutral-500 font-medium">Januari 2026</p>
          <div className="text-2xl font-black text-primary mt-2">1A</div>
          <p className="text-xs text-neutral-400 mt-2 text-center">Awal Perkuliahan Semester Genap</p>
        </div>
      </CardContent>
    </Card>
  )
}

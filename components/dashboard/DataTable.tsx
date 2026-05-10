import { ReactNode } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface Column {
  header: string
  accessorKey?: string
  cell?: (item: any) => ReactNode
  className?: string
}

interface DataTableProps {
  columns: Column[]
  data: any[]
  searchPlaceholder?: string
  emptyMessage?: string
}

export function DataTable({ columns, data, searchPlaceholder = "Cari data...", emptyMessage = "Belum ada data." }: DataTableProps) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-neutral-100 overflow-hidden">
      {/* Table Toolbar */}
      <div className="p-4 border-b border-neutral-100 flex items-center justify-between gap-4 bg-neutral-50/50">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
          <Input 
            placeholder={searchPlaceholder} 
            className="pl-10 h-10 bg-white border-neutral-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary shadow-sm"
          />
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-neutral-500 uppercase bg-neutral-50 border-b border-neutral-100 tracking-wider font-bold">
            <tr>
              {columns.map((col, i) => (
                <th key={i} className={`px-6 py-4 ${col.className || ''}`}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-neutral-500 font-medium">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item, rowIndex) => (
                <tr key={item.id || rowIndex} className="bg-white border-b border-neutral-50 hover:bg-neutral-50/50 transition-colors">
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className={`px-6 py-4 font-medium text-neutral-700 ${col.className || ''}`}>
                      {col.cell ? col.cell(item) : col.accessorKey ? item[col.accessorKey] : null}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 border-t border-neutral-100 bg-neutral-50/50 flex items-center justify-between text-sm text-neutral-500 font-medium">
        <span>Menampilkan {data.length > 0 ? 1 : 0} sampai {data.length} dari {data.length} data</span>
        <div className="flex items-center gap-2">
          <button disabled className="px-3 py-1 rounded-md border border-neutral-200 bg-white text-neutral-400 cursor-not-allowed">
            Sebelumnya
          </button>
          <button disabled className="px-3 py-1 rounded-md border border-neutral-200 bg-white text-neutral-400 cursor-not-allowed">
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  )
}

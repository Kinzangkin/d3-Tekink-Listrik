import { ReactNode } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

interface DeleteConfirmDialogProps {
  title: string
  description?: string
  trigger: ReactNode
  onConfirm: () => void
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  isDeleting?: boolean
}

export function DeleteConfirmDialog({
  title,
  description = "Tindakan ini tidak dapat dibatalkan. Data akan dihapus secara permanen dari sistem.",
  trigger,
  onConfirm,
  isOpen,
  onOpenChange,
  isDeleting = false
}: DeleteConfirmDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger render={trigger as React.ReactElement} />
      <DialogContent className="sm:max-w-[400px] border-none shadow-2xl rounded-3xl overflow-hidden p-0">
        <div className="h-2 bg-rose-500 w-full" />
        <div className="p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mb-6 text-rose-500">
            <AlertTriangle size={32} />
          </div>
          
          <DialogHeader className="text-center pb-6">
            <DialogTitle className="text-xl font-black uppercase tracking-tight text-neutral-800 text-center">
              {title}
            </DialogTitle>
            <DialogDescription className="text-neutral-500 font-medium text-center mt-2">
              {description}
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-3">
            <Button 
              type="button" 
              onClick={onConfirm}
              disabled={isDeleting}
              className="w-full rounded-xl bg-rose-500 text-white hover:bg-rose-600 font-black tracking-widest uppercase h-12 shadow-lg shadow-rose-500/20"
            >
              {isDeleting ? "Menghapus..." : "Ya, Hapus Data"}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isDeleting}
              className="w-full rounded-xl border-neutral-200 text-neutral-600 hover:bg-neutral-100 font-bold tracking-widest uppercase h-12"
            >
              Batal
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

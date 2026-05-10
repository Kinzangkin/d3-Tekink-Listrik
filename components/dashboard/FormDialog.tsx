import { ReactNode } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface FormDialogProps {
  title: string
  description?: string
  trigger: ReactNode
  children: ReactNode
  onSubmit: () => void
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  submitLabel?: string
  isSubmitting?: boolean
}

export function FormDialog({
  title,
  description,
  trigger,
  children,
  onSubmit,
  isOpen,
  onOpenChange,
  submitLabel = "Simpan",
  isSubmitting = false
}: FormDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger render={trigger as React.ReactElement} />
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none shadow-2xl rounded-3xl">
        <div className="h-2 bg-primary w-full" />
        <div className="p-6 pb-2">
          <DialogHeader>
            <DialogTitle className="text-xl font-black uppercase tracking-tight text-neutral-800">{title}</DialogTitle>
            {description && (
              <DialogDescription className="text-neutral-500 font-medium">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        </div>
        
        <div className="p-6 py-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {children}
        </div>

        <div className="p-6 pt-4 bg-neutral-50 border-t border-neutral-100 flex items-center justify-end gap-3">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
            className="rounded-xl border-neutral-200 text-neutral-600 hover:bg-neutral-100 font-bold tracking-widest uppercase text-xs h-10"
          >
            Batal
          </Button>
          <Button 
            type="button" 
            onClick={onSubmit}
            disabled={isSubmitting}
            className="rounded-xl bg-primary text-white hover:bg-primary/90 font-bold tracking-widest uppercase text-xs h-10 shadow-lg shadow-primary/20"
          >
            {isSubmitting ? "Menyimpan..." : submitLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

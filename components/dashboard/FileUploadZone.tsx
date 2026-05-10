import React, { useState, useRef } from "react"
import { UploadCloud, File, X, Image as ImageIcon } from "lucide-react"

interface FileUploadZoneProps {
  accept?: string
  maxSize?: number // in MB
  multiple?: boolean
  onChange?: (files: File[]) => void
  label?: string
}

export function FileUploadZone({
  accept = "image/*,application/pdf",
  maxSize = 5,
  multiple = false,
  onChange,
  label = "Seret & lepas file di sini atau klik untuk memilih"
}: FileUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files))
    }
  }

  const handleFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter(file => file.size <= maxSize * 1024 * 1024)
    
    let updatedFiles = files
    if (multiple) {
      updatedFiles = [...files, ...validFiles]
    } else {
      updatedFiles = validFiles.slice(0, 1)
    }
    
    setFiles(updatedFiles)
    if (onChange) {
      onChange(updatedFiles)
    }
  }

  const removeFile = (index: number) => {
    const newFiles = [...files]
    newFiles.splice(index, 1)
    setFiles(newFiles)
    if (onChange) {
      onChange(newFiles)
    }
  }

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
          isDragging 
            ? "border-primary bg-primary/5" 
            : "border-neutral-200 hover:border-primary/50 hover:bg-neutral-50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInput}
          className="hidden"
          accept={accept}
          multiple={multiple}
        />
        <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4 text-neutral-400">
          <UploadCloud size={24} />
        </div>
        <p className="text-sm font-bold text-neutral-700">{label}</p>
        <p className="text-xs text-neutral-400 mt-2 font-medium">
          Maksimal {maxSize}MB. {multiple ? "Bisa pilih beberapa file." : ""}
        </p>
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 border border-neutral-100 rounded-xl">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-primary shrink-0 border border-neutral-100">
                  {file.type.startsWith('image/') ? <ImageIcon size={16} /> : <File size={16} />}
                </div>
                <div className="truncate">
                  <p className="text-sm font-bold text-neutral-700 truncate">{file.name}</p>
                  <p className="text-xs text-neutral-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  removeFile(index)
                }}
                className="p-1.5 text-neutral-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

import { ReactNode } from "react"

interface PageHeaderProps {
  title: string
  description?: string
  action?: ReactNode
  icon?: ReactNode
}

export function PageHeader({ title, description, action, icon }: PageHeaderProps) {

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
      <div className="flex items-center gap-4">
        {icon && <div className="shrink-0">{icon}</div>}
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-neutral-800 tracking-tight uppercase">
            {title}
          </h1>
          {description && (
            <p className="text-sm text-neutral-500 font-medium mt-1">
              {description}
            </p>
          )}
        </div>
      </div>

      {action && (
        <div className="shrink-0">
          {action}
        </div>
      )}
    </div>
  )
}

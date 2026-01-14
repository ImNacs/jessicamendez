import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base styles
        "h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs md:text-sm",
        "border-input dark:bg-input/30",
        "placeholder:text-muted-foreground",
        "selection:bg-primary selection:text-primary-foreground",
        // File input styles
        "file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        // Disabled state
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        // Transiciones específicas (no transition-all)
        "transition-[border-color,box-shadow] duration-200 ease-out",
        // Hover state
        "hover:border-verde-300 dark:hover:border-verde-600/50",
        // Focus state con ring animado
        "outline-none focus-visible:ring-2 focus-visible:ring-verde-500/30 focus-visible:ring-offset-0",
        "focus-visible:border-verde-500 dark:focus-visible:border-verde-400",
        // Invalid state
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Input }

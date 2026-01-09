import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "transition-all duration-300 ease-out",
        // Hover: sutil resplandor (light mode sutil, dark mode blanco difuminado)
        "hover:border-gris-300 dark:hover:border-white/30 dark:hover:shadow-[0_0_15px_2px_rgba(255,255,255,0.08)]",
        // Focus: resplandor neón blanco difuminado (más intenso en dark)
        "focus-visible:border-gris-400 focus-visible:shadow-[0_0_8px_rgba(0,0,0,0.05)] dark:focus-visible:border-white/50 dark:focus-visible:shadow-[0_0_20px_4px_rgba(255,255,255,0.12),0_0_40px_8px_rgba(255,255,255,0.06)]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }

import type * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning"
}

const variantStyles = {
  default: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
  destructive: "bg-red-100 text-red-800 hover:bg-red-200",
  outline: "text-foreground border border-input",
  success: "bg-green-100 text-green-800 hover:bg-green-200",
  warning: "bg-orange-100 text-orange-800 hover:bg-orange-200",
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  )
}

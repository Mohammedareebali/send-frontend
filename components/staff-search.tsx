"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface StaffSearchProps {
  value: string
  onChange: (value: string) => void
}

export function StaffSearch({ value, onChange }: StaffSearchProps) {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        type="search"
        placeholder="Search staff..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 w-full"
      />
    </div>
  )
}

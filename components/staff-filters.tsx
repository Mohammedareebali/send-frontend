"use client"

import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface StaffFiltersProps {
  filters: {
    status: string
    role: string
    compliance: string
  }
  onChange: (filters: { status: string; role: string; compliance: string }) => void
}

export function StaffFilters({ filters, onChange }: StaffFiltersProps) {
  const statusOptions = [
    { value: "all", label: "All Statuses" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "on_leave", label: "On Leave" },
  ]

  const roleOptions = [
    { value: "all", label: "All Roles" },
    { value: "driver", label: "Driver" },
    { value: "assistant", label: "Passenger Assistant" },
    { value: "admin", label: "Admin" },
  ]

  const complianceOptions = [
    { value: "all", label: "All Compliance" },
    { value: "compliant", label: "Compliant" },
    { value: "expiring", label: "Expiring Soon" },
    { value: "expired", label: "Expired" },
  ]

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Status: {statusOptions.find((o) => o.value === filters.status)?.label}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {statusOptions.map((option) => (
              <DropdownMenuItem key={option.value} onClick={() => onChange({ ...filters, status: option.value })}>
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Role: {roleOptions.find((o) => o.value === filters.role)?.label}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Filter by Role</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {roleOptions.map((option) => (
              <DropdownMenuItem key={option.value} onClick={() => onChange({ ...filters, role: option.value })}>
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Compliance: {complianceOptions.find((o) => o.value === filters.compliance)?.label}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Filter by Compliance</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {complianceOptions.map((option) => (
              <DropdownMenuItem key={option.value} onClick={() => onChange({ ...filters, compliance: option.value })}>
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

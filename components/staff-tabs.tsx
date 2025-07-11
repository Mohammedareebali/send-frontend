"use client"

import { cn } from "@/lib/utils"
import { Users, UserCheck, UserX } from "lucide-react"

interface StaffTabsProps {
  activeTab: string
  onChange: (tab: string) => void
}

export function StaffTabs({ activeTab, onChange }: StaffTabsProps) {
  const tabs = [
    { id: "all", label: "All Staff", icon: Users, count: 24 },
    { id: "active", label: "Active", icon: UserCheck, count: 18 },
    { id: "inactive", label: "Inactive", icon: UserX, count: 6 },
  ]

  return (
    <div className="border-b border-gray-200 mb-6">
      <div className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "flex items-center py-4 px-1 border-b-2 font-medium text-sm",
              activeTab === tab.id
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
            )}
          >
            <tab.icon className="mr-2 h-5 w-5" />
            {tab.label}
            <span className="ml-2 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
              {tab.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

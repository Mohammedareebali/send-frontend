"use client"

import type React from "react"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, FileText, Car, Calendar, TrendingUp, MessageSquare, AlertTriangle, History, MapPin } from "lucide-react"

interface StaffDetailTabsProps {
  activeTab: string
  onChange: (value: string) => void
  type: "driver" | "pa"
}

export function StaffDetailTabs({ activeTab, onChange, type }: StaffDetailTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={onChange} className="w-full">
      <TabsList className="w-full bg-white p-1 rounded-xl border border-gray-200 shadow-sm mb-6">
        <TabTrigger value="overview" icon={<User className="h-4 w-4" />} label="Overview" />
        <TabTrigger value="documents" icon={<FileText className="h-4 w-4" />} label="Documents" />
        {type === "driver" && <TabTrigger value="vehicle" icon={<Car className="h-4 w-4" />} label="Vehicle" />}
        <TabTrigger value="schedule" icon={<Calendar className="h-4 w-4" />} label="Schedule" />
        <TabTrigger value="performance" icon={<TrendingUp className="h-4 w-4" />} label="Performance" />
        <TabTrigger value="routes" icon={<MapPin className="h-4 w-4" />} label="Routes" />
        <TabTrigger value="history" icon={<History className="h-4 w-4" />} label="History" />
        <TabTrigger value="notes" icon={<MessageSquare className="h-4 w-4" />} label="Notes" />
        <TabTrigger value="compliance" icon={<AlertTriangle className="h-4 w-4" />} label="Compliance" />
      </TabsList>
    </Tabs>
  )
}

interface TabTriggerProps {
  value: string
  icon: React.ReactNode
  label: string
}

function TabTrigger({ value, icon, label }: TabTriggerProps) {
  return (
    <TabsTrigger
      value={value}
      className="flex items-center justify-center gap-2 py-2 px-3 data-[state=active]:bg-yellow-50 data-[state=active]:text-yellow-900 data-[state=active]:shadow-sm rounded-lg transition-all"
    >
      {icon}
      <span className="hidden md:inline">{label}</span>
    </TabsTrigger>
  )
}

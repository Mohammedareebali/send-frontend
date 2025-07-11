"use client"

import type * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  ClipboardList,
  FileText,
  Home,
  MapPin,
  MessageSquare,
  PlusCircle,
  Settings,
  Users,
  Search,
  Bell,
  DollarSign,
  Shield,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function AppSidebar() {
  const pathname = usePathname()

  const alerts = {
    documentExpiry: 5,
    pendingTasks: 8,
    staffAvailability: 3,
    routeIssues: 2,
  }

  const navItems = [
    { href: "/dashboard", icon: Home, label: "Control Center", section: "Operations" },
    {
      href: "/dashboard/routes",
      icon: MapPin,
      label: "Routes Management",
      section: "Operations",
      alert: alerts.routeIssues,
    },
    {
      href: "/dashboard/staff",
      icon: Users,
      label: "Staff Management",
      section: "Operations",
      alert: alerts.staffAvailability,
    },
    { href: "/dashboard/safety", icon: Shield, label: "Safety Monitor", section: "Operations" },
    { href: "/dashboard/communication", icon: MessageSquare, label: "Communication", section: "Operations" },
    { href: "/dashboard/new-run", icon: PlusCircle, label: "Emergency Run", section: "Quick Actions" },
    { href: "/dashboard/job-history", icon: ClipboardList, label: "Job History", section: "Records" },
    {
      href: "/dashboard/reports/documentation",
      icon: FileText,
      label: "Documentation",
      section: "Compliance",
      alert: alerts.documentExpiry,
    },
    {
      href: "/dashboard/reports/performance",
      icon: BarChart3,
      label: "Performance",
      section: "Analytics",
    },
    { href: "/dashboard/reports/invoicing", icon: DollarSign, label: "Invoicing", section: "Analytics" },
    { href: "/dashboard/settings", icon: Settings, label: "Settings", section: "System" },
  ]

  const sections = navItems.reduce(
    (acc, item) => {
      if (!acc[item.section]) {
        acc[item.section] = []
      }
      acc[item.section].push(item)
      return acc
    },
    {} as Record<string, typeof navItems>,
  )

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-r border-slate-800/50 flex flex-col sticky top-0 backdrop-blur-xl">
      {/* Header */}
      <div className="p-4 border-b border-slate-800/50 bg-slate-900/30 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg shadow-lg">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div className="font-bold text-lg bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            SEN Transport
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            placeholder="Search..."
            className="pl-10 bg-slate-800/50 border-slate-700/50 text-slate-200 placeholder:text-slate-400 focus:border-slate-600 focus:ring-slate-600/20 backdrop-blur-sm"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
        {Object.entries(sections).map(([section, items]) => (
          <div key={section} className="mb-6">
            <h3 className="px-4 mb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">{section}</h3>
            <ul className="space-y-1 px-2">
              {items.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group relative",
                        isActive
                          ? "text-white bg-gradient-to-r from-blue-600/80 to-purple-600/80 shadow-lg shadow-blue-500/20 border border-blue-400/30"
                          : "text-slate-300 hover:text-white hover:bg-slate-800/50 hover:shadow-md",
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-5 w-5 mr-3 transition-colors duration-200",
                          isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200",
                        )}
                      />
                      <span className="flex-1">{item.label}</span>
                      {item.alert && (
                        <Badge
                          variant={item.alert > 3 ? "destructive" : "outline"}
                          className={cn(
                            "ml-2 text-xs font-semibold",
                            item.alert > 3
                              ? "bg-red-500/20 text-red-300 border-red-400/30"
                              : "bg-amber-500/20 text-amber-300 border-amber-400/30",
                          )}
                        >
                          {item.alert}
                        </Badge>
                      )}
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent rounded-lg pointer-events-none" />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800/50 bg-slate-900/30 backdrop-blur-sm">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm hover:bg-slate-700/50 transition-all duration-200">
          <Avatar className="h-10 w-10 border-2 border-gradient-to-r from-blue-600 to-purple-600">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white font-semibold">
              TC
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-200">Transport Control</p>
            <p className="text-xs text-slate-400">Operations Manager</p>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 h-8 w-8"
            >
              <Bell className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 h-8 w-8"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function SidebarWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <AppSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">{children}</div>
    </div>
  )
}

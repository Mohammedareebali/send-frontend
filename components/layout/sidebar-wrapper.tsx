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
  Shield,
  AlertTriangle,
  Phone,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const alerts = {
    emergencies: 2,
    routeIssues: 5,
    staffAvailability: 3,
    safetyAlerts: 1,
    documentExpiry: 8,
  }

  const navItems = [
    {
      href: "/dashboard",
      icon: Home,
      label: "Control Center",
      section: "Operations",
      description: "Main dashboard overview",
    },
    {
      href: "/dashboard/emergency",
      icon: AlertTriangle,
      label: "Emergency Response",
      section: "Critical",
      alert: alerts.emergencies,
      description: "Emergency protocols & response",
      urgent: true,
    },
    {
      href: "/dashboard/routes",
      icon: MapPin,
      label: "Routes Control",
      section: "Operations",
      alert: alerts.routeIssues,
      description: "Live route monitoring",
    },
    {
      href: "/dashboard/safety",
      icon: Shield,
      label: "Safety Monitor",
      section: "Critical",
      alert: alerts.safetyAlerts,
      description: "Student welfare tracking",
    },
    {
      href: "/dashboard/staff",
      icon: Users,
      label: "Staff Management",
      section: "Operations",
      alert: alerts.staffAvailability,
      description: "Driver & PA assignment",
    },
    {
      href: "/dashboard/communication",
      icon: MessageSquare,
      label: "Communication Hub",
      section: "Operations",
      description: "Multi-channel messaging",
    },
    {
      href: "/dashboard/emergency-run",
      icon: PlusCircle,
      label: "Emergency Run",
      section: "Quick Actions",
      description: "Create urgent transport",
      urgent: true,
    },
    {
      href: "/dashboard/analytics",
      icon: BarChart3,
      label: "Performance Analytics",
      section: "Insights",
      description: "KPIs & reporting",
    },
    {
      href: "/dashboard/compliance",
      icon: FileText,
      label: "Compliance Center",
      section: "Management",
      alert: alerts.documentExpiry,
      description: "Documentation & audits",
    },
    {
      href: "/dashboard/history",
      icon: ClipboardList,
      label: "Operation History",
      section: "Records",
      description: "Historical data & logs",
    },
    {
      href: "/dashboard/settings",
      icon: Settings,
      label: "System Settings",
      section: "Administration",
      description: "Configuration & preferences",
    },
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

  const totalAlerts = Object.values(alerts).reduce((sum, count) => sum + count, 0)

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-72 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-r border-slate-800/50 flex flex-col sticky top-0 h-screen backdrop-blur-xl">
        {/* Header */}
        <div className="p-6 border-b border-slate-800/50 bg-slate-900/30 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 rounded-xl shadow-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-xl gradient-text">SEN Transport</div>
              <div className="text-xs text-slate-400 font-medium">Control Center</div>
            </div>
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search operations..."
              className="pl-10 bg-slate-800/50 border-slate-700/50 text-slate-200 placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-blue-500/20"
            />
          </div>

          {/* Alert Summary */}
          {totalAlerts > 0 && (
            <div className="p-3 bg-gradient-to-r from-red-950/50 to-orange-950/50 border border-red-800/30 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <span className="text-red-300 font-medium text-sm">Active Alerts</span>
                <Badge className="bg-red-500/20 text-red-300 border-red-500/30 ml-auto">{totalAlerts}</Badge>
              </div>
              <div className="text-xs text-red-200/80">
                {alerts.emergencies > 0 && `${alerts.emergencies} emergencies, `}
                {alerts.safetyAlerts > 0 && `${alerts.safetyAlerts} safety alerts`}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
          {Object.entries(sections).map(([section, items]) => (
            <div key={section} className="mb-6">
              <h3 className="px-6 mb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">{section}</h3>
              <ul className="space-y-1 px-3">
                {items.map((item) => {
                  const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 group relative",
                          isActive
                            ? "text-white bg-gradient-to-r from-blue-600/80 to-purple-600/80 shadow-lg shadow-blue-500/20 border border-blue-400/30"
                            : item.urgent
                              ? "text-white bg-gradient-to-r from-red-600/60 to-orange-600/60 hover:from-red-600/80 hover:to-orange-600/80 shadow-md"
                              : "text-slate-300 hover:text-white hover:bg-slate-800/50 hover:shadow-md",
                        )}
                      >
                        <item.icon
                          className={cn(
                            "h-5 w-5 mr-3 transition-colors duration-200",
                            isActive
                              ? "text-white"
                              : item.urgent
                                ? "text-white"
                                : "text-slate-400 group-hover:text-slate-200",
                          )}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium">{item.label}</div>
                          <div className="text-xs opacity-75 truncate">{item.description}</div>
                        </div>
                        {item.alert && (
                          <Badge
                            className={cn(
                              "ml-2 text-xs font-semibold",
                              item.urgent || item.alert > 5
                                ? "bg-red-500/20 text-red-300 border-red-400/30 emergency-pulse"
                                : item.alert > 2
                                  ? "bg-yellow-500/20 text-yellow-300 border-yellow-400/30"
                                  : "bg-blue-500/20 text-blue-300 border-blue-400/30",
                            )}
                          >
                            {item.alert}
                          </Badge>
                        )}
                        {item.urgent && !item.alert && (
                          <div className="w-2 h-2 bg-red-400 rounded-full status-blink ml-2" />
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
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 transition-all duration-200">
            <Avatar className="h-12 w-12 border-2 border-blue-500/30">
              <AvatarImage src="/placeholder.svg?height=48&width=48" />
              <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white font-semibold">
                TC
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-200">Transport Control</p>
              <p className="text-xs text-slate-400">Operations Manager</p>
              <div className="flex items-center gap-1 mt-1">
                <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                <span className="text-xs text-emerald-300">Online</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
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
                <Phone className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">{children}</div>
    </div>
  )
}

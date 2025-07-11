"use client"

import { useState } from "react"
import { Bell, Search, Shield, Phone, AlertTriangle, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { usePathname } from "next/navigation"

interface DashboardHeaderProps {
  title?: string
  subtitle?: string
}

export function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  const [emergencyMode, setEmergencyMode] = useState(false)
  const pathname = usePathname()

  // Generate contextual title and subtitle if not provided
  const contextualTitle = title || getContextualTitle(pathname)
  const contextualSubtitle = subtitle || getContextualSubtitle(pathname)

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-all duration-300 ${
        emergencyMode
          ? "bg-red-950/90 border-red-800/50 shadow-lg shadow-red-900/20"
          : "bg-slate-900/90 border-slate-800/50"
      }`}
    >
      <div className="flex h-20 items-center px-6 gap-6">
        {/* Title Section */}
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <div
            className={`p-3 rounded-xl transition-all duration-300 ${
              emergencyMode
                ? "bg-red-600 shadow-lg shadow-red-600/30"
                : "bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-600/20"
            }`}
          >
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold text-white truncate">{contextualTitle}</h1>
            <p className="text-sm text-slate-400 truncate">{contextualSubtitle}</p>
          </div>
        </div>

        {/* Emergency Mode Toggle */}
        <Button
          onClick={() => setEmergencyMode(!emergencyMode)}
          className={`transition-all duration-300 ${
            emergencyMode
              ? "bg-red-600 hover:bg-red-700 text-white emergency-pulse shadow-lg shadow-red-600/30"
              : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
          }`}
        >
          <AlertTriangle className="h-4 w-4 mr-2" />
          {emergencyMode ? "Emergency Active" : "Emergency Mode"}
        </Button>

        {/* Search */}
        <div className="relative w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search routes, students, staff..."
            className="pl-10 bg-slate-800/50 border-slate-700 text-slate-200 placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-blue-500/20"
          />
        </div>

        {/* Status & Actions */}
        <div className="flex items-center gap-3">
          {/* System Status */}
          <div className="flex items-center gap-2 px-3 py-2 bg-emerald-900/30 border border-emerald-700/50 rounded-full">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-xs text-emerald-300 font-medium">All Systems Online</span>
          </div>

          {/* Quick Actions */}
          <Button
            variant="ghost"
            size="icon"
            className="relative text-slate-300 hover:text-white hover:bg-slate-800/50"
          >
            <Activity className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative text-slate-300 hover:text-white hover:bg-slate-800/50"
          >
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-red-500 text-white text-xs flex items-center justify-center">
              3
            </Badge>
          </Button>

          <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white hover:bg-slate-800/50">
            <Phone className="h-5 w-5" />
          </Button>

          {/* User Avatar */}
          <Avatar className="h-10 w-10 ring-2 ring-slate-700 hover:ring-blue-500/50 transition-all duration-200">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white font-semibold">
              TC
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}

function getContextualTitle(pathname: string | null): string {
  if (!pathname) return "SEN Transport Control"

  if (pathname === "/dashboard") return "Control Center"
  if (pathname.includes("/emergency")) return "Emergency Response Center"
  if (pathname.includes("/routes")) return "Routes Control Center"
  if (pathname.includes("/safety")) return "Safety Control Center"
  if (pathname.includes("/staff")) return "Staff Management Center"
  if (pathname.includes("/communication")) return "Communication Hub"
  if (pathname.includes("/analytics")) return "Performance Analytics"
  if (pathname.includes("/compliance")) return "Compliance Center"

  return "SEN Transport Control"
}

function getContextualSubtitle(pathname: string | null): string {
  if (!pathname) return "Real-time transport operations management"

  if (pathname === "/dashboard") return "Real-time operations overview and emergency response"
  if (pathname.includes("/emergency")) return "Critical incident management and emergency protocols"
  if (pathname.includes("/routes")) return "Live route monitoring and optimization"
  if (pathname.includes("/safety")) return "Student welfare tracking and incident management"
  if (pathname.includes("/staff")) return "Driver and PA assignment, availability, and compliance"
  if (pathname.includes("/communication")) return "Multi-channel messaging and notifications"
  if (pathname.includes("/analytics")) return "Performance metrics and operational insights"
  if (pathname.includes("/compliance")) return "Documentation management and audit compliance"

  return "Advanced transport management for special educational needs"
}

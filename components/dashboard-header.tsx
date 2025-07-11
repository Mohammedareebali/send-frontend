"use client"

import { useState } from "react"
import { Bell, Search, Shield, Phone, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function DashboardHeader() {
  const [emergencyMode, setEmergencyMode] = useState(false)

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-all duration-300 ${
        emergencyMode ? "bg-red-950/90 border-red-800/50" : "bg-slate-900/90 border-slate-800/50"
      }`}
    >
      <div className="flex h-16 items-center px-6 gap-4">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-xl transition-all duration-300 ${
              emergencyMode ? "bg-red-600" : "bg-gradient-to-r from-blue-600 to-purple-600"
            }`}
          >
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">SEN Transport Control</h1>
            <p className="text-xs text-slate-400">Real-time Operations Center</p>
          </div>
        </div>

        {/* Emergency Toggle */}
        <Button
          onClick={() => setEmergencyMode(!emergencyMode)}
          className={`ml-4 transition-all duration-300 ${
            emergencyMode
              ? "bg-red-600 hover:bg-red-700 text-white animate-pulse"
              : "bg-slate-800 hover:bg-slate-700 text-slate-300"
          }`}
        >
          <AlertTriangle className="h-4 w-4 mr-2" />
          {emergencyMode ? "Emergency Active" : "Emergency Mode"}
        </Button>

        {/* Search */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search routes, students, staff..."
              className="pl-10 bg-slate-800/50 border-slate-700 text-slate-200 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 bg-emerald-900/30 border border-emerald-700/50 rounded-full">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-emerald-300 font-medium">All Systems Online</span>
          </div>

          <Button variant="ghost" size="icon" className="relative text-slate-300 hover:text-white">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-red-500 text-white text-xs">3</Badge>
          </Button>

          <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white">
            <Phone className="h-5 w-5" />
          </Button>

          <Avatar className="h-8 w-8 ring-2 ring-slate-700">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback className="bg-slate-700 text-slate-200">TC</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}

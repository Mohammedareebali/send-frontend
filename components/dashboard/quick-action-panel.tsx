"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Users,
  Phone,
  AlertTriangle,
  Navigation,
  FileText,
  Zap,
  MessageSquare,
  Shield,
  Activity,
  Clock,
} from "lucide-react"

export function QuickActionPanel() {
  const emergencyActions = [
    {
      icon: Plus,
      label: "Emergency Run",
      description: "Create urgent transport",
      color: "bg-red-600 hover:bg-red-700",
      urgent: true,
      shortcut: "Ctrl+E",
    },
    {
      icon: Phone,
      label: "Emergency Contact",
      description: "Contact all drivers",
      color: "bg-orange-600 hover:bg-orange-700",
      urgent: true,
      shortcut: "Ctrl+C",
    },
    {
      icon: Shield,
      label: "Safety Alert",
      description: "Broadcast safety notice",
      color: "bg-red-600 hover:bg-red-700",
      urgent: true,
      shortcut: "Ctrl+S",
    },
  ]

  const quickActions = [
    {
      icon: Users,
      label: "Staff Assignment",
      description: "Assign available staff",
      color: "bg-blue-600 hover:bg-blue-700",
      badge: "3 pending",
      shortcut: "Ctrl+A",
    },
    {
      icon: Navigation,
      label: "Live Map",
      description: "View all routes",
      color: "bg-emerald-600 hover:bg-emerald-700",
      shortcut: "Ctrl+M",
    },
    {
      icon: MessageSquare,
      label: "Broadcast Message",
      description: "Send to all parents",
      color: "bg-purple-600 hover:bg-purple-700",
      shortcut: "Ctrl+B",
    },
    {
      icon: FileText,
      label: "Incident Report",
      description: "Log new incident",
      color: "bg-yellow-600 hover:bg-yellow-700",
      shortcut: "Ctrl+I",
    },
    {
      icon: Activity,
      label: "System Status",
      description: "Check all systems",
      color: "bg-slate-600 hover:bg-slate-700",
      shortcut: "Ctrl+T",
    },
  ]

  const pendingTasks = [
    {
      id: 1,
      task: "Review driver medical certificates",
      priority: "high",
      due: "Today",
      count: 3,
      urgent: true,
    },
    {
      id: 2,
      task: "Approve route modifications",
      priority: "medium",
      due: "Tomorrow",
      count: 2,
      urgent: false,
    },
    {
      id: 3,
      task: "Update parent contact details",
      priority: "low",
      due: "This week",
      count: 8,
      urgent: false,
    },
    {
      id: 4,
      task: "Vehicle maintenance checks",
      priority: "high",
      due: "Today",
      count: 2,
      urgent: true,
    },
  ]

  const getPriorityColor = (priority: string, urgent: boolean) => {
    if (urgent) return "bg-red-500/20 text-red-300 border-red-500/30"
    switch (priority) {
      case "high":
        return "bg-orange-500/20 text-orange-300 border-orange-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      case "low":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      default:
        return "bg-slate-500/20 text-slate-300 border-slate-500/30"
    }
  }

  return (
    <div className="space-y-6">
      {/* Emergency Actions */}
      <Card className="bg-gradient-to-r from-red-950/30 to-red-900/20 border-red-800/30">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-red-600/20 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Emergency Actions</h3>
              <p className="text-sm text-red-200/80">Critical response tools</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {emergencyActions.map((action, index) => (
            <Button key={index} className={`w-full justify-start h-auto p-4 ${action.color} text-white relative group`}>
              <action.icon className="h-5 w-5 mr-3" />
              <div className="text-left flex-1">
                <div className="font-medium">{action.label}</div>
                <div className="text-xs opacity-90">{action.description}</div>
              </div>
              <div className="text-xs opacity-75">{action.shortcut}</div>
              <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full emergency-pulse" />
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-blue-600/20 rounded-lg">
              <Zap className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
              <p className="text-sm text-slate-400">Frequently used tools</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {quickActions.map((action, index) => (
            <Button key={index} className={`w-full justify-start h-auto p-4 ${action.color} text-white relative group`}>
              <action.icon className="h-5 w-5 mr-3" />
              <div className="text-left flex-1">
                <div className="font-medium">{action.label}</div>
                <div className="text-xs opacity-90">{action.description}</div>
              </div>
              <div className="flex items-center gap-2">
                {action.badge && (
                  <Badge className="bg-white/20 text-white border-white/30 text-xs">{action.badge}</Badge>
                )}
                <div className="text-xs opacity-75">{action.shortcut}</div>
              </div>
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Pending Tasks */}
      <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-yellow-600/20 rounded-lg">
              <Clock className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Pending Tasks</h3>
              <p className="text-sm text-slate-400">Requires attention</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {pendingTasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 hover:bg-slate-800/50 ${
                task.urgent ? "bg-red-950/30 border-red-800/30" : "bg-slate-800/30 border-slate-700/50"
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className="text-slate-200 font-medium text-sm">{task.task}</div>
                  {task.urgent && <div className="w-2 h-2 bg-red-400 rounded-full status-blink" />}
                </div>
                <div className="text-slate-400 text-xs">Due: {task.due}</div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getPriorityColor(task.priority, task.urgent)}>{task.count}</Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

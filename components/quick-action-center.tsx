"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Users, Phone, AlertTriangle, Navigation, FileText, Zap, MessageSquare } from "lucide-react"

export function QuickActionCenter() {
  const quickActions = [
    {
      icon: Plus,
      label: "New Emergency Run",
      description: "Create urgent transport",
      color: "bg-red-600 hover:bg-red-700",
      urgent: true,
    },
    {
      icon: Users,
      label: "Staff Assignment",
      description: "Assign available staff",
      color: "bg-blue-600 hover:bg-blue-700",
      badge: "3 pending",
    },
    {
      icon: Phone,
      label: "Emergency Contact",
      description: "Contact all drivers",
      color: "bg-orange-600 hover:bg-orange-700",
    },
    {
      icon: Navigation,
      label: "Live Map",
      description: "View all routes",
      color: "bg-emerald-600 hover:bg-emerald-700",
    },
    {
      icon: MessageSquare,
      label: "Broadcast Message",
      description: "Send to all parents",
      color: "bg-purple-600 hover:bg-purple-700",
    },
    {
      icon: FileText,
      label: "Incident Report",
      description: "Log new incident",
      color: "bg-yellow-600 hover:bg-yellow-700",
    },
  ]

  const pendingTasks = [
    {
      id: 1,
      task: "Review driver medical certificates",
      priority: "high",
      due: "Today",
      count: 3,
    },
    {
      id: 2,
      task: "Approve route modifications",
      priority: "medium",
      due: "Tomorrow",
      count: 2,
    },
    {
      id: 3,
      task: "Update parent contact details",
      priority: "low",
      due: "This week",
      count: 8,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-orange-600/20 rounded-lg">
              <Zap className="h-5 w-5 text-orange-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
              <p className="text-sm text-slate-400">Immediate response tools</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {quickActions.map((action, index) => (
            <Button key={index} className={`w-full justify-start h-auto p-4 ${action.color} text-white relative`}>
              <action.icon className="h-5 w-5 mr-3" />
              <div className="text-left flex-1">
                <div className="font-medium">{action.label}</div>
                <div className="text-xs opacity-90">{action.description}</div>
              </div>
              {action.badge && <Badge className="bg-white/20 text-white border-white/30">{action.badge}</Badge>}
              {action.urgent && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              )}
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Pending Tasks */}
      <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-yellow-600/20 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
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
              className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg border border-slate-700/50"
            >
              <div className="flex-1">
                <div className="text-slate-200 font-medium text-sm">{task.task}</div>
                <div className="text-slate-400 text-xs">Due: {task.due}</div>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  className={`text-xs ${
                    task.priority === "high"
                      ? "bg-red-500/20 text-red-300 border-red-500/30"
                      : task.priority === "medium"
                        ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                        : "bg-slate-500/20 text-slate-300 border-slate-500/30"
                  }`}
                >
                  {task.count}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

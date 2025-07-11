"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Shield, AlertTriangle, CheckCircle, Phone, Navigation, Users, Activity, Heart, Brain, Eye } from "lucide-react"

export function SafetyMonitoringPanel() {
  const safetyMetrics = {
    studentsOnBoard: 45,
    studentsDelivered: 123,
    studentsWaiting: 8,
    activeAlerts: 2,
    safetyScore: 98,
  }

  const activeAlerts = [
    {
      id: "SAFE-001",
      student: "Emma Thompson",
      route: "RT-023",
      type: "medical",
      status: "monitoring",
      description: "Requires inhaler - driver and PA notified",
      time: "08:30",
      priority: "medium",
      actions: ["Driver briefed", "Inhaler on board", "Parent contacted"],
    },
    {
      id: "SAFE-002",
      student: "James Wilson",
      route: "RT-045",
      type: "behavioral",
      status: "resolved",
      description: "Anxiety episode managed - PA provided support",
      time: "08:15",
      priority: "low",
      actions: ["PA intervention", "Calming techniques used", "Student settled"],
    },
  ]

  const safetyProtocols = [
    { name: "Real-time GPS tracking", status: "active", icon: Navigation },
    { name: "Emergency contact system", status: "active", icon: Phone },
    { name: "Medical alert monitoring", status: "active", icon: Heart },
    { name: "Behavioral support protocols", status: "active", icon: Brain },
    { name: "Parent notification system", status: "active", icon: Users },
    { name: "Staff safety training", status: "current", icon: Shield },
  ]

  const getAlertColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      case "low":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      default:
        return "bg-slate-500/20 text-slate-300 border-slate-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "monitoring":
        return <Eye className="h-4 w-4 text-yellow-400" />
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-emerald-400" />
      case "escalated":
        return <AlertTriangle className="h-4 w-4 text-red-400" />
      default:
        return <Activity className="h-4 w-4 text-slate-400" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "medical":
        return <Heart className="h-4 w-4 text-red-400" />
      case "behavioral":
        return <Brain className="h-4 w-4 text-purple-400" />
      default:
        return <Shield className="h-4 w-4 text-slate-400" />
    }
  }

  return (
    <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-emerald-600/20 rounded-lg">
              <Shield className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">Safety Monitoring</h3>
              <p className="text-sm text-slate-400">Real-time student welfare tracking</p>
            </div>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
              Safety Score: {safetyMetrics.safetyScore}%
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Safety Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-slate-800/30 rounded-lg border border-slate-700/50">
            <div className="text-2xl font-bold text-blue-400">{safetyMetrics.studentsOnBoard}</div>
            <div className="text-xs text-slate-400">On Board</div>
          </div>
          <div className="text-center p-3 bg-slate-800/30 rounded-lg border border-slate-700/50">
            <div className="text-2xl font-bold text-emerald-400">{safetyMetrics.studentsDelivered}</div>
            <div className="text-xs text-slate-400">Delivered Safely</div>
          </div>
          <div className="text-center p-3 bg-slate-800/30 rounded-lg border border-slate-700/50">
            <div className="text-2xl font-bold text-yellow-400">{safetyMetrics.studentsWaiting}</div>
            <div className="text-xs text-slate-400">Awaiting Pickup</div>
          </div>
          <div className="text-center p-3 bg-slate-800/30 rounded-lg border border-slate-700/50">
            <div className="text-2xl font-bold text-red-400">{safetyMetrics.activeAlerts}</div>
            <div className="text-xs text-slate-400">Active Alerts</div>
          </div>
        </div>

        {/* Safety Score Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-300 font-medium">Overall Safety Score</span>
            <span className="text-emerald-400 font-semibold">{safetyMetrics.safetyScore}%</span>
          </div>
          <Progress value={safetyMetrics.safetyScore} className="h-3" />
          <div className="text-xs text-slate-400">
            Based on protocol compliance, incident frequency, and response times
          </div>
        </div>

        {/* Active Safety Alerts */}
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-white flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            Active Safety Alerts ({activeAlerts.length})
          </h4>

          {activeAlerts.map((alert) => (
            <Card key={alert.id} className="bg-slate-800/30 border-slate-700/50">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getTypeIcon(alert.type)}
                    {getStatusIcon(alert.status)}
                    <div>
                      <div className="font-semibold text-white">{alert.student}</div>
                      <div className="text-sm text-slate-400">
                        {alert.route} • {alert.time}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getAlertColor(alert.priority)}>{alert.priority.toUpperCase()}</Badge>
                    <Badge className="bg-slate-600/50 text-slate-300 capitalize">{alert.type}</Badge>
                  </div>
                </div>

                <div className="text-slate-300 text-sm mb-3">{alert.description}</div>

                <div className="mb-3">
                  <div className="text-xs text-slate-400 mb-2">Actions taken:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {alert.actions.map((action, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs">
                        <CheckCircle className="h-3 w-3 text-emerald-400" />
                        <span className="text-emerald-300">{action}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Phone className="h-3 w-3 mr-1" />
                    Contact
                  </Button>
                  <Button size="sm" variant="outline" className="bg-slate-700/50 border-slate-600 text-slate-300">
                    <Navigation className="h-3 w-3 mr-1" />
                    Track
                  </Button>
                  {alert.status === "monitoring" && (
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Resolve
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Safety Protocols Status */}
        <div className="bg-slate-800/20 border border-slate-700/30 rounded-lg p-4">
          <h4 className="font-medium text-slate-200 mb-3 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-emerald-400" />
            Safety Protocols Status
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {safetyProtocols.map((protocol, index) => (
              <div key={index} className="flex items-center gap-3 p-2 bg-slate-700/30 rounded">
                <protocol.icon className="h-4 w-4 text-emerald-400" />
                <span className="text-slate-300 text-sm flex-1">{protocol.name}</span>
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs">
                  {protocol.status.toUpperCase()}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

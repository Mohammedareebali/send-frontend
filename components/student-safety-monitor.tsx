"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, AlertTriangle, CheckCircle, Phone, Navigation } from "lucide-react"

export function StudentSafetyMonitor() {
  const safetyAlerts = [
    {
      id: "SAFE-001",
      student: "Emma Thompson",
      route: "RT-023",
      type: "medical",
      status: "monitoring",
      description: "Requires inhaler - driver notified",
      time: "08:30",
      priority: "medium",
    },
    {
      id: "SAFE-002",
      student: "James Wilson",
      route: "RT-045",
      type: "behavioral",
      status: "resolved",
      description: "Anxiety episode - PA provided support",
      time: "08:15",
      priority: "low",
    },
  ]

  const studentStatus = {
    onBoard: 45,
    delivered: 123,
    pending: 8,
    alerts: 2,
  }

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
        return <AlertTriangle className="h-4 w-4 text-yellow-400" />
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-emerald-400" />
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
              <h3 className="text-xl font-semibold text-white">Student Safety Monitor</h3>
              <p className="text-sm text-slate-400">Real-time welfare tracking</p>
            </div>
          </CardTitle>
          <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">All Safe</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Safety Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-slate-800/30 rounded-lg border border-slate-700/50">
            <div className="text-2xl font-bold text-blue-400">{studentStatus.onBoard}</div>
            <div className="text-xs text-slate-400">On Board</div>
          </div>
          <div className="text-center p-3 bg-slate-800/30 rounded-lg border border-slate-700/50">
            <div className="text-2xl font-bold text-emerald-400">{studentStatus.delivered}</div>
            <div className="text-xs text-slate-400">Delivered</div>
          </div>
          <div className="text-center p-3 bg-slate-800/30 rounded-lg border border-slate-700/50">
            <div className="text-2xl font-bold text-yellow-400">{studentStatus.pending}</div>
            <div className="text-xs text-slate-400">Pending</div>
          </div>
          <div className="text-center p-3 bg-slate-800/30 rounded-lg border border-slate-700/50">
            <div className="text-2xl font-bold text-red-400">{studentStatus.alerts}</div>
            <div className="text-xs text-slate-400">Alerts</div>
          </div>
        </div>

        {/* Active Safety Alerts */}
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-white flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            Active Safety Alerts
          </h4>

          {safetyAlerts.map((alert) => (
            <Card key={alert.id} className="bg-slate-800/30 border-slate-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(alert.status)}
                    <div>
                      <div className="font-semibold text-white">{alert.student}</div>
                      <div className="text-sm text-slate-400">
                        {alert.route} • {alert.time}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getAlertColor(alert.priority)}>{alert.priority.toUpperCase()}</Badge>
                    <Badge className="bg-slate-600/50 text-slate-300">{alert.type}</Badge>
                  </div>
                </div>

                <div className="mt-3 text-slate-300 text-sm">{alert.description}</div>

                <div className="flex gap-2 mt-3">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Phone className="h-3 w-3 mr-1" />
                    Contact
                  </Button>
                  <Button size="sm" variant="outline" className="bg-slate-700/50 border-slate-600 text-slate-300">
                    <Navigation className="h-3 w-3 mr-1" />
                    Track
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Safety Protocols Status */}
        <div className="bg-slate-800/20 border border-slate-700/30 rounded-lg p-4">
          <h4 className="font-medium text-slate-200 mb-3 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-emerald-400" />
            Safety Protocols Active
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "Real-time GPS tracking",
              "Emergency contact system",
              "Medical alert monitoring",
              "Behavioral support protocols",
              "Parent notification system",
              "Staff safety training current",
            ].map((protocol, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-3 w-3 text-emerald-400" />
                <span className="text-slate-300">{protocol}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

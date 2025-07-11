"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Phone, Navigation, Users, Clock, X } from "lucide-react"

export function EmergencyAlertPanel() {
  const [alerts, setAlerts] = useState([
    {
      id: "EMRG-001",
      type: "breakdown",
      severity: "critical",
      route: "RT-045",
      driver: "Sarah Johnson",
      students: 4,
      location: "A34 Junction 12",
      time: "2 min ago",
      description: "Vehicle breakdown - engine failure",
      actions: ["Emergency services contacted", "Replacement vehicle dispatched"],
    },
    {
      id: "EMRG-002",
      type: "medical",
      severity: "high",
      route: "RT-023",
      driver: "Mike Thompson",
      students: 1,
      location: "Oakwood School",
      time: "5 min ago",
      description: "Student medical emergency - seizure",
      actions: ["Paramedics en route", "Parents contacted"],
    },
  ])

  const dismissAlert = (id: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))
  }

  if (alerts.length === 0) return null

  return (
    <div className="space-y-3">
      {alerts.map((alert) => (
        <Card key={alert.id} className="bg-gradient-to-r from-red-950/50 to-red-900/30 border-red-800/50 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              {/* Alert Icon */}
              <div className="p-3 bg-red-600 rounded-full animate-pulse">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>

              {/* Alert Details */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Badge className="bg-red-600 text-white font-semibold">
                    {alert.severity.toUpperCase()} EMERGENCY
                  </Badge>
                  <span className="text-slate-300 text-sm">{alert.id}</span>
                  <span className="text-slate-400 text-sm">{alert.time}</span>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">{alert.description}</h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Navigation className="h-4 w-4" />
                    <span>
                      {alert.route} - {alert.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Users className="h-4 w-4" />
                    <span>{alert.driver}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Users className="h-4 w-4" />
                    <span>{alert.students} students affected</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Clock className="h-4 w-4" />
                    <span>Response active</span>
                  </div>
                </div>

                {/* Actions Taken */}
                <div className="mb-4">
                  <p className="text-sm text-slate-400 mb-2">Actions taken:</p>
                  <ul className="space-y-1">
                    {alert.actions.map((action, index) => (
                      <li key={index} className="text-sm text-emerald-300 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Driver
                </Button>
                <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 bg-transparent">
                  <Navigation className="h-4 w-4 mr-2" />
                  Track Live
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => dismissAlert(alert.id)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

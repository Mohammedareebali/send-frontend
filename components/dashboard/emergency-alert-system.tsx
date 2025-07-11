"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Clock, MapPin, Phone, X } from "lucide-react"
import { useState } from "react"

export function EmergencyAlertSystem() {
  const [alerts, setAlerts] = useState([
    {
      id: "ALERT-001",
      type: "incident",
      severity: "high",
      title: "Student Behavioral Issue - Route R004",
      description: "Student requiring immediate attention on Hillside School route",
      location: "Park Avenue, near Hillside School",
      time: "2 minutes ago",
      route: "R004",
      driver: "Alex Brown",
      driverPhone: "07123 456789",
      pa: "Sarah Lee",
      paPhone: "07987 654321",
      status: "active",
    },
  ])

  const dismissAlert = (alertId: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== alertId))
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-600/20 border-red-500/50 text-red-300"
      case "high":
        return "bg-orange-600/20 border-orange-500/50 text-orange-300"
      case "medium":
        return "bg-yellow-600/20 border-yellow-500/50 text-yellow-300"
      default:
        return "bg-blue-600/20 border-blue-500/50 text-blue-300"
    }
  }

  if (alerts.length === 0) {
    return null
  }

  return (
    <div className="space-y-3">
      {alerts.map((alert) => (
        <Card key={alert.id} className={`border-2 ${getSeverityColor(alert.severity)} backdrop-blur-sm animate-pulse`}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className="p-2 bg-red-600/20 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-white">{alert.title}</h3>
                    <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/20">
                      {alert.severity.toUpperCase()}
                    </Badge>
                  </div>

                  <p className="text-slate-300 mb-3">{alert.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-300">{alert.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-300">{alert.time}</span>
                    </div>
                    <div className="text-slate-300">
                      Route: <span className="font-medium">{alert.route}</span>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="mt-4 p-3 bg-slate-800/30 rounded-lg border border-slate-700/50">
                    <h4 className="text-sm font-medium text-slate-200 mb-2">Contact Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-slate-300">Driver: {alert.driver}</div>
                          <div className="text-slate-400 flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {alert.driverPhone}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-slate-300">PA: {alert.pa}</div>
                          <div className="text-slate-400 flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {alert.paPhone}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 ml-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => dismissAlert(alert.id)}
                  className="bg-slate-700/50 border-slate-600 hover:bg-slate-700"
                >
                  <X className="h-4 w-4" />
                </Button>
                <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                  Respond
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

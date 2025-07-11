"use client"

import * as React from "react"
import { AlertTriangle, CheckCircle2, Clock, ShieldAlert, MapPin, User, Zap } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

type IncidentStatus = "open" | "responding" | "resolved"
type IncidentSeverity = "low" | "medium" | "high" | "critical"

interface Incident {
  id: string
  title: string
  time: string
  status: IncidentStatus
  location: string
  severity: IncidentSeverity
  description: string
  assignedTo: string
  assignedPhone: string
  studentsAffected: number
  estimatedResolution: string
}

const INCIDENTS: Incident[] = [
  {
    id: "INC-4894",
    title: "Student Medical Emergency",
    time: "09:01",
    status: "open",
    location: "Thomas More School",
    severity: "critical",
    description: "Student experiencing seizure episode, paramedics en route",
    assignedTo: "Sarah Johnson",
    assignedPhone: "07700 900123",
    studentsAffected: 1,
    estimatedResolution: "15 min",
  },
  {
    id: "INC-4893",
    title: "Vehicle Breakdown",
    time: "09:14",
    status: "responding",
    location: "A406 North Circular",
    severity: "high",
    description: "Bus engine failure, replacement vehicle dispatched",
    assignedTo: "Mike Thompson",
    assignedPhone: "07700 900456",
    studentsAffected: 8,
    estimatedResolution: "25 min",
  },
  {
    id: "INC-4889",
    title: "Route Delay",
    time: "08:21",
    status: "resolved",
    location: "Beechtree Lane",
    severity: "medium",
    description: "Traffic congestion caused 15-minute delay",
    assignedTo: "Emma Wilson",
    assignedPhone: "07700 900789",
    studentsAffected: 5,
    estimatedResolution: "Resolved",
  },
]

export function EmergencyResponseCenter() {
  const [selectedIncident, setSelectedIncident] = React.useState<Incident | null>(INCIDENTS[0])

  const openIncidents = INCIDENTS.filter((i) => i.status === "open")
  const respondingIncidents = INCIDENTS.filter((i) => i.status === "responding")
  const resolvedIncidents = INCIDENTS.filter((i) => i.status === "resolved")

  const getSeverityColor = (severity: IncidentSeverity) => {
    switch (severity) {
      case "critical":
        return "bg-red-500/20 text-red-300 border-red-500/30"
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

  const getStatusColor = (status: IncidentStatus) => {
    switch (status) {
      case "open":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      case "responding":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      case "resolved":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
      default:
        return "bg-slate-500/20 text-slate-300 border-slate-500/30"
    }
  }

  const getStatusIcon = (status: IncidentStatus) => {
    switch (status) {
      case "open":
        return <AlertTriangle className="h-4 w-4" />
      case "responding":
        return <Clock className="h-4 w-4" />
      case "resolved":
        return <CheckCircle2 className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Emergency Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-red-950/30 to-red-900/20 border-red-800/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-600/20 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-red-300">{openIncidents.length}</div>
                <div className="text-sm text-red-200/80">Critical Open</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-950/30 to-yellow-900/20 border-yellow-800/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-600/20 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-300">{respondingIncidents.length}</div>
                <div className="text-sm text-yellow-200/80">Responding</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-emerald-950/30 to-emerald-900/20 border-emerald-800/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-600/20 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-300">{resolvedIncidents.length}</div>
                <div className="text-sm text-emerald-200/80">Resolved Today</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600/20 rounded-lg">
                <User className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-200">
                  {INCIDENTS.reduce((sum, inc) => sum + inc.studentsAffected, 0)}
                </div>
                <div className="text-sm text-slate-400">Students Affected</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Incidents List */}
        <div className="lg:col-span-2">
          <Card className="bg-slate-900/50 border-slate-800/50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-red-600/20 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Active Incidents</h3>
                  <p className="text-sm text-slate-400">Real-time emergency monitoring</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {INCIDENTS.map((incident) => (
                <div
                  key={incident.id}
                  onClick={() => setSelectedIncident(incident)}
                  className={cn(
                    "p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:bg-slate-800/50",
                    selectedIncident?.id === incident.id
                      ? "bg-slate-800/60 border-blue-500/50"
                      : "bg-slate-800/30 border-slate-700/50",
                  )}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(incident.status)}
                        <span className="font-semibold text-white text-sm">{incident.id}</span>
                      </div>
                      <Badge className={getSeverityColor(incident.severity)}>{incident.severity.toUpperCase()}</Badge>
                      <Badge className={getStatusColor(incident.status)}>{incident.status.toUpperCase()}</Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-slate-300 text-sm font-medium">{incident.time}</div>
                      <div className="text-slate-400 text-xs">ETA: {incident.estimatedResolution}</div>
                    </div>
                  </div>

                  <h4 className="font-semibold text-white mb-2">{incident.title}</h4>
                  <p className="text-slate-300 text-sm mb-3">{incident.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-slate-400">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">{incident.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <User className="h-3 w-3" />
                      <span>{incident.assignedTo}</span>
                    </div>
                    <div className="text-slate-400 text-xs">Contact: {incident.assignedPhone}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Action Panel */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="bg-slate-900/50 border-slate-800/50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-orange-600/20 rounded-lg">
                  <Zap className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Emergency Actions</h3>
                  <p className="text-sm text-slate-400">Critical response tools</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white h-12">
                <ShieldAlert className="mr-2 h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Emergency Protocol</div>
                  <div className="text-xs opacity-90">Activate full response</div>
                </div>
              </Button>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12">
                <MapPin className="mr-2 h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Live Map View</div>
                  <div className="text-xs opacity-90">Track all vehicles</div>
                </div>
              </Button>
            </CardContent>
          </Card>

          {/* Selected Incident Details */}
          {selectedIncident && (
            <Card className="bg-slate-900/50 border-slate-800/50">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-blue-600/20 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Incident Details</h3>
                    <p className="text-sm text-slate-400">{selectedIncident.id}</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">{selectedIncident.title}</h4>
                  <p className="text-slate-300 text-sm mb-3">{selectedIncident.description}</p>
                </div>

                <Separator className="bg-slate-700/50" />

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Status:</span>
                    <Badge className={getStatusColor(selectedIncident.status)}>
                      {selectedIncident.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Severity:</span>
                    <Badge className={getSeverityColor(selectedIncident.severity)}>
                      {selectedIncident.severity.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Location:</span>
                    <span className="text-slate-300 text-right max-w-[150px] truncate">
                      {selectedIncident.location}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Assigned To:</span>
                    <span className="text-slate-300">{selectedIncident.assignedTo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Contact:</span>
                    <span className="text-slate-300 text-xs">{selectedIncident.assignedPhone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Students:</span>
                    <span className="text-slate-300">{selectedIncident.studentsAffected}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">ETA Resolution:</span>
                    <span className="text-slate-300">{selectedIncident.estimatedResolution}</span>
                  </div>
                </div>

                <Separator className="bg-slate-700/50" />

                <div className="space-y-2">
                  <Button size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700">
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Mark Resolved
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full bg-slate-800/50 border-slate-700 text-slate-300"
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    View on Map
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

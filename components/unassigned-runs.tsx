"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Clock, MapPin, AlertTriangle, UserCheck, Zap, Phone } from "lucide-react"

export function UnassignedRuns() {
  const [selectedRun, setSelectedRun] = useState<string | null>(null)

  const unassignedRuns = [
    {
      id: "RUN-001",
      student: "Emma Thompson",
      pickup: "123 Oak Street, Riverside",
      destination: "Greenfield Primary School",
      time: "08:30",
      priority: "high",
      requirements: ["Wheelchair accessible", "PA required"],
      distance: "12.5 km",
      estimatedDuration: "25 min",
    },
    {
      id: "RUN-002",
      student: "James Wilson",
      pickup: "456 Maple Avenue, Oakwood",
      destination: "Riverside Secondary School",
      time: "08:45",
      priority: "medium",
      requirements: ["Behavioral support"],
      distance: "8.2 km",
      estimatedDuration: "18 min",
    },
    {
      id: "RUN-003",
      student: "Sophie Davis",
      pickup: "789 Pine Road, Hillside",
      destination: "Meadowbrook Academy",
      time: "09:00",
      priority: "low",
      requirements: ["Standard transport"],
      distance: "6.8 km",
      estimatedDuration: "15 min",
    },
  ]

  const availableStaff = {
    drivers: [
      { id: "D001", name: "John Smith", status: "available", location: "Depot A", rating: 4.8 },
      { id: "D002", name: "Sarah Connor", status: "available", location: "Depot B", rating: 4.9 },
      { id: "D003", name: "Mike Johnson", status: "finishing-route", location: "Route RT-045", rating: 4.7 },
    ],
    pas: [
      { id: "PA001", name: "Emma Wilson", status: "available", specialization: "Behavioral", rating: 4.9 },
      { id: "PA002", name: "Tom Anderson", status: "available", specialization: "Medical", rating: 4.8 },
      { id: "PA003", name: "Lisa Brown", status: "on-break", specialization: "General", rating: 4.6 },
    ],
  }

  const getPriorityColor = (priority: string) => {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
      case "finishing-route":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      case "on-break":
        return "bg-slate-500/20 text-slate-300 border-slate-500/30"
      default:
        return "bg-slate-500/20 text-slate-300 border-slate-500/30"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Unassigned Runs</h3>
          <p className="text-sm text-slate-400">{unassignedRuns.length} runs need staff assignment</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
          <Zap className="mr-2 h-4 w-4" />
          Auto-Assign All
        </Button>
      </div>

      {/* Unassigned Runs List */}
      <div className="grid gap-4">
        {unassignedRuns.map((run) => (
          <Card
            key={run.id}
            className="bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/50 transition-all duration-200"
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="font-semibold text-white text-lg">{run.id}</div>
                  <Badge className={getPriorityColor(run.priority)}>
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    {run.priority.toUpperCase()}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold">{run.time}</div>
                  <div className="text-slate-400 text-sm">{run.estimatedDuration}</div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="text-slate-200 font-medium">{run.student}</div>
                  <div className="text-slate-400 text-sm">Student requiring transport</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-blue-400 mt-0.5" />
                    <div>
                      <div className="text-slate-300">Pickup: {run.pickup}</div>
                      <div className="text-slate-300">Drop-off: {run.destination}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-emerald-400 mt-0.5" />
                    <div>
                      <div className="text-slate-300">Distance: {run.distance}</div>
                      <div className="text-slate-300">Duration: {run.estimatedDuration}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-slate-400 text-sm mb-2">Requirements:</div>
                  <div className="flex flex-wrap gap-2">
                    {run.requirements.map((req, index) => (
                      <Badge key={index} className="bg-slate-600/50 text-slate-300 text-xs">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Assignment Section */}
                <div className="border-t border-slate-700/50 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-2 block">Assign Driver</label>
                      <Select>
                        <SelectTrigger className="bg-slate-700/50 border-slate-600 text-slate-200">
                          <SelectValue placeholder="Select driver..." />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          {availableStaff.drivers.map((driver) => (
                            <SelectItem key={driver.id} value={driver.id} className="text-slate-200">
                              <div className="flex items-center justify-between w-full">
                                <span>{driver.name}</span>
                                <Badge className={getStatusColor(driver.status)}>{driver.status}</Badge>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-2 block">Assign PA (Optional)</label>
                      <Select>
                        <SelectTrigger className="bg-slate-700/50 border-slate-600 text-slate-200">
                          <SelectValue placeholder="Select PA..." />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          {availableStaff.pas.map((pa) => (
                            <SelectItem key={pa.id} value={pa.id} className="text-slate-200">
                              <div className="flex items-center justify-between w-full">
                                <span>{pa.name}</span>
                                <Badge className={getStatusColor(pa.status)}>{pa.specialization}</Badge>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                      <UserCheck className="h-4 w-4 mr-2" />
                      Assign Staff
                    </Button>
                    <Button variant="outline" className="bg-slate-700/50 border-slate-600 text-slate-300">
                      <Phone className="h-4 w-4 mr-2" />
                      Contact Parent
                    </Button>
                    <Button variant="outline" className="bg-slate-700/50 border-slate-600 text-slate-300">
                      <MapPin className="h-4 w-4 mr-2" />
                      View Route
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Available Staff Summary */}
      <Card className="bg-slate-800/20 border-slate-700/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Users className="h-5 w-5 text-purple-400" />
            Available Staff Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-slate-200 mb-3">Drivers ({availableStaff.drivers.length})</h4>
              <div className="space-y-2">
                {availableStaff.drivers.map((driver) => (
                  <div key={driver.id} className="flex items-center justify-between p-2 bg-slate-700/30 rounded">
                    <div>
                      <div className="text-slate-200 font-medium">{driver.name}</div>
                      <div className="text-slate-400 text-xs">{driver.location}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400 text-sm">★ {driver.rating}</span>
                      <Badge className={getStatusColor(driver.status)}>{driver.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-slate-200 mb-3">Passenger Assistants ({availableStaff.pas.length})</h4>
              <div className="space-y-2">
                {availableStaff.pas.map((pa) => (
                  <div key={pa.id} className="flex items-center justify-between p-2 bg-slate-700/30 rounded">
                    <div>
                      <div className="text-slate-200 font-medium">{pa.name}</div>
                      <div className="text-slate-400 text-xs">{pa.specialization} Support</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400 text-sm">★ {pa.rating}</span>
                      <Badge className={getStatusColor(pa.status)}>{pa.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

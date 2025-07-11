"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, User, AlertTriangle, CheckCircle, Navigation, Users, Shield, Activity } from "lucide-react"

export function LiveOperationsCenter() {
  const activeRuns = [
    {
      id: "R001",
      route: "Oakwood Primary → Home",
      driver: "Sarah Johnson",
      pa: "Mike Chen",
      students: 8,
      status: "in-transit",
      eta: "14:25",
      location: "Mill Lane",
      issues: [],
      progress: 65,
    },
    {
      id: "R002",
      route: "Riverside School → Home",
      driver: "Tom Wilson",
      pa: "Lisa Park",
      students: 6,
      status: "delayed",
      eta: "14:35",
      location: "High Street",
      issues: ["Traffic delay"],
      progress: 45,
    },
    {
      id: "R003",
      route: "Greenfield Academy → Home",
      driver: "Emma Davis",
      pa: "John Smith",
      students: 12,
      status: "on-time",
      eta: "14:20",
      location: "Church Road",
      issues: [],
      progress: 80,
    },
    {
      id: "R004",
      route: "Hillside School → Home",
      driver: "Alex Brown",
      pa: "Sarah Lee",
      students: 4,
      status: "incident",
      eta: "14:40",
      location: "Park Avenue",
      issues: ["Student behavioral issue"],
      progress: 30,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-time":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
      case "delayed":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
      case "incident":
        return "bg-red-500/10 text-red-400 border-red-500/20"
      case "in-transit":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20"
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "on-time":
        return <CheckCircle className="h-4 w-4" />
      case "delayed":
        return <Clock className="h-4 w-4" />
      case "incident":
        return <AlertTriangle className="h-4 w-4" />
      case "in-transit":
        return <Navigation className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  return (
    <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 bg-blue-600/20 rounded-lg">
            <Activity className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Live Operations</h3>
            <p className="text-sm text-slate-400">Real-time route monitoring and management</p>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4 p-4 bg-slate-800/20 rounded-lg border border-slate-700/30">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-400">
              {activeRuns.filter((r) => r.status === "on-time").length}
            </div>
            <div className="text-xs text-slate-400">On Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {activeRuns.filter((r) => r.status === "delayed").length}
            </div>
            <div className="text-xs text-slate-400">Delayed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">
              {activeRuns.filter((r) => r.status === "incident").length}
            </div>
            <div className="text-xs text-slate-400">Incidents</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{activeRuns.reduce((sum, r) => sum + r.students, 0)}</div>
            <div className="text-xs text-slate-400">Students</div>
          </div>
        </div>

        {/* Active Routes */}
        <div className="space-y-3">
          <h4 className="font-medium text-slate-200 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-blue-400" />
            Active Routes ({activeRuns.length})
          </h4>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {activeRuns.map((run) => (
              <div
                key={run.id}
                className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-4 hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-white">{run.id}</span>
                      <Badge variant="outline" className={getStatusColor(run.status)}>
                        {getStatusIcon(run.status)}
                        <span className="ml-1 capitalize">{run.status.replace("-", " ")}</span>
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-300 mb-2">{run.route}</p>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${run.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="text-right ml-4">
                    <div className="text-sm font-medium text-white">ETA: {run.eta}</div>
                    <div className="text-xs text-slate-400">{run.location}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-slate-400" />
                    <div>
                      <div className="text-sm text-slate-300">{run.driver}</div>
                      <div className="text-xs text-slate-500">Driver</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-slate-400" />
                    <div>
                      <div className="text-sm text-slate-300">{run.pa}</div>
                      <div className="text-xs text-slate-500">PA</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-slate-400" />
                    <span className="text-sm text-slate-300">{run.students} students</span>
                  </div>

                  <div className="flex gap-2">
                    {run.issues.length > 0 && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20"
                      >
                        Report Issue
                      </Button>
                    )}
                    <Button size="sm" variant="outline" className="text-xs bg-transparent">
                      View Details
                    </Button>
                  </div>
                </div>

                {/* Issues */}
                {run.issues.length > 0 && (
                  <div className="mt-3 p-2 bg-red-500/5 border border-red-500/20 rounded">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-400" />
                      <span className="text-sm text-red-300">{run.issues.join(", ")}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

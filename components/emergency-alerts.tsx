"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Phone, MessageSquare, Navigation, Clock, User } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export function EmergencyAlerts() {
  const emergencyAlerts = [
    {
      id: "E001",
      type: "Vehicle Breakdown",
      route: "R-045",
      driver: "Sarah Johnson",
      location: "A34 near Junction 12",
      students: 4,
      timeReported: "2 minutes ago",
      severity: "critical",
      status: "Active",
      description: "Engine failure, vehicle immobilized",
      contactNumber: "07700 900123",
      estimatedDelay: "45 minutes",
    },
    {
      id: "E002",
      type: "Medical Emergency",
      route: "R-023",
      driver: "Mike Thompson",
      location: "Greenfield Primary School",
      students: 1,
      timeReported: "5 minutes ago",
      severity: "critical",
      status: "Emergency Services Called",
      description: "Student having seizure, ambulance en route",
      contactNumber: "07700 900456",
      estimatedDelay: "Unknown",
    },
    {
      id: "E003",
      type: "Road Closure",
      route: "R-067",
      driver: "Emma Wilson",
      location: "High Street - Water Main Burst",
      students: 6,
      timeReported: "8 minutes ago",
      severity: "high",
      status: "Rerouting",
      description: "Main route blocked, finding alternative",
      contactNumber: "07700 900789",
      estimatedDelay: "20 minutes",
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      case "high":
        return "bg-orange-500/20 text-orange-300 border-orange-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      default:
        return "bg-slate-500/20 text-slate-300 border-slate-500/30"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      case "Emergency Services Called":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30"
      case "Rerouting":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      default:
        return "bg-slate-500/20 text-slate-300 border-slate-500/30"
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {emergencyAlerts.map((alert) => (
        <Card
          key={alert.id}
          className="bg-gradient-to-br from-red-900/20 to-orange-900/20 border-red-500/30 backdrop-blur-sm hover:from-red-900/30 hover:to-orange-900/30 transition-all duration-300"
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-red-300">
                <AlertTriangle className="h-5 w-5 text-red-400 animate-pulse" />
                {alert.type}
              </CardTitle>
              <Badge className={getSeverityColor(alert.severity)}>{alert.severity.toUpperCase()}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-slate-400">Route:</span>
                <p className="text-slate-200 font-medium">{alert.route}</p>
              </div>
              <div>
                <span className="text-slate-400">Students:</span>
                <p className="text-slate-200 font-medium">{alert.students} affected</p>
              </div>
              <div>
                <span className="text-slate-400">Driver:</span>
                <p className="text-slate-200 font-medium">{alert.driver}</p>
              </div>
              <div>
                <span className="text-slate-400">Reported:</span>
                <p className="text-slate-200 font-medium">{alert.timeReported}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Navigation className="h-4 w-4 text-slate-400" />
                <span className="text-slate-300">{alert.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-slate-400" />
                <span className="text-slate-300">Delay: {alert.estimatedDelay}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-800/50 rounded-lg">
              <p className="text-sm text-slate-300">{alert.description}</p>
            </div>

            <div className="flex items-center justify-between">
              <Badge className={getStatusColor(alert.status)}>{alert.status}</Badge>
              <div className="flex gap-2">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Phone className="h-3 w-3 mr-1" />
                  Call
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" className="bg-slate-700/50 border-slate-600 text-slate-200">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-900 border-slate-700 max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-slate-200 flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-red-400" />
                        Emergency Alert Details - {alert.id}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div>
                            <span className="text-slate-400 text-sm">Emergency Type:</span>
                            <p className="text-slate-200 font-medium">{alert.type}</p>
                          </div>
                          <div>
                            <span className="text-slate-400 text-sm">Route Number:</span>
                            <p className="text-slate-200 font-medium">{alert.route}</p>
                          </div>
                          <div>
                            <span className="text-slate-400 text-sm">Driver:</span>
                            <p className="text-slate-200 font-medium">{alert.driver}</p>
                          </div>
                          <div>
                            <span className="text-slate-400 text-sm">Contact:</span>
                            <p className="text-slate-200 font-medium">{alert.contactNumber}</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <span className="text-slate-400 text-sm">Location:</span>
                            <p className="text-slate-200 font-medium">{alert.location}</p>
                          </div>
                          <div>
                            <span className="text-slate-400 text-sm">Students Affected:</span>
                            <p className="text-slate-200 font-medium">{alert.students}</p>
                          </div>
                          <div>
                            <span className="text-slate-400 text-sm">Time Reported:</span>
                            <p className="text-slate-200 font-medium">{alert.timeReported}</p>
                          </div>
                          <div>
                            <span className="text-slate-400 text-sm">Estimated Delay:</span>
                            <p className="text-slate-200 font-medium">{alert.estimatedDelay}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-slate-800/50 rounded-lg">
                        <span className="text-slate-400 text-sm">Description:</span>
                        <p className="text-slate-200 mt-1">{alert.description}</p>
                      </div>
                      <div className="flex gap-3">
                        <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white">
                          <Phone className="mr-2 h-4 w-4" />
                          Call Driver
                        </Button>
                        <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Send Message
                        </Button>
                        <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white">
                          <User className="mr-2 h-4 w-4" />
                          Dispatch Help
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

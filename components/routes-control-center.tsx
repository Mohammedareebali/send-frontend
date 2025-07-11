"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, MapPin, Clock, Users, Navigation, CheckCircle, AlertCircle } from "lucide-react"

export function RoutesControlCenter() {
  const [activeTab, setActiveTab] = useState("critical")

  const criticalIssues = [
    {
      id: "R-045",
      driver: "Sarah Johnson",
      driverPhone: "07700 900123",
      status: "Severely Delayed",
      delay: "35 min",
      progress: 25,
      location: "A34 Junction 12",
      destination: "Greenfield Primary",
      studentsOnBoard: 4,
      eta: "09:15",
      originalEta: "08:40",
      issue: "Traffic jam - accident ahead",
      priority: "critical",
      incidentReported: true,
    },
    {
      id: "R-023",
      driver: "Emma Davis",
      driverPhone: "07700 900456",
      status: "Vehicle Issue",
      delay: "20 min",
      progress: 60,
      location: "Riverside Road",
      destination: "Oak Tree School",
      studentsOnBoard: 3,
      eta: "09:05",
      originalEta: "08:45",
      issue: "Flat tire - being fixed",
      priority: "high",
      incidentReported: false,
    },
  ]

  const activeRoutes = [
    {
      id: "R-001",
      driver: "John Smith",
      driverPhone: "07700 900789",
      status: "On Time",
      progress: 75,
      location: "Main Street",
      destination: "Riverside Academy",
      studentsOnBoard: 6,
      eta: "08:45",
      nextStop: "Oak Avenue",
      priority: "normal",
    },
    {
      id: "R-012",
      driver: "Lisa Wilson",
      driverPhone: "07700 900654",
      status: "Ahead of Schedule",
      progress: 85,
      location: "School Lane",
      destination: "Hillside School",
      studentsOnBoard: 2,
      eta: "08:38",
      nextStop: "Final Destination",
      priority: "normal",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      default:
        return "bg-green-500"
    }
  }

  const handleReportIncident = (routeId: string) => {
    console.log(`Reporting incident for route ${routeId}`)
    // This would open an incident reporting form
  }

  const handleTrackRoute = (routeId: string) => {
    console.log(`Tracking route ${routeId}`)
    // This would open live tracking
  }

  return (
    <div className="space-y-6">
      {/* Status Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
          <div className="text-2xl font-bold text-red-400">2</div>
          <div className="text-sm text-slate-400">Critical Issues</div>
        </div>
        <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
          <div className="text-2xl font-bold text-emerald-400">12</div>
          <div className="text-sm text-slate-400">Routes Active</div>
        </div>
        <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
          <div className="text-2xl font-bold text-slate-300">47</div>
          <div className="text-sm text-slate-400">Students On Board</div>
        </div>
        <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
          <div className="text-2xl font-bold text-slate-300">85%</div>
          <div className="text-sm text-slate-400">On-Time Performance</div>
        </div>
      </div>

      {/* Main Control Tabs */}
      <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Navigation className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Routes Control Center</h3>
              <p className="text-sm text-slate-400">Real-time route monitoring and incident management</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 bg-slate-700/50 border border-slate-600/50">
              <TabsTrigger
                value="critical"
                className="data-[state=active]:bg-slate-600 data-[state=active]:text-white flex items-center gap-2"
              >
                <AlertTriangle className="h-4 w-4" />
                Critical Issues
              </TabsTrigger>
              <TabsTrigger
                value="active"
                className="data-[state=active]:bg-slate-600 data-[state=active]:text-white flex items-center gap-2"
              >
                <Navigation className="h-4 w-4" />
                Live Routes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="critical" className="space-y-4 mt-6">
              <div className="space-y-3">
                {criticalIssues.map((route) => (
                  <Card
                    key={route.id}
                    className="bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/50 transition-all duration-200"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        {/* Left Section - Route Info */}
                        <div className="flex items-center gap-4 flex-1">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${getPriorityColor(route.priority)}`} />
                            <div>
                              <div className="font-semibold text-slate-200">{route.id}</div>
                              <div className="text-sm text-slate-400">{route.driver}</div>
                              <div className="text-xs text-slate-500">{route.driverPhone}</div>
                            </div>
                          </div>

                          <div className="hidden md:block w-px h-8 bg-slate-700" />

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-4 mb-2">
                              <div className="flex items-center gap-1 text-sm">
                                <MapPin className="h-3 w-3 text-slate-400" />
                                <span className="text-slate-300 truncate">{route.location}</span>
                              </div>
                              <div className="flex items-center gap-1 text-sm">
                                <Users className="h-3 w-3 text-slate-400" />
                                <span className="text-slate-300">{route.studentsOnBoard}</span>
                              </div>
                            </div>
                            <div className="text-sm text-slate-400 truncate">{route.issue}</div>
                          </div>
                        </div>

                        {/* Center Section - Progress */}
                        <div className="hidden lg:flex flex-col items-center gap-2 px-6">
                          <div className="w-16">
                            <Progress value={route.progress} className="h-2" />
                          </div>
                          <div className="text-xs text-slate-400">{route.progress}%</div>
                        </div>

                        {/* Right Section - Time & Actions */}
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-sm">
                              <Clock className="h-3 w-3 text-slate-400" />
                              <span className="text-orange-400 font-medium">+{route.delay}</span>
                            </div>
                            <div className="text-sm text-slate-300">ETA {route.eta}</div>
                          </div>

                          <div className="flex gap-2">
                            {!route.incidentReported && (
                              <Button
                                size="sm"
                                onClick={() => handleReportIncident(route.id)}
                                className="bg-red-600 hover:bg-red-700 text-white px-3"
                              >
                                <AlertCircle className="h-3 w-3" />
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleTrackRoute(route.id)}
                              className="bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-700 px-3"
                            >
                              <Navigation className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Mobile Progress Bar */}
                      <div className="lg:hidden mt-3 pt-3 border-t border-slate-700/50">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-slate-400">Progress</span>
                          <span className="text-xs text-slate-400">{route.progress}%</span>
                        </div>
                        <Progress value={route.progress} className="h-2" />
                      </div>

                      {/* Incident Status */}
                      {route.incidentReported && (
                        <div className="mt-3 pt-3 border-t border-slate-700/50">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-400" />
                            <span className="text-sm text-emerald-400">Incident reported and logged</span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="active" className="space-y-4 mt-6">
              <div className="space-y-3">
                {activeRoutes.map((route) => (
                  <Card
                    key={route.id}
                    className="bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/50 transition-all duration-200"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        {/* Left Section - Route Info */}
                        <div className="flex items-center gap-4 flex-1">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${getPriorityColor(route.priority)}`} />
                            <div>
                              <div className="font-semibold text-slate-200">{route.id}</div>
                              <div className="text-sm text-slate-400">{route.driver}</div>
                              <div className="text-xs text-slate-500">{route.driverPhone}</div>
                            </div>
                          </div>

                          <div className="hidden md:block w-px h-8 bg-slate-700" />

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-4 mb-2">
                              <div className="flex items-center gap-1 text-sm">
                                <MapPin className="h-3 w-3 text-slate-400" />
                                <span className="text-slate-300 truncate">{route.location}</span>
                              </div>
                              <div className="flex items-center gap-1 text-sm">
                                <Users className="h-3 w-3 text-slate-400" />
                                <span className="text-slate-300">{route.studentsOnBoard}</span>
                              </div>
                            </div>
                            <div className="text-sm text-slate-400">Next: {route.nextStop}</div>
                          </div>
                        </div>

                        {/* Center Section - Progress */}
                        <div className="hidden lg:flex flex-col items-center gap-2 px-6">
                          <div className="w-16">
                            <Progress value={route.progress} className="h-2" />
                          </div>
                          <div className="text-xs text-slate-400">{route.progress}%</div>
                        </div>

                        {/* Right Section - Status & Actions */}
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-sm text-emerald-400 font-medium">{route.status}</div>
                            <div className="text-sm text-slate-300">ETA {route.eta}</div>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleReportIncident(route.id)}
                              className="bg-orange-600 hover:bg-orange-700 text-white px-3"
                            >
                              <AlertCircle className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleTrackRoute(route.id)}
                              className="bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-700 px-3"
                            >
                              <Navigation className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Mobile Progress Bar */}
                      <div className="lg:hidden mt-3 pt-3 border-t border-slate-700/50">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-slate-400">Progress</span>
                          <span className="text-xs text-slate-400">{route.progress}%</span>
                        </div>
                        <Progress value={route.progress} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

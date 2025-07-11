"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { MapPin, Clock, Users, Navigation, CheckCircle, AlertTriangle, Truck, Activity, TrendingUp } from "lucide-react"

export function LiveOperationsBoard() {
  const [activeView, setActiveView] = useState("live")

  const liveRoutes = [
    {
      id: "RT-001",
      driver: "John Smith",
      pa: "Emma Wilson",
      students: 3,
      status: "on-route",
      progress: 65,
      eta: "08:45",
      delay: 0,
      location: "Approaching Maple Street",
      nextStop: "Oakwood Primary",
      studentsOnBoard: ["Alice Johnson", "Ben Parker", "Chloe Davis"],
    },
    {
      id: "RT-002",
      driver: "Sarah Connor",
      pa: "Mike Johnson",
      students: 2,
      status: "delayed",
      progress: 40,
      eta: "09:15",
      delay: 15,
      location: "Traffic jam - High Street",
      nextStop: "Riverside School",
      studentsOnBoard: ["David Wilson", "Eva Martinez"],
    },
    {
      id: "RT-003",
      driver: "Tom Anderson",
      pa: null,
      students: 4,
      status: "completed",
      progress: 100,
      eta: "08:30",
      delay: -5,
      location: "Greenfield Academy",
      nextStop: "Completed",
      studentsOnBoard: [],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-route":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "delayed":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      case "completed":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
      case "emergency":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      default:
        return "bg-slate-500/20 text-slate-300 border-slate-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "on-route":
        return <Navigation className="h-4 w-4" />
      case "delayed":
        return <Clock className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "emergency":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  return (
    <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-blue-600/20 rounded-lg">
              <Truck className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">Live Operations Board</h3>
              <p className="text-sm text-slate-400">Real-time route monitoring and control</p>
            </div>
          </CardTitle>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="bg-slate-800/50 border-slate-700 text-slate-300">
              <MapPin className="h-4 w-4 mr-2" />
              Map View
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Activity className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs value={activeView} onValueChange={setActiveView}>
          <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border border-slate-700/50 mb-6">
            <TabsTrigger value="live" className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-300">
              Live Routes ({liveRoutes.filter((r) => r.status !== "completed").length})
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="data-[state=active]:bg-emerald-600/20 data-[state=active]:text-emerald-300"
            >
              Completed ({liveRoutes.filter((r) => r.status === "completed").length})
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-purple-600/20 data-[state=active]:text-purple-300"
            >
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="live" className="space-y-4">
            {liveRoutes
              .filter((route) => route.status !== "completed")
              .map((route) => (
                <Card key={route.id} className="bg-slate-800/30 border-slate-700/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="font-semibold text-white text-lg">{route.id}</div>
                        <Badge className={getStatusColor(route.status)}>
                          {getStatusIcon(route.status)}
                          <span className="ml-1 capitalize">{route.status}</span>
                        </Badge>
                        {route.delay > 0 && (
                          <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                            +{route.delay}min delay
                          </Badge>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-white font-semibold">ETA: {route.eta}</div>
                        <div className="text-slate-400 text-sm">{route.location}</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Route Progress</span>
                        <span className="text-slate-300">{route.progress}%</span>
                      </div>
                      <Progress value={route.progress} className="h-2" />

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-slate-400 mb-1">Staff</div>
                          <div className="text-slate-300">
                            Driver: {route.driver}
                            {route.pa && <div>PA: {route.pa}</div>}
                          </div>
                        </div>
                        <div>
                          <div className="text-slate-400 mb-1">Students ({route.studentsOnBoard.length})</div>
                          <div className="text-slate-300">
                            {route.studentsOnBoard.length > 0 ? (
                              route.studentsOnBoard.map((student) => (
                                <div key={student} className="text-xs">
                                  {student}
                                </div>
                              ))
                            ) : (
                              <div className="text-slate-500">All delivered</div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                          <Navigation className="h-3 w-3 mr-1" />
                          Track
                        </Button>
                        <Button size="sm" variant="outline" className="bg-slate-700/50 border-slate-600 text-slate-300">
                          <Users className="h-3 w-3 mr-1" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {liveRoutes
              .filter((route) => route.status === "completed")
              .map((route) => (
                <Card key={route.id} className="bg-slate-800/30 border-slate-700/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="font-semibold text-white">{route.id}</div>
                        <Badge className={getStatusColor(route.status)}>
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Completed
                        </Badge>
                        {route.delay < 0 && (
                          <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                            {Math.abs(route.delay)}min early
                          </Badge>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-emerald-400 font-semibold">Completed: {route.eta}</div>
                        <div className="text-slate-400 text-sm">{route.driver}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-slate-800/30 border-slate-700/50">
                <CardContent className="p-4 text-center">
                  <TrendingUp className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">94%</div>
                  <div className="text-sm text-slate-400">On-time Performance</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/30 border-slate-700/50">
                <CardContent className="p-4 text-center">
                  <Clock className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">12.5</div>
                  <div className="text-sm text-slate-400">Avg Journey Time (min)</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/30 border-slate-700/50">
                <CardContent className="p-4 text-center">
                  <Users className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">156</div>
                  <div className="text-sm text-slate-400">Students Transported</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

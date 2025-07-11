"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, MapPin, Phone, Navigation, Users, AlertCircle } from "lucide-react"

export function CriticalRouteStatus() {
  const criticalRoutes = [
    {
      id: "R-045",
      driver: "Sarah Johnson",
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
      phone: "07700 900123",
    },
    {
      id: "R-023",
      driver: "Emma Davis",
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
      phone: "07700 900456",
    },
    {
      id: "R-067",
      driver: "John Smith",
      status: "Student Issue",
      delay: "15 min",
      progress: 40,
      location: "Main Street",
      destination: "Riverside Academy",
      studentsOnBoard: 6,
      eta: "08:55",
      originalEta: "08:40",
      issue: "Student requiring support",
      priority: "medium",
      phone: "07700 900789",
    },
    {
      id: "R-089",
      driver: "Mike Thompson",
      status: "Running Late",
      delay: "12 min",
      progress: 75,
      location: "School Lane",
      destination: "Hillside School",
      studentsOnBoard: 2,
      eta: "08:52",
      originalEta: "08:40",
      issue: "Late departure from depot",
      priority: "medium",
      phone: "07700 900321",
    },
    {
      id: "R-012",
      driver: "Lisa Wilson",
      status: "Weather Delay",
      delay: "25 min",
      progress: 35,
      location: "Country Road B4521",
      destination: "Forest Gate School",
      studentsOnBoard: 5,
      eta: "09:10",
      originalEta: "08:45",
      issue: "Heavy fog - reduced visibility",
      priority: "high",
      phone: "07700 900654",
    },
  ]

  const getPriorityDot = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      default:
        return "bg-slate-500"
    }
  }

  const handleCall = (phone: string, driver: string) => {
    // In a real app, this would initiate a call
    console.log(`Calling ${driver} at ${phone}`)
  }

  const handleTrack = (routeId: string) => {
    // In a real app, this would open live tracking
    console.log(`Tracking route ${routeId}`)
  }

  return (
    <div className="space-y-4">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
          <div className="text-2xl font-bold text-red-400">3</div>
          <div className="text-sm text-slate-400">Critical Issues</div>
        </div>
        <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
          <div className="text-2xl font-bold text-orange-400">2</div>
          <div className="text-sm text-slate-400">High Priority</div>
        </div>
        <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
          <div className="text-2xl font-bold text-slate-300">23</div>
          <div className="text-sm text-slate-400">Students Affected</div>
        </div>
        <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
          <div className="text-2xl font-bold text-slate-300">25 min</div>
          <div className="text-sm text-slate-400">Avg Delay</div>
        </div>
      </div>

      {/* Route Cards */}
      <div className="space-y-3">
        {criticalRoutes.map((route) => (
          <Card
            key={route.id}
            className="bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/50 transition-all duration-200"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                {/* Left Section - Route Info */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${getPriorityDot(route.priority)}`} />
                    <div>
                      <div className="font-semibold text-slate-200">{route.id}</div>
                      <div className="text-sm text-slate-400">{route.driver}</div>
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

                {/* Center Section - Progress & Status */}
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
                    <Button
                      size="sm"
                      onClick={() => handleCall(route.phone, route.driver)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3"
                    >
                      <Phone className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleTrack(route.id)}
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

      {/* Quick Actions Footer */}
      <div className="flex gap-3 pt-4 border-t border-slate-700/50">
        <Button className="bg-red-600 hover:bg-red-700 text-white">
          <AlertCircle className="mr-2 h-4 w-4" />
          Emergency Protocol
        </Button>
        <Button variant="outline" className="bg-slate-700/50 border-slate-600 text-slate-300">
          <Phone className="mr-2 h-4 w-4" />
          Call All Drivers
        </Button>
        <Button variant="outline" className="bg-slate-700/50 border-slate-600 text-slate-300">
          <Navigation className="mr-2 h-4 w-4" />
          View All on Map
        </Button>
      </div>
    </div>
  )
}

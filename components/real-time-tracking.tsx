"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, Clock, AlertTriangle, CheckCircle, Truck, Users, Zap } from "lucide-react"

interface LiveRoute {
  routeId: string
  driverName: string
  vehicleId: string
  currentLocation: {
    lat: number
    lng: number
    address: string
  }
  nextStop: {
    address: string
    eta: string
    distance: number
  }
  progress: {
    completed: number
    total: number
    percentage: number
  }
  status: "on_time" | "delayed" | "ahead"
  lastUpdate: string
}

export function RealTimeTracking() {
  const [liveRoutes, setLiveRoutes] = useState<LiveRoute[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        const mockData: LiveRoute[] = [
          {
            routeId: "RT-001",
            driverName: "John Doe",
            vehicleId: "VAN-001",
            currentLocation: {
              lat: 51.5074,
              lng: -0.1278,
              address: "Westminster Bridge, London",
            },
            nextStop: {
              address: "Springfield Elementary School",
              eta: "8:45 AM",
              distance: 2.3,
            },
            progress: {
              completed: 3,
              total: 7,
              percentage: 43,
            },
            status: "on_time",
            lastUpdate: "Live",
          },
          {
            routeId: "RT-002",
            driverName: "Sarah Johnson",
            vehicleId: "BUS-003",
            currentLocation: {
              lat: 51.5155,
              lng: -0.1426,
              address: "Paddington Station, London",
            },
            nextStop: {
              address: "Oakville High School",
              eta: "9:10 AM",
              distance: 1.8,
            },
            progress: {
              completed: 2,
              total: 5,
              percentage: 40,
            },
            status: "delayed",
            lastUpdate: "2m ago",
          },
          {
            routeId: "RT-003",
            driverName: "Mike Wilson",
            vehicleId: "VAN-002",
            currentLocation: {
              lat: 51.5033,
              lng: -0.1195,
              address: "London Bridge, London",
            },
            nextStop: {
              address: "Riverside Middle School",
              eta: "8:55 AM",
              distance: 0.9,
            },
            progress: {
              completed: 4,
              total: 6,
              percentage: 67,
            },
            status: "ahead",
            lastUpdate: "1m ago",
          },
        ]

        setLiveRoutes(mockData)
        setLoading(false)
      } catch (err) {
        setError("Failed to load tracking data")
        setLoading(false)
      }
    }

    fetchLiveData()
    const interval = setInterval(fetchLiveData, 30000)
    return () => clearInterval(interval)
  }, [])

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "on_time":
        return {
          badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
          icon: <CheckCircle className="h-4 w-4 text-emerald-400" />,
          label: "On Time",
        }
      case "delayed":
        return {
          badge: "bg-red-500/10 text-red-400 border-red-500/20",
          icon: <AlertTriangle className="h-4 w-4 text-red-400" />,
          label: "Delayed",
        }
      case "ahead":
        return {
          badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
          icon: <Zap className="h-4 w-4 text-blue-400" />,
          label: "Ahead",
        }
      default:
        return {
          badge: "bg-slate-500/10 text-slate-400 border-slate-500/20",
          icon: <Clock className="h-4 w-4 text-slate-400" />,
          label: "Unknown",
        }
    }
  }

  if (loading) {
    return (
      <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent"></div>
            <span className="text-slate-300">Loading live tracking...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="text-center">
            <AlertTriangle className="h-8 w-8 mx-auto mb-3 text-red-400" />
            <p className="text-red-400 mb-3">{error}</p>
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              Retry Connection
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <MapPin className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Live Fleet Tracking</h3>
              <p className="text-sm text-slate-400">Real-time vehicle monitoring</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
            {liveRoutes.length} Active
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {liveRoutes.map((route) => {
          const statusConfig = getStatusConfig(route.status)
          return (
            <div key={route.routeId} className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-4 space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-semibold text-white text-lg">{route.routeId}</h4>
                    <Badge variant="outline" className={statusConfig.badge}>
                      {statusConfig.icon}
                      <span className="ml-1">{statusConfig.label}</span>
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {route.driverName}
                    </div>
                    <div className="flex items-center gap-1">
                      <Truck className="h-4 w-4" />
                      {route.vehicleId}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {route.lastUpdate}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h5 className="font-medium text-slate-300 text-sm">Current Position</h5>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-300">{route.currentLocation.address}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="font-medium text-slate-300 text-sm">Next Destination</h5>
                  <div className="flex items-start gap-2">
                    <Navigation className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
                    <div className="space-y-1">
                      <span className="text-sm text-slate-300 block">{route.nextStop.address}</span>
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span>ETA: {route.nextStop.eta}</span>
                        <span>{route.nextStop.distance}mi away</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-300">Route Progress</span>
                  <span className="text-slate-400">
                    {route.progress.completed}/{route.progress.total} stops
                  </span>
                </div>
                <div className="w-full bg-slate-600/50 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${route.progress.percentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-slate-400">{route.progress.percentage}% completed</p>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Track Live
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Contact
                </Button>
              </div>
            </div>
          )
        })}

        {liveRoutes.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="h-16 w-16 mx-auto mb-4 text-slate-600" />
            <p className="text-slate-400 text-lg">No active routes to monitor</p>
            <p className="text-slate-500 text-sm mt-1">Routes will appear here when vehicles are dispatched</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

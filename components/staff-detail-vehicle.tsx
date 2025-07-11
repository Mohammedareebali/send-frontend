"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Truck, MapPin, Fuel, Wrench, Calendar, AlertTriangle } from "lucide-react"

interface VehicleInfo {
  id: string
  make: string
  model: string
  year: number
  registration: string
  capacity: number
  wheelchairAccessible: boolean
  lastService: string
  nextService: string
  mileage: number
  fuelLevel: number
  status: "active" | "maintenance" | "offline"
  currentLocation?: string
  assignedRoute?: string
}

interface StaffDetailVehicleProps {
  staffId: string
  staffType: "driver" | "pa"
}

export function StaffDetailVehicle({ staffId, staffType }: StaffDetailVehicleProps) {
  // Mock vehicle data - in real app, this would be fetched based on staffId
  const vehicleInfo: VehicleInfo = {
    id: "VH-001",
    make: "Ford",
    model: "Transit Custom",
    year: 2022,
    registration: "AB22 XYZ",
    capacity: 8,
    wheelchairAccessible: true,
    lastService: "2024-01-15",
    nextService: "2024-04-15",
    mileage: 45230,
    fuelLevel: 75,
    status: "active",
    currentLocation: "Depot - Bay 3",
    assignedRoute: "RT-001",
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
      case "maintenance":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      case "offline":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      default:
        return "bg-slate-500/20 text-slate-300 border-slate-500/30"
    }
  }

  const getFuelColor = (level: number) => {
    if (level > 50) return "text-emerald-400"
    if (level > 25) return "text-yellow-400"
    return "text-red-400"
  }

  // Only show vehicle info for drivers
  if (staffType !== "driver") {
    return (
      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardContent className="p-6 text-center">
          <div className="text-slate-400">
            <Truck className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>Vehicle information not applicable for passenger assistants</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Vehicle Overview */}
      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-blue-600/20 rounded-lg">
              <Truck className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Assigned Vehicle</h3>
              <p className="text-sm text-slate-400">{vehicleInfo.id}</p>
            </div>
            <Badge className={getStatusColor(vehicleInfo.status)} variant="outline">
              {vehicleInfo.status.toUpperCase()}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <label className="text-sm text-slate-400">Vehicle Details</label>
                <div className="text-slate-200 font-medium">
                  {vehicleInfo.year} {vehicleInfo.make} {vehicleInfo.model}
                </div>
                <div className="text-sm text-slate-400">Registration: {vehicleInfo.registration}</div>
              </div>

              <div>
                <label className="text-sm text-slate-400">Capacity</label>
                <div className="text-slate-200 font-medium">{vehicleInfo.capacity} passengers</div>
                {vehicleInfo.wheelchairAccessible && (
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs mt-1">
                    Wheelchair Accessible
                  </Badge>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm text-slate-400">Current Status</label>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-200">{vehicleInfo.currentLocation}</span>
                </div>
                {vehicleInfo.assignedRoute && (
                  <div className="text-sm text-slate-400">Route: {vehicleInfo.assignedRoute}</div>
                )}
              </div>

              <div>
                <label className="text-sm text-slate-400">Mileage</label>
                <div className="text-slate-200 font-medium">{vehicleInfo.mileage.toLocaleString()} miles</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Fuel Level */}
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-700/50 rounded-lg">
                <Fuel className={`h-5 w-5 ${getFuelColor(vehicleInfo.fuelLevel)}`} />
              </div>
              <div>
                <div className="text-sm text-slate-400">Fuel Level</div>
                <div className={`text-xl font-bold ${getFuelColor(vehicleInfo.fuelLevel)}`}>
                  {vehicleInfo.fuelLevel}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Service Status */}
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-700/50 rounded-lg">
                <Wrench className="h-5 w-5 text-slate-400" />
              </div>
              <div>
                <div className="text-sm text-slate-400">Next Service</div>
                <div className="text-xl font-bold text-slate-200">
                  {new Date(vehicleInfo.nextService).toLocaleDateString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service History */}
      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-orange-600/20 rounded-lg">
              <Calendar className="h-5 w-5 text-orange-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Service Information</h3>
              <p className="text-sm text-slate-400">Maintenance and inspection records</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-400">Last Service</label>
              <div className="text-slate-200 font-medium">{new Date(vehicleInfo.lastService).toLocaleDateString()}</div>
              <div className="text-sm text-slate-400">Full service and MOT</div>
            </div>

            <div>
              <label className="text-sm text-slate-400">Next Service Due</label>
              <div className="text-slate-200 font-medium">{new Date(vehicleInfo.nextService).toLocaleDateString()}</div>
              <div className="text-sm text-slate-400">Scheduled maintenance</div>
            </div>
          </div>

          {/* Service Alert */}
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-400" />
              <span className="text-sm text-yellow-300">Service due in 15 days - Schedule appointment</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <MapPin className="mr-2 h-4 w-4" />
              Track Vehicle
            </Button>
            <Button size="sm" variant="outline" className="bg-slate-700/50 border-slate-600 text-slate-300">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Service
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

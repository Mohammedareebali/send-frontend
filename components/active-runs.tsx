"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, MapPin, Clock, User, Phone, Navigation, AlertTriangle } from "lucide-react"

interface ActiveRun {
  id: string
  routeNumber: string
  driver: string
  vehicle: string
  status: "on-time" | "delayed" | "completed" | "issue"
  currentLocation: string
  nextStop: string
  eta: string
  passengers: number
  progress: number
}

const mockActiveRuns: ActiveRun[] = [
  {
    id: "1",
    routeNumber: "R001",
    driver: "John Smith",
    vehicle: "VH-001",
    status: "on-time",
    currentLocation: "Main Street",
    nextStop: "Greenfield Primary",
    eta: "08:45",
    passengers: 4,
    progress: 65,
  },
  {
    id: "2",
    routeNumber: "R002",
    driver: "Sarah Johnson",
    vehicle: "VH-002",
    status: "delayed",
    currentLocation: "Oak Avenue",
    nextStop: "Riverside Academy",
    eta: "09:15",
    passengers: 6,
    progress: 40,
  },
  {
    id: "3",
    routeNumber: "R003",
    driver: "Mike Wilson",
    vehicle: "VH-003",
    status: "completed",
    currentLocation: "School Depot",
    nextStop: "Completed",
    eta: "Completed",
    passengers: 0,
    progress: 100,
  },
]

export function ActiveRuns() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRun, setSelectedRun] = useState<ActiveRun | null>(null)

  const filteredRuns = mockActiveRuns.filter(
    (run) =>
      run.routeNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      run.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      run.vehicle.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: ActiveRun["status"]) => {
    switch (status) {
      case "on-time":
        return <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">On Time</Badge>
      case "delayed":
        return <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">Delayed</Badge>
      case "completed":
        return <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">Completed</Badge>
      case "issue":
        return <Badge className="bg-red-500/20 text-red-300 border-red-500/30">Issue</Badge>
      default:
        return <Badge className="bg-slate-500/20 text-slate-300 border-slate-500/30">{status}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
        <Input
          placeholder="Search active runs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-slate-800/50 border-slate-700 text-slate-200 placeholder-slate-400 focus:border-slate-600 focus:ring-slate-600"
        />
      </div>

      {/* Active Runs Table */}
      <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
        <CardHeader className="border-b border-slate-700/50">
          <CardTitle className="text-slate-200">Active Routes</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700/50 hover:bg-slate-800/50">
                <TableHead className="text-slate-300">Route</TableHead>
                <TableHead className="text-slate-300">Driver</TableHead>
                <TableHead className="text-slate-300">Vehicle</TableHead>
                <TableHead className="text-slate-300">Status</TableHead>
                <TableHead className="text-slate-300">Current Location</TableHead>
                <TableHead className="text-slate-300">Next Stop</TableHead>
                <TableHead className="text-slate-300">ETA</TableHead>
                <TableHead className="text-slate-300">Passengers</TableHead>
                <TableHead className="text-slate-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRuns.map((run) => (
                <TableRow key={run.id} className="border-slate-700/50 hover:bg-slate-800/50">
                  <TableCell className="text-slate-200 font-medium">{run.routeNumber}</TableCell>
                  <TableCell className="text-slate-200">{run.driver}</TableCell>
                  <TableCell className="text-slate-300">{run.vehicle}</TableCell>
                  <TableCell>{getStatusBadge(run.status)}</TableCell>
                  <TableCell className="text-slate-300">{run.currentLocation}</TableCell>
                  <TableCell className="text-slate-300">{run.nextStop}</TableCell>
                  <TableCell className="text-slate-300">{run.eta}</TableCell>
                  <TableCell className="text-slate-200">{run.passengers}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-slate-800 border-slate-700 text-slate-200">
                        <DropdownMenuItem
                          className="hover:bg-slate-700 focus:bg-slate-700"
                          onClick={() => setSelectedRun(run)}
                        >
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-slate-700 focus:bg-slate-700">
                          Track Route
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-slate-700 focus:bg-slate-700">
                          Contact Driver
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Route Details Dialog */}
      <Dialog open={!!selectedRun} onOpenChange={() => setSelectedRun(null)}>
        <DialogContent className="bg-slate-900 border-slate-700 text-slate-200 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-slate-200">Route {selectedRun?.routeNumber} Details</DialogTitle>
          </DialogHeader>
          {selectedRun && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-slate-800/50 border-slate-700/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-blue-400" />
                      <div>
                        <p className="text-sm text-slate-400">Driver</p>
                        <p className="font-medium text-slate-200">{selectedRun.driver}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Navigation className="h-5 w-5 text-emerald-400" />
                      <div>
                        <p className="text-sm text-slate-400">Vehicle</p>
                        <p className="font-medium text-slate-200">{selectedRun.vehicle}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-slate-800/50 border-slate-700/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-yellow-400" />
                      <div>
                        <p className="text-sm text-slate-400">Current Location</p>
                        <p className="font-medium text-slate-200">{selectedRun.currentLocation}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-purple-400" />
                      <div>
                        <p className="text-sm text-slate-400">ETA</p>
                        <p className="font-medium text-slate-200">{selectedRun.eta}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex gap-2">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Phone className="mr-2 h-4 w-4" />
                  Contact Driver
                </Button>
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent">
                  <MapPin className="mr-2 h-4 w-4" />
                  Track on Map
                </Button>
                {selectedRun.status === "delayed" && (
                  <Button
                    variant="outline"
                    className="border-yellow-500/30 text-yellow-300 hover:bg-yellow-500/10 bg-transparent"
                  >
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Send Alert
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Truck,
  CheckCircle,
  Calendar,
  AlertTriangle,
  MapPin,
  Clock,
  Phone,
  User,
  MoreHorizontal,
  Filter,
  Search,
  Download,
  RefreshCw,
  Eye,
  Edit,
  MessageSquare,
  Bell,
  FileText,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function RouteTabs() {
  const [selectedRoute, setSelectedRoute] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const handleRowClick = (route) => {
    setSelectedRoute(route)
    setIsDialogOpen(true)
  }

  // Active Routes Data
  const activeRoutes = [
    {
      id: "R001",
      routeNumber: "M-12",
      driver: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=40&width=40",
        phone: "07700 900123",
        experience: "5 years",
      },
      pa: {
        name: "Alice Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        phone: "07700 900456",
        status: "Picked Up",
      },
      vehicle: {
        type: "Van",
        registration: "AB12 CDE",
        capacity: "8 seats",
        accessibility: "Wheelchair lift",
      },
      destination: "Springfield Elementary",
      startTime: "08:00 AM",
      status: "On Time",
      eta: "08:30 AM",
      students: [
        {
          name: "Tommy Smith",
          age: 9,
          needs: "Wheelchair access",
          pickupLocation: "123 Main St",
          pickupTime: "08:15 AM",
          status: "Picked Up",
        },
        {
          name: "Sarah Johnson",
          age: 10,
          needs: "Visual impairment support",
          pickupLocation: "456 Oak Ave",
          pickupTime: "08:20 AM",
          status: "En Route",
        },
      ],
      notes: "Tommy requires special seating arrangement",
    },
    {
      id: "R002",
      routeNumber: "A-05",
      driver: {
        name: "Jane Smith",
        avatar: "/placeholder.svg?height=40&width=40",
        phone: "07700 900246",
        experience: "3 years",
      },
      pa: {
        name: "Bob Williams",
        avatar: "/placeholder.svg?height=40&width=40",
        phone: "07700 900578",
        status: "En Route",
      },
      vehicle: {
        type: "Bus",
        registration: "FG34 HIJ",
        capacity: "16 seats",
        accessibility: "Wheelchair ramp",
      },
      destination: "Oakville High School",
      startTime: "08:15 AM",
      status: "Delayed",
      eta: "09:00 AM",
      students: [
        {
          name: "Michael Brown",
          age: 15,
          needs: "Behavioral support",
          pickupLocation: "789 Pine Rd",
          pickupTime: "08:30 AM",
          status: "Waiting",
        },
        {
          name: "Emily Davis",
          age: 16,
          needs: "Mobility assistance",
          pickupLocation: "101 Cedar Ln",
          pickupTime: "08:40 AM",
          status: "Waiting",
        },
      ],
      notes: "Traffic delay on Main Street",
    },
  ]

  // Completed Routes Data
  const completedRoutes = [
    {
      id: "R006",
      routeNumber: "A-03",
      driver: "Alice Johnson",
      destination: "Meadowbrook Elementary",
      completionTime: "03:30 PM",
      studentsTransported: 6,
      onTimeArrival: true,
      incidents: 0,
    },
    {
      id: "R007",
      routeNumber: "M-07",
      driver: "Bob Williams",
      destination: "Sunset High School",
      completionTime: "03:45 PM",
      studentsTransported: 8,
      onTimeArrival: true,
      incidents: 0,
    },
  ]

  // Council Assigned Routes Data
  const councilRoutes = [
    {
      id: "R011",
      routeNumber: "C-01",
      driver: "Frank Miller",
      destination: "Riverdale Middle School",
      startDate: "2023-06-15",
      endDate: "2023-06-30",
      status: "Scheduled",
      council: "Riverdale Council",
      contactPerson: "Martha Jones",
      contactPhone: "07700 900111",
      studentsCount: 12,
      specialRequirements: "2 wheelchair spaces needed",
    },
  ]

  // Scheduled Routes Data
  const scheduledRoutes = [
    {
      id: "R016",
      routeNumber: "S-01",
      driver: "Karen White",
      destination: "Pinegrove Elementary",
      scheduledDate: "2023-06-20",
      departureTime: "08:00 AM",
      returnTime: "03:30 PM",
      studentsCount: 8,
      vehicleType: "Van",
      vehicleReg: "AB12 CDE",
      status: "Confirmed",
    },
  ]

  // Routes with Issues Data
  const issuesRoutes = [
    {
      id: "R021",
      routeNumber: "I-01",
      driver: "Paul Wilson",
      destination: "Riverside Elementary",
      issueType: "Vehicle Breakdown",
      issueTime: "08:15 AM",
      status: "Replacement Dispatched",
      estimatedResolution: "09:00 AM",
      affectedStudents: 6,
      priority: "High",
    },
  ]

  // Filter functions
  const filterActiveRoutes = () => {
    let filtered = [...activeRoutes]
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (route) =>
          route.id.toLowerCase().includes(query) ||
          route.routeNumber.toLowerCase().includes(query) ||
          route.driver.name.toLowerCase().includes(query) ||
          route.destination.toLowerCase().includes(query),
      )
    }
    if (statusFilter !== "all") {
      filtered = filtered.filter((route) =>
        statusFilter === "on-time"
          ? route.status === "On Time"
          : statusFilter === "delayed"
            ? route.status === "Delayed"
            : true,
      )
    }
    return filtered
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search routes..."
              className="pl-10 w-full bg-slate-800/50 border-slate-700 text-slate-200 placeholder:text-slate-400 focus:border-slate-600 focus:ring-slate-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-44 bg-slate-800/50 border-slate-700 text-slate-200">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="all" className="text-slate-200 focus:bg-slate-700">
                All Statuses
              </SelectItem>
              <SelectItem value="on-time" className="text-slate-200 focus:bg-slate-700">
                On Time
              </SelectItem>
              <SelectItem value="delayed" className="text-slate-200 focus:bg-slate-700">
                Delayed
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <Button
            variant="outline"
            size="sm"
            className="h-9 bg-slate-700/50 border-slate-600 text-slate-200 hover:bg-slate-600/50"
          >
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-9 bg-slate-700/50 border-slate-600 text-slate-200 hover:bg-slate-600/50"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-9 px-2 bg-slate-700/50 border-slate-600 text-slate-200 hover:bg-slate-600/50"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid grid-cols-5 mb-6 bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700/50 p-1">
          <TabsTrigger
            value="active"
            className="flex items-center gap-2 data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-300 text-slate-400 rounded-md py-3 transition-all duration-300"
            onClick={() => setStatusFilter("all")}
          >
            <Truck className="h-4 w-4" />
            <span>Active</span>
            <Badge variant="outline" className="ml-1 bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
              {activeRoutes.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="flex items-center gap-2 data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-300 text-slate-400 rounded-md py-3 transition-all duration-300"
            onClick={() => setStatusFilter("all")}
          >
            <CheckCircle className="h-4 w-4" />
            <span>Completed</span>
            <Badge variant="outline" className="ml-1 bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
              {completedRoutes.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger
            value="council"
            className="flex items-center gap-2 data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300 text-slate-400 rounded-md py-3 transition-all duration-300"
            onClick={() => setStatusFilter("all")}
          >
            <FileText className="h-4 w-4" />
            <span>Council</span>
            <Badge variant="outline" className="ml-1 bg-blue-500/20 text-blue-300 border-blue-500/30">
              {councilRoutes.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger
            value="scheduled"
            className="flex items-center gap-2 data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300 text-slate-400 rounded-md py-3 transition-all duration-300"
            onClick={() => setStatusFilter("all")}
          >
            <Calendar className="h-4 w-4" />
            <span>Scheduled</span>
            <Badge variant="outline" className="ml-1 bg-purple-500/20 text-purple-300 border-purple-500/30">
              {scheduledRoutes.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger
            value="issues"
            className="flex items-center gap-2 data-[state=active]:bg-red-500/20 data-[state=active]:text-red-300 text-slate-400 rounded-md py-3 transition-all duration-300"
            onClick={() => setStatusFilter("all")}
          >
            <AlertTriangle className="h-4 w-4" />
            <span>Issues</span>
            <Badge variant="outline" className="ml-1 bg-red-500/20 text-red-300 border-red-500/30">
              {issuesRoutes.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-0">
          <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50">
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-slate-900/50 sticky top-0">
                  <TableRow className="border-slate-700/50">
                    <TableHead className="font-medium text-slate-300 w-[80px]">Route ID</TableHead>
                    <TableHead className="font-medium text-slate-300 w-[80px]">Route #</TableHead>
                    <TableHead className="font-medium text-slate-300">Driver</TableHead>
                    <TableHead className="font-medium text-slate-300">Destination</TableHead>
                    <TableHead className="font-medium text-slate-300">Start Time</TableHead>
                    <TableHead className="font-medium text-slate-300">Status</TableHead>
                    <TableHead className="font-medium text-slate-300">ETA</TableHead>
                    <TableHead className="font-medium text-slate-300 w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filterActiveRoutes().map((route) => (
                    <TableRow
                      key={route.id}
                      className="cursor-pointer hover:bg-slate-800/50 border-slate-700/50 transition-colors duration-200"
                      onClick={() => handleRowClick(route)}
                    >
                      <TableCell className="font-medium text-slate-200">{route.id}</TableCell>
                      <TableCell className="text-slate-200">{route.routeNumber}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={route.driver.avatar || "/placeholder.svg"} alt={route.driver.name} />
                            <AvatarFallback className="bg-slate-700 text-slate-200">
                              {route.driver.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-slate-200">{route.driver.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-slate-200">
                          <MapPin className="mr-1 h-3 w-3 text-slate-400 flex-shrink-0" />
                          <span>{route.destination}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-slate-200">
                          <Clock className="mr-1 h-3 w-3 text-slate-400 flex-shrink-0" />
                          <span>{route.startTime}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={route.status === "On Time" ? "default" : "destructive"}
                          className={
                            route.status === "On Time"
                              ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                              : "bg-red-500/20 text-red-300 border-red-500/30"
                          }
                        >
                          {route.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-200">{route.eta}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                            <DropdownMenuItem className="cursor-pointer text-slate-200 focus:bg-slate-700">
                              <Eye className="mr-2 h-4 w-4" />
                              <span>View Details</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer text-slate-200 focus:bg-slate-700">
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Edit Route</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer text-slate-200 focus:bg-slate-700">
                              <MessageSquare className="mr-2 h-4 w-4" />
                              <span>Contact Driver</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer text-slate-200 focus:bg-slate-700">
                              <Bell className="mr-2 h-4 w-4" />
                              <span>Send Alert</span>
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
        </TabsContent>

        <TabsContent value="completed" className="mt-0">
          <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50">
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-slate-900/50 sticky top-0">
                  <TableRow className="border-slate-700/50">
                    <TableHead className="font-medium text-slate-300 w-[80px]">Route ID</TableHead>
                    <TableHead className="font-medium text-slate-300 w-[80px]">Route #</TableHead>
                    <TableHead className="font-medium text-slate-300">Driver</TableHead>
                    <TableHead className="font-medium text-slate-300">Destination</TableHead>
                    <TableHead className="font-medium text-slate-300">Completion Time</TableHead>
                    <TableHead className="font-medium text-slate-300">Students</TableHead>
                    <TableHead className="font-medium text-slate-300">On Time</TableHead>
                    <TableHead className="font-medium text-slate-300">Incidents</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completedRoutes.map((route) => (
                    <TableRow
                      key={route.id}
                      className="cursor-pointer hover:bg-slate-800/50 border-slate-700/50 transition-colors duration-200"
                    >
                      <TableCell className="font-medium text-slate-200">{route.id}</TableCell>
                      <TableCell className="text-slate-200">{route.routeNumber}</TableCell>
                      <TableCell className="text-slate-200">{route.driver}</TableCell>
                      <TableCell>
                        <div className="flex items-center text-slate-200">
                          <MapPin className="mr-1 h-3 w-3 text-slate-400 flex-shrink-0" />
                          <span>{route.destination}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-slate-200">
                          <Clock className="mr-1 h-3 w-3 text-slate-400 flex-shrink-0" />
                          <span>{route.completionTime}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-200">{route.studentsTransported}</TableCell>
                      <TableCell>
                        {route.onTimeArrival ? (
                          <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">On Time</Badge>
                        ) : (
                          <Badge className="bg-red-500/20 text-red-300 border-red-500/30">Delayed</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {route.incidents === 0 ? (
                          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-300 border-emerald-500/30">
                            None
                          </Badge>
                        ) : (
                          <Badge className="bg-red-500/20 text-red-300 border-red-500/30">{route.incidents}</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tab contents would follow the same pattern */}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] p-0 flex flex-col overflow-hidden bg-slate-900 border-slate-700">
            {selectedRoute && (
              <>
                <DialogHeader className="px-6 py-4 border-b border-slate-700 sticky top-0 bg-slate-900 z-10">
                  <div className="flex justify-between items-center">
                    <DialogTitle className="text-lg font-medium text-slate-200">
                      Route Details - {selectedRoute.id} ({selectedRoute.routeNumber})
                    </DialogTitle>
                    <Badge
                      variant={selectedRoute.status === "On Time" ? "default" : "destructive"}
                      className={
                        selectedRoute.status === "On Time"
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                          : "bg-red-500/20 text-red-300 border-red-500/30"
                      }
                    >
                      {selectedRoute.status}
                    </Badge>
                  </div>
                  <DialogDescription className="text-sm text-slate-400 mt-1">
                    Detailed information about the selected route, including driver, PA, vehicle, and students.
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea className="flex-grow">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 max-h-[calc(80vh-4rem)] overflow-y-auto">
                    <div className="space-y-6 h-full overflow-y-auto">
                      <div>
                        <h3 className="text-sm font-medium text-slate-400 mb-2 flex items-center">
                          <User className="h-4 w-4 mr-1" /> Driver Information
                        </h3>
                        <Card className="overflow-hidden bg-slate-800/50 border-slate-700/50">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3 mb-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage
                                  src={selectedRoute.driver.avatar || "/placeholder.svg"}
                                  alt={selectedRoute.driver.name}
                                />
                                <AvatarFallback className="bg-slate-700 text-slate-200">
                                  {selectedRoute.driver.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-slate-200">{selectedRoute.driver.name}</p>
                                <p className="text-sm text-slate-400">{selectedRoute.driver.experience} experience</p>
                              </div>
                            </div>
                            <p className="text-sm flex items-center text-slate-300">
                              <Phone className="h-3 w-3 mr-1 text-slate-400" />
                              <span className="font-medium">Contact:</span> {selectedRoute.driver.phone}
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </>
            )}
          </DialogContent>
        </Dialog>
      </Tabs>
    </div>
  )
}

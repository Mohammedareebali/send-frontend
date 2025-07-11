import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Check, Clock, AlertTriangle, MapPin } from "lucide-react"

export function RouteStatus() {
  const inProgressRoutes = [
    { id: "R001", driver: "John Doe", startTime: "08:00 AM", status: "On Time", eta: "10:30 AM" },
    { id: "R002", driver: "Jane Smith", startTime: "08:15 AM", status: "Slight Delay", eta: "10:50 AM" },
    { id: "R003", driver: "Mike Johnson", startTime: "08:30 AM", status: "On Time", eta: "11:00 AM" },
    { id: "R004", driver: "Sarah Brown", startTime: "08:45 AM", status: "Ahead of Schedule", eta: "10:45 AM" },
  ]

  const completedRoutes = [
    {
      id: "R005",
      driver: "Chris Lee",
      completionTime: "09:30 AM",
      status: "Completed",
      location: "Hillside High School",
    },
    {
      id: "R006",
      driver: "Emily Davis",
      completionTime: "09:45 AM",
      status: "Completed",
      location: "Oakville Elementary",
    },
    {
      id: "R007",
      driver: "Alex Johnson",
      completionTime: "10:00 AM",
      status: "Completed",
      location: "Riverside Middle School",
    },
    {
      id: "R008",
      driver: "Maria Garcia",
      completionTime: "10:15 AM",
      status: "Completed",
      location: "Meadowbrook Academy",
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="bg-white border border-gray-100 shadow-sm overflow-hidden">
        <CardHeader className="bg-yellow-100 border-b border-yellow-200">
          <CardTitle className="text-lg font-semibold flex items-center">
            <Clock className="mr-2 h-5 w-5 text-yellow-600" />
            Routes In Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="font-medium">Route ID</TableHead>
                <TableHead className="font-medium">Driver</TableHead>
                <TableHead className="font-medium">Start Time</TableHead>
                <TableHead className="font-medium">ETA</TableHead>
                <TableHead className="font-medium">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inProgressRoutes.map((route) => (
                <TableRow key={route.id} className="hover:bg-gray-50 cursor-pointer">
                  <TableCell className="font-medium">{route.id}</TableCell>
                  <TableCell>{route.driver}</TableCell>
                  <TableCell>{route.startTime}</TableCell>
                  <TableCell>{route.eta}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        route.status === "On Time"
                          ? "default"
                          : route.status === "Ahead of Schedule"
                            ? "success"
                            : "warning"
                      }
                      className="bg-opacity-20 text-xs"
                    >
                      {route.status === "On Time" && <Clock className="mr-1 h-3 w-3" />}
                      {route.status === "Ahead of Schedule" && <Check className="mr-1 h-3 w-3" />}
                      {route.status === "Slight Delay" && <AlertTriangle className="mr-1 h-3 w-3" />}
                      {route.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="bg-white border border-gray-100 shadow-sm overflow-hidden">
        <CardHeader className="bg-green-100 border-b border-green-200">
          <CardTitle className="text-lg font-semibold flex items-center">
            <Check className="mr-2 h-5 w-5 text-green-600" />
            Routes Completed
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="font-medium">Route ID</TableHead>
                <TableHead className="font-medium">Driver</TableHead>
                <TableHead className="font-medium">Completion Time</TableHead>
                <TableHead className="font-medium">Location</TableHead>
                <TableHead className="font-medium">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {completedRoutes.map((route) => (
                <TableRow key={route.id} className="hover:bg-gray-50 cursor-pointer">
                  <TableCell className="font-medium">{route.id}</TableCell>
                  <TableCell>{route.driver}</TableCell>
                  <TableCell>{route.completionTime}</TableCell>
                  <TableCell className="flex items-center">
                    <MapPin className="mr-1 h-3 w-3 text-gray-500" />
                    {route.location}
                  </TableCell>
                  <TableCell>
                    <Check className="h-5 w-5 text-green-500" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

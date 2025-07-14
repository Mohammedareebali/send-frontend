import { notFound } from "next/navigation"
import { DashboardHeader } from "@/components/layout/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { BackButton } from "@/components/back-button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, AlertTriangle, CheckCircle, User, MapPin, FileText, Calendar, Truck, UserCheck } from "lucide-react"

// This would typically come from an API or database
const completedRunsData = [
  {
    id: "R006",
    councilName: "London Borough Council",
    clientName: "John Smith",
    runCallNumber: "C123",
    createdAt: "2023-06-10T13:00:00Z",
    createdBy: "Admin User",
    driver: "Alice Johnson",
    driverContact: "07700 900123",
    pa: "Bob Smith",
    paContact: "07700 900456",
    status: "Completed",
    destination: "Meadowbrook Elementary",
    startTime: "2023-06-10T14:00:00Z",
    completionTime: "2023-06-10T15:30:00Z",
    vehicle: "Van 01",
    timeline: [
      { time: "2023-06-10T13:00:00Z", event: "Run created", user: "Admin User" },
      { time: "2023-06-10T13:15:00Z", event: "Driver assigned", user: "System" },
      { time: "2023-06-10T13:30:00Z", event: "PA assigned", user: "System" },
      { time: "2023-06-10T14:00:00Z", event: "Run started", user: "Alice Johnson" },
      { time: "2023-06-10T15:30:00Z", event: "Run completed", user: "Alice Johnson" },
    ],
    specialRequirements: "Wheelchair access required for Emma Wilson",
    onTimePerformance: 100,
    parentFeedback: "Driver was very polite and punctual",
    notes: "Route completed without any issues.",
    children: [
      {
        name: "Emma Wilson",
        schoolPickupTime: "2023-06-10T14:15:00Z",
        homeDropoffTime: "2023-06-10T15:15:00Z",
        actualPickupTime: "2023-06-10T14:15:00Z",
        parentName: "Sarah Wilson",
        parentPhone: "07700 900789",
        schoolAddress: "123 School St, London, SW1A 1AA",
        homeAddress: "456 Home Ave, London, SW1A 2BB",
      },
      {
        name: "Liam Garcia",
        schoolPickupTime: "2023-06-10T14:30:00Z",
        homeDropoffTime: "2023-06-10T15:20:00Z",
        actualPickupTime: "2023-06-10T14:30:00Z",
        parentName: "Maria Garcia",
        parentPhone: "07700 900321",
        schoolAddress: "789 Academy Rd, London, SW1A 3CC",
        homeAddress: "101 Residence Ln, London, SW1A 4DD",
      },
    ],
    paPickupTime: "2023-06-10T13:30:00Z",
    paDropoffTime: "2023-06-10T16:00:00Z",
    paPickupLocation: "10 PA Street, London, SW1A 5EE",
    paDropoffLocation: "10 PA Street, London, SW1A 5EE",
  },
]

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString()
}

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-green-100 text-green-800"
    case "in progress":
      return "bg-blue-100 text-blue-800"
    case "cancelled":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

function getTimelineIcon(event: string) {
  if (event.includes("created") || event.includes("assigned")) {
    return <Clock className="h-4 w-4 text-blue-500" />
  } else if (event.includes("completed")) {
    return <CheckCircle className="h-4 w-4 text-green-500" />
  } else {
    return <AlertTriangle className="h-4 w-4 text-yellow-500" />
  }
}

export default function CompletedRunDetailsPage({ params }: { params: { id: string } }) {
  const run = completedRunsData.find((run) => run.id === params.id)

  if (!run) {
    notFound()
  }

  return (
    <div className="flex h-screen bg-gray-100">
     
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <BackButton href="/dashboard/routes-management" label="Back to Routes Management" />
            <div className="mb-6">
              <h1 className="text-3xl font-bold">Completed Run Details - {run.id}</h1>
              <p className="text-gray-500">
                {run.clientName} - {run.runCallNumber}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left column */}
              <div className="space-y-6">
                {/* Run Status */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center justify-between">
                      Run Status
                      <Badge className={getStatusColor(run.status)}>{run.status}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Created At:</span>
                        <span>{formatDate(run.createdAt)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Created By:</span>
                        <span>{run.createdBy}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Staff Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Staff Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${run.driver}`} />
                        <AvatarFallback>
                          <Truck className="h-6 w-6" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{run.driver}</p>
                        <p className="text-sm text-gray-500">Driver - {run.driverContact}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${run.pa}`} />
                        <AvatarFallback>
                          <UserCheck className="h-6 w-6" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{run.pa}</p>
                        <p className="text-sm text-gray-500">Passenger Assistant - {run.paContact}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Timeline */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {run.timeline.map((event, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="mt-1">{getTimelineIcon(event.event)}</div>
                          <div>
                            <p className="font-medium">{event.event}</p>
                            <p className="text-sm text-gray-500">
                              {formatDate(event.time)} by {event.user}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Middle column */}
              <div className="space-y-6">
                {/* Run Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Run Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-medium">Special Requirements</p>
                      <p className="text-sm">{run.specialRequirements}</p>
                    </div>
                    <div>
                      <p className="font-medium">On-Time Performance</p>
                      <p className="text-sm">{run.onTimePerformance}%</p>
                    </div>
                    <div>
                      <p className="font-medium">Notes</p>
                      <p className="text-sm">{run.notes}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* PA Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">PA Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-medium">PA Pickup Location</p>
                      <p className="text-sm">{run.paPickupLocation}</p>
                    </div>
                    <div>
                      <p className="font-medium">PA Dropoff Location</p>
                      <p className="text-sm">{run.paDropoffLocation}</p>
                    </div>
                    <div>
                      <p className="font-medium">PA Pickup Time</p>
                      <p className="text-sm">{formatDate(run.paPickupTime)}</p>
                    </div>
                    <div>
                      <p className="font-medium">PA Dropoff Time</p>
                      <p className="text-sm">{formatDate(run.paDropoffTime)}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Parent Feedback */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Parent Feedback</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{run.parentFeedback}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Right column */}
              <div className="space-y-6">
                {/* Children Information */}
                {run.children.map((child, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{child.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div>
                        <p className="font-medium">Parent/Guardian</p>
                        <p className="text-sm">
                          {child.parentName} - {child.parentPhone}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">School Pickup</p>
                        <p className="text-sm">{formatDate(child.schoolPickupTime)}</p>
                      </div>
                      <div>
                        <p className="font-medium">Home Dropoff</p>
                        <p className="text-sm">{formatDate(child.homeDropoffTime)}</p>
                      </div>
                      <div>
                        <p className="font-medium">Actual Pickup</p>
                        <p className="text-sm">{formatDate(child.actualPickupTime)}</p>
                      </div>
                      <div>
                        <p className="font-medium">School Address</p>
                        <p className="text-sm">{child.schoolAddress}</p>
                      </div>
                      <div>
                        <p className="font-medium">Home Address</p>
                        <p className="text-sm">{child.homeAddress}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

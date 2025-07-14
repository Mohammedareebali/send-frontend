"use client"

import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, AlertTriangle, CheckCircle, Truck, UserCheck, Printer } from "lucide-react"
import { BackButton } from "@/components/back-button"
import { DashboardHeader } from "@/components/layout/dashboard-header"
import { Button } from "@/components/ui/button"

// This would typically come from an API or database
const jobHistoryData = [
  {
    id: "RUN001",
    councilName: "London Borough Council",
    clientName: "John Smith",
    runCallNumber: "C123",
    createdAt: "2023-06-01T09:00:00Z",
    createdBy: "Admin User",
    driver: "Jane Doe",
    pa: "Mike Johnson",
    status: "Completed",
    timeline: [
      { time: "2023-06-01T09:00:00Z", event: "Run created", user: "Admin User" },
      { time: "2023-06-01T09:15:00Z", event: "Driver assigned", user: "System" },
      { time: "2023-06-01T09:30:00Z", event: "PA assigned", user: "System" },
      { time: "2023-06-01T14:00:00Z", event: "Pick-up confirmed", user: "Jane Doe" },
      { time: "2023-06-01T15:30:00Z", event: "Drop-off confirmed", user: "Jane Doe" },
    ],
    specialRequirements: "Wheelchair access required",
    pickupTime: "2023-06-01T14:00:00Z",
    dropoffTime: "2023-06-01T15:30:00Z",
    actualPickupTime: "2023-06-01T14:05:00Z",
    actualDropoffTime: "2023-06-01T15:35:00Z",
    onTimePerformance: 95,
    parentFeedback: "Driver was very polite and punctual",
    notes: "Traffic delay on Main St, arrived 5 minutes late",
    children: [
      {
        name: "Alice Smith",
        schoolPickupTime: "2023-06-01T14:00:00Z",
        homeDropoffTime: "2023-06-01T15:30:00Z",
        actualPickupTime: "2023-06-01T14:05:00Z",
        parentName: "Sarah Smith",
        parentPhone: "07700 900123",
        schoolAddress: "123 School St, London, SW1A 1AA",
        homeAddress: "456 Home Ave, London, SW1A 2BB",
      },
      {
        name: "Bob Smith",
        schoolPickupTime: "2023-06-01T14:10:00Z",
        homeDropoffTime: "2023-06-01T15:40:00Z",
        actualPickupTime: "2023-06-01T14:15:00Z",
        parentName: "Sarah Smith",
        parentPhone: "07700 900123",
        schoolAddress: "789 Academy Rd, London, SW1A 3CC",
        homeAddress: "456 Home Ave, London, SW1A 2BB",
      },
    ],
    paPickupTime: "2023-06-01T13:30:00Z",
    paDropoffTime: "2023-06-01T16:00:00Z",
    paPickupLocation: "10 PA Street, London, SW1A 4DD",
    paDropoffLocation: "10 PA Street, London, SW1A 4DD",
  },
]

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString()
}

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case "completed":
      return "success"
    case "in progress":
      return "default"
    case "cancelled":
      return "destructive"
    default:
      return "secondary"
  }
}

function getTimelineIcon(event: string) {
  if (event.includes("created") || event.includes("assigned")) {
    return <Clock className="h-4 w-4 text-yellow-500" />
  } else if (event.includes("confirmed")) {
    return <CheckCircle className="h-4 w-4 text-green-500" />
  } else {
    return <AlertTriangle className="h-4 w-4 text-yellow-500" />
  }
}

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const job = jobHistoryData.find((job) => job.id === params.id)

  if (!job) {
    notFound()
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
              <BackButton href="/dashboard/job-history" label="Back to Job History" />
              <Button
                onClick={() => window.print()}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium"
              >
                <Printer className="mr-2 h-4 w-4" />
                Print as PDF
              </Button>
            </div>
            <div className="mb-6">
              <h1 className="text-3xl font-bold">Run Details - {job.id}</h1>
              <p className="text-gray-500">
                {job.clientName} - {job.runCallNumber}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left column */}
              <div className="space-y-6">
                {/* Run Status */}
                <Card className="bg-white border border-gray-100 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold flex items-center justify-between">
                      <span className="flex items-center">
                        <Clock className="mr-2 h-5 w-5 text-yellow-500" />
                        Run Status
                      </span>
                      <Badge variant={getStatusColor(job.status)}>{job.status}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Created At:</span>
                        <span>{formatDate(job.createdAt)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Created By:</span>
                        <span>{job.createdBy}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Staff Information */}
                <Card className="bg-white border border-gray-100 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold flex items-center">
                      <Truck className="mr-2 h-5 w-5 text-yellow-500" />
                      Staff Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10 border-2 border-yellow-500">
                        <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${job.driver}`} />
                        <AvatarFallback>
                          <Truck className="h-6 w-6" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{job.driver}</p>
                        <p className="text-sm text-gray-500">Driver</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10 border-2 border-yellow-500">
                        <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${job.pa}`} />
                        <AvatarFallback>
                          <UserCheck className="h-6 w-6" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{job.pa}</p>
                        <p className="text-sm text-gray-500">Passenger Assistant</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Timeline */}
                <Card className="bg-white border border-gray-100 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold flex items-center">
                      <Clock className="mr-2 h-5 w-5 text-yellow-500" />
                      Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {job.timeline.map((event, index) => (
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
                <Card className="bg-white border border-gray-100 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold flex items-center">
                      <Truck className="mr-2 h-5 w-5 text-yellow-500" />
                      Run Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-medium">Special Requirements</p>
                      <p className="text-sm">{job.specialRequirements}</p>
                    </div>
                    <div>
                      <p className="font-medium">On-Time Performance</p>
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                          <div
                            className="bg-yellow-500 h-2.5 rounded-full"
                            style={{ width: `${job.onTimePerformance}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{job.onTimePerformance}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">Notes</p>
                      <p className="text-sm">{job.notes}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* PA Information */}
                <Card className="bg-white border border-gray-100 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold flex items-center">
                      <UserCheck className="mr-2 h-5 w-5 text-yellow-500" />
                      PA Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-medium">PA Pickup Location</p>
                      <p className="text-sm">{job.paPickupLocation}</p>
                    </div>
                    <div>
                      <p className="font-medium">PA Dropoff Location</p>
                      <p className="text-sm">{job.paDropoffLocation}</p>
                    </div>
                    <div>
                      <p className="font-medium">PA Pickup Time</p>
                      <p className="text-sm">{formatDate(job.paPickupTime)}</p>
                    </div>
                    <div>
                      <p className="font-medium">PA Dropoff Time</p>
                      <p className="text-sm">{formatDate(job.paDropoffTime)}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Parent Feedback */}
                <Card className="bg-white border border-gray-100 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold flex items-center">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                      Parent Feedback
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{job.parentFeedback}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Right column */}
              <div className="space-y-6">
                {/* Children Information */}
                {job.children.map((child, index) => (
                  <Card key={index} className="bg-white border border-gray-100 shadow-sm">
                    <CardHeader className="bg-yellow-50 border-b border-yellow-100">
                      <CardTitle className="text-lg font-semibold">{child.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 pt-4">
                      <div>
                        <p className="font-medium text-sm text-gray-500">Parent/Guardian</p>
                        <p className="text-sm font-medium">
                          {child.parentName} - {child.parentPhone}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="font-medium text-sm text-gray-500">School Pickup</p>
                          <p className="text-sm font-medium">{formatDate(child.schoolPickupTime)}</p>
                        </div>
                        <div>
                          <p className="font-medium text-sm text-gray-500">Home Dropoff</p>
                          <p className="text-sm font-medium">{formatDate(child.homeDropoffTime)}</p>
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-500">Actual Pickup</p>
                        <p className="text-sm font-medium">{formatDate(child.actualPickupTime)}</p>
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-500">School Address</p>
                        <p className="text-sm">{child.schoolAddress}</p>
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-500">Home Address</p>
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

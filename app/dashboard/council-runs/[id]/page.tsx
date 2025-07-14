"use client"

import { useState } from "react"
import { notFound } from "next/navigation"
import { DashboardHeader } from "@/components/layout/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { BackButton } from "@/components/back-button"
import { Calendar } from "@/components/ui/calendar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Truck, UserCheck, School, MapPin, User } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// This would typically come from an API or database
const councilRunsData = [
  {
    id: "R011",
    councilName: "Riverdale Council",
    destination: "Riverdale Middle School",
    startDate: "2023-06-15",
    endDate: "2023-06-30",
    status: "Scheduled",
    timetable: [
      {
        date: "2023-06-15",
        driver: "Frank Miller",
        pa: "Alice Johnson",
        children: [
          {
            name: "John Doe",
            age: 12,
            specialRequirements: "Wheelchair access",
            pickupAddress: "123 Main St, Riverdale",
            dropoffAddress: "Riverdale Middle School, 456 School Rd, Riverdale",
          },
          {
            name: "Jane Smith",
            age: 11,
            specialRequirements: "Nut allergy",
            pickupAddress: "789 Oak Ave, Riverdale",
            dropoffAddress: "Riverdale Middle School, 456 School Rd, Riverdale",
          },
        ],
        schoolDetails: {
          name: "Riverdale Middle School",
          address: "456 School Rd, Riverdale",
          contactPerson: "Principal Thompson",
          contactNumber: "555-1234",
        },
      },
      { date: "2023-06-16", driver: "Frank Miller", pa: "Bob Smith", children: [], schoolDetails: {} },
      { date: "2023-06-17", driver: "Emily Brown", pa: "Alice Johnson", children: [], schoolDetails: {} },
      // ... more dates
    ],
    completedRuns: [
      { date: "2023-06-15", driver: "Frank Miller", pa: "Alice Johnson", status: "Completed", notes: "On time" },
      {
        date: "2023-06-16",
        driver: "Frank Miller",
        pa: "Bob Smith",
        status: "Completed",
        notes: "5 minutes delay due to traffic",
      },
      // ... more completed runs
    ],
  },
  // ... other council runs data
]

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString()
}

export default function CouncilRunDetailsPage({ params }: { params: { id: string } }) {
  const run = councilRunsData.find((run) => run.id === params.id)
  const [selectedDay, setSelectedDay] = useState(null)

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
              <h1 className="text-3xl font-bold">Council Assigned Run Details - {run.id}</h1>
              <p className="text-gray-500">
                {run.councilName} - {run.destination}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Run Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Run Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Start Date:</span>
                      <span>{formatDate(run.startDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">End Date:</span>
                      <span>{formatDate(run.endDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Status:</span>
                      <Badge variant={run.status === "Scheduled" ? "success" : "secondary"}>{run.status}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timetable Calendar */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Timetable</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="range"
                    selected={{
                      from: new Date(run.startDate),
                      to: new Date(run.endDate),
                    }}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="timetable" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="timetable">Timetable</TabsTrigger>
                <TabsTrigger value="completed">Completed Runs</TabsTrigger>
              </TabsList>
              <TabsContent value="timetable">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Timetable Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Driver</TableHead>
                          <TableHead>Passenger Assistant</TableHead>
                          <TableHead>Details</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {run.timetable.map((day, index) => (
                          <TableRow key={index}>
                            <TableCell>{formatDate(day.date)}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${day.driver}`} />
                                  <AvatarFallback>
                                    <Truck className="h-4 w-4" />
                                  </AvatarFallback>
                                </Avatar>
                                <span>{day.driver}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${day.pa}`} />
                                  <AvatarFallback>
                                    <UserCheck className="h-4 w-4" />
                                  </AvatarFallback>
                                </Avatar>
                                <span>{day.pa}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline">View Details</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                  <DialogHeader>
                                    <DialogTitle>Run Details for {formatDate(day.date)}</DialogTitle>
                                    <DialogDescription>Details for the run on {formatDate(day.date)}</DialogDescription>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="driver">Driver</Label>
                                      <Input id="driver" value={day.driver} className="col-span-3" readOnly />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="pa">PA</Label>
                                      <Input id="pa" value={day.pa} className="col-span-3" readOnly />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="school">School</Label>
                                      <Input
                                        id="school"
                                        value={day.schoolDetails.name}
                                        className="col-span-3"
                                        readOnly
                                      />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="school-address">School Address</Label>
                                      <Input
                                        id="school-address"
                                        value={day.schoolDetails.address}
                                        className="col-span-3"
                                        readOnly
                                      />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="school-contact">School Contact</Label>
                                      <Input
                                        id="school-contact"
                                        value={`${day.schoolDetails.contactPerson} - ${day.schoolDetails.contactNumber}`}
                                        className="col-span-3"
                                        readOnly
                                      />
                                    </div>
                                  </div>
                                  <DialogHeader>
                                    <DialogTitle>Children</DialogTitle>
                                  </DialogHeader>
                                  {day.children.map((child, index) => (
                                    <div key={index} className="mt-4">
                                      <h4 className="font-semibold">{child.name}</h4>
                                      <p>Age: {child.age}</p>
                                      <p>Special Requirements: {child.specialRequirements}</p>
                                      <p>Pickup: {child.pickupAddress}</p>
                                      <p>Dropoff: {child.dropoffAddress}</p>
                                    </div>
                                  ))}
                                </DialogContent>
                              </Dialog>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="completed">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Completed Runs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Driver</TableHead>
                          <TableHead>Passenger Assistant</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Notes</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {run.completedRuns.map((completedRun, index) => (
                          <TableRow key={index}>
                            <TableCell>{formatDate(completedRun.date)}</TableCell>
                            <TableCell>{completedRun.driver}</TableCell>
                            <TableCell>{completedRun.pa}</TableCell>
                            <TableCell>
                              <Badge variant="success">{completedRun.status}</Badge>
                            </TableCell>
                            <TableCell>{completedRun.notes}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { UserX, Clock, Phone, Zap, User, CheckCircle, X } from "lucide-react"

export function LastMinuteCancellations() {
  const [selectedCancellation, setSelectedCancellation] = useState<any>(null)

  const cancellations = [
    {
      id: "C001",
      route: "R-034",
      staffType: "Driver",
      staffName: "John Smith",
      reason: "Sick Leave",
      timeUntilRun: "45 min",
      studentsAffected: 5,
      urgency: "critical",
      replacementStatus: "Finding replacement",
      contactNumber: "07700 900123",
      runTime: "08:30",
      destination: "Greenfield Primary",
    },
    {
      id: "C002",
      route: "R-067",
      staffType: "Passenger Assistant",
      staffName: "Emma Wilson",
      reason: "Family Emergency",
      timeUntilRun: "1h 20m",
      studentsAffected: 3,
      urgency: "high",
      replacementStatus: "Replacement found",
      contactNumber: "07700 900456",
      runTime: "09:15",
      destination: "Oak Tree School",
    },
    {
      id: "C003",
      route: "R-089",
      staffType: "Driver",
      staffName: "Mike Johnson",
      reason: "Vehicle Issue",
      timeUntilRun: "2h 15m",
      studentsAffected: 7,
      urgency: "medium",
      replacementStatus: "Pending approval",
      contactNumber: "07700 900789",
      runTime: "10:00",
      destination: "Riverside Academy",
    },
  ]

  const availableReplacements = {
    drivers: [
      { id: "D001", name: "Sarah Davis", distance: "2.1 km", rating: 4.8, available: true },
      { id: "D002", name: "Tom Wilson", distance: "3.5 km", rating: 4.6, available: true },
      { id: "D003", name: "Lisa Brown", distance: "1.8 km", rating: 4.9, available: false },
    ],
    pas: [
      { id: "PA001", name: "Alice Johnson", distance: "1.5 km", rating: 4.7, available: true },
      { id: "PA002", name: "Bob Williams", distance: "2.8 km", rating: 4.5, available: true },
    ],
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Finding replacement":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      case "Replacement found":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
      case "Pending approval":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      default:
        return "bg-slate-500/20 text-slate-300 border-slate-500/30"
    }
  }

  const handleAssignReplacement = (cancellationId: string, replacementId: string) => {
    console.log(`Assigning ${replacementId} to ${cancellationId}`)
    // In real app, this would make API call
  }

  const handleCall = (phone: string, name: string) => {
    console.log(`Calling ${name} at ${phone}`)
    // In real app, this would initiate call
  }

  return (
    <Card className="bg-slate-800/30 border-slate-700/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-slate-200">
            <UserX className="h-5 w-5 text-orange-400" />
            Last Minute Cancellations
          </CardTitle>
          <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">{cancellations.length} Active</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {cancellations.map((cancellation) => (
          <Card
            key={cancellation.id}
            className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/70 transition-all duration-200"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                {/* Left - Staff & Route Info */}
                <div className="flex items-center gap-4 flex-1">
                  <div className={`w-3 h-3 rounded-full ${getUrgencyColor(cancellation.urgency)}`} />
                  <div>
                    <div className="font-semibold text-slate-200">{cancellation.route}</div>
                    <div className="text-sm text-slate-400">
                      {cancellation.staffName} ({cancellation.staffType})
                    </div>
                  </div>
                  <div className="hidden md:block w-px h-8 bg-slate-700" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-slate-300">{cancellation.reason}</div>
                    <div className="text-xs text-slate-400">{cancellation.destination}</div>
                  </div>
                </div>

                {/* Center - Time & Students */}
                <div className="hidden lg:flex items-center gap-6 px-4">
                  <div className="text-center">
                    <div className="flex items-center gap-1 text-sm">
                      <Clock className="h-3 w-3 text-slate-400" />
                      <span className="text-orange-400 font-medium">{cancellation.timeUntilRun}</span>
                    </div>
                    <div className="text-xs text-slate-400">until run</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-slate-300">{cancellation.studentsAffected}</div>
                    <div className="text-xs text-slate-400">students</div>
                  </div>
                </div>

                {/* Right - Status & Actions */}
                <div className="flex items-center gap-3">
                  <Badge className={getStatusBadge(cancellation.replacementStatus)} variant="outline">
                    {cancellation.replacementStatus}
                  </Badge>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleCall(cancellation.contactNumber, cancellation.staffName)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3"
                    >
                      <Phone className="h-3 w-3" />
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          onClick={() => setSelectedCancellation(cancellation)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-3"
                        >
                          <Zap className="h-3 w-3" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-slate-900 border-slate-700 max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="text-slate-200 flex items-center gap-2">
                            <UserX className="h-5 w-5 text-orange-400" />
                            Find Replacement - {selectedCancellation?.route}
                          </DialogTitle>
                        </DialogHeader>

                        {selectedCancellation && (
                          <div className="space-y-4">
                            {/* Cancellation Summary */}
                            <div className="bg-slate-800/50 rounded-lg p-4">
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-slate-400">Staff:</span>
                                  <p className="text-slate-200 font-medium">
                                    {selectedCancellation.staffName} ({selectedCancellation.staffType})
                                  </p>
                                </div>
                                <div>
                                  <span className="text-slate-400">Time Left:</span>
                                  <p className="text-orange-400 font-medium">{selectedCancellation.timeUntilRun}</p>
                                </div>
                                <div>
                                  <span className="text-slate-400">Students:</span>
                                  <p className="text-slate-200">{selectedCancellation.studentsAffected} affected</p>
                                </div>
                                <div>
                                  <span className="text-slate-400">Reason:</span>
                                  <p className="text-slate-200">{selectedCancellation.reason}</p>
                                </div>
                              </div>
                            </div>

                            {/* Available Staff */}
                            <div className="space-y-3">
                              <h4 className="text-slate-200 font-medium">
                                Available{" "}
                                {selectedCancellation.staffType === "Driver" ? "Drivers" : "Passenger Assistants"}
                              </h4>
                              <div className="space-y-2">
                                {(selectedCancellation.staffType === "Driver"
                                  ? availableReplacements.drivers
                                  : availableReplacements.pas
                                ).map((staff) => (
                                  <div
                                    key={staff.id}
                                    className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                                      staff.available
                                        ? "bg-slate-800/50 border-slate-700/50 hover:border-emerald-500/50"
                                        : "bg-slate-800/20 border-slate-700/30 opacity-50"
                                    }`}
                                  >
                                    <div className="flex items-center gap-3">
                                      <User className="h-4 w-4 text-slate-400" />
                                      <div>
                                        <div className="text-slate-200 font-medium">{staff.name}</div>
                                        <div className="text-sm text-slate-400">
                                          {staff.distance} away • ★ {staff.rating}
                                        </div>
                                      </div>
                                    </div>
                                    {staff.available ? (
                                      <Button
                                        size="sm"
                                        onClick={() => handleAssignReplacement(selectedCancellation.id, staff.id)}
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white"
                                      >
                                        <CheckCircle className="mr-1 h-3 w-3" />
                                        Assign
                                      </Button>
                                    ) : (
                                      <Badge variant="secondary" className="bg-slate-600/50 text-slate-400">
                                        Busy
                                      </Badge>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Emergency Actions */}
                            <div className="flex gap-3 pt-4 border-t border-slate-700/50">
                              <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white">
                                <X className="mr-2 h-4 w-4" />
                                Cancel Route
                              </Button>
                              <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                                <Phone className="mr-2 h-4 w-4" />
                                Emergency Cover
                              </Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>

              {/* Mobile Time & Students */}
              <div className="lg:hidden mt-3 pt-3 border-t border-slate-700/50 flex justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-slate-400" />
                  <span className="text-orange-400">{cancellation.timeUntilRun} until run</span>
                </div>
                <div className="text-slate-300">{cancellation.studentsAffected} students affected</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  )
}

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Clock, AlertTriangle, CheckCircle } from 'lucide-react'
import { cn } from "@/lib/utils"

interface TimelineEvent {
  time: string
  event: string
  user: string
}

interface JobHistoryItemProps {
  job: {
    id: string
    councilName: string
    clientName: string
    runCallNumber: string
    createdAt: string
    createdBy: string
    driver: string
    pa: string
    status: string
    timeline: TimelineEvent[]
    specialRequirements: string
    pickupTime: string
    dropoffTime: string
    actualPickupTime: string
    actualDropoffTime: string
    onTimePerformance: number
    parentFeedback: string
    notes: string
    children: Array<{
      name: string
      schoolPickupTime: string
      homeDropoffTime: string
      actualPickupTime?: string
      parentName: string
      parentPhone: string
      schoolAddress: string
      homeAddress: string
    }>
    paPickupTime: string
    paDropoffTime: string
    paPickupLocation: string;
    paDropoffLocation: string;
  }
}

export function JobHistoryItem({ job }: JobHistoryItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const getStatusColor = (status: string) => {
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

  const getTimelineIcon = (event: string) => {
    if (event.includes("created") || event.includes("assigned")) {
      return <Clock className="h-4 w-4 text-blue-500" />
    } else if (event.includes("confirmed")) {
      return <CheckCircle className="h-4 w-4 text-green-500" />
    } else {
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />
    }
  }

  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Run {job.id}</CardTitle>
          <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Council</p>
            <p>{job.councilName}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Client</p>
            <p>{job.clientName}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Run Call Number</p>
            <p>{job.runCallNumber}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Created</p>
            <p>{formatDate(job.createdAt)}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Driver</p>
            <p>{job.driver}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">PA</p>
            <p>{job.pa}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div>
            <p className="text-sm font-medium text-gray-500">PA Pickup Location</p>
            <p>{job.paPickupLocation || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">PA Dropoff Location</p>
            <p>{job.paDropoffLocation || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">PA Pickup Time</p>
            <p>{job.paPickupTime ? formatDate(job.paPickupTime) : 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">PA Dropoff Time</p>
            <p>{job.paDropoffTime ? formatDate(job.paDropoffTime) : 'N/A'}</p>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-500 mb-2">Children</p>
          {job.children && job.children.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {job.children.map((child, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-md shadow">
                  <h4 className="font-semibold text-lg mb-2">{child.name}</h4>
                  <div className="space-y-1">
                    <p className="text-sm"><span className="font-medium">School Pickup:</span> {formatDate(child.schoolPickupTime)}</p>
                    <p className="text-sm"><span className="font-medium">Home Dropoff:</span> {formatDate(child.homeDropoffTime)}</p>
                    <p className="text-sm"><span className="font-medium">Actual Pickup:</span> {child.actualPickupTime ? formatDate(child.actualPickupTime) : 'N/A'}</p>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm font-medium">Parent/Guardian:</p>
                    <p className="text-sm">{child.parentName} - {child.parentPhone}</p>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm font-medium">School Address:</p>
                    <p className="text-sm">{child.schoolAddress}</p>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm font-medium">Home Address:</p>
                    <p className="text-sm">{child.homeAddress}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No children information available</p>
          )}
        </div>
        {isExpanded && (
          <>
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-500 mb-2">Timeline</p>
              <div className="space-y-2">
                {job.timeline.map((event, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mr-2 mt-1">{getTimelineIcon(event.event)}</div>
                    <div>
                      <p className="text-sm">{event.event}</p>
                      <p className="text-xs text-gray-500">
                        {formatDate(event.time)} by {event.user}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Special Requirements</p>
                <p>{job.specialRequirements}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">On-Time Performance</p>
                <p>{job.onTimePerformance}%</p>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-500">Parent Feedback</p>
              <p>{job.parentFeedback}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Notes</p>
              <p>{job.notes}</p>
            </div>
          </>
        )}
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              <ChevronUp className="mr-2 h-4 w-4" /> Show Less
            </>
          ) : (
            <>
              <ChevronDown className="mr-2 h-4 w-4" /> Show More
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

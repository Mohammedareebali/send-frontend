import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, FileCheck, MessageSquare, AlertTriangle, Car, UserCheck } from "lucide-react"

interface StaffActivityTimelineProps {
  id: string
  type: "driver" | "pa"
}

export function StaffActivityTimeline({ id, type }: StaffActivityTimelineProps) {
  // Mock data for activity timeline
  const activities = [
    {
      id: 1,
      type: "route_completed",
      title: "Completed Route R001",
      description: "Successfully transported 5 students from School A to their homes",
      time: "Today, 15:30",
      icon: <MapPin className="h-4 w-4" />,
      color: "bg-green-100 text-green-700",
    },
    {
      id: 2,
      type: "document_updated",
      title: "Document Updated",
      description: "DBS check renewed and uploaded to the system",
      time: "Yesterday, 10:15",
      icon: <FileCheck className="h-4 w-4" />,
      color: "bg-blue-100 text-blue-700",
    },
    {
      id: 3,
      type: "schedule_assigned",
      title: "New Schedule Assigned",
      description: "Assigned to Route R002 for next week",
      time: "2 days ago, 14:20",
      icon: <Calendar className="h-4 w-4" />,
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      id: 4,
      type: "note_added",
      title: "Note Added",
      description: "Supervisor added a note about excellent performance",
      time: "3 days ago, 09:45",
      icon: <MessageSquare className="h-4 w-4" />,
      color: "bg-purple-100 text-purple-700",
    },
    {
      id: 5,
      type: type === "driver" ? "vehicle_inspection" : "training_completed",
      title: type === "driver" ? "Vehicle Inspection Completed" : "Training Completed",
      description:
        type === "driver"
          ? "Vehicle passed the quarterly inspection"
          : "Completed the special needs awareness training",
      time: "1 week ago, 11:30",
      icon: type === "driver" ? <Car className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />,
      color: "bg-indigo-100 text-indigo-700",
    },
    {
      id: 6,
      type: "incident_reported",
      title: "Minor Incident Reported",
      description: "Reported a minor delay due to traffic congestion",
      time: "2 weeks ago, 16:10",
      icon: <AlertTriangle className="h-4 w-4" />,
      color: "bg-orange-100 text-orange-700",
    },
  ]

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <Clock className="mr-2 h-5 w-5 text-yellow-500" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-gray-200" />
          <div className="space-y-6">
            {activities.map((activity) => (
              <div key={activity.id} className="relative pl-10">
                <div className={`absolute left-0 p-1 rounded-full ${activity.color}`}>{activity.icon}</div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                  <div>
                    <h4 className="text-sm font-medium">{activity.title}</h4>
                    <p className="text-sm text-gray-500 mt-0.5">{activity.description}</p>
                  </div>
                  <Badge variant="outline" className="mt-1 sm:mt-0 self-start">
                    {activity.time}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

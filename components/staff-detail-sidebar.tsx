import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CircularProgress } from "@/components/ui/circular-progress"
import { Calendar, Clock, CheckCircle, AlertTriangle, FileText, MapPin, Star } from "lucide-react"

interface StaffDetailSidebarProps {
  id: string
  type: "driver" | "pa"
}

export function StaffDetailSidebar({ id, type }: StaffDetailSidebarProps) {
  return (
    <div className="space-y-4">
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Clock className="mr-2 h-4 w-4 text-yellow-500" />
            Compliance Status
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex justify-center py-2">
            <CircularProgress value={type === "driver" ? 85 : 95} size={100} strokeWidth={10} />
          </div>
          <div className="space-y-2 mt-2">
            <ComplianceItem
              label="DBS Check"
              status={type === "driver" ? "expiring" : "valid"}
              date={type === "driver" ? "Expires in 30 days" : "Valid until May 2025"}
            />
            <ComplianceItem
              label={type === "driver" ? "Driver's License" : "ID Verification"}
              status="valid"
              date="Valid until 2030"
            />
            {type === "driver" && (
              <>
                <ComplianceItem label="PCO License" status="valid" date="Valid until Dec 2025" />
                <ComplianceItem label="Vehicle Insurance" status="valid" date="Valid until Dec 2023" />
              </>
            )}
            <ComplianceItem label="Training Certificate" status="valid" date="Completed Jan 2023" />
          </div>
        </CardContent>
      </Card>

      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Calendar className="mr-2 h-4 w-4 text-yellow-500" />
            Upcoming Schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <ScheduleItem route="R001" time="Today, 15:00" location="School A to Home B" />
            <ScheduleItem route="R002" time="Tomorrow, 08:30" location="Home C to School D" />
            <ScheduleItem route="R003" time="Wed, 15:00" location="School E to Home F" />
          </div>
        </CardContent>
      </Card>

      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Star className="mr-2 h-4 w-4 text-yellow-500" />
            Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            <MetricItem label="On-Time Rate" value="98%" trend="up" />
            <MetricItem label="Completion Rate" value="100%" trend="stable" />
            <MetricItem label="Feedback Score" value="4.8/5" trend="up" />
            <MetricItem label="Incidents" value="0" trend="stable" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface ComplianceItemProps {
  label: string
  status: "valid" | "expiring" | "expired"
  date: string
}

function ComplianceItem({ label, status, date }: ComplianceItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <FileText className="h-3 w-3 mr-2 text-gray-400" />
        <span className="text-sm">{label}</span>
      </div>
      <Badge
        variant={status === "valid" ? "success" : status === "expiring" ? "warning" : "destructive"}
        className="text-xs"
      >
        {status === "valid" ? <CheckCircle className="h-3 w-3 mr-1" /> : <AlertTriangle className="h-3 w-3 mr-1" />}
        <span>{date}</span>
      </Badge>
    </div>
  )
}

interface ScheduleItemProps {
  route: string
  time: string
  location: string
}

function ScheduleItem({ route, time, location }: ScheduleItemProps) {
  return (
    <div className="bg-gray-50 p-2 rounded-md">
      <div className="flex items-center justify-between">
        <Badge variant="outline" className="bg-white">
          {route}
        </Badge>
        <span className="text-xs text-gray-500">{time}</span>
      </div>
      <div className="flex items-center mt-1 text-xs text-gray-600">
        <MapPin className="h-3 w-3 mr-1 text-gray-400" />
        <span>{location}</span>
      </div>
    </div>
  )
}

interface MetricItemProps {
  label: string
  value: string
  trend: "up" | "down" | "stable"
}

function MetricItem({ label, value, trend }: MetricItemProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600">{label}</span>
      <div className="flex items-center">
        <span className="font-medium">{value}</span>
        {trend === "up" && <TrendingUp className="h-3 w-3 ml-1 text-green-500" />}
        {trend === "down" && <TrendingDown className="h-3 w-3 ml-1 text-red-500" />}
        {trend === "stable" && <ArrowRight className="h-3 w-3 ml-1 text-gray-400" />}
      </div>
    </div>
  )
}

function TrendingUp(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
      <polyline points="17 6 23 6 23 12"></polyline>
    </svg>
  )
}

function TrendingDown(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
      <polyline points="17 18 23 18 23 12"></polyline>
    </svg>
  )
}

function ArrowRight(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  )
}

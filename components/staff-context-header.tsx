import { CalendarClock } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface StaffContextHeaderProps {
  title?: string
  subtitle?: string
  lastUpdated?: Date
}

export function StaffContextHeader({
  title = "Staff Management",
  subtitle = "Manage drivers and passenger assistants",
  lastUpdated = new Date(),
}: StaffContextHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            <p className="text-gray-500 mt-1">{subtitle}</p>
          </div>
          <div className="flex items-center mt-2 md:mt-0 text-sm text-gray-500">
            <CalendarClock className="w-4 h-4 mr-1" />
            <span>Last updated {formatDistanceToNow(lastUpdated)} ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}

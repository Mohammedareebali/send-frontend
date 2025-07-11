import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare, Phone, Mail, FileText, UserMinus, AlertTriangle, Calendar, Download } from "lucide-react"

interface StaffDetailActionsProps {
  id: string
  type: "driver" | "pa"
  className?: string
}

export function StaffDetailActions({ id, type, className = "" }: StaffDetailActionsProps) {
  return (
    <Card className={`border border-gray-200 shadow-sm ${className}`}>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="w-full justify-start">
            <Phone className="h-4 w-4 mr-2" />
            <span>Call</span>
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <Mail className="h-4 w-4 mr-2" />
            <span>Email</span>
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <MessageSquare className="h-4 w-4 mr-2" />
            <span>Message</span>
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Schedule</span>
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start col-span-2">
            <FileText className="h-4 w-4 mr-2" />
            <span>Generate Report</span>
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start col-span-2">
            <Download className="h-4 w-4 mr-2" />
            <span>Export Data</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 col-span-2"
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            <span>Report Issue</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 col-span-2"
          >
            <UserMinus className="h-4 w-4 mr-2" />
            <span>Deactivate</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

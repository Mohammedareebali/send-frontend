import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Mail, Phone, MapPin, MoreHorizontal, Edit, UserCheck, UserCog } from "lucide-react"

interface StaffDetailHeaderProps {
  id: string
  type: "driver" | "pa"
  name: string
  status: string
  since: string
  photo: string
}

export function StaffDetailHeader({ id, type, name, status, since, photo }: StaffDetailHeaderProps) {
  return (
    <Card className="border border-gray-200 shadow-sm overflow-hidden">
      <div
        className={`h-2 ${status === "Active" ? "bg-green-500" : status === "On Leave" ? "bg-yellow-500" : "bg-gray-500"}`}
      />
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <Avatar className="h-24 w-24 border-4 border-white shadow-md">
            <AvatarImage src={photo || "/placeholder.svg"} alt={name} />
            <AvatarFallback>
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
                  <Badge variant={status === "Active" ? "success" : status === "On Leave" ? "warning" : "secondary"}>
                    {status}
                  </Badge>
                </div>
                <div className="flex items-center mt-1">
                  {type === "driver" ? (
                    <div className="flex items-center text-yellow-600">
                      <UserCheck className="h-4 w-4 mr-1" />
                      <span className="font-medium">Driver</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-yellow-600">
                      <UserCog className="h-4 w-4 mr-1" />
                      <span className="font-medium">Passenger Assistant</span>
                    </div>
                  )}
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-gray-500">ID: {id}</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <div className="flex items-center text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Since {new Date(since).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="flex items-center text-gray-600">
                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                <span>{type === "driver" ? "07700 900123" : "07700 900234"}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Mail className="h-4 w-4 mr-2 text-gray-400" />
                <span>{type === "driver" ? "john.doe@example.com" : "jane.smith@example.com"}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                <span>{type === "driver" ? "London" : "Manchester"}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

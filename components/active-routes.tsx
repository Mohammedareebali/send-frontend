import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ActiveRoutes() {
  const routes = [
    { id: "R001", driver: "John Doe", status: "In Progress", eta: "10:30 AM" },
    { id: "R002", driver: "Jane Smith", status: "Starting Soon", eta: "10:45 AM" },
    { id: "R003", driver: "Mike Johnson", status: "Delayed", eta: "11:15 AM" },
    { id: "R004", driver: "Sarah Brown", status: "In Progress", eta: "11:00 AM" },
    { id: "R005", driver: "Chris Lee", status: "Starting Soon", eta: "11:30 AM" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Routes</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {routes.map((route) => (
            <li key={route.id} className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium">{route.id}</span>
                <span className="text-xs text-gray-500 ml-2">{route.driver}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs">{route.eta}</span>
                <Badge variant={
                  route.status === "In Progress" ? "default" :
                  route.status === "Starting Soon" ? "secondary" :
                  "destructive"
                }>
                  {route.status}
                </Badge>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

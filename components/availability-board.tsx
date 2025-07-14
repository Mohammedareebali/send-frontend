"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Staff {
  id: string
  name: string
  status: "available" | "on-run" | "off"
  eta?: string
}

export function AvailabilityBoard() {
  const drivers: Staff[] = [
    { id: "D1", name: "John Smith", status: "available" },
    { id: "D2", name: "Jane Doe", status: "on-run", eta: "14:30" },
  ]

  const assistants: Staff[] = [
    { id: "PA1", name: "Alice Brown", status: "available" },
    { id: "PA2", name: "Bob Green", status: "off" },
  ]

  const getBadge = (s: Staff) => {
    switch (s.status) {
      case "available":
        return <Badge variant="success">Available</Badge>
      case "on-run":
        return <Badge variant="warning">On Run {s.eta && `(ETA ${s.eta})`}</Badge>
      default:
        return <Badge variant="destructive">Unavailable</Badge>
    }
  }

  const renderList = (items: Staff[]) => (
    <div className="space-y-2">
      {items.map((p) => (
        <div key={p.id} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src="/placeholder.svg?height=24&width=24" />
              <AvatarFallback>{p.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-slate-200 text-sm">{p.name}</span>
          </div>
          {getBadge(p)}
        </div>
      ))}
    </div>
  )

  return (
    <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white">Staff Availability</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-slate-300 mb-2 font-semibold">Drivers</h3>
          {renderList(drivers)}
        </div>
        <div>
          <h3 className="text-slate-300 mb-2 font-semibold">Passenger Assistants</h3>
          {renderList(assistants)}
        </div>
      </CardContent>
    </Card>
  )
}


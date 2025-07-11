"use client"

import { CalendarIcon, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface StaffDetailScheduleProps {
  id: string
  type: "driver" | "pa"
}

/**
 * Displays upcoming and past assignments for a staff member.
 * Replace the mock data and client-side fetch with your real data hook / API.
 */
export function StaffDetailSchedule({ id, type }: StaffDetailScheduleProps) {
  // TODO: fetch real data. This is demo content.
  const upcoming = [
    {
      date: "2025-07-07",
      shift: "AM",
      route: "Route 12A",
      start: "07:15",
      end: "10:30",
    },
    {
      date: "2025-07-08",
      shift: "PM",
      route: "Route 17C",
      start: "14:00",
      end: "17:45",
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2">
        <CalendarIcon className="size-5 text-muted-foreground" />
        <CardTitle>
          Schedule&nbsp;
          <span className="font-normal text-muted-foreground">
            ({type === "driver" ? "Driver" : "PA"} #{id})
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead className="hidden sm:table-cell">Shift</TableHead>
              <TableHead>Route</TableHead>
              <TableHead className="hidden sm:table-cell">
                <Clock className="mr-1 inline-block size-4" />
                Time
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {upcoming.map((item) => (
              <TableRow key={`${item.date}-${item.route}`}>
                <TableCell>{item.date}</TableCell>
                <TableCell className="hidden sm:table-cell">{item.shift}</TableCell>
                <TableCell>{item.route}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  {item.start} – {item.end}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

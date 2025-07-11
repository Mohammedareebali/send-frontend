"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, CheckCircle, MapPin, Clock, MoreHorizontal, Eye, Download } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function CompletedRuns() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const completedRuns = [
    {
      id: "R006",
      driver: "Alice Johnson",
      destination: "Meadowbrook Elementary",
      completionTime: "03:30 PM",
      startTime: "02:45 PM",
      status: "Completed On Time",
    },
    {
      id: "R007",
      driver: "Bob Williams",
      destination: "Sunset High School",
      completionTime: "03:45 PM",
      startTime: "03:00 PM",
      status: "Completed On Time",
    },
    {
      id: "R008",
      driver: "Carol Davis",
      destination: "Lakeview Middle School",
      completionTime: "04:00 PM",
      startTime: "03:15 PM",
      status: "Completed Late",
    },
  ]

  const filteredRuns = completedRuns.filter(
    (run) =>
      run.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      run.driver.toLowerCase().includes(searchQuery.toLowerCase()) ||
      run.destination.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const viewRunDetails = (runId: string) => {
    router.push(`/dashboard/completed-runs/${runId}`)
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="search"
          placeholder="Search completed runs..."
          className="pl-10 w-full border-gray-200"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="rounded-lg overflow-hidden border border-gray-200">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="font-medium w-[80px]">Run ID</TableHead>
              <TableHead className="font-medium">Driver</TableHead>
              <TableHead className="font-medium">Destination</TableHead>
              <TableHead className="font-medium">Time</TableHead>
              <TableHead className="font-medium">Status</TableHead>
              <TableHead className="font-medium w-[60px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRuns.length > 0 ? (
              filteredRuns.map((run) => (
                <TableRow key={run.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{run.id}</TableCell>
                  <TableCell>{run.driver}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="mr-1.5 h-3.5 w-3.5 text-gray-500 flex-shrink-0" />
                      <span>{run.destination}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="mr-1.5 h-3.5 w-3.5 text-gray-500 flex-shrink-0" />
                      <span>
                        {run.startTime} - {run.completionTime}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={run.status.includes("Late") ? "warning" : "success"}>
                      <CheckCircle className="mr-1 h-3 w-3" />
                      {run.status.replace("Completed ", "")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => viewRunDetails(run.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View Details</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            <span>Export Report</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No completed runs found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Calendar, MapPin, MoreHorizontal, Eye, FileText } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function CouncilAssignedRuns() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const councilRuns = [
    {
      id: "R011",
      driver: "Frank Miller",
      destination: "Riverdale Middle School",
      startDate: "2023-06-15",
      endDate: "2023-06-30",
      status: "Scheduled",
    },
    {
      id: "R012",
      driver: "Grace Taylor",
      destination: "Oakwood Elementary",
      startDate: "2023-06-16",
      endDate: "2023-07-01",
      status: "Pending",
    },
    {
      id: "R013",
      driver: "Henry Clark",
      destination: "Maplewood High School",
      startDate: "2023-06-17",
      endDate: "2023-07-02",
      status: "Scheduled",
    },
  ]

  const filteredRuns = councilRuns.filter(
    (run) =>
      run.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      run.driver.toLowerCase().includes(searchQuery.toLowerCase()) ||
      run.destination.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const viewRunDetails = (runId: string) => {
    router.push(`/dashboard/council-runs/${runId}`)
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="search"
          placeholder="Search council assigned runs..."
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
              <TableHead className="font-medium">Date Range</TableHead>
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
                      <Calendar className="mr-1.5 h-3.5 w-3.5 text-gray-500 flex-shrink-0" />
                      <span>
                        {run.startDate} - {run.endDate}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={run.status === "Scheduled" ? "success" : "secondary"}>{run.status}</Badge>
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
                            <FileText className="mr-2 h-4 w-4" />
                            <span>View Contract</span>
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
                  No council assigned runs found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

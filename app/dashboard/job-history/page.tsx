import { DashboardHeader } from "@/components/layout/dashboard-header"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, Search, Calendar, Building } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function JobHistoryPage() {
  // This would typically come from an API or database
  const jobHistoryData = [
    {
      id: "RUN001",
      councilName: "London Borough Council",
      clientName: "John Smith",
      runCallNumber: "C123",
      driver: "Jane Doe",
      pa: "Mike Johnson",
      completionDate: "2023-06-01T15:30:00Z",
      status: "Completed",
    },
    {
      id: "RUN002",
      councilName: "Manchester City Council",
      clientName: "Emma Brown",
      runCallNumber: "C124",
      driver: "David Wilson",
      pa: "Sarah Davis",
      completionDate: "2023-06-02T16:45:00Z",
      status: "Completed",
    },
    {
      id: "RUN003",
      councilName: "Birmingham City Council",
      clientName: "Alex Turner",
      runCallNumber: "C125",
      driver: "Chris Taylor",
      pa: "Lisa Anderson",
      completionDate: "2023-06-03T14:15:00Z",
      status: "Cancelled",
    },
    {
      id: "RUN004",
      councilName: "Glasgow City Council",
      clientName: "Robert Johnson",
      runCallNumber: "C126",
      driver: "Michael Brown",
      pa: "Jennifer Smith",
      completionDate: "2023-06-04T10:30:00Z",
      status: "Completed",
    },
    {
      id: "RUN005",
      councilName: "Cardiff Council",
      clientName: "William Davis",
      runCallNumber: "C127",
      driver: "Thomas Wilson",
      pa: "Elizabeth Taylor",
      completionDate: "2023-06-05T13:45:00Z",
      status: "Completed",
    },
  ]

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleString()
  }

  return (
    
      <DashboardHeader title="Job History" subtitle="View completed runs and historical data" />
      <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
        <div className="container mx-auto space-y-6">
          {/* Breadcrumb for context */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">
                  <Home className="h-3.5 w-3.5 mr-1" />
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard/job-history" className="font-medium">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  Job History
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Job history content would go here */}
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium">
                <Download className="mr-2 h-4 w-4" /> Export
              </Button>
            </div>

            {/* Filters */}
            <Card className="mb-6 bg-white border border-gray-100 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-yellow-500" />
                  Search Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input placeholder="Search by run number, driver, etc." className="pl-10 border-gray-200" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Council</label>
                    <Select>
                      <SelectTrigger className="border-gray-200">
                        <SelectValue placeholder="Select council" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Councils</SelectItem>
                        <SelectItem value="london">London Borough Council</SelectItem>
                        <SelectItem value="manchester">Manchester City Council</SelectItem>
                        <SelectItem value="birmingham">Birmingham City Council</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Start Date</label>
                    <DatePicker placeholder="Select start date" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">End Date</label>
                    <DatePicker placeholder="Select end date" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Job History List */}
            <Card className="bg-white border border-gray-100 shadow-sm overflow-hidden">
              <CardHeader className="bg-yellow-100 border-b border-yellow-200">
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-yellow-600" />
                  Job Records
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="font-medium">Run ID</TableHead>
                      <TableHead className="font-medium">Council</TableHead>
                      <TableHead className="font-medium">Client</TableHead>
                      <TableHead className="font-medium">Driver</TableHead>
                      <TableHead className="font-medium">PA</TableHead>
                      <TableHead className="font-medium">Completion Date</TableHead>
                      <TableHead className="font-medium">Status</TableHead>
                      <TableHead className="font-medium">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobHistoryData.map((job) => (
                      <TableRow key={job.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{job.id}</TableCell>
                        <TableCell className="flex items-center">
                          <Building className="mr-1 h-3 w-3 text-gray-500" />
                          {job.councilName}
                        </TableCell>
                        <TableCell>{job.clientName}</TableCell>
                        <TableCell>{job.driver}</TableCell>
                        <TableCell>{job.pa}</TableCell>
                        <TableCell className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3 text-gray-500" />
                          {formatDate(job.completionDate)}
                        </TableCell>
                        <TableCell>
                          <Badge variant={job.status === "Completed" ? "success" : "destructive"}>{job.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="border-yellow-200 text-gray-800 hover:bg-yellow-50"
                          >
                            <Link href={`/dashboard/job-history/${job.id}`}>View Details</Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    
  )
}

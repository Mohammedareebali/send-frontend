import { useState } from 'react'
import { DashboardHeader } from "@/components/layout/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function PassengerAssistantsPage() {
  const [nameFilter, setNameFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [expiryDateFilter, setExpiryDateFilter] = useState<Date | undefined>(undefined)

  // Mock data for passenger assistants
  const passengerAssistants = [
    {
      id: 1, name: "Jane Smith", status: "Active", lastAssignment: "R002", performance: "Excellent", expiryDate: new Date("2023-12-31"),
    },
    {
      id: 2, name: "John Doe", status: "On Leave", lastAssignment: "R005", performance: "Good", expiryDate: new Date("2023-11-15"),
    },
    {
      id: 3, name: "Emily Brown", status: "Active", lastAssignment: "R008", performance: "Excellent", expiryDate: new Date("2024-01-31"),
    },
    {
      id: 4, name: "Michael Johnson", status: "Inactive", lastAssignment: "R001", performance: "Average", expiryDate: new Date("2023-10-01"),
    },
    {
      id: 5, name: "Sarah Williams", status: "Active", lastAssignment: "R003", performance: "Good", expiryDate: new Date("2023-12-15"),
    },
  ]

  const filteredPAs = passengerAssistants.filter(pa => 
    pa.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
    (statusFilter === 'All' || pa.status === statusFilter) &&
    (!expiryDateFilter || pa.expiryDate <= expiryDateFilter)
  )

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Passenger Assistants</h1>
            <Card>
              <CardHeader>
                <CardTitle>Passenger Assistant List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <Input
                    placeholder="Filter by name"
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                    className="md:w-1/3"
                  />
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="md:w-1/3">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Statuses</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="On Leave">On Leave</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <DatePicker
                    placeholder="Filter by expiry date"
                    date={expiryDateFilter}
                    onDateChange={setExpiryDateFilter}
                    className="md:w-1/3"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPAs.map((pa) => (
                    <Link href={`/dashboard/passenger-assistants/${pa.id}`} key={pa.id} className="block">
                      <Card className="hover:shadow-lg transition-shadow duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${pa.name}`} alt={pa.name} />
                              <AvatarFallback>{pa.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="text-lg font-semibold">{pa.name}</h3>
                              <p className="text-sm text-gray-500">Passenger Assistant</p>
                            </div>
                          </div>
                          <div className="mt-4 space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">Status</span>
                              <Badge variant={pa.status === "Active" ? "success" : pa.status === "On Leave" ? "warning" : "destructive"}>
                                {pa.status}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">Last Assignment</span>
                              <span className="text-sm">{pa.lastAssignment}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">DBS Expiry Date</span>
                              <span className="text-sm">{pa.expiryDate.toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">Performance</span>
                              <Badge variant={
                                pa.performance === "Excellent" ? "success" :
                                pa.performance === "Good" ? "default" :
                                pa.performance === "Average" ? "secondary" :
                                "destructive"
                              }>
                                {pa.performance}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

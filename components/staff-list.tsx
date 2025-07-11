import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from 'next/router'

interface StaffListProps {
  onDriverSelect: (driverId: string) => void
  onPASelect: (paId: string) => void
}

export function StaffList({ onDriverSelect, onPASelect }: StaffListProps) {
  const [nameFilter, setNameFilter] = useState('')
  const [roleFilter, setRoleFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [expiryDateFilter, setExpiryDateFilter] = useState<Date | undefined>(undefined)
  const [callNoFilter, setCallNoFilter] = useState('')

  const router = useRouter()

  const staffMembers = [
    {
      id: 1, name: "John Doe", role: "Driver", status: "Active", lastRoute: "R001", performance: "Excellent", callNo: "D001", expiryDate: new Date("2023-12-31"),
    },
    {
      id: 2, name: "Jane Smith", role: "PA", status: "On Leave", lastRoute: "R002", performance: "Good", callNo: "P001", expiryDate: new Date("2023-11-15"),
    },
    {
      id: 3, name: "Mike Johnson", role: "Driver", status: "Inactive", lastRoute: "R003", performance: "Average", callNo: "D002", expiryDate: new Date("2023-10-01"),
    },
    {
      id: 4, name: "Sarah Brown", role: "Driver", status: "Active", lastRoute: "R004", performance: "Excellent", callNo: "D003", expiryDate: new Date("2024-01-31"),
    },
    {
      id: 5, name: "Chris Lee", role: "PA", status: "Active", lastRoute: "R005", performance: "Good", callNo: "P002", expiryDate: new Date("2023-12-15"),
    },
  ]

  const filteredStaff = staffMembers.filter(staff => 
    staff.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
    (roleFilter === 'All' || staff.role === roleFilter) &&
    (statusFilter === 'All' || staff.status === statusFilter) &&
    (callNoFilter === '' || staff.callNo.toLowerCase().includes(callNoFilter.toLowerCase())) &&
    (!expiryDateFilter || staff.expiryDate <= expiryDateFilter)
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Staff List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Input
            placeholder="Filter by name"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="md:w-1/5"
          />
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="md:w-1/5">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Roles</SelectItem>
              <SelectItem value="Driver">Driver</SelectItem>
              <SelectItem value="PA">PA</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="md:w-1/5">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="On Leave">On Leave</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="Filter by call no"
            value={callNoFilter}
            onChange={(e) => setCallNoFilter(e.target.value)}
            className="md:w-1/5"
          />
          <DatePicker
            date={expiryDateFilter}
            onDateChange={setExpiryDateFilter}
            placeholder="Filter by expiry date"
            className="md:w-1/5"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStaff.map((staff) => (
            <Card
              key={staff.id}
              className="hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => {
                if (staff.role === "Driver") {
                  router.push(`/dashboard/staff/drivers/${staff.id}`);
                } else if (staff.role === "PA") {
                  router.push(`/dashboard/staff/passenger-assistants/${staff.id}`);
                }
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${staff.name}`} alt={staff.name} />
                    <AvatarFallback>{staff.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{staff.name}</h3>
                    <p className="text-sm text-gray-500">{staff.role}</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Status</span>
                    <Badge variant={staff.status === "Active" ? "success" : staff.status === "On Leave" ? "warning" : "destructive"}>
                      {staff.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Call No</span>
                    <span className="text-sm">{staff.callNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Last Route</span>
                    <span className="text-sm">{staff.lastRoute}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

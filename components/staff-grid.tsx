"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { FileText, MoreHorizontal, Phone, Mail } from "lucide-react"
import Link from "next/link"

interface StaffGridProps {
  searchQuery: string
  activeTab: string
  filters: {
    status: string
    role: string
    compliance: string
  }
}

export function StaffGrid({ searchQuery, activeTab, filters }: StaffGridProps) {
  // Mock data for staff members
  const staffMembers = [
    {
      id: "1",
      name: "John Smith",
      role: "Driver",
      status: "active",
      compliance: "compliant",
      email: "john.smith@example.com",
      phone: "+44 7700 900123",
      avatar: "/placeholder.svg?height=40&width=40",
      documents: { total: 8, valid: 8 },
    },
    {
      id: "2",
      name: "Sarah Johnson",
      role: "Passenger Assistant",
      status: "active",
      compliance: "expiring",
      email: "sarah.johnson@example.com",
      phone: "+44 7700 900124",
      avatar: "/placeholder.svg?height=40&width=40",
      documents: { total: 6, valid: 5 },
    },
    {
      id: "3",
      name: "Michael Brown",
      role: "Driver",
      status: "inactive",
      compliance: "expired",
      email: "michael.brown@example.com",
      phone: "+44 7700 900125",
      avatar: "/placeholder.svg?height=40&width=40",
      documents: { total: 8, valid: 4 },
    },
    {
      id: "4",
      name: "Emma Wilson",
      role: "Driver",
      status: "active",
      compliance: "compliant",
      email: "emma.wilson@example.com",
      phone: "+44 7700 900126",
      avatar: "/placeholder.svg?height=40&width=40",
      documents: { total: 8, valid: 8 },
    },
    {
      id: "5",
      name: "David Lee",
      role: "Passenger Assistant",
      status: "on_leave",
      compliance: "compliant",
      email: "david.lee@example.com",
      phone: "+44 7700 900127",
      avatar: "/placeholder.svg?height=40&width=40",
      documents: { total: 6, valid: 6 },
    },
    {
      id: "6",
      name: "Lisa Taylor",
      role: "Driver",
      status: "active",
      compliance: "expiring",
      email: "lisa.taylor@example.com",
      phone: "+44 7700 900128",
      avatar: "/placeholder.svg?height=40&width=40",
      documents: { total: 8, valid: 7 },
    },
  ]

  // Filter staff members based on search query and filters
  const filteredStaff = staffMembers.filter((staff) => {
    // Filter by search query
    if (
      searchQuery &&
      !staff.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !staff.email.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by tab
    if (activeTab === "active" && staff.status !== "active") return false
    if (activeTab === "inactive" && staff.status !== "inactive") return false

    // Filter by status
    if (filters.status !== "all" && staff.status !== filters.status) return false

    // Filter by role
    if (filters.role !== "all" && staff.role.toLowerCase() !== filters.role.replace("_", " ")) {
      return false
    }

    // Filter by compliance
    if (filters.compliance !== "all" && staff.compliance !== filters.compliance) {
      return false
    }

    return true
  })

  if (filteredStaff.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No staff members found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredStaff.map((staff) => (
        <Card key={staff.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={staff.avatar || "/placeholder.svg"} alt={staff.name} />
                    <AvatarFallback>{staff.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{staff.name}</h3>
                    <p className="text-sm text-gray-500">{staff.role}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-gray-600 truncate">{staff.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-gray-600">{staff.phone}</span>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Document Compliance</span>
                  <span className="text-sm text-gray-500">
                    {staff.documents.valid}/{staff.documents.total}
                  </span>
                </div>
                <Progress value={(staff.documents.valid / staff.documents.total) * 100} className="h-2" />
              </div>
            </div>

            <div className="flex items-center justify-between px-6 py-3 bg-gray-50 border-t">
              <div>
                {staff.status === "active" && (
                  <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>
                )}
                {staff.status === "inactive" && (
                  <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                    Inactive
                  </Badge>
                )}
                {staff.status === "on_leave" && (
                  <Badge className="bg-amber-100 text-amber-800 border-amber-200">On Leave</Badge>
                )}

                {staff.compliance === "compliant" && (
                  <Badge className="ml-2 bg-green-100 text-green-800 border-green-200">Compliant</Badge>
                )}
                {staff.compliance === "expiring" && (
                  <Badge className="ml-2 bg-amber-100 text-amber-800 border-amber-200">Expiring Soon</Badge>
                )}
                {staff.compliance === "expired" && (
                  <Badge variant="destructive" className="ml-2">
                    Expired
                  </Badge>
                )}
              </div>

              <Link href={`/dashboard/staff/${staff.id}`}>
                <Button size="sm" variant="outline" className="gap-1">
                  <FileText className="h-4 w-4" />
                  Details
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

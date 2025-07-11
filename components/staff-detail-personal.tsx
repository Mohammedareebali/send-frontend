import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Calendar, MapPin, Mail, Phone, FileText, UserCheck } from "lucide-react"

interface StaffDetailPersonalProps {
  id: string
  type: "driver" | "pa"
}

export function StaffDetailPersonal({ id, type }: StaffDetailPersonalProps) {
  // Mock data
  const personalInfo =
    type === "driver"
      ? {
          firstName: "John",
          lastName: "Doe",
          gender: "Male",
          dateOfBirth: "1985-05-15",
          addressLine1: "123 Main St",
          addressLine2: "Apt 4B",
          postCode: "SW1A 1AA",
          townCity: "London",
          mobile: "07700 900123",
          email: "john.doe@example.com",
          dateJoined: "2020-01-15",
          dateLeft: "",
          nationalInsuranceNumber: "AB123456C",
        }
      : {
          firstName: "Jane",
          lastName: "Smith",
          gender: "Female",
          dateOfBirth: "1990-03-20",
          addressLine1: "456 Elm Street",
          addressLine2: "Apt 7B",
          postCode: "SW1A 2AA",
          townCity: "London",
          mobile: "07700 900234",
          email: "jane.smith@example.com",
          dateJoined: "2021-05-01",
          dateLeft: "",
          nationalInsuranceNumber: "QQ123456C",
        }

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <User className="mr-2 h-5 w-5 text-yellow-500" />
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <InfoCard
            title="Basic Details"
            items={[
              {
                icon: <User className="h-4 w-4" />,
                label: "Full Name",
                value: `${personalInfo.firstName} ${personalInfo.lastName}`,
              },
              { icon: <User className="h-4 w-4" />, label: "Gender", value: personalInfo.gender },
              {
                icon: <Calendar className="h-4 w-4" />,
                label: "Date of Birth",
                value: new Date(personalInfo.dateOfBirth).toLocaleDateString(),
              },
              {
                icon: <UserCheck className="h-4 w-4" />,
                label: "Role",
                value: type === "driver" ? "Driver" : "Passenger Assistant",
              },
            ]}
          />

          <InfoCard
            title="Contact Information"
            items={[
              { icon: <Phone className="h-4 w-4" />, label: "Mobile", value: personalInfo.mobile },
              { icon: <Mail className="h-4 w-4" />, label: "Email", value: personalInfo.email },
              {
                icon: <MapPin className="h-4 w-4" />,
                label: "Address",
                value: `${personalInfo.addressLine1}, ${personalInfo.addressLine2}`,
              },
              {
                icon: <MapPin className="h-4 w-4" />,
                label: "Location",
                value: `${personalInfo.townCity}, ${personalInfo.postCode}`,
              },
            ]}
          />

          <InfoCard
            title="Employment Details"
            items={[
              {
                icon: <Calendar className="h-4 w-4" />,
                label: "Date Joined",
                value: new Date(personalInfo.dateJoined).toLocaleDateString(),
              },
              {
                icon: <Calendar className="h-4 w-4" />,
                label: "Date Left",
                value: personalInfo.dateLeft ? new Date(personalInfo.dateLeft).toLocaleDateString() : "N/A",
              },
              {
                icon: <FileText className="h-4 w-4" />,
                label: "National Insurance",
                value: personalInfo.nationalInsuranceNumber,
              },
              { icon: <FileText className="h-4 w-4" />, label: "Staff ID", value: id },
            ]}
          />
        </div>
      </CardContent>
    </Card>
  )
}

interface InfoCardProps {
  title: string
  items: Array<{
    icon: React.ReactNode
    label: string
    value: string
  }>
}

function InfoCard({ title, items }: InfoCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="text-sm font-medium text-gray-700 mb-3">{title}</h3>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-start">
            <div className="mt-0.5 mr-3 text-gray-400">{item.icon}</div>
            <div>
              <p className="text-xs text-gray-500">{item.label}</p>
              <p className="text-sm font-medium">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

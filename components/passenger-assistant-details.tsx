import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Calendar, MapPin, Mail, Phone, FileText, Clock, Star, TrendingUp } from "lucide-react"
import type { LucideIcon } from "lucide-react"

const InfoItem = ({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) => (
  <div className="flex items-center space-x-2">
    <Icon className="w-4 h-4 text-muted-foreground" />
    <span className="text-sm font-medium">{label}:</span>
    <span className="text-sm">{value}</span>
  </div>
)

interface PassengerAssistantDetailsProps {
  paId: string
}

export function PassengerAssistantDetails({ paId }: PassengerAssistantDetailsProps) {
  // In a real application, you would fetch the PA data based on the paId
  // For this example, we'll use mock data
  const pa = {
    id: 1,
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
    dbsNumber: "001234567891",
    dbsIssueDate: "2022-04-15",
    dbsExpiryDate: "2025-04-14",
    photoUrl: "/placeholder.svg?height=128&width=128",
    status: "Active",
    onTimePerformance: 98,
    customerRating: 4.8,
    totalTrips: 523,
  }

  const getExpirationStatus = (expiryDate: string) => {
    const today = new Date()
    const expiry = new Date(expiryDate)
    const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 3600 * 24))

    if (daysUntilExpiry < 0) return { status: "Expired", variant: "destructive" as const }
    if (daysUntilExpiry <= 30) return { status: "Expiring Soon", variant: "warning" as const }
    return { status: "Valid", variant: "success" as const }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:items-start space-y-4 md:w-1/3">
              <Avatar className="w-40 h-40 border-4 border-primary">
                <AvatarImage src={pa.photoUrl || "/placeholder.svg"} alt={`${pa.firstName} ${pa.lastName}`} />
                <AvatarFallback>
                  {pa.firstName[0]}
                  {pa.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold">
                  {pa.firstName} {pa.lastName}
                </h2>
                <div className="flex items-center justify-center md:justify-start space-x-2 mt-2">
                  <Badge variant={pa.status === "Active" ? "success" : "warning"}>{pa.status}</Badge>
                  <span className="text-sm text-muted-foreground">ID: {pa.id}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:w-2/3">
              <Card className="bg-primary/10 shadow-md">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 flex items-center">
                    <User className="w-5 h-5 mr-2" /> Personal Details
                  </h3>
                  <InfoItem icon={Calendar} label="Date of Birth" value={pa.dateOfBirth} />
                  <InfoItem icon={Calendar} label="Date Joined" value={pa.dateJoined} />
                </CardContent>
              </Card>
              <Card className="bg-secondary/10 shadow-md">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 flex items-center">
                    <Phone className="w-5 h-5 mr-2" /> Contact Information
                  </h3>
                  <InfoItem icon={Mail} label="Email" value={pa.email} />
                  <InfoItem icon={Phone} label="Mobile" value={pa.mobile} />
                </CardContent>
              </Card>
              <Card className="bg-accent/10 shadow-md sm:col-span-2">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 flex items-center">
                    <MapPin className="w-5 h-5 mr-2" /> Address
                  </h3>
                  <InfoItem icon={MapPin} label="Street" value={`${pa.addressLine1}, ${pa.addressLine2}`} />
                  <InfoItem icon={MapPin} label="Post Code" value={pa.postCode} />
                  <InfoItem icon={MapPin} label="Town/City" value={pa.townCity} />
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card className="w-full bg-muted">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <FileText className="w-5 h-5 mr-2 text-blue-500" />
              DBS Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <InfoItem icon={FileText} label="DBS Number" value={pa.dbsNumber} />
            <InfoItem icon={Calendar} label="Issue Date" value={pa.dbsIssueDate} />
            <InfoItem icon={Calendar} label="Expiry Date" value={pa.dbsExpiryDate} />
            <Badge variant={getExpirationStatus(pa.dbsExpiryDate).variant}>
              {getExpirationStatus(pa.dbsExpiryDate).status}
            </Badge>
          </CardContent>
        </Card>

        <Card className="w-full bg-muted">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="bg-blue-100">
              <CardContent className="p-4">
                <Clock className="w-8 h-8 text-blue-500 mb-2" />
                <p className="text-sm font-medium">On-Time Performance</p>
                <p className="text-2xl font-bold">{pa.onTimePerformance}%</p>
              </CardContent>
            </Card>
            <Card className="bg-yellow-100">
              <CardContent className="p-4">
                <Star className="w-8 h-8 text-yellow-500 mb-2" />
                <p className="text-sm font-medium">Customer Rating</p>
                <p className="text-2xl font-bold">{pa.customerRating.toFixed(1)}</p>
              </CardContent>
            </Card>
            <Card className="bg-green-100">
              <CardContent className="p-4">
                <TrendingUp className="w-8 h-8 text-green-500 mb-2" />
                <p className="text-sm font-medium">Total Trips</p>
                <p className="text-2xl font-bold">{pa.totalTrips}</p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Calendar, MapPin, Mail, Phone, FileText, Truck, Tag, Clock } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const InfoItem = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string }) => (
  <div className="flex items-center space-x-2">
    <Icon className="w-4 h-4 text-muted-foreground" />
    <span className="text-sm font-medium">{label}:</span>
    <span className="text-sm">{value}</span>
  </div>
)

interface DriverDetailsModalProps {
  driverId: string
  isOpen: boolean
  onClose: () => void
}

export function DriverDetailsModal({ driverId, isOpen, onClose }: DriverDetailsModalProps) {
  // In a real application, you would fetch the driver data based on the driverId
  // For this example, we'll use mock data
  const driver = {
    id: 1,
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
    dbsNumber: "001234567890",
    dbsIssueDate: "2022-06-01",
    dbsExpiryDate: "2025-05-31",
    drivingLicenceNo: "DOE99851JD9XY",
    drivingLicenceIssueDate: "2010-03-20",
    drivingLicenceExpiryDate: "2030-03-19",
    vehiclePcoLicenceNumber: "PHV1234567",
    vehiclePcoIssueDate: "2022-01-01",
    vehiclePcoExpiryDate: "2023-12-31",
    vehicleInsurancePolicyNumber: "POL987654321",
    vehicleInsuranceIssueDate: "2023-01-01",
    vehicleInsuranceExpiryDate: "2023-12-31 23:59:59",
    vehicleLogBookNumber: "V5C1234567890",
    vehicleMOTIssueDate: "2023-03-15",
    vehicleMOTExpiryDate: "2024-03-14",
    driversPcoLicenceNumber: "TPH1234567",
    driversPcoLicenceIssueDate: "2022-01-01",
    driversPcoLicenceExpiryDate: "2025-12-31",
    vehicleRegNumber: "AB12 CDE",
    vehicleMake: "Toyota",
    vehicleModel: "Prius",
    vehicleColor: "Silver",
    vehicleCategory: "Saloon",
    vehicleOwnership: "Personal",
    vehicleRentalStartDate: "",
    vehicleRentalExpiryDate: "",
    photoUrl: "/placeholder.svg?height=128&width=128",
    performance: "Excellent",
    status: "Active",
    jobHistory: [
      { id: "1", date: "2023-06-01", route: "R001", pickupLocation: "School A", dropoffLocation: "Home B", status: "Completed" },
      { id: "2", date: "2023-06-02", route: "R002", pickupLocation: "School C", dropoffLocation: "Home D", status: "Completed" },
      { id: "3", date: "2023-06-03", route: "R003", pickupLocation: "School E", dropoffLocation: "Home F", status: "In Progress" },
    ]
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Driver Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 flex flex-col items-center md:items-start space-y-4">
                  <Avatar className="w-40 h-40 border-4 border-primary">
                    <AvatarImage src={driver.photoUrl} alt={`${driver.firstName} ${driver.lastName}`} />
                    <AvatarFallback>{driver.firstName[0]}{driver.lastName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-center md:text-left">
                    <h2 className="text-3xl font-bold">{driver.firstName} {driver.lastName}</h2>
                    <div className="flex items-center justify-center md:justify-start space-x-2 mt-2">
                      <Badge variant={driver.status === "Active" ? "success" : "warning"}>{driver.status}</Badge>
                      <span className="text-sm text-muted-foreground">ID: {driver.id}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Truck className="w-4 h-4" />
                    <span>{driver.vehicleMake} {driver.vehicleModel}</span>
                  </div>
                </div>
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-semibold">Personal Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <InfoItem icon={User} label="Gender" value={driver.gender} />
                      <InfoItem icon={Calendar} label="Date of Birth" value={driver.dateOfBirth} />
                      <InfoItem icon={Calendar} label="Date Joined" value={driver.dateJoined} />
                    </CardContent>
                  </Card>
                  <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-semibold">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <InfoItem icon={Mail} label="Email" value={driver.email} />
                      <InfoItem icon={Phone} label="Mobile" value={driver.mobile} />
                    </CardContent>
                  </Card>
                  <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 sm:col-span-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-semibold">Address</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <InfoItem icon={MapPin} label="Street" value={`${driver.addressLine1}, ${driver.addressLine2}`} />
                      <InfoItem icon={MapPin} label="Post Code" value={driver.postCode} />
                      <InfoItem icon={MapPin} label="Town/City" value={driver.townCity} />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>License and Documentation</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {['DBS Details', "Driver's License", 'PCO License'].map((title, index) => (
                  <Card key={index} className="bg-muted">
                    <CardHeader>
                      <CardTitle className="text-lg">{title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {title === 'DBS Details' && (
                        <>
                          <InfoItem icon={FileText} label="DBS Number" value={driver.dbsNumber} />
                          <InfoItem icon={Calendar} label="Issue Date" value={driver.dbsIssueDate} />
                          <InfoItem icon={Calendar} label="Expiry Date" value={driver.dbsExpiryDate} />
                        </>
                      )}
                      {title === "Driver's License" && (
                        <>
                          <InfoItem icon={FileText} label="License Number" value={driver.drivingLicenceNo} />
                          <InfoItem icon={Calendar} label="Issue Date" value={driver.drivingLicenceIssueDate} />
                          <InfoItem icon={Calendar} label="Expiry Date" value={driver.drivingLicenceExpiryDate} />
                        </>
                      )}
                      {title === 'PCO License' && (
                        <>
                          <InfoItem icon={FileText} label="PCO Number" value={driver.driversPcoLicenceNumber} />
                          <InfoItem icon={Calendar} label="Issue Date" value={driver.driversPcoLicenceIssueDate} />
                          <InfoItem icon={Calendar} label="Expiry Date" value={driver.driversPcoLicenceExpiryDate} />
                        </>
                      )}
                      <Badge variant={getExpirationStatus(
                        title === 'DBS Details' ? driver.dbsExpiryDate :
                        title === "Driver's License" ? driver.drivingLicenceExpiryDate :
                        driver.driversPcoLicenceExpiryDate
                      ).variant}>
                        {getExpirationStatus(
                          title === 'DBS Details' ? driver.dbsExpiryDate :
                          title === "Driver's License" ? driver.drivingLicenceExpiryDate :
                          driver.driversPcoLicenceExpiryDate
                        ).status}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vehicle Information</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-muted">
                  <CardHeader>
                    <CardTitle className="text-lg">Vehicle Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <InfoItem icon={FileText} label="Registration Number" value={driver.vehicleRegNumber} />
                    <InfoItem icon={Truck} label="Make" value={driver.vehicleMake} />
                    <InfoItem icon={Truck} label="Model" value={driver.vehicleModel} />
                    <InfoItem icon={Tag} label="Color" value={driver.vehicleColor} />
                    <InfoItem icon={Tag} label="Category" value={driver.vehicleCategory} />
                    <InfoItem icon={User} label="Ownership" value={driver.vehicleOwnership} />
                  </CardContent>
                </Card>
                <Card className="bg-muted">
                  <CardHeader>
                    <CardTitle className="text-lg">Vehicle Documentation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <InfoItem icon={FileText} label="PCO License Number" value={driver.vehiclePcoLicenceNumber} />
                    <InfoItem icon={Calendar} label="PCO Issue Date" value={driver.vehiclePcoIssueDate} />
                    <InfoItem icon={Calendar} label="PCO Expiry Date" value={driver.vehiclePcoExpiryDate} />
                    <Badge className="mt-2" variant={getExpirationStatus(driver.vehiclePcoExpiryDate).variant}>
                      PCO License: {getExpirationStatus(driver.vehiclePcoExpiryDate).status}
                    </Badge>
                    <InfoItem icon={FileText} label="Insurance Policy Number" value={driver.vehicleInsurancePolicyNumber} />
                    <InfoItem icon={Calendar} label="Insurance Expiry Date" value={driver.vehicleInsuranceExpiryDate} />
                    <Badge className="mt-2" variant={getExpirationStatus(driver.vehicleInsuranceExpiryDate).variant}>
                      Insurance: {getExpirationStatus(driver.vehicleInsuranceExpiryDate).status}
                    </Badge>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Job History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Pickup</TableHead>
                    <TableHead>Dropoff</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {driver.jobHistory.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell>{job.date}</TableCell>
                      <TableCell>{job.route}</TableCell>
                      <TableCell>{job.pickupLocation}</TableCell>
                      <TableCell>{job.dropoffLocation}</TableCell>
                      <TableCell>
                        <Badge variant={job.status === "Completed" ? "success" : "secondary"}>
                          {job.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}

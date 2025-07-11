"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {
  Search,
  FileText,
  Calendar,
  Truck,
  User,
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter,
  Download,
  RefreshCw,
  ChevronDown,
  Shield,
  FileCheck,
  BadgeAlert,
  Car,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Updated mock data with removed fields
const vehicleData = [
  {
    id: 1,
    registrationNumber: "AB12 CDE",
    make: "Toyota",
    model: "Prius",
    driver: "John Doe",
    pcoIssueDate: "2022-01-01",
    pcoExpiryDate: "2023-12-31",
    dbsIssueDate: "2021-01-10",
    dbsExpiry: "2023-01-10",
    licenseNumber: "DL-987654",
    licenseIssueDate: "2020-06-01",
    licenseExpiry: "2030-06-01",
    insurancePolicyNumber: "POLICY-123ABC",
    insuranceExpiry: "2023-03-10",
    motExpiry: "2024-06-30",
  },
  {
    id: 2,
    registrationNumber: "XY34 ZAB",
    make: "Ford",
    model: "Transit",
    driver: "Jane Smith",
    pcoIssueDate: "2022-03-15",
    pcoExpiryDate: "2024-03-14",
    dbsIssueDate: "2022-03-15",
    dbsExpiry: "2024-03-15",
    licenseNumber: "DL-123456",
    licenseIssueDate: "2021-09-15",
    licenseExpiry: "2031-09-15",
    insurancePolicyNumber: "POLICY-234DEF",
    insuranceExpiry: "2024-01-31",
    motExpiry: "2023-11-30",
  },
  {
    id: 3,
    registrationNumber: "CD56 EFG",
    make: "Vauxhall",
    model: "Vivaro",
    driver: "Mike Johnson",
    pcoIssueDate: "2022-06-01",
    pcoExpiryDate: "2024-05-31",
    dbsIssueDate: "2022-06-01",
    dbsExpiry: "2024-06-01",
    licenseNumber: "DL-789012",
    licenseIssueDate: "2022-03-01",
    licenseExpiry: "2032-03-01",
    insurancePolicyNumber: "POLICY-345GHI",
    insuranceExpiry: "2024-02-28",
    motExpiry: "2024-04-30",
  },
]

const paData = [
  {
    id: 1,
    name: "Alice Brown",
    dbsExpiry: "2024-05-31",
    firstAidExpiry: "2023-12-31",
    safeguardingExpiry: "2024-01-31",
  },
  {
    id: 2,
    name: "Bob Wilson",
    dbsExpiry: "2023-11-30",
    firstAidExpiry: "2024-03-31",
    safeguardingExpiry: "2023-12-31",
  },
  {
    id: 3,
    name: "Carol Taylor",
    dbsExpiry: "2024-02-28",
    firstAidExpiry: "2024-06-30",
    safeguardingExpiry: "2024-04-30",
  },
]

const getStatusClass = (expiryDate: string) => {
  const today = new Date()
  const expiry = new Date(expiryDate)
  const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 3600 * 24))

  if (daysUntilExpiry < 0) return "bg-red-100 text-red-800"
  if (daysUntilExpiry <= 30) return "bg-yellow-100 text-yellow-800"
  return "bg-green-100 text-green-800"
}

const getStatusInfo = (expiryDate: string) => {
  const today = new Date()
  const expiry = new Date(expiryDate)
  const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 3600 * 24))

  if (daysUntilExpiry < 0) {
    return {
      status: "Expired",
      icon: <AlertTriangle className="h-4 w-4 text-red-600" />,
      badge: (
        <Badge variant="destructive" className="ml-2">
          Expired
        </Badge>
      ),
      daysText: `Expired ${Math.abs(daysUntilExpiry)} days ago`,
      progressColor: "bg-red-600",
      progressValue: 100,
    }
  }

  if (daysUntilExpiry <= 30) {
    return {
      status: "Expiring Soon",
      icon: <Clock className="h-4 w-4 text-amber-600" />,
      badge: (
        <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300 ml-2">
          Expiring Soon
        </Badge>
      ),
      daysText: `Expires in ${daysUntilExpiry} days`,
      progressColor: "bg-amber-500",
      progressValue: 100 - (daysUntilExpiry / 30) * 100,
    }
  }

  return {
    status: "Valid",
    icon: <CheckCircle className="h-4 w-4 text-green-600" />,
    badge: (
      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300 ml-2">
        Valid
      </Badge>
    ),
    daysText: `Valid for ${daysUntilExpiry} days`,
    progressColor: "bg-green-600",
    progressValue: 0,
  }
}

// Calculate compliance statistics
const calculateComplianceStats = () => {
  const totalDocuments = vehicleData.length * 5 + paData.length * 3 // 5 docs per vehicle, 3 per PA
  let expiredCount = 0
  let expiringCount = 0
  let validCount = 0

  // Check vehicle documents
  vehicleData.forEach((vehicle) => {
    ;[
      vehicle.pcoExpiryDate,
      vehicle.dbsExpiry,
      vehicle.licenseExpiry,
      vehicle.insuranceExpiry,
      vehicle.motExpiry,
    ].forEach((date) => {
      const today = new Date()
      const expiry = new Date(date)
      const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 3600 * 24))

      if (daysUntilExpiry < 0) expiredCount++
      else if (daysUntilExpiry <= 30) expiringCount++
      else validCount++
    })
  })

  // Check PA documents
  paData.forEach((pa) => {
    ;[pa.dbsExpiry, pa.firstAidExpiry, pa.safeguardingExpiry].forEach((date) => {
      const today = new Date()
      const expiry = new Date(date)
      const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 3600 * 24))

      if (daysUntilExpiry < 0) expiredCount++
      else if (daysUntilExpiry <= 30) expiringCount++
      else validCount++
    })
  })

  return {
    total: totalDocuments,
    expired: expiredCount,
    expiring: expiringCount,
    valid: validCount,
    expiredPercent: Math.round((expiredCount / totalDocuments) * 100),
    expiringPercent: Math.round((expiringCount / totalDocuments) * 100),
    validPercent: Math.round((validCount / totalDocuments) * 100),
  }
}

export function DocumentationReport() {
  const [vehicleFilter, setVehicleFilter] = useState("")
  const [paFilter, setPaFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [documentTypeFilter, setDocumentTypeFilter] = useState("all")
  const complianceStats = calculateComplianceStats()

  const filteredVehicles = vehicleData.filter((vehicle) => {
    const matchesSearch =
      vehicle.registrationNumber.toLowerCase().includes(vehicleFilter.toLowerCase()) ||
      vehicle.driver.toLowerCase().includes(vehicleFilter.toLowerCase()) ||
      vehicle.licenseNumber.toLowerCase().includes(vehicleFilter.toLowerCase()) ||
      vehicle.insurancePolicyNumber.toLowerCase().includes(vehicleFilter.toLowerCase())

    if (!matchesSearch) return false

    // Status filtering
    if (statusFilter !== "all") {
      const today = new Date()
      let matchesStatus = false

      // Check all document dates
      ;[
        vehicle.pcoExpiryDate,
        vehicle.dbsExpiry,
        vehicle.licenseExpiry,
        vehicle.insuranceExpiry,
        vehicle.motExpiry,
      ].forEach((date) => {
        const expiry = new Date(date)
        const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 3600 * 24))

        if (statusFilter === "expired" && daysUntilExpiry < 0) matchesStatus = true
        if (statusFilter === "expiring" && daysUntilExpiry >= 0 && daysUntilExpiry <= 30) matchesStatus = true
        if (statusFilter === "valid" && daysUntilExpiry > 30) matchesStatus = true
      })

      if (!matchesStatus) return false
    }

    return true
  })

  const filteredPAs = paData.filter((pa) => {
    const matchesSearch = pa.name.toLowerCase().includes(paFilter.toLowerCase())

    if (!matchesSearch) return false

    // Status filtering
    if (statusFilter !== "all") {
      const today = new Date()
      let matchesStatus = false

      // Check all document dates
      ;[pa.dbsExpiry, pa.firstAidExpiry, pa.safeguardingExpiry].forEach((date) => {
        const expiry = new Date(date)
        const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 3600 * 24))

        if (statusFilter === "expired" && daysUntilExpiry < 0) matchesStatus = true
        if (statusFilter === "expiring" && daysUntilExpiry >= 0 && daysUntilExpiry <= 30) matchesStatus = true
        if (statusFilter === "valid" && daysUntilExpiry > 30) matchesStatus = true
      })

      if (!matchesStatus) return false
    }

    return true
  })

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documentation & Compliance</h1>
          <p className="text-gray-500 text-sm mt-1">Monitor and manage all staff and vehicle documentation</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </Button>
          <Button variant="default" size="sm" className="flex items-center gap-1">
            <FileCheck className="h-4 w-4" />
            <span>Verify Documents</span>
          </Button>
        </div>
      </div>

      {/* Compliance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-white border border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Valid Documents</p>
                <div className="flex items-center mt-1">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">{complianceStats.valid}</span>
                  <span className="text-sm text-gray-500 ml-2">({complianceStats.validPercent}%)</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <FileCheck className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <Progress className="h-2 mt-4" value={complianceStats.validPercent} />
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Expiring Soon</p>
                <div className="flex items-center mt-1">
                  <Clock className="h-5 w-5 text-amber-600 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">{complianceStats.expiring}</span>
                  <span className="text-sm text-gray-500 ml-2">({complianceStats.expiringPercent}%)</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                <BadgeAlert className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            <Progress
              className="h-2 mt-4 bg-gray-100"
              value={complianceStats.expiringPercent}
              className="bg-amber-500"
            />
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Expired Documents</p>
                <div className="flex items-center mt-1">
                  <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">{complianceStats.expired}</span>
                  <span className="text-sm text-gray-500 ml-2">({complianceStats.expiredPercent}%)</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                <FileText className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <Progress className="h-2 mt-4 bg-gray-100" value={complianceStats.expiredPercent} className="bg-red-600" />
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search by registration, driver, license, or insurance"
            value={vehicleFilter}
            onChange={(e) => setVehicleFilter(e.target.value)}
            className="pl-10 border-gray-200 w-full"
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] border-gray-200">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <SelectValue placeholder="Filter by status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="valid">Valid</SelectItem>
              <SelectItem value="expiring">Expiring Soon</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>

          <Select value={documentTypeFilter} onValueChange={setDocumentTypeFilter}>
            <SelectTrigger className="w-[180px] border-gray-200">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-500" />
                <SelectValue placeholder="Document type" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Documents</SelectItem>
              <SelectItem value="license">Licenses</SelectItem>
              <SelectItem value="insurance">Insurance</SelectItem>
              <SelectItem value="dbs">DBS Checks</SelectItem>
              <SelectItem value="mot">MOT Certificates</SelectItem>
              <SelectItem value="pco">PCO Licenses</SelectItem>
              <SelectItem value="firstaid">First Aid</SelectItem>
              <SelectItem value="safeguarding">Safeguarding</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabbed Content */}
      <Tabs defaultValue="drivers" className="w-full">
        <TabsList className="mb-4 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger value="drivers" className="flex items-center gap-2 data-[state=active]:bg-white rounded-md">
            <Car className="h-4 w-4" />
            <span>Drivers & Vehicles</span>
            <Badge variant="secondary" className="ml-1 bg-gray-200">
              {vehicleData.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="pas" className="flex items-center gap-2 data-[state=active]:bg-white rounded-md">
            <User className="h-4 w-4" />
            <span>Passenger Assistants</span>
            <Badge variant="secondary" className="ml-1 bg-gray-200">
              {paData.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="expiring" className="flex items-center gap-2 data-[state=active]:bg-white rounded-md">
            <AlertTriangle className="h-4 w-4" />
            <span>Expiring Soon</span>
            <Badge variant="secondary" className="ml-1 bg-gray-200">
              {complianceStats.expiring}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="drivers" className="mt-0">
          <Card className="bg-white border border-gray-100 shadow-sm overflow-hidden">
            <CardHeader className="bg-gray-50 border-b border-gray-200 py-4">
              <CardTitle className="text-lg font-semibold flex items-center">
                <Shield className="mr-2 h-5 w-5 text-gray-600" />
                Driver & Vehicle Documentation
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table className="w-full">
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="p-3 text-xs font-medium">Registration</TableHead>
                      <TableHead className="p-3 text-xs font-medium">Vehicle</TableHead>
                      <TableHead className="p-3 text-xs font-medium">Driver</TableHead>
                      <TableHead className="p-3 text-xs font-medium">PCO License</TableHead>
                      <TableHead className="p-3 text-xs font-medium">DBS Check</TableHead>
                      <TableHead className="p-3 text-xs font-medium">Driver License</TableHead>
                      <TableHead className="p-3 text-xs font-medium">Insurance</TableHead>
                      <TableHead className="p-3 text-xs font-medium">MOT</TableHead>
                      <TableHead className="p-3 text-xs font-medium">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredVehicles.map((vehicle) => (
                      <TableRow key={vehicle.id} className="hover:bg-gray-50 border-b border-gray-100">
                        <TableCell className="p-3 whitespace-nowrap font-medium">
                          {vehicle.registrationNumber}
                        </TableCell>
                        <TableCell className="p-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <Truck className="mr-1 h-3 w-3 text-gray-500" />
                            {vehicle.make} {vehicle.model}
                          </div>
                        </TableCell>
                        <TableCell className="p-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <User className="mr-1 h-3 w-3 text-gray-500" />
                            {vehicle.driver}
                          </div>
                        </TableCell>
                        <TableCell className="p-3 whitespace-nowrap">
                          <div className="flex flex-col">
                            <div className="flex items-center">
                              {getStatusInfo(vehicle.pcoExpiryDate).icon}
                              <span className="ml-1.5">{vehicle.pcoExpiryDate}</span>
                            </div>
                            <span className="text-xs text-gray-500 mt-0.5">
                              {getStatusInfo(vehicle.pcoExpiryDate).daysText}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="p-3 whitespace-nowrap">
                          <div className="flex flex-col">
                            <div className="flex items-center">
                              {getStatusInfo(vehicle.dbsExpiry).icon}
                              <span className="ml-1.5">{vehicle.dbsExpiry}</span>
                            </div>
                            <span className="text-xs text-gray-500 mt-0.5">
                              {getStatusInfo(vehicle.dbsExpiry).daysText}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="p-3 whitespace-nowrap">
                          <div className="flex flex-col">
                            <div className="flex items-center">
                              {getStatusInfo(vehicle.licenseExpiry).icon}
                              <span className="ml-1.5">{vehicle.licenseExpiry}</span>
                            </div>
                            <span className="text-xs text-gray-500 mt-0.5">
                              {getStatusInfo(vehicle.licenseExpiry).daysText}
                            </span>
                            <span className="text-xs text-gray-500">{vehicle.licenseNumber}</span>
                          </div>
                        </TableCell>
                        <TableCell className="p-3 whitespace-nowrap">
                          <div className="flex flex-col">
                            <div className="flex items-center">
                              {getStatusInfo(vehicle.insuranceExpiry).icon}
                              <span className="ml-1.5">{vehicle.insuranceExpiry}</span>
                            </div>
                            <span className="text-xs text-gray-500 mt-0.5">
                              {getStatusInfo(vehicle.insuranceExpiry).daysText}
                            </span>
                            <span className="text-xs text-gray-500">{vehicle.insurancePolicyNumber}</span>
                          </div>
                        </TableCell>
                        <TableCell className="p-3 whitespace-nowrap">
                          <div className="flex flex-col">
                            <div className="flex items-center">
                              {getStatusInfo(vehicle.motExpiry).icon}
                              <span className="ml-1.5">{vehicle.motExpiry}</span>
                            </div>
                            <span className="text-xs text-gray-500 mt-0.5">
                              {getStatusInfo(vehicle.motExpiry).daysText}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="p-3 whitespace-nowrap">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <ChevronDown className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Update Documents</DropdownMenuItem>
                              <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                              <DropdownMenuItem>Download Records</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pas" className="mt-0">
          <Card className="bg-white border border-gray-100 shadow-sm overflow-hidden">
            <CardHeader className="bg-gray-50 border-b border-gray-200 py-4">
              <CardTitle className="text-lg font-semibold flex items-center">
                <Shield className="mr-2 h-5 w-5 text-gray-600" />
                Passenger Assistant Documentation
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="mb-4 relative p-4 border-b border-gray-100">
                <Search className="absolute left-7 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Filter by PA name"
                  value={paFilter}
                  onChange={(e) => setPaFilter(e.target.value)}
                  className="pl-10 border-gray-200 max-w-md ml-3"
                />
              </div>
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="p-3 font-medium">Name</TableHead>
                    <TableHead className="p-3 font-medium">DBS Check</TableHead>
                    <TableHead className="p-3 font-medium">First Aid</TableHead>
                    <TableHead className="p-3 font-medium">Safeguarding</TableHead>
                    <TableHead className="p-3 font-medium">Overall Status</TableHead>
                    <TableHead className="p-3 font-medium">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPAs.map((pa) => {
                    // Calculate overall status
                    const dbsStatus = getStatusInfo(pa.dbsExpiry)
                    const firstAidStatus = getStatusInfo(pa.firstAidExpiry)
                    const safeguardingStatus = getStatusInfo(pa.safeguardingExpiry)

                    let overallStatus = "Valid"
                    let overallBadge = (
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                        Valid
                      </Badge>
                    )

                    if (
                      dbsStatus.status === "Expired" ||
                      firstAidStatus.status === "Expired" ||
                      safeguardingStatus.status === "Expired"
                    ) {
                      overallStatus = "Expired"
                      overallBadge = <Badge variant="destructive">Expired</Badge>
                    } else if (
                      dbsStatus.status === "Expiring Soon" ||
                      firstAidStatus.status === "Expiring Soon" ||
                      safeguardingStatus.status === "Expiring Soon"
                    ) {
                      overallStatus = "Expiring Soon"
                      overallBadge = (
                        <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">
                          Expiring Soon
                        </Badge>
                      )
                    }

                    return (
                      <TableRow key={pa.id} className="hover:bg-gray-50 border-b border-gray-100">
                        <TableCell className="p-3 font-medium">
                          <div className="flex items-center">
                            <User className="mr-2 h-4 w-4 text-gray-500" />
                            {pa.name}
                          </div>
                        </TableCell>
                        <TableCell className="p-3">
                          <div className="flex flex-col">
                            <div className="flex items-center">
                              {dbsStatus.icon}
                              <span className="ml-1.5">{pa.dbsExpiry}</span>
                            </div>
                            <span className="text-xs text-gray-500 mt-0.5">{dbsStatus.daysText}</span>
                          </div>
                        </TableCell>
                        <TableCell className="p-3">
                          <div className="flex flex-col">
                            <div className="flex items-center">
                              {firstAidStatus.icon}
                              <span className="ml-1.5">{pa.firstAidExpiry}</span>
                            </div>
                            <span className="text-xs text-gray-500 mt-0.5">{firstAidStatus.daysText}</span>
                          </div>
                        </TableCell>
                        <TableCell className="p-3">
                          <div className="flex flex-col">
                            <div className="flex items-center">
                              {safeguardingStatus.icon}
                              <span className="ml-1.5">{pa.safeguardingExpiry}</span>
                            </div>
                            <span className="text-xs text-gray-500 mt-0.5">{safeguardingStatus.daysText}</span>
                          </div>
                        </TableCell>
                        <TableCell className="p-3">{overallBadge}</TableCell>
                        <TableCell className="p-3">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <ChevronDown className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Update Documents</DropdownMenuItem>
                              <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                              <DropdownMenuItem>Download Records</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expiring" className="mt-0">
          <Card className="bg-white border border-gray-100 shadow-sm overflow-hidden">
            <CardHeader className="bg-amber-50 border-b border-amber-200 py-4">
              <CardTitle className="text-lg font-semibold flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-amber-600" />
                Documents Expiring Soon
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                {/* Expiring Driver Documents */}
                {vehicleData.map((vehicle) => {
                  const expiringDocs = []

                  if (getStatusInfo(vehicle.pcoExpiryDate).status === "Expiring Soon") {
                    expiringDocs.push({
                      type: "PCO License",
                      expiry: vehicle.pcoExpiryDate,
                      status: getStatusInfo(vehicle.pcoExpiryDate),
                    })
                  }

                  if (getStatusInfo(vehicle.dbsExpiry).status === "Expiring Soon") {
                    expiringDocs.push({
                      type: "DBS Check",
                      expiry: vehicle.dbsExpiry,
                      status: getStatusInfo(vehicle.dbsExpiry),
                    })
                  }

                  if (getStatusInfo(vehicle.licenseExpiry).status === "Expiring Soon") {
                    expiringDocs.push({
                      type: "Driver License",
                      expiry: vehicle.licenseExpiry,
                      status: getStatusInfo(vehicle.licenseExpiry),
                    })
                  }

                  if (getStatusInfo(vehicle.insuranceExpiry).status === "Expiring Soon") {
                    expiringDocs.push({
                      type: "Insurance",
                      expiry: vehicle.insuranceExpiry,
                      status: getStatusInfo(vehicle.insuranceExpiry),
                    })
                  }

                  if (getStatusInfo(vehicle.motExpiry).status === "Expiring Soon") {
                    expiringDocs.push({
                      type: "MOT",
                      expiry: vehicle.motExpiry,
                      status: getStatusInfo(vehicle.motExpiry),
                    })
                  }

                  if (expiringDocs.length === 0) return null

                  return (
                    <Card key={vehicle.id} className="border border-amber-200 bg-amber-50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <Car className="h-5 w-5 text-amber-600 mr-2" />
                            <div>
                              <h3 className="font-medium">{vehicle.driver}</h3>
                              <p className="text-sm text-gray-500">
                                {vehicle.registrationNumber} • {vehicle.make} {vehicle.model}
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="bg-white border-amber-200 text-amber-800">
                            Send Reminder
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {expiringDocs.map((doc, idx) => (
                            <div key={idx} className="bg-white p-3 rounded-md border border-amber-200">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium">{doc.type}</span>
                                {doc.status.badge}
                              </div>
                              <div className="flex items-center text-sm text-gray-500">
                                <Calendar className="h-3.5 w-3.5 mr-1" />
                                <span>{doc.expiry}</span>
                              </div>
                              <div className="mt-2">
                                <div className="flex items-center justify-between text-xs mb-1">
                                  <span>{doc.status.daysText}</span>
                                  <span>{Math.round(doc.status.progressValue)}%</span>
                                </div>
                                <Progress
                                  className="h-1.5"
                                  value={doc.status.progressValue}
                                  className={doc.status.progressColor}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}

                {/* Expiring PA Documents */}
                {paData.map((pa) => {
                  const expiringDocs = []

                  if (getStatusInfo(pa.dbsExpiry).status === "Expiring Soon") {
                    expiringDocs.push({
                      type: "DBS Check",
                      expiry: pa.dbsExpiry,
                      status: getStatusInfo(pa.dbsExpiry),
                    })
                  }

                  if (getStatusInfo(pa.firstAidExpiry).status === "Expiring Soon") {
                    expiringDocs.push({
                      type: "First Aid",
                      expiry: pa.firstAidExpiry,
                      status: getStatusInfo(pa.firstAidExpiry),
                    })
                  }

                  if (getStatusInfo(pa.safeguardingExpiry).status === "Expiring Soon") {
                    expiringDocs.push({
                      type: "Safeguarding",
                      expiry: pa.safeguardingExpiry,
                      status: getStatusInfo(pa.safeguardingExpiry),
                    })
                  }

                  if (expiringDocs.length === 0) return null

                  return (
                    <Card key={pa.id} className="border border-amber-200 bg-amber-50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <User className="h-5 w-5 text-amber-600 mr-2" />
                            <div>
                              <h3 className="font-medium">{pa.name}</h3>
                              <p className="text-sm text-gray-500">Passenger Assistant</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="bg-white border-amber-200 text-amber-800">
                            Send Reminder
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {expiringDocs.map((doc, idx) => (
                            <div key={idx} className="bg-white p-3 rounded-md border border-amber-200">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium">{doc.type}</span>
                                {doc.status.badge}
                              </div>
                              <div className="flex items-center text-sm text-gray-500">
                                <Calendar className="h-3.5 w-3.5 mr-1" />
                                <span>{doc.expiry}</span>
                              </div>
                              <div className="mt-2">
                                <div className="flex items-center justify-between text-xs mb-1">
                                  <span>{doc.status.daysText}</span>
                                  <span>{Math.round(doc.status.progressValue)}%</span>
                                </div>
                                <Progress
                                  className="h-1.5"
                                  value={doc.status.progressValue}
                                  className={doc.status.progressColor}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
  CalendarIcon,
  MapPin,
  Clock,
  Users,
  Truck,
  UserPlus,
  PlusCircle,
  Trash2,
  Save,
  Send,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Info,
  AlertCircle,
  School,
  Building,
  Phone,
  Mail,
  DollarSign,
  User,
  FileText,
  Settings,
} from "lucide-react"
import { AddressLookup } from "@/components/ui/address-lookup"
import { DatePicker } from "@/components/ui/date-picker"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

export function BookingForm() {
  const [startDate, setStartDate] = useState<Date>()
  const [students, setStudents] = useState([
    { id: 1, name: "John Doe", parentName: "Jane Doe", contactNumber: "123-456-7890", address: "123 Main St" },
  ])
  const [paName, setPaName] = useState("Alice Brown")
  const [selectedDays, setSelectedDays] = useState<string[]>(["monday", "tuesday", "wednesday", "thursday", "friday"])
  const [selectedAddresses, setSelectedAddresses] = useState<Record<number, string>>({})
  const [schoolDestination, setSchoolDestination] = useState("")
  const [activeTab, setActiveTab] = useState("details")
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const addStudent = () => {
    const newStudent = {
      id: students.length + 1,
      name: "",
      parentName: "",
      contactNumber: "",
      address: "",
    }
    setStudents([...students, newStudent])
  }

  const moveStudent = (index: number, direction: "up" | "down") => {
    if ((direction === "up" && index > 0) || (direction === "down" && index < students.length - 1)) {
      const newStudents = [...students]
      const temp = newStudents[index]
      newStudents[index] = newStudents[index + (direction === "up" ? -1 : 1)]
      newStudents[index + (direction === "up" ? -1 : 1)] = temp
      setStudents(newStudents)
    }
  }

  const deleteStudent = (index: number) => {
    const newStudents = students.filter((_, i) => i !== index)
    setStudents(newStudents)
  }

  const daysOfWeek = [
    { id: "monday", label: "Mon" },
    { id: "tuesday", label: "Tue" },
    { id: "wednesday", label: "Wed" },
    { id: "thursday", label: "Thu" },
    { id: "friday", label: "Fri" },
    { id: "saturday", label: "Sat" },
    { id: "sunday", label: "Sun" },
  ]

  const handleDaySelect = (day: string) => {
    setSelectedDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]))
  }

  // Calculate progress
  const getProgressValue = () => {
    switch (activeTab) {
      case "details":
        return 25
      case "students":
        return 50
      case "staff":
        return 75
      case "review":
        return 100
      default:
        return 25
    }
  }

  const tabs = [
    { id: "details", label: "Run Details", icon: FileText },
    { id: "students", label: "Students", icon: Users },
    { id: "staff", label: "Staff", icon: UserPlus },
    { id: "review", label: "Review", icon: CheckCircle },
  ]

  return (
    <div className="relative">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Sticky navigation header */}
        <div
          className={cn(
            "sticky top-0 z-10 bg-white border-b border-gray-200 transition-all duration-200",
            scrolled ? "shadow-sm" : "",
          )}
        >
          <div className="container mx-auto px-6 py-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex items-center justify-between mb-4 w-full">
                <TabsList className="h-auto p-1 bg-gray-100 rounded-lg grid grid-cols-4 gap-1 w-full max-w-2xl">
                  {tabs.map((tab, index) => {
                    const Icon = tab.icon
                    const isActive = activeTab === tab.id
                    const isPast = tabs.findIndex((t) => t.id === activeTab) > index

                    return (
                      <TabsTrigger
                        key={tab.id}
                        value={tab.id}
                        className={cn(
                          "flex items-center gap-2 py-2.5 px-3 rounded-md text-sm font-medium transition-all",
                          isActive
                            ? "bg-white text-yellow-700 shadow-sm"
                            : isPast
                              ? "text-yellow-600 bg-yellow-50"
                              : "text-gray-500 hover:text-gray-700 hover:bg-gray-50",
                        )}
                      >
                        <div
                          className={cn(
                            "flex items-center justify-center w-6 h-6 rounded-full text-xs",
                            isActive
                              ? "bg-yellow-100 text-yellow-700"
                              : isPast
                                ? "bg-yellow-500 text-white"
                                : "bg-gray-200 text-gray-600",
                          )}
                        >
                          {isPast ? <CheckCircle className="h-3 w-3" /> : index + 1}
                        </div>
                        <span className="hidden sm:inline">{tab.label}</span>
                      </TabsTrigger>
                    )
                  })}
                </TabsList>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="text-gray-500">
                    <Save className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">Save</span>
                  </Button>
                  <Button variant="outline" size="sm" className="text-gray-500">
                    <Settings className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">Options</span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-gray-700">Completion:</p>
                <div className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                  {getProgressValue()}%
                </div>
              </div>
              <p className="text-xs text-gray-500">
                Step {tabs.findIndex((t) => t.id === activeTab) + 1} of {tabs.length}
              </p>
            </div>
            <Progress value={getProgressValue()} className="h-1.5 mt-2" indicatorClassName="bg-yellow-500" />
          </div>
        </div>

        <div className="p-6">
          <TabsContent value="details" className="space-y-8 mt-0">
            <Card className="bg-white border border-gray-100 shadow-none overflow-hidden rounded-xl transition-all hover:shadow-sm">
              <CardHeader className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-b border-yellow-200 px-6 py-5">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold flex items-center text-gray-800">
                    <Building className="mr-3 h-5 w-5 text-yellow-600" />
                    Council and Route Details
                  </CardTitle>
                  <div className="bg-white bg-opacity-50 text-yellow-700 text-xs font-medium px-2.5 py-1 rounded-full border border-yellow-200">
                    Required
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 divide-y divide-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-6">
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="councilName" className="text-sm font-medium text-gray-700">
                        Council Name
                      </Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="councilName"
                          placeholder="Enter council name"
                          className="pl-10 border-gray-200 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="councilContact" className="text-sm font-medium text-gray-700">
                        Council Contact Number
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="councilContact"
                          placeholder="Enter contact number"
                          className="pl-10 border-gray-200 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="councilEmail" className="text-sm font-medium text-gray-700">
                        Council Email (Optional)
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="councilEmail"
                          type="email"
                          placeholder="Enter email address"
                          className="pl-10 border-gray-200 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="startDate" className="text-sm font-medium text-gray-700">
                        Start Date of the Run
                      </Label>
                      <DatePicker
                        date={startDate}
                        onDateChange={setStartDate}
                        placeholder="Select start date"
                        className="border-gray-200 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="routeType" className="text-sm font-medium text-gray-700">
                        Route Type
                      </Label>
                      <Select>
                        <SelectTrigger
                          id="routeType"
                          className="border-gray-200 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                        >
                          <SelectValue placeholder="Select route type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="am">AM Route</SelectItem>
                          <SelectItem value="pm">PM Route</SelectItem>
                          <SelectItem value="both">AM & PM Route</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pickupTime" className="text-sm font-medium text-gray-700">
                        Pickup Time
                      </Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="pickupTime"
                          type="time"
                          className="pl-10 border-gray-200 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <div className="space-y-2">
                    <Label htmlFor="schoolDestination" className="text-sm font-medium text-gray-700">
                      School Destination
                    </Label>
                    <div className="relative">
                      <School className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
                      <AddressLookup
                        onAddressSelect={(address) => setSchoolDestination(address)}
                        selectedAddress={schoolDestination}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-100 shadow-none overflow-hidden rounded-xl transition-all hover:shadow-sm">
              <CardHeader className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-b border-yellow-200 px-6 py-5">
                <CardTitle className="text-lg font-semibold flex items-center text-gray-800">
                  <CalendarIcon className="mr-3 h-5 w-5 text-yellow-600" />
                  Schedule Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-1 lg:w-3/5">
                    <div className="space-y-2 mb-4">
                      <Label className="text-sm font-medium text-gray-700">Select Off Days / Holidays</Label>
                      <p className="text-xs text-gray-500">Click and drag to select a date range</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <Calendar mode="range" className="rounded-md w-full" numberOfMonths={1} />
                    </div>
                  </div>
                  <div className="lg:w-2/5">
                    <div className="space-y-2 mb-4">
                      <Label className="text-sm font-medium text-gray-700">Run Days</Label>
                      <p className="text-xs text-gray-500">Select days when this run will operate</p>
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {daysOfWeek.map((day) => (
                        <Button
                          key={day.id}
                          variant={selectedDays.includes(day.id) ? "default" : "outline"}
                          className={`h-12 ${
                            selectedDays.includes(day.id)
                              ? "bg-yellow-500 hover:bg-yellow-600 text-black"
                              : "text-gray-700 border-gray-200"
                          } rounded-lg`}
                          onClick={() => handleDaySelect(day.id)}
                        >
                          {day.label}
                        </Button>
                      ))}
                    </div>
                    <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start">
                      <Info className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-blue-800">Recurring Schedule</p>
                        <p className="text-xs text-blue-600 mt-1">
                          This run will repeat on the selected days until manually ended or until the end date is
                          reached.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button
                onClick={() => setActiveTab("students")}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-lg px-6 py-2.5 flex items-center group transition-all"
              >
                Continue to Students
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="students" className="space-y-8 mt-0">
            <Card className="bg-white border border-gray-100 shadow-none overflow-hidden rounded-xl transition-all hover:shadow-sm">
              <CardHeader className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-b border-yellow-200 px-6 py-5">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-semibold flex items-center text-gray-800">
                    <Users className="mr-3 h-5 w-5 text-yellow-600" />
                    Student Details
                  </CardTitle>
                  <Button
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-lg"
                    onClick={addStudent}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Student
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {students.map((student, index) => (
                    <div
                      key={student.id}
                      className="bg-gray-50 border border-gray-100 rounded-lg p-5 relative hover:shadow-md transition-shadow"
                    >
                      <div className="absolute top-4 right-4 flex space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => moveStudent(index, "up")}
                          className="h-8 w-8 rounded-lg border-gray-200 bg-white"
                          disabled={index === 0}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => moveStudent(index, "down")}
                          className="h-8 w-8 rounded-lg border-gray-200 bg-white"
                          disabled={index === students.length - 1}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => deleteStudent(index)}
                          className="h-8 w-8 rounded-lg border-gray-200 bg-white text-red-500 hover:text-red-600 hover:bg-red-50"
                          disabled={students.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center mb-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 text-yellow-700 mr-3 text-sm font-bold">
                          {index + 1}
                        </div>
                        <h3 className="text-lg font-medium">{student.name ? student.name : `Student ${index + 1}`}</h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor={`student-name-${student.id}`} className="text-sm font-medium text-gray-700">
                              Student Name
                            </Label>
                            <div className="relative">
                              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                              <Input
                                id={`student-name-${student.id}`}
                                placeholder="Enter student name"
                                value={student.name}
                                onChange={(e) => {
                                  const updatedStudents = [...students]
                                  updatedStudents[index].name = e.target.value
                                  setStudents(updatedStudents)
                                }}
                                className="pl-10 border-gray-200 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`parent-name-${student.id}`} className="text-sm font-medium text-gray-700">
                              Parent/Guardian Name
                            </Label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                              <Input
                                id={`parent-name-${student.id}`}
                                placeholder="Enter parent name"
                                value={student.parentName}
                                onChange={(e) => {
                                  const updatedStudents = [...students]
                                  updatedStudents[index].parentName = e.target.value
                                  setStudents(updatedStudents)
                                }}
                                className="pl-10 border-gray-200 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor={`contact-${student.id}`} className="text-sm font-medium text-gray-700">
                              Contact Number
                            </Label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                              <Input
                                id={`contact-${student.id}`}
                                placeholder="Enter contact number"
                                value={student.contactNumber}
                                onChange={(e) => {
                                  const updatedStudents = [...students]
                                  updatedStudents[index].contactNumber = e.target.value
                                  setStudents(updatedStudents)
                                }}
                                className="pl-10 border-gray-200 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`address-${student.id}`} className="text-sm font-medium text-gray-700">
                              Home Address
                            </Label>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
                              <AddressLookup
                                onAddressSelect={(address) => {
                                  const updatedStudents = [...students]
                                  updatedStudents[index].address = address
                                  setStudents(updatedStudents)
                                  setSelectedAddresses({ ...selectedAddresses, [student.id]: address })
                                }}
                                selectedAddress={selectedAddresses[student.id] || student.address}
                                className="pl-10"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-100 shadow-none overflow-hidden rounded-xl transition-all hover:shadow-sm">
              <CardHeader className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-b border-yellow-200 px-6 py-5">
                <CardTitle className="text-lg font-semibold flex items-center text-gray-800">
                  <MapPin className="mr-3 h-5 w-5 text-yellow-600" />
                  Pickup Order Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                  <ol className="space-y-4">
                    <li className="flex items-center bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-100 text-yellow-700 mr-4">
                        <UserPlus className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{paName}</p>
                        <p className="text-sm text-gray-600">Passenger Assistant</p>
                      </div>
                    </li>
                    {students.map((student, index) => (
                      <li
                        key={student.id}
                        className="flex items-center bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
                      >
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-700 mr-4">
                          <div className="text-sm font-bold">{index + 1}</div>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{student.name || `Student ${index + 1}`}</p>
                          <p className="text-sm text-gray-500">
                            {selectedAddresses[student.id] || student.address || "No address specified"}
                          </p>
                        </div>
                      </li>
                    ))}
                    <li className="flex items-center bg-green-50 p-4 rounded-lg border border-green-100">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-700 mr-4">
                        <School className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{schoolDestination || "School Destination"}</p>
                        <p className="text-sm text-gray-600">Final Destination</p>
                      </div>
                    </li>
                  </ol>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setActiveTab("details")}
                className="border-gray-200 rounded-lg px-6 py-2.5 flex items-center"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Details
              </Button>
              <Button
                onClick={() => setActiveTab("staff")}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-lg px-6 py-2.5 flex items-center"
              >
                Continue to Staff
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="staff" className="space-y-8 mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white border border-gray-100 shadow-none overflow-hidden rounded-xl transition-all hover:shadow-sm">
                <CardHeader className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-b border-yellow-200 px-6 py-5">
                  <CardTitle className="text-lg font-semibold flex items-center text-gray-800">
                    <Truck className="mr-3 h-5 w-5 text-yellow-600" />
                    Driver Assignment
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-4">
                    <Label className="text-sm font-medium text-gray-700">Select Driver</Label>
                    <div className="grid grid-cols-1 gap-3">
                      {["John Doe", "Jane Smith", "Mike Johnson"].map((driver, index) => (
                        <div
                          key={index}
                          className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-yellow-300 hover:bg-yellow-50 cursor-pointer"
                        >
                          <Avatar className="h-10 w-10 border-2 border-yellow-500 mr-3">
                            <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${driver}`} />
                            <AvatarFallback>
                              {driver
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium">{driver}</p>
                            <p className="text-xs text-gray-500">Available • 5 star rating</p>
                          </div>
                          <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Vehicle Type</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { type: "saloon", label: "Saloon", icon: "🚗" },
                        { type: "mpv", label: "MPV", icon: "🚐" },
                        { type: "accessible", label: "Accessible", icon: "♿" },
                      ].map((vehicle) => (
                        <div
                          key={vehicle.type}
                          className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-lg hover:border-yellow-300 hover:bg-yellow-50 cursor-pointer"
                        >
                          <div className="text-2xl mb-1">{vehicle.icon}</div>
                          <p className="text-sm font-medium">{vehicle.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Driver Price</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        type="number"
                        placeholder="0.00"
                        className="pl-10 border-gray-200 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-gray-100 shadow-none overflow-hidden rounded-xl transition-all hover:shadow-sm">
                <CardHeader className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-b border-yellow-200 px-6 py-5">
                  <CardTitle className="text-lg font-semibold flex items-center text-gray-800">
                    <UserPlus className="mr-3 h-5 w-5 text-yellow-600" />
                    PA Assignment
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-4">
                    <Label className="text-sm font-medium text-gray-700">Select PA</Label>
                    <div className="grid grid-cols-1 gap-3">
                      {["Alice Brown", "Bob Wilson", "Carol Taylor"].map((pa, index) => (
                        <div
                          key={index}
                          className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                            paName === pa
                              ? "border-yellow-300 bg-yellow-50"
                              : "border-gray-200 hover:border-yellow-300 hover:bg-yellow-50"
                          }`}
                          onClick={() => setPaName(pa)}
                        >
                          <Avatar className="h-10 w-10 border-2 border-yellow-500 mr-3">
                            <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${pa}`} />
                            <AvatarFallback>
                              {pa
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium">{pa}</p>
                            <p className="text-xs text-gray-500">Available • 4.8 star rating</p>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-full ${
                              paName === pa
                                ? "bg-yellow-500 flex items-center justify-center"
                                : "border-2 border-gray-300"
                            }`}
                          >
                            {paName === pa && <CheckCircle className="h-3 w-3 text-white" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">PA Pickup Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
                      <AddressLookup onAddressSelect={(address) => {}} className="pl-10" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">PA Price</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        type="number"
                        placeholder="0.00"
                        className="pl-10 border-gray-200 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-gray-100 shadow-none overflow-hidden rounded-xl transition-all hover:shadow-sm">
                <CardHeader className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-b border-yellow-200 px-6 py-5">
                  <CardTitle className="text-lg font-semibold flex items-center text-gray-800">
                    <Clock className="mr-3 h-5 w-5 text-yellow-600" />
                    Run Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">PA Pickup Time</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        type="time"
                        className="pl-10 border-gray-200 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">First Student Pickup</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        type="time"
                        className="pl-10 border-gray-200 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">School Arrival Time</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        type="time"
                        className="pl-10 border-gray-200 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                      />
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 flex items-start mt-4">
                    <AlertCircle className="h-5 w-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800">Estimated Journey Time</p>
                      <p className="text-xs text-yellow-600 mt-1">
                        Based on the addresses provided, the estimated journey time is 45 minutes.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setActiveTab("students")}
                className="border-gray-200 rounded-lg px-6 py-2.5 flex items-center"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Students
              </Button>
              <Button
                onClick={() => setActiveTab("review")}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-lg px-6 py-2.5 flex items-center"
              >
                Continue to Review
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="review" className="space-y-8 mt-0">
            <Card className="bg-white border border-gray-100 shadow-none overflow-hidden rounded-xl transition-all hover:shadow-sm">
              <CardHeader className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-b border-yellow-200 px-6 py-5">
                <CardTitle className="text-lg font-semibold flex items-center text-gray-800">
                  <CheckCircle className="mr-3 h-5 w-5 text-yellow-600" />
                  Run Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Council Information</h3>
                      <div className="space-y-1">
                        <p className="font-medium text-gray-900">London Borough Council</p>
                        <p className="text-sm text-gray-700">Contact: 020 7123 4567</p>
                        <p className="text-sm text-gray-700">Email: contact@londonborough.gov.uk</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Route Details</h3>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <p className="text-sm text-gray-700">Route Type:</p>
                          <Badge className="bg-yellow-100 text-yellow-800 border border-yellow-200">AM Route</Badge>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-sm text-gray-700">Start Date:</p>
                          <p className="text-sm font-medium">
                            {startDate ? startDate.toLocaleDateString() : "Not set"}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-sm text-gray-700">School:</p>
                          <p className="text-sm font-medium">{schoolDestination || "Not set"}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Schedule</h3>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {daysOfWeek.map((day) => (
                          <Badge
                            key={day.id}
                            variant={selectedDays.includes(day.id) ? "default" : "outline"}
                            className={
                              selectedDays.includes(day.id)
                                ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                                : ""
                            }
                          >
                            {day.label}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Staff Assignment</h3>
                      <div className="flex items-center mb-3">
                        <Avatar className="h-10 w-10 border-2 border-yellow-500 mr-3">
                          <AvatarImage src="https://api.dicebear.com/6.x/initials/svg?seed=John%20Doe" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">John Doe</p>
                          <p className="text-xs text-gray-500">Driver • Saloon Vehicle</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 border-2 border-yellow-500 mr-3">
                          <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${paName}`} />
                          <AvatarFallback>
                            {paName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{paName}</p>
                          <p className="text-xs text-gray-500">Passenger Assistant</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Students</h3>
                      <p className="text-sm mb-2">{students.length} students assigned</p>
                      <ul className="space-y-2">
                        {students.map((student, index) => (
                          <li key={student.id} className="flex items-center">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-yellow-100 text-yellow-700 mr-2 text-xs font-bold">
                              {index + 1}
                            </div>
                            <span className="text-sm font-medium">
                              {student.name ? student.name : `Student ${index + 1}`}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Cost</h3>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <p className="text-sm text-gray-700">Driver:</p>
                          <p className="text-sm font-medium">£45.00</p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-sm text-gray-700">PA:</p>
                          <p className="text-sm font-medium">£25.00</p>
                        </div>
                        <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between">
                          <p className="font-medium text-gray-900">Total:</p>
                          <p className="font-medium text-yellow-600">£70.00</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start">
                  <Info className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">Ready to Create</p>
                    <p className="text-sm text-blue-600 mt-1">
                      Please review all details above before creating this run. Once created, you can still make changes
                      from the run management page.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={() => setActiveTab("staff")}
                className="border-gray-200 rounded-lg px-6 py-2.5 flex items-center"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Button>

              <div className="flex items-center gap-3">
                <Button variant="ghost" className="text-gray-500 hover:text-gray-700" title="Save as draft">
                  <Save className="h-5 w-5" />
                </Button>

                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-lg px-8 py-2.5 flex items-center">
                  <Send className="mr-2 h-4 w-4" />
                  Create Booking
                </Button>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

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
import { RouteSchedule } from "@/components/booking-form/RouteSchedule"
import { PassengerDetails } from "@/components/booking-form/PassengerDetails"
import { DriverSelection } from "@/components/booking-form/DriverSelection"

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
          <RouteSchedule
            startDate={startDate}
            setStartDate={setStartDate}
            daysOfWeek={daysOfWeek}
            selectedDays={selectedDays}
            handleDaySelect={handleDaySelect}
            schoolDestination={schoolDestination}
            setSchoolDestination={setSchoolDestination}
            setActiveTab={setActiveTab}
          />

          <PassengerDetails
            students={students}
            setStudents={setStudents}
            addStudent={addStudent}
            moveStudent={moveStudent}
            deleteStudent={deleteStudent}
            selectedAddresses={selectedAddresses}
            setSelectedAddresses={setSelectedAddresses}
            paName={paName}
            schoolDestination={schoolDestination}
            setActiveTab={setActiveTab}
          />

          <DriverSelection paName={paName} setPaName={setPaName} setActiveTab={setActiveTab} />

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

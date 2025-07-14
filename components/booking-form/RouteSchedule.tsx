"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { AddressLookup } from "@/components/ui/address-lookup"
import { DatePicker } from "@/components/ui/date-picker"
import { TabsContent } from "@/components/ui/tabs"
import { CalendarIcon, Clock, School, Building, Phone, Mail, ChevronRight, Info } from "lucide-react"

interface Day {
  id: string
  label: string
}

interface RouteScheduleProps {
  startDate: Date | undefined
  setStartDate: (date: Date | undefined) => void
  daysOfWeek: Day[]
  selectedDays: string[]
  handleDaySelect: (day: string) => void
  schoolDestination: string
  setSchoolDestination: (address: string) => void
  setActiveTab: (tab: string) => void
}

export function RouteSchedule({
  startDate,
  setStartDate,
  daysOfWeek,
  selectedDays,
  handleDaySelect,
  schoolDestination,
  setSchoolDestination,
  setActiveTab,
}: RouteScheduleProps) {
  return (
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
                  <Input id="councilName" placeholder="Enter council name" className="pl-10 border-gray-200 rounded-lg focus:ring-yellow-500 focus:border-yellow-500" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="councilContact" className="text-sm font-medium text-gray-700">
                  Council Contact Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input id="councilContact" placeholder="Enter contact number" className="pl-10 border-gray-200 rounded-lg focus:ring-yellow-500 focus:border-yellow-500" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="councilEmail" className="text-sm font-medium text-gray-700">
                  Council Email (Optional)
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input id="councilEmail" type="email" placeholder="Enter email address" className="pl-10 border-gray-200 rounded-lg focus:ring-yellow-500 focus:border-yellow-500" />
                </div>
              </div>
            </div>
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-sm font-medium text-gray-700">
                  Start Date of the Run
                </Label>
                <DatePicker date={startDate} onDateChange={setStartDate} placeholder="Select start date" className="border-gray-200 rounded-lg focus:ring-yellow-500 focus:border-yellow-500" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="routeType" className="text-sm font-medium text-gray-700">
                  Route Type
                </Label>
                <Select>
                  <SelectTrigger id="routeType" className="border-gray-200 rounded-lg focus:ring-yellow-500 focus:border-yellow-500">
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
                  <Input id="pickupTime" type="time" className="pl-10 border-gray-200 rounded-lg focus:ring-yellow-500 focus:border-yellow-500" />
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
                <AddressLookup onAddressSelect={(address) => setSchoolDestination(address)} selectedAddress={schoolDestination} className="pl-10" />
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
                    className={`h-12 ${selectedDays.includes(day.id) ? "bg-yellow-500 hover:bg-yellow-600 text-black" : "text-gray-700 border-gray-200"} rounded-lg`}
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
  )
}

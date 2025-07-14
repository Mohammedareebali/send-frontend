"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { AddressLookup } from "@/components/ui/address-lookup"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TabsContent } from "@/components/ui/tabs"
import { Truck, UserPlus, Clock, MapPin, AlertCircle, DollarSign, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react"

interface DriverSelectionProps {
  paName: string
  setPaName: (name: string) => void
  setActiveTab: (tab: string) => void
}

export function DriverSelection({ paName, setPaName, setActiveTab }: DriverSelectionProps) {
  return (
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
                  <div key={index} className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-yellow-300 hover:bg-yellow-50 cursor-pointer">
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
                  <div key={vehicle.type} className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-lg hover:border-yellow-300 hover:bg-yellow-50 cursor-pointer">
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
                <Input type="number" placeholder="0.00" className="pl-10 border-gray-200 rounded-lg focus:ring-yellow-500 focus:border-yellow-500" />
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
                    className={`flex items-center p-3 border rounded-lg cursor-pointer ${paName === pa ? "border-yellow-300 bg-yellow-50" : "border-gray-200 hover:border-yellow-300 hover:bg-yellow-50"}`}
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
                    <div className={`w-5 h-5 rounded-full ${paName === pa ? "bg-yellow-500 flex items-center justify-center" : "border-2 border-gray-300"}`}>
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
                <Input type="number" placeholder="0.00" className="pl-10 border-gray-200 rounded-lg focus:ring-yellow-500 focus:border-yellow-500" />
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
                <Input type="time" className="pl-10 border-gray-200 rounded-lg focus:ring-yellow-500 focus:border-yellow-500" />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">First Student Pickup</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input type="time" className="pl-10 border-gray-200 rounded-lg focus:ring-yellow-500 focus:border-yellow-500" />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">School Arrival Time</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input type="time" className="pl-10 border-gray-200 rounded-lg focus:ring-yellow-500 focus:border-yellow-500" />
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 flex items-start mt-4">
              <AlertCircle className="h-5 w-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-yellow-800">Estimated Journey Time</p>
                <p className="text-xs text-yellow-600 mt-1">Based on the addresses provided, the estimated journey time is 45 minutes.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setActiveTab("students")}
          className="border-gray-200 rounded-lg px-6 py-2.5 flex items-center">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Students
        </Button>
        <Button onClick={() => setActiveTab("review")}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-lg px-6 py-2.5 flex items-center">
          Continue to Review
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </TabsContent>
  )
}

"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AddressLookup } from "@/components/ui/address-lookup"
import { TabsContent } from "@/components/ui/tabs"
import { Users, PlusCircle, ChevronLeft, ChevronRight, Trash2, User, Phone, MapPin, UserPlus, School } from "lucide-react"

interface Student {
  id: number
  name: string
  parentName: string
  contactNumber: string
  address: string
}

interface PassengerDetailsProps {
  students: Student[]
  setStudents: (students: Student[]) => void
  addStudent: () => void
  moveStudent: (index: number, direction: "up" | "down") => void
  deleteStudent: (index: number) => void
  selectedAddresses: Record<number, string>
  setSelectedAddresses: (value: Record<number, string>) => void
  paName: string
  schoolDestination: string
  setActiveTab: (tab: string) => void
}

export function PassengerDetails({
  students,
  setStudents,
  addStudent,
  moveStudent,
  deleteStudent,
  selectedAddresses,
  setSelectedAddresses,
  paName,
  schoolDestination,
  setActiveTab,
}: PassengerDetailsProps) {
  return (
    <TabsContent value="students" className="space-y-8 mt-0">
      <Card className="bg-white border border-gray-100 shadow-none overflow-hidden rounded-xl transition-all hover:shadow-sm">
        <CardHeader className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-b border-yellow-200 px-6 py-5">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold flex items-center text-gray-800">
              <Users className="mr-3 h-5 w-5 text-yellow-600" />
              Student Details
            </CardTitle>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-lg" onClick={addStudent}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Student
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {students.map((student, index) => (
              <div key={student.id} className="bg-gray-50 border border-gray-100 rounded-lg p-5 relative hover:shadow-md transition-shadow">
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button variant="outline" size="icon" onClick={() => moveStudent(index, "up")} className="h-8 w-8 rounded-lg border-gray-200 bg-white" disabled={index === 0}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => moveStudent(index, "down")} className="h-8 w-8 rounded-lg border-gray-200 bg-white" disabled={index === students.length - 1}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => deleteStudent(index)} className="h-8 w-8 rounded-lg border-gray-200 bg-white text-red-500 hover:text-red-600 hover:bg-red-50" disabled={students.length === 1}>
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
                            const updated = [...students]
                            updated[index].name = e.target.value
                            setStudents(updated)
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
                            const updated = [...students]
                            updated[index].parentName = e.target.value
                            setStudents(updated)
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
                            const updated = [...students]
                            updated[index].contactNumber = e.target.value
                            setStudents(updated)
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
                            const updated = [...students]
                            updated[index].address = address
                            setStudents(updated)
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
                <li key={student.id} className="flex items-center bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
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
        <Button variant="outline" onClick={() => setActiveTab("details")} className="border-gray-200 rounded-lg px-6 py-2.5 flex items-center">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Details
        </Button>
        <Button onClick={() => setActiveTab("staff")} className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-lg px-6 py-2.5 flex items-center">
          Continue to Staff
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </TabsContent>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, User, Users, Zap, Star } from "lucide-react"

export function NewRunForm() {
  const [assignmentMode, setAssignmentMode] = useState<"manual" | "auto">("manual")
  const [autoAssignEnabled, setAutoAssignEnabled] = useState(false)

  const availableDrivers = [
    { id: "D001", name: "John Smith", rating: 4.8, location: "Available", vehicle: "Mercedes Sprinter" },
    { id: "D002", name: "Sarah Johnson", rating: 4.9, location: "Available", vehicle: "Ford Transit" },
    { id: "D003", name: "Mike Brown", rating: 4.6, location: "On Route", vehicle: "Volkswagen Crafter" },
  ]

  const availablePAs = [
    { id: "PA001", name: "Lisa Wilson", rating: 4.9, experience: "SEN Specialist" },
    { id: "PA002", name: "Tom Davis", rating: 4.7, experience: "Behavioral Support" },
    { id: "PA003", name: "Anna Taylor", rating: 4.8, experience: "Wheelchair Trained" },
  ]

  const aiSuggestions = {
    driver: { name: "John Smith", confidence: 94, reason: "Best rating, closest location, suitable vehicle" },
    pa: { name: "Lisa Wilson", confidence: 91, reason: "SEN specialist, excellent track record" },
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-slate-200 flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-yellow-400" />
            Create New Transport Run
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Run Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="student-name" className="text-slate-300">
                Student Name
              </Label>
              <Input
                id="student-name"
                placeholder="Enter student name"
                className="bg-slate-800/50 border-slate-700 text-slate-200 placeholder:text-slate-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="school" className="text-slate-300">
                School
              </Label>
              <Select>
                <SelectTrigger className="bg-slate-800/50 border-slate-700 text-slate-200">
                  <SelectValue placeholder="Select school" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="greenfield">Greenfield Primary</SelectItem>
                  <SelectItem value="riverside">Riverside Academy</SelectItem>
                  <SelectItem value="oakwood">Oakwood School</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="pickup-address" className="text-slate-300">
                Pickup Address
              </Label>
              <Input
                id="pickup-address"
                placeholder="Enter pickup address"
                className="bg-slate-800/50 border-slate-700 text-slate-200 placeholder:text-slate-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pickup-time" className="text-slate-300">
                Pickup Time
              </Label>
              <Input id="pickup-time" type="time" className="bg-slate-800/50 border-slate-700 text-slate-200" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements" className="text-slate-300">
              Special Requirements
            </Label>
            <Textarea
              id="requirements"
              placeholder="Enter any special requirements (wheelchair access, behavioral support, etc.)"
              className="bg-slate-800/50 border-slate-700 text-slate-200 placeholder:text-slate-400"
            />
          </div>

          {/* Staff Assignment Section */}
          <div className="space-y-4 pt-6 border-t border-slate-700/50">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-200">Staff Assignment</h3>
              <div className="flex items-center gap-2">
                <Label htmlFor="auto-assign" className="text-slate-300 text-sm">
                  Enable Auto-Assignment
                </Label>
                <Switch id="auto-assign" checked={autoAssignEnabled} onCheckedChange={setAutoAssignEnabled} />
              </div>
            </div>

            {autoAssignEnabled ? (
              <Card className="bg-gradient-to-r from-emerald-900/20 to-blue-900/20 border-emerald-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="h-4 w-4 text-yellow-400" />
                    <span className="text-slate-200 font-medium">AI-Powered Assignment</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300 text-sm">Recommended Driver:</span>
                        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                          {aiSuggestions.driver.confidence}% Match
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-slate-400" />
                        <span className="text-slate-200 font-medium">{aiSuggestions.driver.name}</span>
                      </div>
                      <p className="text-xs text-slate-400">{aiSuggestions.driver.reason}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300 text-sm">Recommended PA:</span>
                        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                          {aiSuggestions.pa.confidence}% Match
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-slate-400" />
                        <span className="text-slate-200 font-medium">{aiSuggestions.pa.name}</span>
                      </div>
                      <p className="text-xs text-slate-400">{aiSuggestions.pa.reason}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Tabs value={assignmentMode} onValueChange={(value) => setAssignmentMode(value as "manual" | "auto")}>
                <TabsList className="grid w-full grid-cols-2 bg-slate-800/50">
                  <TabsTrigger value="manual" className="data-[state=active]:bg-slate-700">
                    Manual Selection
                  </TabsTrigger>
                  <TabsTrigger value="auto" className="data-[state=active]:bg-slate-700">
                    Leave Unassigned
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="manual" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-slate-300">Select Driver</Label>
                      <Select>
                        <SelectTrigger className="bg-slate-800/50 border-slate-700 text-slate-200">
                          <SelectValue placeholder="Choose a driver" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          {availableDrivers.map((driver) => (
                            <SelectItem key={driver.id} value={driver.id}>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 text-yellow-400" />
                                  <span className="text-xs">{driver.rating}</span>
                                </div>
                                <span>{driver.name}</span>
                                <span className="text-xs text-slate-400">({driver.vehicle})</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-slate-300">Select Passenger Assistant</Label>
                      <Select>
                        <SelectTrigger className="bg-slate-800/50 border-slate-700 text-slate-200">
                          <SelectValue placeholder="Choose a PA" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          {availablePAs.map((pa) => (
                            <SelectItem key={pa.id} value={pa.id}>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 text-yellow-400" />
                                  <span className="text-xs">{pa.rating}</span>
                                </div>
                                <span>{pa.name}</span>
                                <span className="text-xs text-slate-400">({pa.experience})</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="auto" className="space-y-4">
                  <Card className="bg-slate-800/30 border-slate-700/50">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="h-4 w-4 text-slate-400" />
                        <span className="text-slate-200 font-medium">Unassigned Run</span>
                      </div>
                      <p className="text-sm text-slate-400">
                        This run will be created without staff assignment. You can assign staff later from the Routes
                        Management page.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-6 border-t border-slate-700/50">
            <Button variant="outline" className="bg-slate-800/50 border-slate-700 text-slate-300">
              Cancel
            </Button>
            <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-semibold">
              Create Run
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertTriangle,
  Clock,
  CheckCircle,
  Phone,
  Mail,
  FileText,
  Send,
  Search,
  Filter,
  MapPin,
  User,
  Calendar,
} from "lucide-react"

export function CommunicationHub() {
  const [activeTab, setActiveTab] = useState("incidents")
  const [selectedIncidentType, setSelectedIncidentType] = useState("")

  const recentIncidents = [
    {
      id: "INC-001",
      type: "delay",
      route: "RT-001",
      driver: "Sarah Johnson",
      description: "Traffic delay on A40 - ETA delayed by 15 minutes",
      status: "resolved",
      time: "10 min ago",
      severity: "low",
      contactsNotified: ["Parents", "School"],
    },
    {
      id: "INC-002",
      type: "breakdown",
      route: "RT-003",
      driver: "Mike Chen",
      description: "Vehicle breakdown - replacement vehicle dispatched",
      status: "active",
      time: "25 min ago",
      severity: "high",
      contactsNotified: ["Emergency Services", "Parents", "Council"],
    },
    {
      id: "INC-003",
      type: "medical",
      route: "RT-007",
      driver: "Emma Wilson",
      description: "Student feeling unwell - returning to school",
      status: "active",
      time: "1 hour ago",
      severity: "medium",
      contactsNotified: ["Parents", "School Nurse"],
    },
  ]

  const emergencyContacts = [
    {
      category: "Emergency Services",
      contacts: [
        { name: "Emergency Services", phone: "999", type: "emergency" },
        { name: "NHS 111", phone: "111", type: "medical" },
      ],
    },
    {
      category: "Transport Control",
      contacts: [
        { name: "Control Room", phone: "01234 567890", email: "control@sentransport.com", type: "internal" },
        { name: "Duty Manager", phone: "07123 456789", email: "duty@sentransport.com", type: "internal" },
      ],
    },
    {
      category: "Council Services",
      contacts: [
        { name: "SEN Transport Team", phone: "01234 567891", email: "sen@council.gov.uk", type: "external" },
        { name: "Emergency Duty Team", phone: "01234 567892", email: "emergency@council.gov.uk", type: "external" },
      ],
    },
  ]

  const incidentTemplates = [
    {
      type: "delay",
      label: "Route Delay",
      template: "Route [ROUTE] is delayed by [TIME] due to [REASON]. New ETA: [ETA]",
    },
    {
      type: "breakdown",
      label: "Vehicle Breakdown",
      template: "Vehicle breakdown on route [ROUTE]. Replacement vehicle dispatched. ETA: [ETA]",
    },
    {
      type: "medical",
      label: "Medical Incident",
      template: "Medical incident on route [ROUTE]. Student being attended to. [ACTION_TAKEN]",
    },
    {
      type: "weather",
      label: "Weather Alert",
      template: "Weather conditions affecting route [ROUTE]. Service status: [STATUS]",
    },
    {
      type: "cancellation",
      label: "Route Cancellation",
      template: "Route [ROUTE] cancelled due to [REASON]. Alternative arrangements: [ALTERNATIVE]",
    },
  ]

  const getIncidentIcon = (type: string) => {
    switch (type) {
      case "delay":
        return <Clock className="h-4 w-4 text-yellow-400" />
      case "breakdown":
        return <AlertTriangle className="h-4 w-4 text-red-400" />
      case "medical":
        return <AlertTriangle className="h-4 w-4 text-orange-400" />
      default:
        return <FileText className="h-4 w-4 text-slate-400" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-emerald-400" />
      case "active":
        return <Clock className="h-4 w-4 text-yellow-400" />
      default:
        return <Clock className="h-4 w-4 text-slate-400" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-500/20 text-red-300 border-red-400/30"
      case "medium":
        return "bg-orange-500/20 text-orange-300 border-orange-400/30"
      case "low":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-400/30"
      default:
        return "bg-slate-500/20 text-slate-300 border-slate-400/30"
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Communication Panel */}
      <div className="lg:col-span-2">
        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-blue-600/20 rounded-lg">
                <FileText className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Incident Management</h3>
                <p className="text-sm text-slate-400">Report and track route incidents</p>
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 bg-slate-800/50 border border-slate-700/50 mb-6">
                <TabsTrigger
                  value="incidents"
                  className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-300"
                >
                  Recent Incidents
                </TabsTrigger>
                <TabsTrigger
                  value="report"
                  className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-300"
                >
                  Report Incident
                </TabsTrigger>
              </TabsList>

              <TabsContent value="incidents" className="space-y-4">
                {/* Filters */}
                <div className="flex gap-3 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                      placeholder="Search incidents..."
                      className="pl-10 bg-slate-800/50 border-slate-700 text-slate-200"
                    />
                  </div>
                  <Button variant="outline" size="sm" className="bg-slate-800/50 border-slate-700 text-slate-300">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>

                {/* Incident List */}
                <div className="space-y-3">
                  {recentIncidents.map((incident) => (
                    <div key={incident.id} className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                      <div className="flex items-start gap-3">
                        <div className="flex items-center gap-2">
                          {getIncidentIcon(incident.type)}
                          {getStatusIcon(incident.status)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-slate-200 font-medium">{incident.id}</span>
                            <Badge className={getSeverityColor(incident.severity)}>
                              {incident.severity.toUpperCase()}
                            </Badge>
                            <Badge className="bg-slate-600/50 text-slate-300 text-xs">
                              {incident.type.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-slate-300 mb-2">{incident.description}</p>
                          <div className="flex items-center gap-4 text-xs text-slate-400">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {incident.route}
                            </span>
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {incident.driver}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {incident.time}
                            </span>
                          </div>
                          <div className="mt-2">
                            <p className="text-xs text-slate-400 mb-1">Contacts Notified:</p>
                            <div className="flex gap-1">
                              {incident.contactsNotified.map((contact, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs bg-slate-700/50 border-slate-600"
                                >
                                  {contact}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="report" className="space-y-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-2 block">Incident Type</label>
                      <Select value={selectedIncidentType} onValueChange={setSelectedIncidentType}>
                        <SelectTrigger className="bg-slate-800/50 border-slate-700 text-slate-200">
                          <SelectValue placeholder="Select incident type" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          {incidentTemplates.map((template) => (
                            <SelectItem key={template.type} value={template.type} className="text-slate-200">
                              {template.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-2 block">Route</label>
                      <Select>
                        <SelectTrigger className="bg-slate-800/50 border-slate-700 text-slate-200">
                          <SelectValue placeholder="Select route" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="RT-001" className="text-slate-200">
                            RT-001 - Morning Route A
                          </SelectItem>
                          <SelectItem value="RT-002" className="text-slate-200">
                            RT-002 - Morning Route B
                          </SelectItem>
                          <SelectItem value="RT-003" className="text-slate-200">
                            RT-003 - Afternoon Route A
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-300 mb-2 block">Incident Description</label>
                    <Textarea
                      placeholder="Describe the incident in detail..."
                      className="bg-slate-800/50 border-slate-700 text-slate-200 min-h-[100px]"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-300 mb-2 block">Severity Level</label>
                    <Select>
                      <SelectTrigger className="bg-slate-800/50 border-slate-700 text-slate-200">
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="low" className="text-slate-200">
                          Low - Minor delay/issue
                        </SelectItem>
                        <SelectItem value="medium" className="text-slate-200">
                          Medium - Significant impact
                        </SelectItem>
                        <SelectItem value="high" className="text-slate-200">
                          High - Emergency response needed
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Send className="h-4 w-4 mr-2" />
                    Submit Incident Report
                  </Button>
                </div>

                {/* Quick Templates */}
                {selectedIncidentType && (
                  <div className="pt-4 border-t border-slate-700/50">
                    <h4 className="text-sm font-medium text-slate-300 mb-3">Template Preview</h4>
                    <div className="p-3 bg-slate-800/30 rounded-lg border border-slate-700/50">
                      <p className="text-slate-300 text-sm">
                        {incidentTemplates.find((t) => t.type === selectedIncidentType)?.template}
                      </p>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Contacts Sidebar */}
      <div className="space-y-4">
        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-red-600/20 rounded-lg">
                <Phone className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Emergency Contacts</h3>
                <p className="text-sm text-slate-400">Use your phone to call</p>
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {emergencyContacts.map((category) => (
              <div key={category.category}>
                <h4 className="text-sm font-medium text-slate-300 mb-2">{category.category}</h4>
                <div className="space-y-2">
                  {category.contacts.map((contact, index) => (
                    <div key={index} className="p-3 bg-slate-800/30 rounded-lg border border-slate-700/50">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-slate-200 font-medium text-sm">{contact.name}</span>
                        {contact.type === "emergency" && (
                          <Badge className="bg-red-500/20 text-red-300 border-red-400/30 text-xs">EMERGENCY</Badge>
                        )}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-slate-300">
                          <Phone className="h-3 w-3" />
                          <span className="font-mono">{contact.phone}</span>
                        </div>
                        {contact.email && (
                          <div className="flex items-center gap-2 text-xs text-slate-300">
                            <Mail className="h-3 w-3" />
                            <span>{contact.email}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-white">Today's Incidents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-300 text-sm">Total Reports</span>
                <Badge className="bg-slate-600/50 text-slate-300">12</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300 text-sm">Active Incidents</span>
                <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-400/30">3</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300 text-sm">Resolved</span>
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30">9</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

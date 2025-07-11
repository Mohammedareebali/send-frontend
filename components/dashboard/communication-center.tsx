"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, Clock, CheckCircle, Zap, Bell, FileText } from "lucide-react"

export function CommunicationCenter() {
  const [activeTab, setActiveTab] = useState("recent")

  const recentIncidentReports = [
    {
      id: 1,
      routeId: "RT-001",
      type: "incident_report",
      title: "Route Delay - Traffic Accident",
      message: "Route running 10 minutes late due to traffic accident on A34. Students safe, ETA updated to 08:55.",
      status: "reported",
      time: "2 min ago",
      priority: "high",
      reportedBy: "Sarah Johnson (Driver)",
    },
    {
      id: 2,
      routeId: "RT-023",
      type: "incident_report",
      title: "Vehicle Breakdown",
      message: "Flat tire on Riverside Road. Replacement vehicle dispatched. Students remain on bus safely.",
      status: "acknowledged",
      time: "5 min ago",
      priority: "critical",
      reportedBy: "Emma Davis (Driver)",
    },
    {
      id: 3,
      routeId: "RT-012",
      type: "incident_report",
      title: "Student Welfare Check",
      message: "Student showing signs of distress. Passenger assistant providing support. Monitoring situation.",
      status: "monitoring",
      time: "8 min ago",
      priority: "medium",
      reportedBy: "Lisa Wilson (PA)",
    },
  ]

  const incidentTemplates = [
    {
      title: "Route Delay",
      message:
        "Route [ROUTE_ID] is experiencing delays due to [REASON]. Current ETA: [TIME]. Students are safe and supervised.",
      category: "delays",
    },
    {
      title: "Vehicle Issue",
      message:
        "Vehicle on route [ROUTE_ID] has [ISSUE]. [ACTION_TAKEN]. Students are safe and alternative arrangements being made.",
      category: "vehicle",
    },
    {
      title: "Student Welfare",
      message: "Student welfare concern on route [ROUTE_ID]. [DESCRIPTION]. Appropriate support being provided.",
      category: "welfare",
    },
    {
      title: "Weather Impact",
      message:
        "Route [ROUTE_ID] affected by weather conditions: [CONDITIONS]. Safety measures in place, adjusted ETA: [TIME].",
      category: "weather",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "reported":
        return <Clock className="h-4 w-4 text-yellow-400" />
      case "acknowledged":
        return <CheckCircle className="h-4 w-4 text-blue-400" />
      case "monitoring":
        return <AlertTriangle className="h-4 w-4 text-orange-400" />
      default:
        return <Clock className="h-4 w-4 text-slate-400" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "border-l-red-500"
      case "high":
        return "border-l-orange-500"
      case "medium":
        return "border-l-yellow-500"
      default:
        return "border-l-blue-500"
    }
  }

  return (
    <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 bg-orange-600/20 rounded-lg">
            <FileText className="h-5 w-5 text-orange-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Incident Reporting Center</h3>
            <p className="text-sm text-slate-400">Route-related incident management</p>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 bg-slate-800/50 border border-slate-700/50 mb-4">
            <TabsTrigger
              value="recent"
              className="data-[state=active]:bg-orange-600/20 data-[state=active]:text-orange-300"
            >
              <Clock className="h-4 w-4 mr-2" />
              Recent Reports
            </TabsTrigger>
            <TabsTrigger
              value="report"
              className="data-[state=active]:bg-orange-600/20 data-[state=active]:text-orange-300"
            >
              <FileText className="h-4 w-4 mr-2" />
              New Report
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recent" className="space-y-3">
            {recentIncidentReports.map((report) => (
              <div
                key={report.id}
                className={`p-3 bg-slate-800/30 rounded-lg border-l-4 ${getPriorityColor(report.priority)} border-t-slate-700/50 border-r-slate-700/50 border-b-slate-700/50`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-orange-400" />
                    {getStatusIcon(report.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-slate-200 font-medium text-sm">{report.routeId}</span>
                      <Badge className="bg-slate-600/50 text-slate-300 text-xs">INCIDENT</Badge>
                      {report.priority === "critical" && (
                        <Badge className="bg-red-500/20 text-red-300 border-red-500/30 text-xs">CRITICAL</Badge>
                      )}
                    </div>
                    <h4 className="font-medium text-slate-200 mb-1">{report.title}</h4>
                    <p className="text-slate-300 text-sm mb-2">{report.message}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span>{report.time}</span>
                      <span>Reported by: {report.reportedBy}</span>
                      <Badge className="bg-slate-700/50 text-slate-300 text-xs">{report.status.toUpperCase()}</Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="report" className="space-y-4">
            <div className="space-y-4">
              {/* Route Selection */}
              <div>
                <label className="text-sm font-medium text-slate-300 mb-2 block">Route ID</label>
                <Select>
                  <SelectTrigger className="bg-slate-800/50 border-slate-700 text-slate-200">
                    <SelectValue placeholder="Select route..." />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="RT-001">RT-001 - Greenfield Primary</SelectItem>
                    <SelectItem value="RT-023">RT-023 - Oak Tree School</SelectItem>
                    <SelectItem value="RT-012">RT-012 - Riverside Academy</SelectItem>
                    <SelectItem value="RT-045">RT-045 - Hillside School</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Incident Type */}
              <div>
                <label className="text-sm font-medium text-slate-300 mb-2 block">Incident Type</label>
                <Select>
                  <SelectTrigger className="bg-slate-800/50 border-slate-700 text-slate-200">
                    <SelectValue placeholder="Select incident type..." />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="delay">Route Delay</SelectItem>
                    <SelectItem value="vehicle">Vehicle Issue</SelectItem>
                    <SelectItem value="welfare">Student Welfare</SelectItem>
                    <SelectItem value="weather">Weather Impact</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Priority Level */}
              <div>
                <label className="text-sm font-medium text-slate-300 mb-2 block">Priority Level</label>
                <Select>
                  <SelectTrigger className="bg-slate-800/50 border-slate-700 text-slate-200">
                    <SelectValue placeholder="Select priority..." />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="critical">Critical - Immediate Action Required</SelectItem>
                    <SelectItem value="high">High - Urgent Response Needed</SelectItem>
                    <SelectItem value="medium">Medium - Monitor Situation</SelectItem>
                    <SelectItem value="low">Low - For Information</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Incident Description */}
              <div>
                <label className="text-sm font-medium text-slate-300 mb-2 block">Incident Description</label>
                <Textarea
                  placeholder="Describe the incident, current situation, and any actions taken..."
                  className="bg-slate-800/50 border-slate-700 text-slate-200 min-h-[100px]"
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-2">
                <Button className="flex-1 bg-orange-600 hover:bg-orange-700">
                  <FileText className="h-4 w-4 mr-2" />
                  Submit Report
                </Button>
                <Button variant="outline" className="bg-slate-800/50 border-slate-700 text-slate-300">
                  <Bell className="h-4 w-4 mr-2" />
                  Save Draft
                </Button>
              </div>
            </div>

            {/* Quick Templates */}
            <div className="pt-4 border-t border-slate-700/50">
              <h4 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-400" />
                Quick Templates
              </h4>
              <div className="space-y-2">
                {incidentTemplates.map((template, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left bg-slate-800/30 border-slate-700/50 text-slate-300 hover:bg-slate-700 h-auto p-3"
                  >
                    <div>
                      <div className="font-medium text-sm">{template.title}</div>
                      <div className="text-xs text-slate-400 mt-1 truncate">{template.message}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

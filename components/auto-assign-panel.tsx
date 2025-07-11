"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, Truck, Clock, AlertTriangle, Zap, Settings, Play } from "lucide-react"

export function AutoAssignPanel() {
  const autoAssignStats = {
    totalRuns: 24,
    assignedRuns: 18,
    pendingAssignment: 6,
    availableDrivers: 12,
    availablePAs: 8,
    assignmentSuccess: 85,
    lastRunTime: "2 minutes ago",
  }

  const recentAssignments = [
    {
      id: "R001",
      route: "M-12",
      driver: "John Doe",
      pa: "Alice Johnson",
      status: "assigned",
      assignedAt: "10:30 AM",
      confidence: 95,
    },
    {
      id: "R002",
      route: "A-05",
      driver: "Jane Smith",
      pa: "Bob Williams",
      status: "assigned",
      assignedAt: "10:28 AM",
      confidence: 88,
    },
    {
      id: "R003",
      route: "M-08",
      driver: "Mike Johnson",
      pa: "Charlie Brown",
      status: "assigned",
      assignedAt: "10:25 AM",
      confidence: 92,
    },
    {
      id: "R004",
      route: "A-10",
      driver: null,
      pa: null,
      status: "pending",
      assignedAt: null,
      confidence: null,
    },
  ]

  const assignmentRules = [
    { name: "Experience Match", enabled: true, weight: 30 },
    { name: "Location Proximity", enabled: true, weight: 25 },
    { name: "Availability Priority", enabled: true, weight: 20 },
    { name: "Student Needs Match", enabled: true, weight: 15 },
    { name: "Vehicle Compatibility", enabled: true, weight: 10 },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Auto Assignment Status */}
      <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-200">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Zap className="h-5 w-5 text-blue-400" />
            </div>
            Auto Assignment Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-700/30 rounded-lg p-3">
              <div className="text-2xl font-bold text-white">{autoAssignStats.assignedRuns}</div>
              <div className="text-xs text-slate-400">Assigned Runs</div>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-3">
              <div className="text-2xl font-bold text-orange-400">{autoAssignStats.pendingAssignment}</div>
              <div className="text-xs text-slate-400">Pending</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Assignment Success Rate</span>
              <span className="text-emerald-400 font-medium">{autoAssignStats.assignmentSuccess}%</span>
            </div>
            <Progress
              value={autoAssignStats.assignmentSuccess}
              className="h-2 bg-slate-700"
              indicatorClassName="bg-gradient-to-r from-emerald-500 to-green-500"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
            <span className="text-xs text-slate-400">Last run: {autoAssignStats.lastRunTime}</span>
            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
              Active
            </Badge>
          </div>

          <div className="flex gap-2 pt-2">
            <Button size="sm" className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white">
              <Play className="h-4 w-4 mr-1" />
              Run Now
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-600"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Assignments */}
      <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-200">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Users className="h-5 w-5 text-purple-400" />
            </div>
            Recent Assignments
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentAssignments.map((assignment) => (
            <div key={assignment.id} className="bg-slate-700/30 rounded-lg p-3 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium text-slate-200">{assignment.route}</div>
                  <div className="text-xs text-slate-400">{assignment.id}</div>
                </div>
                <Badge
                  variant="outline"
                  className={
                    assignment.status === "assigned"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-orange-500/10 text-orange-400 border-orange-500/20"
                  }
                >
                  {assignment.status}
                </Badge>
              </div>

              {assignment.status === "assigned" ? (
                <div className="space-y-1">
                  <div className="text-sm text-slate-300">
                    <Truck className="h-3 w-3 inline mr-1" />
                    {assignment.driver}
                  </div>
                  <div className="text-sm text-slate-300">
                    <Users className="h-3 w-3 inline mr-1" />
                    {assignment.pa}
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-xs text-slate-400">
                      <Clock className="h-3 w-3 inline mr-1" />
                      {assignment.assignedAt}
                    </span>
                    <span className="text-xs text-emerald-400 font-medium">{assignment.confidence}% match</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-orange-400">
                  <AlertTriangle className="h-4 w-4" />
                  Awaiting assignment
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Assignment Rules */}
      <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-200">
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <Settings className="h-5 w-5 text-orange-400" />
            </div>
            Assignment Rules
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {assignmentRules.map((rule, index) => (
            <div key={index} className="bg-slate-700/30 rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-slate-200">{rule.name}</span>
                <Badge
                  variant="outline"
                  className={
                    rule.enabled
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-slate-500/10 text-slate-400 border-slate-500/20"
                  }
                >
                  {rule.enabled ? "ON" : "OFF"}
                </Badge>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Weight</span>
                  <span className="text-slate-300">{rule.weight}%</span>
                </div>
                <Progress
                  value={rule.weight}
                  className="h-1 bg-slate-600"
                  indicatorClassName="bg-gradient-to-r from-orange-500 to-red-500"
                />
              </div>
            </div>
          ))}

          <div className="pt-2 border-t border-slate-700/50">
            <Button
              size="sm"
              variant="outline"
              className="w-full bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-600"
            >
              <Settings className="h-4 w-4 mr-2" />
              Configure Rules
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

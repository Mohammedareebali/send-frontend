"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Truck, Users, Clock, AlertTriangle, CheckCircle } from "lucide-react"

export function DashboardOverview() {
  // Mock data - in real implementation, this would come from APIs
  const stats = {
    activeRuns: { current: 12, total: 15, percentage: 80 },
    onTimePerformance: { current: 87, target: 90 },
    staffAvailable: { available: 14, total: 17 },
    criticalIssues: { count: 2, resolved: 8 },
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Active Runs */}
      <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-300">Active Routes</CardTitle>
          <Truck className="h-4 w-4 text-blue-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{stats.activeRuns.current}</div>
          <p className="text-xs text-slate-400">of {stats.activeRuns.total} scheduled</p>
          <Progress
            value={stats.activeRuns.percentage}
            className="h-2 mt-2 bg-slate-700"
            indicatorClassName="bg-blue-500"
          />
        </CardContent>
      </Card>

      {/* On-Time Performance */}
      <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-300">On-Time Rate</CardTitle>
          <Clock className="h-4 w-4 text-emerald-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{stats.onTimePerformance.current}%</div>
          <p className="text-xs text-slate-400">Target: {stats.onTimePerformance.target}%</p>
          <Progress
            value={stats.onTimePerformance.current}
            className="h-2 mt-2 bg-slate-700"
            indicatorClassName={
              stats.onTimePerformance.current >= stats.onTimePerformance.target ? "bg-emerald-500" : "bg-yellow-500"
            }
          />
        </CardContent>
      </Card>

      {/* Staff Status */}
      <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-300">Staff Available</CardTitle>
          <Users className="h-4 w-4 text-purple-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{stats.staffAvailable.available}</div>
          <p className="text-xs text-slate-400">of {stats.staffAvailable.total} total</p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className="text-xs bg-purple-500/10 text-purple-400 border-purple-500/20">
              Ready
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Issues Status */}
      <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-300">Issues Today</CardTitle>
          {stats.criticalIssues.count > 0 ? (
            <AlertTriangle className="h-4 w-4 text-yellow-400" />
          ) : (
            <CheckCircle className="h-4 w-4 text-emerald-400" />
          )}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{stats.criticalIssues.count}</div>
          <p className="text-xs text-slate-400">{stats.criticalIssues.resolved} resolved today</p>
          <div className="flex items-center gap-2 mt-2">
            <Badge
              variant="outline"
              className={`text-xs ${
                stats.criticalIssues.count === 0
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
              }`}
            >
              {stats.criticalIssues.count === 0 ? "All Clear" : "Active"}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

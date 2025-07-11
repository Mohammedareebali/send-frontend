"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Clock, Users, Shield, AlertTriangle, CheckCircle, Activity } from "lucide-react"

export function PerformanceMetrics() {
  const metrics = {
    onTimePerformance: { value: 94, target: 95, trend: "up" },
    studentSafety: { value: 100, incidents: 0, trend: "stable" },
    staffUtilization: { value: 87, available: 23, total: 26, trend: "up" },
    parentSatisfaction: { value: 4.8, outOf: 5, responses: 156, trend: "up" },
    complianceRate: { value: 98, expiring: 3, total: 156, trend: "stable" },
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-emerald-400" />
      case "down":
        return <TrendingUp className="h-4 w-4 text-red-400 rotate-180" />
      default:
        return <Activity className="h-4 w-4 text-slate-400" />
    }
  }

  return (
    <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 bg-emerald-600/20 rounded-lg">
            <TrendingUp className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Performance Metrics</h3>
            <p className="text-sm text-slate-400">Real-time KPIs</p>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* On-Time Performance */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-400" />
              <span className="text-slate-300 font-medium">On-Time Performance</span>
              {getTrendIcon(metrics.onTimePerformance.trend)}
            </div>
            <div className="text-right">
              <div className="text-white font-semibold">{metrics.onTimePerformance.value}%</div>
              <div className="text-xs text-slate-400">Target: {metrics.onTimePerformance.target}%</div>
            </div>
          </div>
          <Progress
            value={metrics.onTimePerformance.value}
            className="h-2"
            indicatorClassName={
              metrics.onTimePerformance.value >= metrics.onTimePerformance.target ? "bg-emerald-500" : "bg-yellow-500"
            }
          />
        </div>

        {/* Student Safety */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-400" />
              <span className="text-slate-300 font-medium">Student Safety</span>
              {getTrendIcon(metrics.studentSafety.trend)}
            </div>
            <div className="text-right">
              <div className="text-emerald-400 font-semibold">{metrics.studentSafety.value}%</div>
              <div className="text-xs text-slate-400">{metrics.studentSafety.incidents} incidents</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-emerald-400" />
            <span className="text-emerald-300 text-sm">All safety protocols active</span>
          </div>
        </div>

        {/* Staff Utilization */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-purple-400" />
              <span className="text-slate-300 font-medium">Staff Utilization</span>
              {getTrendIcon(metrics.staffUtilization.trend)}
            </div>
            <div className="text-right">
              <div className="text-white font-semibold">{metrics.staffUtilization.value}%</div>
              <div className="text-xs text-slate-400">
                {metrics.staffUtilization.available}/{metrics.staffUtilization.total} available
              </div>
            </div>
          </div>
          <Progress value={metrics.staffUtilization.value} className="h-2" />
        </div>

        {/* Parent Satisfaction */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-yellow-400" />
              <span className="text-slate-300 font-medium">Parent Satisfaction</span>
              {getTrendIcon(metrics.parentSatisfaction.trend)}
            </div>
            <div className="text-right">
              <div className="text-white font-semibold">
                {metrics.parentSatisfaction.value}/{metrics.parentSatisfaction.outOf}
              </div>
              <div className="text-xs text-slate-400">{metrics.parentSatisfaction.responses} responses</div>
            </div>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <div
                key={star}
                className={`w-4 h-4 rounded-sm ${
                  star <= Math.floor(metrics.parentSatisfaction.value) ? "bg-yellow-400" : "bg-slate-600"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Compliance Rate */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-blue-400" />
              <span className="text-slate-300 font-medium">Compliance Rate</span>
              {getTrendIcon(metrics.complianceRate.trend)}
            </div>
            <div className="text-right">
              <div className="text-white font-semibold">{metrics.complianceRate.value}%</div>
              <div className="text-xs text-slate-400">{metrics.complianceRate.expiring} expiring soon</div>
            </div>
          </div>
          <Progress value={metrics.complianceRate.value} className="h-2" />
          {metrics.complianceRate.expiring > 0 && (
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-400" />
              <span className="text-yellow-300 text-sm">{metrics.complianceRate.expiring} documents need renewal</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

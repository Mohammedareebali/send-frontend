"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Clock, Users, Shield, AlertTriangle, CheckCircle, Activity, Star, Target } from "lucide-react"

export function PerformanceOverview() {
  const metrics = {
    onTimePerformance: {
      value: 94,
      target: 95,
      trend: "up",
      change: "+2%",
    },
    studentSafety: {
      value: 100,
      daysWithoutIncident: 45,
    },
    staffUtilization: {
      value: 87,
      available: 23,
      total: 26,
    },
    parentSatisfaction: {
      value: 4.8,
      outOf: 5,
      responses: 156,
    },
    complianceRate: {
      value: 98,
      expiring: 3,
    },
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

  const getProgressColor = (value: number, target?: number) => {
    if (target) {
      return value >= target ? "bg-emerald-500" : value >= target * 0.9 ? "bg-yellow-500" : "bg-red-500"
    }
    return value >= 95 ? "bg-emerald-500" : value >= 85 ? "bg-yellow-500" : "bg-red-500"
  }

  return (
    <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 bg-emerald-600/20 rounded-lg">
            <TrendingUp className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Performance</h3>
            <p className="text-sm text-slate-400">Key metrics and KPIs</p>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* On-Time Performance */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-400" />
              <span className="text-slate-300 font-medium">On-Time Rate</span>
            </div>
            <div className="text-right">
              <div className="font-semibold text-white">{metrics.onTimePerformance.value}%</div>
              <div className="text-xs text-slate-400">Target: {metrics.onTimePerformance.target}%</div>
            </div>
          </div>
          <Progress
            value={metrics.onTimePerformance.value}
            className="h-2"
            indicatorClassName={getProgressColor(metrics.onTimePerformance.value, metrics.onTimePerformance.target)}
          />
        </div>

        {/* Student Safety */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-400" />
              <span className="text-slate-300 font-medium">Safety Record</span>
            </div>
            <div className="text-right">
              <div className="font-semibold text-emerald-400">{metrics.studentSafety.value}%</div>
              <div className="text-xs text-slate-400">
                {metrics.studentSafety.daysWithoutIncident} days incident-free
              </div>
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
            </div>
            <div className="text-right">
              <div className="font-semibold text-white">{metrics.staffUtilization.value}%</div>
              <div className="text-xs text-slate-400">
                {metrics.staffUtilization.available}/{metrics.staffUtilization.total} available
              </div>
            </div>
          </div>
          <Progress
            value={metrics.staffUtilization.value}
            className="h-2"
            indicatorClassName={getProgressColor(metrics.staffUtilization.value)}
          />
        </div>

        {/* Parent Satisfaction */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-400" />
              <span className="text-slate-300 font-medium">Parent Rating</span>
            </div>
            <div className="text-right">
              <div className="font-semibold text-white">
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
              <Target className="h-4 w-4 text-blue-400" />
              <span className="text-slate-300 font-medium">Compliance</span>
            </div>
            <div className="text-right">
              <div className="font-semibold text-white">{metrics.complianceRate.value}%</div>
              <div className="text-xs text-slate-400">{metrics.complianceRate.expiring} expiring soon</div>
            </div>
          </div>
          <Progress
            value={metrics.complianceRate.value}
            className="h-2"
            indicatorClassName={getProgressColor(metrics.complianceRate.value)}
          />
          {metrics.complianceRate.expiring > 0 && (
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-400" />
              <span className="text-yellow-300 text-sm">{metrics.complianceRate.expiring} documents need renewal</span>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-800/20 border border-slate-700/30 rounded-lg p-4">
          <h4 className="font-medium text-slate-200 mb-3">Quick Actions</h4>
          <div className="space-y-2">
            <button className="w-full text-left p-2 rounded bg-slate-700/30 hover:bg-slate-700/50 transition-colors">
              <div className="text-sm text-slate-300">View Detailed Reports</div>
            </button>
            <button className="w-full text-left p-2 rounded bg-slate-700/30 hover:bg-slate-700/50 transition-colors">
              <div className="text-sm text-slate-300">Export Performance Data</div>
            </button>
            <button className="w-full text-left p-2 rounded bg-slate-700/30 hover:bg-slate-700/50 transition-colors">
              <div className="text-sm text-slate-300">Schedule Review Meeting</div>
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

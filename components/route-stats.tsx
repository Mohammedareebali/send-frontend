import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Truck, CheckCircle, Calendar, AlertTriangle } from "lucide-react"

export function RouteStats() {
  // Sample data for route statistics
  const stats = {
    activeRoutes: {
      count: 32,
      total: 50,
      percentage: 64,
      trend: "+5% from yesterday",
      onTime: 28,
      delayed: 4,
    },
    completedToday: {
      count: 18,
      total: 50,
      percentage: 36,
      trend: "+12% from yesterday",
      onTime: 16,
      delayed: 2,
    },
    scheduledTomorrow: {
      count: 45,
      total: 45,
      percentage: 100,
      trend: "Same as yesterday",
      assigned: 42,
      unassigned: 3,
    },
    issuesReported: {
      count: 3,
      total: 50,
      percentage: 6,
      trend: "-2% from yesterday",
      high: 1,
      medium: 1,
      low: 1,
    },
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 border-l-4 border-l-yellow-500 hover:bg-slate-800/70 transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center text-slate-300">
            <Truck className="h-5 w-5 mr-2 text-yellow-500" />
            Active Routes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-baseline">
            <div className="text-3xl font-bold text-slate-100">{stats.activeRoutes.count}</div>
            <div className="text-xs text-emerald-400 font-medium">{stats.activeRoutes.trend}</div>
          </div>
          <Progress value={stats.activeRoutes.percentage} className="h-2" />
          <div className="flex justify-between text-xs text-slate-400">
            <div>
              On Time: <span className="text-emerald-400 font-medium">{stats.activeRoutes.onTime}</span>
            </div>
            <div>
              Delayed: <span className="text-red-400 font-medium">{stats.activeRoutes.delayed}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 border-l-4 border-l-emerald-500 hover:bg-slate-800/70 transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center text-slate-300">
            <CheckCircle className="h-5 w-5 mr-2 text-emerald-500" />
            Completed Today
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-baseline">
            <div className="text-3xl font-bold text-slate-100">{stats.completedToday.count}</div>
            <div className="text-xs text-emerald-400 font-medium">{stats.completedToday.trend}</div>
          </div>
          <Progress value={stats.completedToday.percentage} className="h-2" />
          <div className="flex justify-between text-xs text-slate-400">
            <div>
              On Time: <span className="text-emerald-400 font-medium">{stats.completedToday.onTime}</span>
            </div>
            <div>
              Delayed: <span className="text-red-400 font-medium">{stats.completedToday.delayed}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 border-l-4 border-l-blue-500 hover:bg-slate-800/70 transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center text-slate-300">
            <Calendar className="h-5 w-5 mr-2 text-blue-500" />
            Scheduled Tomorrow
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-baseline">
            <div className="text-3xl font-bold text-slate-100">{stats.scheduledTomorrow.count}</div>
            <div className="text-xs text-slate-400 font-medium">{stats.scheduledTomorrow.trend}</div>
          </div>
          <Progress value={stats.scheduledTomorrow.percentage} className="h-2" />
          <div className="flex justify-between text-xs text-slate-400">
            <div>
              Assigned: <span className="text-emerald-400 font-medium">{stats.scheduledTomorrow.assigned}</span>
            </div>
            <div>
              Unassigned: <span className="text-yellow-400 font-medium">{stats.scheduledTomorrow.unassigned}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 border-l-4 border-l-red-500 hover:bg-slate-800/70 transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center text-slate-300">
            <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
            Issues Reported
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-baseline">
            <div className="text-3xl font-bold text-slate-100">{stats.issuesReported.count}</div>
            <div className="text-xs text-emerald-400 font-medium">{stats.issuesReported.trend}</div>
          </div>
          <Progress value={stats.issuesReported.percentage} className="h-2" />
          <div className="flex justify-between text-xs text-slate-400">
            <div>
              High: <span className="text-red-400 font-medium">{stats.issuesReported.high}</span>
            </div>
            <div>
              Medium: <span className="text-yellow-400 font-medium">{stats.issuesReported.medium}</span>
            </div>
            <div>
              Low: <span className="text-slate-400 font-medium">{stats.issuesReported.low}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

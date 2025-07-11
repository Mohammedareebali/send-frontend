import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BarChart3, Truck, CheckCircle, Clock } from "lucide-react"

export function RoutesOverview() {
  const totalRoutes = 50
  const completedRoutes = 32
  const inProgressRoutes = 12
  const scheduledRoutes = 6
  const progressPercentage = (completedRoutes / totalRoutes) * 100

  return (
    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader className="pb-3 border-b border-slate-700/50">
        <CardTitle className="text-sm font-medium text-slate-200 flex items-center">
          <BarChart3 className="mr-2 h-4 w-4 text-emerald-400 flex-shrink-0" />
          <span>Routes Overview</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-slate-700/30 p-3 rounded-lg border border-slate-600/30">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-emerald-500/20 rounded-full">
                <CheckCircle className="h-3 w-3 text-emerald-400" />
              </div>
              <span className="text-xs font-medium text-slate-300">Completed</span>
            </div>
            <div className="text-xl font-bold text-slate-100">{completedRoutes}</div>
            <div className="text-xs text-slate-400">{Math.round((completedRoutes / totalRoutes) * 100)}% of total</div>
          </div>

          <div className="bg-slate-700/30 p-3 rounded-lg border border-slate-600/30">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-yellow-500/20 rounded-full">
                <Truck className="h-3 w-3 text-yellow-400" />
              </div>
              <span className="text-xs font-medium text-slate-300">In Progress</span>
            </div>
            <div className="text-xl font-bold text-slate-100">{inProgressRoutes}</div>
            <div className="text-xs text-slate-400">{Math.round((inProgressRoutes / totalRoutes) * 100)}% of total</div>
          </div>
        </div>

        <div className="mb-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-slate-300">Overall Progress</span>
            <span className="text-xs font-medium text-slate-200">{Math.round(progressPercentage)}%</span>
          </div>
          <Progress
            value={progressPercentage}
            className="h-2 bg-slate-700/50"
            indicatorClassName="bg-gradient-to-r from-emerald-500 to-emerald-600"
          />
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-700/50">
          <div className="flex items-center">
            <Clock className="mr-1 h-3 w-3 text-purple-400 flex-shrink-0" />
            <span>Scheduled: {scheduledRoutes}</span>
          </div>
          <div>Total: {totalRoutes}</div>
        </div>
      </CardContent>
    </Card>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, CheckCircle, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function PendingTasks() {
  const totalTasks = 20
  const completedTasks = 8
  const progressPercentage = (completedTasks / totalTasks) * 100

  const tasks = [
    { id: 1, title: "Update driver documentation", priority: "High", due: "Today" },
    { id: 2, title: "Assign PA to Route R015", priority: "Medium", due: "Tomorrow" },
    { id: 3, title: "Review route optimization", priority: "Low", due: "Next Week" },
  ]

  return (
    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader className="pb-3 border-b border-slate-700/50">
        <CardTitle className="text-sm font-medium text-slate-200 flex items-center">
          <AlertCircle className="mr-2 h-4 w-4 text-yellow-400 flex-shrink-0" />
          <span>Pending Tasks</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex items-end justify-between mb-3">
          <div>
            <div className="text-2xl font-bold text-slate-100">{totalTasks - completedTasks}</div>
            <p className="text-xs text-slate-400">
              {completedTasks} of {totalTasks} completed
            </p>
          </div>
          <div className="text-sm font-medium text-yellow-400">{Math.round(progressPercentage)}%</div>
        </div>
        <Progress
          value={progressPercentage}
          className="h-2 mt-2 mb-4 bg-slate-700/50"
          indicatorClassName="bg-gradient-to-r from-yellow-500 to-yellow-600"
        />

        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-start justify-between p-3 bg-slate-700/30 rounded-lg text-sm border border-slate-600/30 hover:bg-slate-700/40 transition-colors"
            >
              <div className="flex items-start gap-2 flex-1 min-w-0">
                <CheckCircle className="h-4 w-4 text-slate-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-200 truncate">{task.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      className={`text-[10px] px-2 py-0.5 h-5 ${
                        task.priority === "High"
                          ? "bg-red-500/20 text-red-300 border-red-500/30"
                          : task.priority === "Medium"
                            ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                            : "bg-slate-600/50 text-slate-300 border-slate-500/30"
                      }`}
                    >
                      {task.priority}
                    </Badge>
                    <span className="flex items-center text-xs text-slate-400">
                      <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
                      <span className="truncate">Due {task.due}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

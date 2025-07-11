import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Route } from 'lucide-react'

export function CompletedRoutes() {
  const totalRoutes = 50
  const completedRoutes = 32
  const progressPercentage = (completedRoutes / totalRoutes) * 100

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Completed Routes Today</CardTitle>
        <Route className="h-4 w-4 text-blue-600" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{completedRoutes}</div>
        <p className="text-xs text-muted-foreground">
          out of {totalRoutes} total routes
        </p>
        <Progress value={progressPercentage} className="mt-4" />
      </CardContent>
    </Card>
  )
}

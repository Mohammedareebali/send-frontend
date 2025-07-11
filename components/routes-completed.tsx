import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from 'lucide-react'

export function RoutesCompleted() {
  const completedRoutes = 32
  const totalRoutes = 50

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Routes Completed</CardTitle>
        <CheckCircle2 className="h-4 w-4 text-green-600" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{completedRoutes}</div>
        <p className="text-xs text-muted-foreground">
          out of {totalRoutes} total routes
        </p>
        <div className="mt-4 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-green-600 rounded-full" 
            style={{ width: `${(completedRoutes / totalRoutes) * 100}%` }}
          />
        </div>
      </CardContent>
    </Card>
  )
}

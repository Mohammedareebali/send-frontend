"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
  Users,
  Car,
  TrendingUp,
  TrendingDown,
  Clock,
  Star,
  DollarSign,
  AlertTriangle,
  Search,
  Download,
  Filter,
  Target,
  Activity,
  BarChart3,
} from "lucide-react"
import { getPerformanceMetrics, getPerformanceTrends } from "@/lib/api/performance"

interface PerformanceMetrics {
  driverMetrics: any[]
  paMetrics: any[]
  routeMetrics: any
  systemMetrics: any
}

export default function PerformancePage() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)
  const [trends, setTrends] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState<"week" | "month" | "quarter">("week")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("performance")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [metricsData, trendsData] = await Promise.all([
          getPerformanceMetrics(),
          getPerformanceTrends(selectedPeriod),
        ])
        setMetrics(metricsData)
        setTrends(trendsData)
      } catch (error) {
        console.error("Failed to fetch performance data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [selectedPeriod])

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 90) return "text-emerald-400"
    if (percentage >= 80) return "text-yellow-400"
    return "text-red-400"
  }

  const getPerformanceBadge = (percentage: number) => {
    if (percentage >= 90) return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
    if (percentage >= 80) return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
    return "bg-red-500/20 text-red-400 border-red-500/30"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="container mx-auto space-y-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-slate-700 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-slate-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!metrics) return null

  const filteredDrivers = metrics.driverMetrics
    .filter((driver) => driver.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      switch (sortBy) {
        case "performance":
          return b.onTimePercentage - a.onTimePercentage
        case "rating":
          return b.averageRating - a.averageRating
        case "earnings":
          return b.earnings - a.earnings
        default:
          return 0
      }
    })

  const filteredPAs = metrics.paMetrics.filter((pa) => pa.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="container mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
              Performance Metrics
            </h1>
            <p className="text-slate-400 mt-1">Monitor staff performance and system efficiency</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedPeriod} onValueChange={(value: any) => setSelectedPeriod(value)}>
              <SelectTrigger className="w-32 bg-slate-800/50 border-slate-700 text-slate-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              className="bg-slate-800/50 border-slate-700 text-slate-200 hover:bg-slate-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* System Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">Total Revenue</p>
                  <p className="text-2xl font-bold text-slate-100">
                    £{metrics.systemMetrics.totalRevenue.toLocaleString()}
                  </p>
                  <p className="text-emerald-400 text-sm flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12.5% vs last period
                  </p>
                </div>
                <div className="p-3 bg-emerald-500/20 rounded-lg">
                  <DollarSign className="h-6 w-6 text-emerald-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">Profit Margin</p>
                  <p className="text-2xl font-bold text-slate-100">{metrics.systemMetrics.profitMargin}%</p>
                  <p className="text-emerald-400 text-sm flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +2.1% vs last period
                  </p>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Target className="h-6 w-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">On-Time Performance</p>
                  <p className="text-2xl font-bold text-slate-100">{metrics.routeMetrics.onTimePercentage}%</p>
                  <p className="text-yellow-400 text-sm flex items-center mt-1">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    -1.2% vs last period
                  </p>
                </div>
                <div className="p-3 bg-yellow-500/20 rounded-lg">
                  <Clock className="h-6 w-6 text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">Staff Utilization</p>
                  <p className="text-2xl font-bold text-slate-100">{metrics.systemMetrics.staffUtilization}%</p>
                  <p className="text-emerald-400 text-sm flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +5.3% vs last period
                  </p>
                </div>
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <Activity className="h-6 w-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Tabs */}
        <Tabs defaultValue="drivers" className="space-y-6">
          <TabsList className="bg-slate-800/50 border-slate-700">
            <TabsTrigger
              value="drivers"
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-slate-100"
            >
              <Users className="h-4 w-4 mr-2" />
              Drivers ({metrics.driverMetrics.length})
            </TabsTrigger>
            <TabsTrigger value="pas" className="data-[state=active]:bg-slate-700 data-[state=active]:text-slate-100">
              <Users className="h-4 w-4 mr-2" />
              Passenger Assistants ({metrics.paMetrics.length})
            </TabsTrigger>
            <TabsTrigger value="routes" className="data-[state=active]:bg-slate-700 data-[state=active]:text-slate-100">
              <Car className="h-4 w-4 mr-2" />
              Routes
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-slate-100"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="drivers" className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search drivers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-800/50 border-slate-700 text-slate-200 placeholder:text-slate-400"
                />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 bg-slate-800/50 border-slate-700 text-slate-200">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="performance">Sort by Performance</SelectItem>
                  <SelectItem value="rating">Sort by Rating</SelectItem>
                  <SelectItem value="earnings">Sort by Earnings</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Driver Performance Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredDrivers.map((driver) => (
                <Card
                  key={driver.id}
                  className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50 hover:bg-slate-800/50 transition-all duration-300"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-slate-100 text-lg">{driver.name}</CardTitle>
                      <Badge className={getPerformanceBadge(driver.onTimePercentage)}>
                        {driver.onTimePercentage}% On-Time
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-slate-400 text-sm">Total Runs</p>
                        <p className="text-slate-200 font-semibold">{driver.totalRuns}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm">Completed</p>
                        <p className="text-emerald-400 font-semibold">{driver.completedRuns}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm">Rating</p>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-slate-200 font-semibold">{driver.averageRating}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm">Earnings</p>
                        <p className="text-slate-200 font-semibold">£{driver.earnings.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">On-Time Performance</span>
                        <span className={getPerformanceColor(driver.onTimePercentage)}>{driver.onTimePercentage}%</span>
                      </div>
                      <Progress value={driver.onTimePercentage} className="h-2 bg-slate-700" />
                    </div>

                    {driver.incidents > 0 && (
                      <div className="flex items-center gap-2 p-2 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <AlertTriangle className="h-4 w-4 text-red-400" />
                        <span className="text-red-400 text-sm">{driver.incidents} incident(s) reported</span>
                      </div>
                    )}

                    <div className="text-xs text-slate-500">
                      Last active: {new Date(driver.lastActive).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pas" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredPAs.map((pa) => (
                <Card
                  key={pa.id}
                  className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50 hover:bg-slate-800/50 transition-all duration-300"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-slate-100 text-lg">{pa.name}</CardTitle>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-slate-200 font-semibold">{pa.averageRating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-slate-400 text-sm">Total Runs</p>
                        <p className="text-slate-200 font-semibold">{pa.totalRuns}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm">Completed</p>
                        <p className="text-emerald-400 font-semibold">{pa.completedRuns}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm">Hours</p>
                        <p className="text-slate-200 font-semibold">{pa.totalHours}h</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm">Earnings</p>
                        <p className="text-slate-200 font-semibold">£{pa.earnings.toLocaleString()}</p>
                      </div>
                    </div>

                    {pa.incidents > 0 && (
                      <div className="flex items-center gap-2 p-2 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <AlertTriangle className="h-4 w-4 text-red-400" />
                        <span className="text-red-400 text-sm">{pa.incidents} incident(s) reported</span>
                      </div>
                    )}

                    <div className="text-xs text-slate-500">
                      Last active: {new Date(pa.lastActive).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="routes" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-slate-100 text-lg">Route Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Total Routes</span>
                      <span className="text-slate-200 font-semibold">{metrics.routeMetrics.totalRoutes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Active Today</span>
                      <span className="text-emerald-400 font-semibold">{metrics.routeMetrics.activeRoutes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Completed Today</span>
                      <span className="text-slate-200 font-semibold">{metrics.routeMetrics.completedToday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Cancelled Today</span>
                      <span className="text-red-400 font-semibold">{metrics.routeMetrics.cancelledToday}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-slate-100 text-lg">Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-400">On-Time Performance</span>
                        <span className={getPerformanceColor(metrics.routeMetrics.onTimePercentage)}>
                          {metrics.routeMetrics.onTimePercentage}%
                        </span>
                      </div>
                      <Progress value={metrics.routeMetrics.onTimePercentage} className="h-2 bg-slate-700" />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Average Delay</span>
                      <span className="text-yellow-400 font-semibold">{metrics.routeMetrics.averageDelay} min</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Total Distance</span>
                      <span className="text-slate-200 font-semibold">{metrics.routeMetrics.totalDistance} miles</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-slate-100 text-lg">Cost Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Fuel Costs</span>
                      <span className="text-slate-200 font-semibold">
                        £{metrics.routeMetrics.fuelCosts.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Cost per Mile</span>
                      <span className="text-slate-200 font-semibold">
                        £{(metrics.routeMetrics.fuelCosts / metrics.routeMetrics.totalDistance).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Vehicle Utilization</span>
                      <span className="text-emerald-400 font-semibold">
                        {metrics.systemMetrics.vehicleUtilization}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-slate-100 text-lg">Performance Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-8 text-slate-400">
                      <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Performance trend charts would be displayed here</p>
                      <p className="text-sm mt-2">Integration with charting library required</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-slate-100 text-lg">Revenue Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-8 text-slate-400">
                      <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Revenue analysis charts would be displayed here</p>
                      <p className="text-sm mt-2">Integration with charting library required</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

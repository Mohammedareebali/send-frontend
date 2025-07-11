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
  TrendingUp,
  TrendingDown,
  Clock,
  Users,
  Car,
  Star,
  DollarSign,
  AlertTriangle,
  Search,
  Download,
  Filter,
  Target,
  Activity,
  BarChart3,
  Calendar,
  MapPin,
  Fuel,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Minus,
} from "lucide-react"

interface AnalyticsData {
  overview: {
    totalRoutes: number
    completedRuns: number
    onTimePercentage: number
    totalRevenue: number
    avgRating: number
    incidentCount: number
  }
  trends: {
    onTimePerformance: Array<{ date: string; value: number }>
    revenue: Array<{ date: string; value: number }>
    satisfaction: Array<{ date: string; value: number }>
    incidents: Array<{ date: string; value: number }>
  }
  staffMetrics: {
    drivers: Array<{
      id: string
      name: string
      totalRuns: number
      onTimeRate: number
      rating: number
      incidents: number
    }>
    pas: Array<{
      id: string
      name: string
      totalRuns: number
      rating: number
      incidents: number
    }>
  }
  routeAnalytics: {
    busiest: Array<{ route: string; runs: number; onTime: number }>
    delays: Array<{ route: string; avgDelay: number; incidents: number }>
    efficiency: Array<{ route: string; distance: number; time: number; cost: number }>
  }
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState("30d")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockData: AnalyticsData = {
      overview: {
        totalRoutes: 156,
        completedRuns: 2847,
        onTimePerformance: 94.2,
        totalRevenue: 45600,
        avgRating: 4.7,
        incidentCount: 12,
      },
      trends: {
        onTimePerformance: [
          { date: "2024-01-01", value: 92.1 },
          { date: "2024-01-02", value: 94.3 },
          { date: "2024-01-03", value: 91.8 },
          { date: "2024-01-04", value: 95.2 },
          { date: "2024-01-05", value: 93.7 },
          { date: "2024-01-06", value: 96.1 },
          { date: "2024-01-07", value: 94.2 },
        ],
        revenue: [
          { date: "2024-01-01", value: 6200 },
          { date: "2024-01-02", value: 6800 },
          { date: "2024-01-03", value: 5900 },
          { date: "2024-01-04", value: 7100 },
          { date: "2024-01-05", value: 6500 },
          { date: "2024-01-06", value: 7300 },
          { date: "2024-01-07", value: 6900 },
        ],
        satisfaction: [
          { date: "2024-01-01", value: 4.5 },
          { date: "2024-01-02", value: 4.7 },
          { date: "2024-01-03", value: 4.6 },
          { date: "2024-01-04", value: 4.8 },
          { date: "2024-01-05", value: 4.7 },
          { date: "2024-01-06", value: 4.9 },
          { date: "2024-01-07", value: 4.7 },
        ],
        incidents: [
          { date: "2024-01-01", value: 2 },
          { date: "2024-01-02", value: 1 },
          { date: "2024-01-03", value: 3 },
          { date: "2024-01-04", value: 0 },
          { date: "2024-01-05", value: 2 },
          { date: "2024-01-06", value: 1 },
          { date: "2024-01-07", value: 3 },
        ],
      },
      staffMetrics: {
        drivers: [
          { id: "1", name: "John Smith", totalRuns: 145, onTimeRate: 96.2, rating: 4.8, incidents: 1 },
          { id: "2", name: "Sarah Johnson", totalRuns: 132, onTimeRate: 94.7, rating: 4.9, incidents: 0 },
          { id: "3", name: "Mike Wilson", totalRuns: 98, onTimeRate: 91.3, rating: 4.5, incidents: 2 },
          { id: "4", name: "Emma Davis", totalRuns: 156, onTimeRate: 97.1, rating: 4.7, incidents: 0 },
          { id: "5", name: "Tom Brown", totalRuns: 89, onTimeRate: 89.2, rating: 4.3, incidents: 3 },
        ],
        pas: [
          { id: "1", name: "Lisa Chen", totalRuns: 89, rating: 4.9, incidents: 0 },
          { id: "2", name: "Mark Taylor", totalRuns: 76, rating: 4.6, incidents: 1 },
          { id: "3", name: "Anna White", totalRuns: 102, rating: 4.8, incidents: 0 },
          { id: "4", name: "David Lee", totalRuns: 67, rating: 4.4, incidents: 2 },
        ],
      },
      routeAnalytics: {
        busiest: [
          { route: "Route A - City Center", runs: 45, onTime: 92.3 },
          { route: "Route B - North District", runs: 38, onTime: 95.1 },
          { route: "Route C - South Area", runs: 42, onTime: 89.7 },
          { route: "Route D - East Side", runs: 31, onTime: 96.8 },
        ],
        delays: [
          { route: "Route C - South Area", avgDelay: 8.5, incidents: 5 },
          { route: "Route A - City Center", avgDelay: 6.2, incidents: 3 },
          { route: "Route E - West End", avgDelay: 4.1, incidents: 2 },
          { route: "Route B - North District", avgDelay: 2.8, incidents: 1 },
        ],
        efficiency: [
          { route: "Route A", distance: 12.5, time: 45, cost: 28.5 },
          { route: "Route B", distance: 8.2, time: 32, cost: 19.8 },
          { route: "Route C", distance: 15.1, time: 52, cost: 34.2 },
          { route: "Route D", distance: 9.8, time: 38, cost: 23.4 },
        ],
      },
    }

    setTimeout(() => {
      setData(mockData)
      setLoading(false)
    }, 1000)
  }, [selectedPeriod])

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <ArrowUp className="h-4 w-4 text-emerald-400" />
    if (current < previous) return <ArrowDown className="h-4 w-4 text-red-400" />
    return <Minus className="h-4 w-4 text-slate-400" />
  }

  const getPerformanceColor = (value: number, threshold = 90) => {
    if (value >= threshold) return "text-emerald-400"
    if (value >= threshold * 0.8) return "text-yellow-400"
    return "text-red-400"
  }

  const getPerformanceBadge = (value: number, threshold = 90) => {
    if (value >= threshold) return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
    if (value >= threshold * 0.8) return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
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

  if (!data) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="container mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
              Performance Analytics
            </h1>
            <p className="text-slate-400 mt-1">Comprehensive insights and performance metrics</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32 bg-slate-800/50 border-slate-700 text-slate-200">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
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

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">Total Routes</p>
                  <p className="text-2xl font-bold text-slate-100">{data.overview.totalRoutes}</p>
                  <p className="text-emerald-400 text-sm flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +8 this month
                  </p>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <MapPin className="h-6 w-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">Completed Runs</p>
                  <p className="text-2xl font-bold text-slate-100">{data.overview.completedRuns.toLocaleString()}</p>
                  <p className="text-emerald-400 text-sm flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12.5% vs last period
                  </p>
                </div>
                <div className="p-3 bg-emerald-500/20 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-emerald-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">On-Time Performance</p>
                  <p className="text-2xl font-bold text-slate-100">{data.overview.onTimePerformance}%</p>
                  <p className="text-yellow-400 text-sm flex items-center mt-1">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    -1.2% vs target
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
                  <p className="text-slate-400 text-sm font-medium">Total Revenue</p>
                  <p className="text-2xl font-bold text-slate-100">£{data.overview.totalRevenue.toLocaleString()}</p>
                  <p className="text-emerald-400 text-sm flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +15.3% vs last period
                  </p>
                </div>
                <div className="p-3 bg-emerald-500/20 rounded-lg">
                  <DollarSign className="h-6 w-6 text-emerald-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="bg-slate-800/50 border-slate-700">
            <TabsTrigger
              value="performance"
              className="data-[state=active]:bg-slate-700 data-[state=active]:text-slate-100"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="staff" className="data-[state=active]:bg-slate-700 data-[state=active]:text-slate-100">
              <Users className="h-4 w-4 mr-2" />
              Staff Analytics
            </TabsTrigger>
            <TabsTrigger value="routes" className="data-[state=active]:bg-slate-700 data-[state=active]:text-slate-100">
              <Car className="h-4 w-4 mr-2" />
              Route Analytics
            </TabsTrigger>
            <TabsTrigger value="trends" className="data-[state=active]:bg-slate-700 data-[state=active]:text-slate-100">
              <BarChart3 className="h-4 w-4 mr-2" />
              Trends
            </TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Overview */}
              <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-slate-100 text-lg flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-400" />
                    Key Performance Indicators
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-400">On-Time Performance</span>
                        <span className={getPerformanceColor(data.overview.onTimePerformance, 95)}>
                          {data.overview.onTimePerformance}%
                        </span>
                      </div>
                      <Progress value={data.overview.onTimePerformance} className="h-2 bg-slate-700" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-400">Customer Satisfaction</span>
                        <span className="text-emerald-400">{data.overview.avgRating}/5.0</span>
                      </div>
                      <Progress value={(data.overview.avgRating / 5) * 100} className="h-2 bg-slate-700" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-400">Safety Record</span>
                        <span className="text-emerald-400">
                          {data.overview.incidentCount < 5 ? "Excellent" : "Good"}
                        </span>
                      </div>
                      <Progress
                        value={Math.max(0, 100 - data.overview.incidentCount * 5)}
                        className="h-2 bg-slate-700"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Monthly Comparison */}
              <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-slate-100 text-lg flex items-center gap-2">
                    <Activity className="h-5 w-5 text-purple-400" />
                    Monthly Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Completed Runs</span>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-200 font-semibold">2,847</span>
                        {getTrendIcon(2847, 2654)}
                        <span className="text-emerald-400 text-sm">+7.3%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Revenue</span>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-200 font-semibold">£45,600</span>
                        {getTrendIcon(45600, 39800)}
                        <span className="text-emerald-400 text-sm">+14.6%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Incidents</span>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-200 font-semibold">12</span>
                        {getTrendIcon(12, 18)}
                        <span className="text-emerald-400 text-sm">-33.3%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Customer Rating</span>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-200 font-semibold">4.7/5</span>
                        {getTrendIcon(4.7, 4.5)}
                        <span className="text-emerald-400 text-sm">+4.4%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Chart Placeholder */}
            <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-slate-100 text-lg">Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-12 text-slate-400">
                  <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg mb-2">Performance trend charts would be displayed here</p>
                  <p className="text-sm">Integration with charting library (Chart.js, Recharts, etc.) required</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="staff" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search staff members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-800/50 border-slate-700 text-slate-200 placeholder:text-slate-400"
                />
              </div>
              <Select>
                <SelectTrigger className="w-48 bg-slate-800/50 border-slate-700 text-slate-200">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="all">All Staff</SelectItem>
                  <SelectItem value="drivers">Drivers Only</SelectItem>
                  <SelectItem value="pas">Passenger Assistants</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Driver Performance */}
            <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-slate-100 text-lg flex items-center gap-2">
                  <Car className="h-5 w-5 text-blue-400" />
                  Driver Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.staffMetrics.drivers
                    .filter((driver) => driver.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((driver) => (
                      <div
                        key={driver.id}
                        className="flex items-center justify-between p-4 bg-slate-700/20 rounded-lg border border-slate-600/30"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-slate-300" />
                          </div>
                          <div>
                            <h4 className="font-medium text-slate-200">{driver.name}</h4>
                            <p className="text-sm text-slate-400">{driver.totalRuns} total runs</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <p className="text-sm text-slate-400">On-Time Rate</p>
                            <Badge className={getPerformanceBadge(driver.onTimeRate, 90)}>{driver.onTimeRate}%</Badge>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-slate-400">Rating</p>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-slate-200 font-medium">{driver.rating}</span>
                            </div>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-slate-400">Incidents</p>
                            <span
                              className={`font-medium ${
                                driver.incidents === 0 ? "text-emerald-400" : "text-yellow-400"
                              }`}
                            >
                              {driver.incidents}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* PA Performance */}
            <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-slate-100 text-lg flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-400" />
                  Passenger Assistant Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.staffMetrics.pas
                    .filter((pa) => pa.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((pa) => (
                      <div
                        key={pa.id}
                        className="flex items-center justify-between p-4 bg-slate-700/20 rounded-lg border border-slate-600/30"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-slate-300" />
                          </div>
                          <div>
                            <h4 className="font-medium text-slate-200">{pa.name}</h4>
                            <p className="text-sm text-slate-400">{pa.totalRuns} total runs</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <p className="text-sm text-slate-400">Rating</p>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-slate-200 font-medium">{pa.rating}</span>
                            </div>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-slate-400">Incidents</p>
                            <span
                              className={`font-medium ${pa.incidents === 0 ? "text-emerald-400" : "text-yellow-400"}`}
                            >
                              {pa.incidents}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="routes" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Busiest Routes */}
              <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-slate-100 text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-emerald-400" />
                    Busiest Routes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.routeAnalytics.busiest.map((route, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-slate-200">{route.route}</h4>
                          <p className="text-sm text-slate-400">{route.runs} runs</p>
                        </div>
                        <Badge className={getPerformanceBadge(route.onTime, 90)}>{route.onTime}% on-time</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Routes with Delays */}
              <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-slate-100 text-lg flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-400" />
                    Routes with Delays
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.routeAnalytics.delays.map((route, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-slate-200">{route.route}</h4>
                          <p className="text-sm text-slate-400">{route.incidents} incidents</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-yellow-400">{route.avgDelay} min</p>
                          <p className="text-xs text-slate-400">avg delay</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Route Efficiency */}
            <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-slate-100 text-lg flex items-center gap-2">
                  <Fuel className="h-5 w-5 text-blue-400" />
                  Route Efficiency Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left py-3 px-4 text-slate-300 font-medium">Route</th>
                        <th className="text-left py-3 px-4 text-slate-300 font-medium">Distance</th>
                        <th className="text-left py-3 px-4 text-slate-300 font-medium">Avg Time</th>
                        <th className="text-left py-3 px-4 text-slate-300 font-medium">Cost per Run</th>
                        <th className="text-left py-3 px-4 text-slate-300 font-medium">Efficiency</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.routeAnalytics.efficiency.map((route, index) => (
                        <tr key={index} className="border-b border-slate-700/50">
                          <td className="py-3 px-4 text-slate-200">{route.route}</td>
                          <td className="py-3 px-4 text-slate-400">{route.distance} miles</td>
                          <td className="py-3 px-4 text-slate-400">{route.time} min</td>
                          <td className="py-3 px-4 text-slate-400">£{route.cost}</td>
                          <td className="py-3 px-4">
                            <Badge
                              className={
                                route.cost / route.distance < 2.5
                                  ? "bg-emerald-500/20 text-emerald-400"
                                  : "bg-yellow-500/20 text-yellow-400"
                              }
                            >
                              {route.cost / route.distance < 2.5 ? "Efficient" : "Review"}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            {/* Trend Charts Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-slate-100 text-lg">On-Time Performance Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-8 text-slate-400">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>On-time performance trend chart</p>
                    <p className="text-sm mt-2">Chart integration required</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-slate-100 text-lg">Revenue Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-8 text-slate-400">
                    <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Revenue trend chart</p>
                    <p className="text-sm mt-2">Chart integration required</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-slate-100 text-lg">Customer Satisfaction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-8 text-slate-400">
                    <Star className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Customer satisfaction trend</p>
                    <p className="text-sm mt-2">Chart integration required</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-slate-100 text-lg">Incident Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-8 text-slate-400">
                    <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Incident trend analysis</p>
                    <p className="text-sm mt-2">Chart integration required</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Summary Insights */}
            <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-slate-100 text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5 text-purple-400" />
                  Key Insights & Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-emerald-400" />
                      <h4 className="font-medium text-emerald-300">Positive Trend</h4>
                    </div>
                    <p className="text-slate-300 text-sm">
                      Overall performance has improved by 12% this month with reduced incident rates and higher customer
                      satisfaction.
                    </p>
                  </div>
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-400" />
                      <h4 className="font-medium text-yellow-300">Areas for Improvement</h4>
                    </div>
                    <p className="text-slate-300 text-sm">
                      Route C - South Area shows consistent delays. Consider route optimization or additional resources.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-5 w-5 text-blue-400" />
                      <h4 className="font-medium text-blue-300">Recommendation</h4>
                    </div>
                    <p className="text-slate-300 text-sm">
                      Focus on staff training for drivers with lower performance ratings to improve overall service
                      quality.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

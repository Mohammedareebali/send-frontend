"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Zap, Clock, Fuel, CheckCircle, RefreshCw, Settings, TrendingUp, Activity } from "lucide-react"

export function RouteOptimizationPanel() {
  const [optimizing, setOptimizing] = useState(false)

  const optimizationData = {
    totalRoutes: 15,
    optimizedRoutes: 12,
    potentialSavings: {
      time: "2.5 hrs",
      fuel: "£45",
      distance: "23 mi",
    },
    lastOptimized: "2 hours ago",
    optimizationScore: 87,
    efficiency: 92,
  }

  const handleOptimize = () => {
    setOptimizing(true)
    setTimeout(() => {
      setOptimizing(false)
    }, 3000)
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <Activity className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Route Intelligence</h3>
              <p className="text-sm text-slate-400">AI-powered optimization system</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
            Active
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <CheckCircle className="h-4 w-4 text-blue-400" />
              </div>
              <span className="text-xs text-slate-400">Routes</span>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">
                {optimizationData.optimizedRoutes}/{optimizationData.totalRoutes}
              </div>
              <Progress
                value={(optimizationData.optimizedRoutes / optimizationData.totalRoutes) * 100}
                className="h-2 bg-slate-600"
                indicatorClassName="bg-gradient-to-r from-blue-500 to-cyan-500"
              />
              <p className="text-xs text-slate-400">Optimized</p>
            </div>
          </div>

          <div className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <TrendingUp className="h-4 w-4 text-emerald-400" />
              </div>
              <span className="text-xs text-slate-400">Score</span>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">{optimizationData.optimizationScore}%</div>
              <Progress
                value={optimizationData.optimizationScore}
                className="h-2 bg-slate-600"
                indicatorClassName="bg-gradient-to-r from-emerald-500 to-green-500"
              />
              <p className="text-xs text-slate-400">Efficiency</p>
            </div>
          </div>

          <div className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Clock className="h-4 w-4 text-purple-400" />
              </div>
              <span className="text-xs text-slate-400">Updated</span>
            </div>
            <div className="space-y-2">
              <div className="text-lg font-bold text-white">{optimizationData.lastOptimized}</div>
              <p className="text-xs text-slate-400">Last optimization</p>
            </div>
          </div>
        </div>

        {/* Savings Breakdown */}
        <div className="bg-slate-700/20 border border-slate-600/30 rounded-lg p-4">
          <h4 className="font-medium text-slate-200 mb-4 flex items-center gap-2">
            <Fuel className="h-4 w-4 text-yellow-400" />
            Daily Optimization Impact
          </h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center space-y-1">
              <div className="text-xl font-bold text-yellow-400">{optimizationData.potentialSavings.time}</div>
              <div className="text-xs text-slate-400">Time Saved</div>
            </div>
            <div className="text-center space-y-1">
              <div className="text-xl font-bold text-emerald-400">{optimizationData.potentialSavings.fuel}</div>
              <div className="text-xs text-slate-400">Cost Reduction</div>
            </div>
            <div className="text-center space-y-1">
              <div className="text-xl font-bold text-blue-400">{optimizationData.potentialSavings.distance}</div>
              <div className="text-xs text-slate-400">Distance Saved</div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex gap-3">
          <Button
            onClick={handleOptimize}
            disabled={optimizing}
            className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-medium"
          >
            {optimizing ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Optimizing Routes...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                Optimize All Routes
              </>
            )}
          </Button>
          <Button
            variant="outline"
            className="bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
          >
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
        </div>

        {/* System Status */}
        <div className="bg-slate-700/20 border border-slate-600/30 rounded-lg p-4">
          <h4 className="font-medium text-slate-200 mb-3 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-emerald-400" />
            System Integration Status
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span className="text-sm text-slate-300">Route4Me API</span>
              </div>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-xs">
                Connected
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span className="text-sm text-slate-300">Google Maps API</span>
              </div>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-xs">
                Active
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span className="text-sm text-slate-300">ML Optimization Engine</span>
              </div>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-xs">
                Learning
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

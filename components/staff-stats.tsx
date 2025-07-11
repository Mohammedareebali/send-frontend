import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Users, UserCheck, AlertTriangle, FileCheck, TrendingUp, TrendingDown } from "lucide-react"

export function StaffStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StaffStatCard
        title="Total Staff"
        value="67"
        description="42 Drivers, 25 PAs"
        icon={<Users className="h-5 w-5 text-yellow-600" />}
        trend={<TrendingUp className="h-4 w-4 text-green-500" />}
        trendValue="+3"
        accentColor="yellow"
      />

      <StaffStatCard
        title="Active Staff"
        value="54"
        description="18 on duty now"
        icon={<UserCheck className="h-5 w-5 text-green-600" />}
        trend={<TrendingUp className="h-4 w-4 text-green-500" />}
        trendValue="+2"
        accentColor="green"
      />

      <StaffStatCard
        title="Compliance Rate"
        value="95%"
        description="3 need updates"
        icon={<FileCheck className="h-5 w-5 text-blue-600" />}
        trend={<TrendingDown className="h-4 w-4 text-red-500" />}
        trendValue="-2%"
        accentColor="blue"
      />

      <StaffStatCard
        title="Upcoming Renewals"
        value="8"
        description="Within 30 days"
        icon={<AlertTriangle className="h-5 w-5 text-orange-600" />}
        trend={<TrendingUp className="h-4 w-4 text-red-500" />}
        trendValue="+3"
        accentColor="orange"
      />
    </div>
  )
}

interface StaffStatCardProps {
  title: string
  value: string
  description: string
  icon: React.ReactNode
  trend: React.ReactNode
  trendValue: string
  accentColor: "yellow" | "green" | "blue" | "orange"
}

function StaffStatCard({ title, value, description, icon, trend, trendValue, accentColor }: StaffStatCardProps) {
  const borderColors = {
    yellow: "border-l-4 border-l-yellow-500",
    green: "border-l-4 border-l-green-500",
    blue: "border-l-4 border-l-blue-500",
    orange: "border-l-4 border-l-orange-500",
  }

  const bgColors = {
    yellow: "bg-yellow-50",
    green: "bg-green-50",
    blue: "bg-blue-50",
    orange: "bg-orange-50",
  }

  return (
    <Card className={`shadow-sm hover:shadow-md transition-shadow ${borderColors[accentColor]}`}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className={`p-2 rounded-full ${bgColors[accentColor]}`}>{icon}</div>
          <div className="flex items-center text-sm">
            {trend}
            <span className="ml-1">{trendValue}</span>
          </div>
        </div>
        <div className="mt-3">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className="flex items-baseline mt-1">
            <p className="text-2xl font-bold">{value}</p>
            <p className="ml-2 text-xs text-gray-500">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

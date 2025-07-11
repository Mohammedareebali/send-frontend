import { DashboardHeader } from "@/components/layout/dashboard-header"
import { EmergencyAlertSystem } from "@/components/dashboard/emergency-alert-system"
import { LiveOperationsCenter } from "@/components/dashboard/live-operations-center"
import { PerformanceOverview } from "@/components/dashboard/performance-overview"
import { DashboardOverview } from "@/components/dashboard-overview"

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <DashboardHeader />

      <main className="p-6 space-y-6">
        {/* Emergency Alert System - Highest Priority */}
        <EmergencyAlertSystem />

        {/* Key Metrics Overview */}
        <DashboardOverview />

        {/* Main Operations Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Live Operations - Takes 2 columns */}
          <div className="xl:col-span-2">
            <LiveOperationsCenter />
          </div>

          {/* Performance Metrics - Takes 1 column */}
          <div className="xl:col-span-1">
            <PerformanceOverview />
          </div>
        </div>
      </main>
    </div>
  )
}

import { DashboardHeader } from "@/components/layout/dashboard-header"
import { RoutesControlCenter } from "@/components/routes-control-center"

export default function RoutesPage() {
  return (
    <div className="min-h-screen">
      <DashboardHeader title="Routes Control Center" subtitle="Comprehensive route monitoring and emergency response" />

      <main className="p-6">
        <RoutesControlCenter />
      </main>
    </div>
  )
}

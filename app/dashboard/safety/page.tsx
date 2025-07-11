import { DashboardHeader } from "@/components/layout/dashboard-header"
import { SafetyControlCenter } from "@/components/safety/safety-control-center"

export default function SafetyPage() {
  return (
    <div className="min-h-screen">
      <DashboardHeader title="Safety Control Center" subtitle="Student welfare monitoring and incident management" />

      <main className="p-6">
        <SafetyControlCenter />
      </main>
    </div>
  )
}

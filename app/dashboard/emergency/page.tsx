import { DashboardHeader } from "@/components/layout/dashboard-header"
import { EmergencyResponseCenter } from "@/components/emergency/emergency-response-center"

export default function EmergencyPage() {
  return (
    <div className="min-h-screen">
      <DashboardHeader
        title="Emergency Response Center"
        subtitle="Critical incident management and emergency protocols"
      />

      <main className="p-6">
        <EmergencyResponseCenter />
      </main>
    </div>
  )
}

"use client"
import { DashboardHeader } from "@/components/layout/dashboard-header"
import { StaffManagementCenter } from "@/components/staff/staff-management-center"

export default function StaffPage() {
  return (
    <div className="min-h-screen">
      <DashboardHeader
        title="Staff Management Center"
        subtitle="Driver and PA assignment, availability, and compliance tracking"
      />

      <main className="p-6">
        <StaffManagementCenter />
      </main>
    </div>
  )
}

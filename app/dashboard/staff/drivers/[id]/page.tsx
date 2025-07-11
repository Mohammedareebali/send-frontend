"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Sidebar } from "@/components/sidebar"
import { BackButton } from "@/components/back-button"
import { StaffDetailHeader } from "@/components/staff-detail-header"
import { StaffDetailTabs } from "@/components/staff-detail-tabs"
import { StaffDetailSidebar } from "@/components/staff-detail-sidebar"
import { StaffDetailContent } from "@/components/staff-detail-content"
import { StaffDetailActions } from "@/components/staff-detail-actions"

export default function DriverDetailsPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex min-h-screen bg-gray-50">
    
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="container mx-auto px-6 py-6">
            <BackButton href="/dashboard/staff" label="Back to Staff List" />

            <StaffDetailHeader
              id={params.id}
              type="driver"
              name="John Doe"
              status="Active"
              since="2020-01-15"
              photo="/placeholder.svg?height=128&width=128"
            />

            <div className="flex flex-col lg:flex-row gap-6 mt-6">
              <div className="lg:w-3/4 order-2 lg:order-1">
                <StaffDetailTabs activeTab={activeTab} onChange={setActiveTab} type="driver" />
                <StaffDetailContent id={params.id} type="driver" activeTab={activeTab} />
              </div>

              <div className="lg:w-1/4 order-1 lg:order-2">
                <StaffDetailSidebar id={params.id} type="driver" />
                <StaffDetailActions id={params.id} type="driver" className="mt-4" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

import { Tabs, TabsContent } from "@/components/ui/tabs"
import { StaffDetailPersonal } from "@/components/staff-detail-personal"
import { StaffDetailDocuments } from "@/components/staff-detail-documents"
import { StaffDetailVehicle } from "@/components/staff-detail-vehicle"
import { StaffDetailSchedule } from "@/components/staff-detail-schedule"
import { StaffDetailPerformance } from "@/components/staff-detail-performance"
import { StaffDetailRoutes } from "@/components/staff-detail-routes"
import { StaffDetailHistory } from "@/components/staff-detail-history"
import { StaffDetailNotes } from "@/components/staff-detail-notes"
import { StaffDetailCompliance } from "@/components/staff-detail-compliance"
import { StaffActivityTimeline } from "@/components/staff-activity-timeline"

interface StaffDetailContentProps {
  id: string
  type: "driver" | "pa"
  activeTab: string
}

export function StaffDetailContent({ id, type, activeTab }: StaffDetailContentProps) {
  return (
    <Tabs value={activeTab} className="w-full">
      <TabsContent value="overview" className="mt-0">
        <div className="grid grid-cols-1 gap-6">
          <StaffDetailPersonal id={id} type={type} />
          <StaffActivityTimeline id={id} type={type} />
        </div>
      </TabsContent>

      <TabsContent value="documents" className="mt-0">
        <StaffDetailDocuments id={id} type={type} />
      </TabsContent>

      {type === "driver" && (
        <TabsContent value="vehicle" className="mt-0">
          <StaffDetailVehicle id={id} />
        </TabsContent>
      )}

      <TabsContent value="schedule" className="mt-0">
        <StaffDetailSchedule id={id} type={type} />
      </TabsContent>

      <TabsContent value="performance" className="mt-0">
        <StaffDetailPerformance id={id} type={type} />
      </TabsContent>

      <TabsContent value="routes" className="mt-0">
        <StaffDetailRoutes id={id} type={type} />
      </TabsContent>

      <TabsContent value="history" className="mt-0">
        <StaffDetailHistory id={id} type={type} />
      </TabsContent>

      <TabsContent value="notes" className="mt-0">
        <StaffDetailNotes id={id} type={type} />
      </TabsContent>

      <TabsContent value="compliance" className="mt-0">
        <StaffDetailCompliance id={id} type={type} />
      </TabsContent>
    </Tabs>
  )
}

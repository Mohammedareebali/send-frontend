import { DashboardHeader } from "@/components/layout/dashboard-header"
import { PassengerAssistantDetails } from "@/components/passenger-assistant-details"

export default function PassengerAssistantDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex h-screen bg-gray-100">
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Passenger Assistant Details</h1>
            <PassengerAssistantDetails paId={params.id} />
          </div>
        </main>
      </div>
    </div>
  )
}

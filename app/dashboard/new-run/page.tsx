import { DashboardHeader } from "@/components/dashboard-header"
import { Sidebar } from "@/components/sidebar"
import { BookingForm } from "@/components/booking-form"
import { ArrowLeft, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NewRunPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader />

        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 text-gray-500">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Create New Run</h1>
                <p className="text-sm text-gray-500">Set up a new transport run with all required details</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="text-gray-600 gap-1.5 rounded-lg">
                <HelpCircle className="h-4 w-4" />
                <span>Help</span>
              </Button>
              <div className="flex items-center gap-2 bg-yellow-50 text-yellow-800 px-3 py-1.5 rounded-lg border border-yellow-200 text-sm">
                <span className="inline-block w-2 h-2 rounded-full bg-yellow-500"></span>
                <span className="font-medium">Draft Mode</span>
              </div>
            </div>
          </div>
        </div>

        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="container mx-auto px-6 py-8 max-w-6xl">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <BookingForm />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

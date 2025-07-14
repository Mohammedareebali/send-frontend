import { DashboardHeader } from "@/components/layout/dashboard-header"
import { RoutesControlCenter } from "@/components/routes-control-center"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home, Truck } from "lucide-react"

export default function RoutesManagementPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <DashboardHeader title="Routes Control Center" subtitle="Real-time route monitoring and crisis management" />
      <main className="flex-1 overflow-x-hidden overflow-y-auto">
        <div className="container mx-auto max-w-7xl px-6 py-6">
          {/* Breadcrumb Navigation */}
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard" className="text-slate-400 hover:text-slate-200 transition-colors">
                  <Home className="h-3.5 w-3.5 mr-1" />
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-slate-600" />
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard/routes-management" className="font-medium text-slate-200">
                  <Truck className="h-3.5 w-3.5 mr-1" />
                  Routes Control
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Main Control Center */}
          <RoutesControlCenter />
        </div>
      </main>
    </div>
  )
}

import { DashboardHeader } from "@/components/layout/dashboard-header"
import { DocumentationReport } from "@/components/documentation-report"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home, FileText } from "lucide-react"

export default function DocumentationReportPage() {
  return (
   
      <DashboardHeader
        title="Documentation & Compliance"
        subtitle="Monitor and manage all staff and vehicle documentation"
      />
      <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
        <div className="container mx-auto">
          {/* Breadcrumb for context */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">
                  <Home className="h-3.5 w-3.5 mr-1" />
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard/reports">Reports</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard/reports/documentation" className="font-medium">
                  <FileText className="h-3.5 w-3.5 mr-1" />
                  Documentation
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <DocumentationReport />
        </div>
      </main>
  
  )
}

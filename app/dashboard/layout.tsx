import type React from "react"
import { SidebarWrapper } from "@/components/layout/sidebar-wrapper"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SidebarWrapper>{children}</SidebarWrapper>
}

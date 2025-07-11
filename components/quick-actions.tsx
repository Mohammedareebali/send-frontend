import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, UserPlus, FileText, Clock, Truck, AlertTriangle } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  return (
    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader className="pb-3 border-b border-slate-700/50">
        <CardTitle className="text-sm font-medium text-slate-200">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pt-4">
        <Button
          asChild
          className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-medium h-10 justify-start shadow-lg text-sm"
        >
          <Link href="/dashboard/new-run" className="flex items-center">
            <PlusCircle className="mr-2 h-4 w-4 flex-shrink-0" />
            <span className="truncate">Create New Run</span>
          </Link>
        </Button>

        <div className="grid grid-cols-2 gap-2">
          <Button
            asChild
            variant="outline"
            className="border-slate-600 bg-slate-700/30 text-slate-200 font-medium h-9 justify-start hover:bg-slate-600/50 hover:text-slate-100 text-xs"
          >
            <Link href="/dashboard/staff" className="flex items-center">
              <UserPlus className="mr-1.5 h-3.5 w-3.5 flex-shrink-0 text-blue-400" />
              <span className="truncate">Staff</span>
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-slate-600 bg-slate-700/30 text-slate-200 font-medium h-9 justify-start hover:bg-slate-600/50 hover:text-slate-100 text-xs"
          >
            <Link href="/dashboard/reports" className="flex items-center">
              <FileText className="mr-1.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-400" />
              <span className="truncate">Reports</span>
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-slate-600 bg-slate-700/30 text-slate-200 font-medium h-9 justify-start hover:bg-slate-600/50 hover:text-slate-100 text-xs"
          >
            <Link href="/dashboard/job-history" className="flex items-center">
              <Clock className="mr-1.5 h-3.5 w-3.5 flex-shrink-0 text-purple-400" />
              <span className="truncate">History</span>
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-slate-600 bg-slate-700/30 text-slate-200 font-medium h-9 justify-start hover:bg-slate-600/50 hover:text-slate-100 text-xs"
          >
            <Link href="/dashboard/routes-management" className="flex items-center">
              <Truck className="mr-1.5 h-3.5 w-3.5 flex-shrink-0 text-yellow-400" />
              <span className="truncate">Routes</span>
            </Link>
          </Button>
        </div>

        <Button
          asChild
          variant="outline"
          className="w-full border-red-500/30 bg-red-500/10 text-red-300 font-medium h-9 justify-start hover:bg-red-500/20 hover:text-red-200 text-xs"
        >
          <Link href="/dashboard/reports/documentation" className="flex items-center">
            <AlertTriangle className="mr-2 h-3.5 w-3.5 flex-shrink-0 text-red-400" />
            <span className="truncate">Compliance</span>
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

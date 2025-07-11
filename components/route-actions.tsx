import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PlusCircle, FileText, AlertTriangle, RefreshCw, Download, Users, Settings } from "lucide-react"

export function RouteActions() {
  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex flex-wrap gap-4 justify-between items-center">
          <div className="flex flex-wrap gap-3">
            <Button className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Route
            </Button>
            <Button
              variant="outline"
              className="bg-slate-700/50 border-slate-600 text-slate-200 hover:bg-slate-600/50 hover:text-slate-100 transition-all duration-300"
            >
              <Users className="mr-2 h-4 w-4" />
              Auto Assign
            </Button>
            <Button
              variant="outline"
              className="bg-slate-700/50 border-slate-600 text-slate-200 hover:bg-slate-600/50 hover:text-slate-100 transition-all duration-300"
            >
              <FileText className="mr-2 h-4 w-4" />
              Reports
            </Button>
            <Button
              variant="outline"
              className="bg-slate-700/50 border-slate-600 text-slate-200 hover:bg-slate-600/50 hover:text-slate-100 transition-all duration-300"
            >
              <AlertTriangle className="mr-2 h-4 w-4" />
              Issues
            </Button>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="icon"
              className="bg-slate-700/50 border-slate-600 text-slate-200 hover:bg-slate-600/50 hover:text-slate-100 transition-all duration-300"
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-slate-700/50 border-slate-600 text-slate-200 hover:bg-slate-600/50 hover:text-slate-100 transition-all duration-300"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-slate-700/50 border-slate-600 text-slate-200 hover:bg-slate-600/50 hover:text-slate-100 transition-all duration-300"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, ShieldCheck, Siren, User } from "lucide-react"
import { cn } from "@/lib/utils"

/* -------------------------------------------------------------------------- */
/*                              Helper Mock Data                              */
/* -------------------------------------------------------------------------- */

const activeAlerts = [
  { id: 1, title: "Bus 12 – Student Seizure", time: "2 min ago", severity: "critical" },
  { id: 2, title: "Route 7 – Vehicle Breakdown", time: "5 min ago", severity: "high" },
]

const recentIncidents = [
  { id: 21, student: "Ella T.", type: "Aggression", resolved: false, time: "Today 09:20" },
  { id: 22, student: "Harvey P.", type: "Medical", resolved: true, time: "Yesterday 14:55" },
]

/* -------------------------------------------------------------------------- */
/*                         Utility components / styles                        */
/* -------------------------------------------------------------------------- */

function SeverityBadge({ severity }: { severity: "critical" | "high" | "medium" }) {
  const map: Record<typeof severity, string> = {
    critical: "bg-red-600 text-red-50",
    high: "bg-orange-500 text-orange-50",
    medium: "bg-yellow-500 text-yellow-900",
  }
  return <Badge className={cn("capitalize", map[severity])}>{severity}</Badge>
}

/* -------------------------------------------------------------------------- */
/*                       Safety Control Center Component                      */
/* -------------------------------------------------------------------------- */

export function SafetyControlCenter() {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="incidents">Incidents</TabsTrigger>
        <TabsTrigger value="policies">Policies & Compliance</TabsTrigger>
      </TabsList>

      {/* ----------------------------- Overview tab ------------------------- */}
      <TabsContent value="overview" className="space-y-6">
        <section className="grid gap-6 md:grid-cols-3">
          {/* Active Alerts */}
          <Card className="md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Siren className="h-5 w-5 text-red-600" />
                Active Alerts
              </CardTitle>
              <Badge variant="secondary">{activeAlerts.length}</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeAlerts.length === 0 && <p className="text-sm text-muted-foreground">No active alerts. 🎉</p>}
              {activeAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between rounded-md border p-2">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <span className="font-medium">{alert.title}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <SeverityBadge severity={alert.severity as any} />
                    <span>{alert.time}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Welfare Checks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Welfare Checks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Completed</span>
                  <span>75 %</span>
                </div>
                <Progress value={75} />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Pending</span>
                  <span>18 %</span>
                </div>
                <Progress value={18} className="bg-yellow-200 dark:bg-yellow-900 [&>div]:bg-yellow-500" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Overdue</span>
                  <span>7 %</span>
                </div>
                <Progress value={7} className="bg-red-200 dark:bg-red-900 [&>div]:bg-red-600" />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Compliance Status */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-green-600" />
              Compliance Snapshot
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-3">
            <ComplianceStat label="Risk Assessments" value="98 %" />
            <ComplianceStat label="Driver DBS" value="100 %" />
            <ComplianceStat label="Vehicle Checks" value="92 %" />
          </CardContent>
        </Card>
      </TabsContent>

      {/* --------------------------- Incidents tab -------------------------- */}
      <TabsContent value="incidents">
        <Card>
          <CardHeader>
            <CardTitle>Recent Incidents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentIncidents.map((inc) => (
              <div key={inc.id} className="flex items-center justify-between rounded-md border p-3">
                <span className="flex-1 font-medium">{inc.student}</span>
                <Badge variant={inc.resolved ? "outline" : "destructive"}>{inc.resolved ? "Resolved" : "Open"}</Badge>
                <span className="w-32 text-right text-sm text-muted-foreground">{inc.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>

      {/* -------------------------- Policies tab --------------------------- */}
      <TabsContent value="policies" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Policy Audit Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>All critical safeguarding policies were reviewed within the last 30 days.</p>
            <p className="flex items-center gap-1">
              <ShieldCheck className="h-4 w-4 text-green-600" /> Compliant
            </p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

/* ----------------------------- Small helpers ----------------------------- */

function ComplianceStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-start gap-1">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-xl font-semibold">{value}</span>
    </div>
  )
}

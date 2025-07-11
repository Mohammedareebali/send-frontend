import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface StaffDetailPerformanceProps {
  id: string
  /** "driver" = Driver, "pa" = Passenger Assistant */
  type: "driver" | "pa"
}

/**
 * Displays headline KPIs and simple progress bars for a staff member.
 * Swap the mocked data with a real fetch when your API is ready.
 */
export function StaffDetailPerformance({ id, type }: StaffDetailPerformanceProps) {
  // ─── Mock data ────────────────────────────────────────────────────────────────
  const data =
    type === "driver"
      ? {
          onTimePercentage: 94,
          totalDistanceKm: 12_500,
          safetyIncidents: 1,
          customerRating: 4.8,
        }
      : {
          onTimePercentage: 96,
          assistedStudents: 312,
          safetyIncidents: 0,
          customerRating: 4.9,
        }

  // Helper to format big numbers with commas.
  const fmt = (num: number) => num.toLocaleString()

  // ─── Layout ───────────────────────────────────────────────────────────────────
  return (
    <section aria-labelledby="performance-heading" className="grid gap-4 md:grid-cols-2">
      {/* Headline KPI card */}
      <Card>
        <CardHeader>
          <CardTitle id="performance-heading">Performance summary</CardTitle>
          <CardDescription>
            Overview of recent KPIs for <span className="font-medium">{type === "driver" ? "Driver" : "PA"}</span> #{id}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-6 text-sm">
          <div className="space-y-1">
            <p className="text-muted-foreground">On-time %</p>
            <p className="text-2xl font-semibold">{data.onTimePercentage}%</p>
            <Progress value={data.onTimePercentage} />
          </div>

          {type === "driver" ? (
            <div className="space-y-1">
              <p className="text-muted-foreground">Distance driven</p>
              <p className="text-2xl font-semibold">{fmt(data.totalDistanceKm)} km</p>
            </div>
          ) : (
            <div className="space-y-1">
              <p className="text-muted-foreground">Students assisted</p>
              <p className="text-2xl font-semibold">{fmt(data.assistedStudents)}</p>
            </div>
          )}

          <div className="space-y-1">
            <p className="text-muted-foreground">Safety incidents</p>
            <p className="text-2xl font-semibold">{data.safetyIncidents}</p>
            {data.safetyIncidents === 0 ? (
              <Badge variant="success" className="mt-1">
                Excellent
              </Badge>
            ) : (
              <Badge variant="destructive" className="mt-1">
                Attention
              </Badge>
            )}
          </div>

          <div className="space-y-1">
            <p className="text-muted-foreground">Avg. rating</p>
            <p className="text-2xl font-semibold">{data.customerRating.toFixed(1)} / 5</p>
          </div>
        </CardContent>
      </Card>

      {/* Contextual notice card */}
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Recent notes &amp; feedback</CardTitle>
          <CardDescription>Highlights from the last 30 days</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 space-y-3 text-sm">
          <p className="rounded-md bg-muted/50 p-3">
            <span className="font-medium">Positive&nbsp;—</span> Maintained excellent punctuality during peak traffic.
          </p>
          <p className="rounded-md bg-muted/50 p-3">
            <span className="font-medium">Note&nbsp;—</span> Remember to submit daily vehicle check forms by 18:00.
          </p>
          <p className="rounded-md bg-muted/50 p-3">
            <span className="font-medium">Praise&nbsp;—</span> Passenger feedback rated the ride as “very comfortable
            and safe.”
          </p>
        </CardContent>
      </Card>
    </section>
  )
}

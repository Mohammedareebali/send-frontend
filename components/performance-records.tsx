import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function PerformanceRecords() {
  const records = [
    { id: 1, name: "John Doe", role: "Driver", rating: 4.8, feedback: "Excellent time management", incidents: 0 },
    { id: 2, name: "Jane Smith", role: "PA", rating: 4.5, feedback: "Great with children", incidents: 1 },
    { id: 3, name: "Mike Johnson", role: "Driver", rating: 3.9, feedback: "Needs improvement in route planning", incidents: 2 },
    { id: 4, name: "Emily Brown", role: "PA", rating: 4.9, feedback: "Exceptional care and attention", incidents: 0 },
    { id: 5, name: "Chris Lee", role: "Driver", rating: 3.2, feedback: "Multiple late arrivals", incidents: 3 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Records</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Recent Feedback</TableHead>
              <TableHead>Incidents</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">{record.name}</TableCell>
                <TableCell>{record.role}</TableCell>
                <TableCell>
                  <Badge variant={
                    record.rating >= 4.5 ? "success" :
                    record.rating >= 4.0 ? "default" :
                    record.rating >= 3.5 ? "secondary" :
                    "destructive"
                  }>
                    {record.rating.toFixed(1)}
                  </Badge>
                </TableCell>
                <TableCell>{record.feedback}</TableCell>
                <TableCell>{record.incidents}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

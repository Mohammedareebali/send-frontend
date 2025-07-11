import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

// This would typically come from an API or database
const jobHistoryData = [
  {
    id: "RUN001",
    councilName: "London Borough Council",
    clientName: "John Smith",
    runCallNumber: "C123",
    driver: "Jane Doe",
    pa: "Mike Johnson",
    completionDate: "2023-06-01T15:30:00Z",
  },
  {
    id: "RUN002",
    councilName: "Manchester City Council",
    clientName: "Emma Brown",
    runCallNumber: "C124",
    driver: "David Wilson",
    pa: "Sarah Davis",
    completionDate: "2023-06-02T16:45:00Z",
  },
  {
    id: "RUN003",
    councilName: "Birmingham City Council",
    clientName: "Alex Turner",
    runCallNumber: "C125",
    driver: "Chris Taylor",
    pa: "Lisa Anderson",
    completionDate: "2023-06-03T14:15:00Z",
  },
]

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString()
}

function JobHistoryTableRow({ job }: { job: typeof jobHistoryData[0] }) {
  return (
    <TableRow>
      <TableCell>{job.id}</TableCell>
      <TableCell>{job.councilName}</TableCell>
      <TableCell>{job.clientName}</TableCell>
      <TableCell>{job.driver}</TableCell>
      <TableCell>{job.pa}</TableCell>
      <TableCell>{formatDate(job.completionDate)}</TableCell>
      <TableCell>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/dashboard/job-history/${job.id}`}>
            Show More
          </Link>
        </Button>
      </TableCell>
    </TableRow>
  )
}

export function JobHistoryList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Records</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Run ID</TableHead>
              <TableHead>Council</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>PA</TableHead>
              <TableHead>Completion Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobHistoryData.map((job) => (
              <JobHistoryTableRow key={job.id} job={job} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

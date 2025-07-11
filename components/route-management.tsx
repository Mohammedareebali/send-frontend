import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle } from 'lucide-react'

export function RouteManagement() {
  const routes = [
    { id: "R001", driver: "John Doe", pa: "Jane Smith", pickupTime: "08:00 AM", status: "In Progress" },
    { id: "R002", driver: "Alice Johnson", pa: "Bob Brown", pickupTime: "08:30 AM", status: "Pending" },
    { id: "R003", driver: "Charlie Davis", pa: "Eve Wilson", pickupTime: "09:00 AM", status: "Completed" },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Route Management</h2>
        <Button className="bg-green-600 hover:bg-green-700">
          <PlusCircle className="mr-2 h-4 w-4" /> Create New Route
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Route ID</TableHead>
            <TableHead>Driver Name</TableHead>
            <TableHead>PA Name</TableHead>
            <TableHead>Pickup Time</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {routes.map((route) => (
            <TableRow key={route.id}>
              <TableCell>{route.id}</TableCell>
              <TableCell>{route.driver}</TableCell>
              <TableCell>{route.pa}</TableCell>
              <TableCell>{route.pickupTime}</TableCell>
              <TableCell>{route.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

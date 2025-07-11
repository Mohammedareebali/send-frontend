import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function StaffAssignment() {
  const drivers = [
    { name: "John Doe", vehicleType: "Van", currentLocation: "School A", status: "Available" },
    { name: "Alice Johnson", vehicleType: "Bus", currentLocation: "En Route", status: "On Job" },
  ]

  const pas = [
    { name: "Jane Smith", skills: "SEN trained", currentAssignment: "Route R001" },
    { name: "Bob Brown", skills: "First Aid", currentAssignment: "Unassigned" },
  ]

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div>
        <h3 className="text-xl font-semibold mb-4">Driver Availability</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Vehicle Type</TableHead>
              <TableHead>Current Location</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {drivers.map((driver) => (
              <TableRow key={driver.name}>
                <TableCell>{driver.name}</TableCell>
                <TableCell>{driver.vehicleType}</TableCell>
                <TableCell>{driver.currentLocation}</TableCell>
                <TableCell>{driver.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-4">PA Availability</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Skills/Experience</TableHead>
              <TableHead>Current Assignment</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pas.map((pa) => (
              <TableRow key={pa.name}>
                <TableCell>{pa.name}</TableCell>
                <TableCell>{pa.skills}</TableCell>
                <TableCell>{pa.currentAssignment}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

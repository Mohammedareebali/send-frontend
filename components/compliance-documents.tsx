import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function ComplianceDocuments() {
  const documents = [
    { id: 1, name: "John Doe", document: "Driver's License", expiryDate: "2023-12-31", status: "Valid" },
    { id: 2, name: "Jane Smith", document: "First Aid Certificate", expiryDate: "2023-10-15", status: "Expiring Soon" },
    { id: 3, name: "Mike Johnson", document: "Vehicle Insurance", expiryDate: "2024-03-01", status: "Valid" },
    { id: 4, name: "Emily Brown", document: "Background Check", expiryDate: "2023-11-30", status: "Expiring Soon" },
    { id: 5, name: "Chris Lee", document: "Medical Certificate", expiryDate: "2023-09-30", status: "Expired" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Compliance Documents</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Staff Name</TableHead>
              <TableHead>Document</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell className="font-medium">{doc.name}</TableCell>
                <TableCell>{doc.document}</TableCell>
                <TableCell>{doc.expiryDate}</TableCell>
                <TableCell>
                  <Badge variant={
                    doc.status === "Valid" ? "success" :
                    doc.status === "Expiring Soon" ? "warning" :
                    "destructive"
                  }>
                    {doc.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

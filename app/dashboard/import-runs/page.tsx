"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/layout/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { readRunsFile, RunData } from "@/lib/import-runs"

export default function ImportRunsPage() {
  const [runs, setRuns] = useState<RunData[]>([])

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const parsed = await readRunsFile(file)
    setRuns(parsed)
  }

  return (
    <div className="min-h-screen">
      <DashboardHeader title="Import Runs" subtitle="Bulk create runs from Excel" />

      <main className="p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload Excel File</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input type="file" accept=".xls,.xlsx" onChange={handleFile} />
          </CardContent>
        </Card>

        {runs.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Preview ({runs.length} runs)</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>PA</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {runs.map((r, i) => (
                    <TableRow key={i}>
                      <TableCell>{r.id}</TableCell>
                      <TableCell>{r.routeName}</TableCell>
                      <TableCell>{r.driver}</TableCell>
                      <TableCell>{r.pa}</TableCell>
                      <TableCell>{r.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}


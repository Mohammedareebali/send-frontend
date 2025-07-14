import * as XLSX from "xlsx"

export interface RunData {
  id: string
  routeName: string
  driver: string
  pa: string
  date: string
}

export function parseRuns(buffer: ArrayBuffer): RunData[] {
  const workbook = XLSX.read(buffer, { type: "array" })
  const sheet = workbook.Sheets[workbook.SheetNames[0]]
  const rows: any[] = XLSX.utils.sheet_to_json(sheet, { header: 1 })
  const [, ...dataRows] = rows
  return dataRows
    .filter((r) => r.length >= 5)
    .map((r) => ({
      id: String(r[0]),
      routeName: String(r[1]),
      driver: String(r[2]),
      pa: String(r[3]),
      date: String(r[4]),
    }))
}

export async function readRunsFile(file: File): Promise<RunData[]> {
  const buffer = await file.arrayBuffer()
  return parseRuns(buffer)
}


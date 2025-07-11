// Sage API Integration for Staff Payments and Run Costs
export interface StaffPayment {
  id: string
  paymentNumber: string
  staffId: string
  staffName: string
  staffType: "driver" | "pa"
  paymentDate: string
  payPeriod: string
  totalAmount: number
  status: "pending" | "processed" | "paid" | "failed"
  runs: PaymentRun[]
  deductions?: PaymentDeduction[]
  bonuses?: PaymentBonus[]
}

export interface PaymentRun {
  id: string
  runNumber: string
  date: string
  hours: number
  rate: number
  amount: number
  councilName: string
  routeType: "regular" | "emergency" | "overtime"
}

export interface PaymentDeduction {
  id: string
  type: "tax" | "ni" | "pension" | "uniform" | "other"
  description: string
  amount: number
}

export interface PaymentBonus {
  id: string
  type: "performance" | "overtime" | "emergency" | "other"
  description: string
  amount: number
}

export interface RunCostAssignment {
  id: string
  runNumber: string
  councilName: string
  date: string
  driverCost: number
  paCost: number
  vehicleCost: number
  fuelCost: number
  totalCost: number
  invoiceAmount: number
  profit: number
  status: "draft" | "approved" | "invoiced"
}

export interface StaffMember {
  id: string
  name: string
  type: "driver" | "pa"
  hourlyRate: number
  overtimeRate: number
  emergencyRate: number
  bankDetails?: {
    accountName: string
    accountNumber: string
    sortCode: string
  }
}

class SagePayrollAPI {
  private baseUrl: string
  private apiKey: string

  constructor() {
    this.baseUrl = process.env.SAGE_API_URL || "https://api.sage.com/v1"
    this.apiKey = process.env.SAGE_API_KEY || ""
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`Sage API error: ${response.statusText}`)
    }

    return response.json()
  }

  async getStaffPayments(): Promise<StaffPayment[]> {
    try {
      const data = await this.request("/payroll/payments")
      return data.payments || []
    } catch (error) {
      console.error("Error fetching staff payments:", error)
      // Return mock data for development
      return [
        {
          id: "PAY-001",
          paymentNumber: "PAY-2024-001",
          staffId: "STAFF-001",
          staffName: "John Smith",
          staffType: "driver",
          paymentDate: "2024-01-31",
          payPeriod: "January 2024",
          totalAmount: 2450.0,
          status: "processed",
          runs: [
            {
              id: "RUN-001",
              runNumber: "R001",
              date: "2024-01-15",
              hours: 4,
              rate: 15.0,
              amount: 60.0,
              councilName: "Greenfield Council",
              routeType: "regular",
            },
            {
              id: "RUN-002",
              runNumber: "R002",
              date: "2024-01-16",
              hours: 6,
              rate: 18.0,
              amount: 108.0,
              councilName: "Oakwood Council",
              routeType: "overtime",
            },
          ],
          deductions: [
            {
              id: "DED-001",
              type: "tax",
              description: "Income Tax",
              amount: 245.0,
            },
            {
              id: "DED-002",
              type: "ni",
              description: "National Insurance",
              amount: 196.0,
            },
          ],
        },
        {
          id: "PAY-002",
          paymentNumber: "PAY-2024-002",
          staffId: "STAFF-002",
          staffName: "Sarah Johnson",
          staffType: "pa",
          paymentDate: "2024-01-31",
          payPeriod: "January 2024",
          totalAmount: 1850.0,
          status: "pending",
          runs: [
            {
              id: "RUN-003",
              runNumber: "R003",
              date: "2024-01-17",
              hours: 5,
              rate: 12.0,
              amount: 60.0,
              councilName: "Riverside Council",
              routeType: "regular",
            },
          ],
          deductions: [
            {
              id: "DED-003",
              type: "tax",
              description: "Income Tax",
              amount: 185.0,
            },
          ],
        },
      ]
    }
  }

  async getRunCostAssignments(): Promise<RunCostAssignment[]> {
    try {
      const data = await this.request("/runs/costs")
      return data.runCosts || []
    } catch (error) {
      console.error("Error fetching run costs:", error)
      // Return mock data for development
      return [
        {
          id: "COST-001",
          runNumber: "R001",
          councilName: "Greenfield Council",
          date: "2024-01-15",
          driverCost: 60.0,
          paCost: 48.0,
          vehicleCost: 25.0,
          fuelCost: 15.0,
          totalCost: 148.0,
          invoiceAmount: 200.0,
          profit: 52.0,
          status: "invoiced",
        },
        {
          id: "COST-002",
          runNumber: "R002",
          councilName: "Oakwood Council",
          date: "2024-01-16",
          driverCost: 108.0,
          paCost: 72.0,
          vehicleCost: 35.0,
          fuelCost: 22.0,
          totalCost: 237.0,
          invoiceAmount: 320.0,
          profit: 83.0,
          status: "approved",
        },
        {
          id: "COST-003",
          runNumber: "R003",
          councilName: "Riverside Council",
          date: "2024-01-17",
          driverCost: 75.0,
          paCost: 60.0,
          vehicleCost: 30.0,
          fuelCost: 18.0,
          totalCost: 183.0,
          invoiceAmount: 250.0,
          profit: 67.0,
          status: "draft",
        },
      ]
    }
  }

  async processStaffPayment(paymentId: string): Promise<void> {
    try {
      await this.request(`/payroll/payments/${paymentId}/process`, {
        method: "POST",
      })
    } catch (error) {
      console.error("Error processing payment:", error)
      throw error
    }
  }

  async approveRunCosts(runCostId: string): Promise<void> {
    try {
      await this.request(`/runs/costs/${runCostId}/approve`, {
        method: "POST",
      })
    } catch (error) {
      console.error("Error approving run costs:", error)
      throw error
    }
  }

  async createStaffPayment(payment: Omit<StaffPayment, "id" | "paymentNumber">): Promise<StaffPayment> {
    try {
      const data = await this.request("/payroll/payments", {
        method: "POST",
        body: JSON.stringify(payment),
      })
      return data
    } catch (error) {
      console.error("Error creating staff payment:", error)
      throw error
    }
  }
}

export const sagePayrollAPI = new SagePayrollAPI()

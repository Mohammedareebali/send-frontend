"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  Search,
  Download,
  Send,
  Eye,
  CheckCircle,
  Clock,
  Users,
  TrendingUp,
  Calculator,
  CreditCard,
} from "lucide-react"
import { sagePayrollAPI, type StaffPayment, type RunCostAssignment } from "@/lib/api/sage"

export default function PayrollInvoicingPage() {
  const [staffPayments, setStaffPayments] = useState<StaffPayment[]>([])
  const [runCosts, setRunCosts] = useState<RunCostAssignment[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [activeTab, setActiveTab] = useState("staff-payments")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [paymentsData, costsData] = await Promise.all([
          sagePayrollAPI.getStaffPayments(),
          sagePayrollAPI.getRunCostAssignments(),
        ])
        setStaffPayments(paymentsData)
        setRunCosts(costsData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredPayments = staffPayments.filter((payment) => {
    const matchesSearch =
      payment.staffName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.paymentNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const filteredRunCosts = runCosts.filter((cost) => {
    const matchesSearch =
      cost.runNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cost.councilName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || cost.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Calculate totals
  const totalStaffPayments = staffPayments.reduce((sum, payment) => sum + payment.totalAmount, 0)
  const pendingPayments = staffPayments
    .filter((p) => p.status === "pending")
    .reduce((sum, payment) => sum + payment.totalAmount, 0)
  const totalRunCosts = runCosts.reduce((sum, cost) => sum + cost.totalCost, 0)
  const totalProfit = runCosts.reduce((sum, cost) => sum + cost.profit, 0)

  const getPaymentStatusBadge = (status: StaffPayment["status"]) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">Paid</Badge>
      case "processed":
        return <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">Processed</Badge>
      case "pending":
        return <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">Pending</Badge>
      case "failed":
        return <Badge className="bg-red-500/20 text-red-300 border-red-500/30">Failed</Badge>
      default:
        return <Badge className="bg-slate-500/20 text-slate-300 border-slate-500/30">{status}</Badge>
    }
  }

  const getCostStatusBadge = (status: RunCostAssignment["status"]) => {
    switch (status) {
      case "invoiced":
        return <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">Invoiced</Badge>
      case "approved":
        return <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">Approved</Badge>
      case "draft":
        return <Badge className="bg-slate-500/20 text-slate-300 border-slate-500/30">Draft</Badge>
      default:
        return <Badge className="bg-slate-500/20 text-slate-300 border-slate-500/30">{status}</Badge>
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-slate-400">Loading payroll data...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="container mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent">
              Payroll & Run Costs
            </h1>
            <p className="text-slate-400 mt-1">Manage staff payments and run cost assignments</p>
          </div>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Process Payment
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-slate-700 text-slate-200 max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Process Staff Payment</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-300">Staff Member</label>
                      <Select>
                        <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-200">
                          <SelectValue placeholder="Select staff member" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="driver-1" className="text-slate-200">
                            John Smith (Driver)
                          </SelectItem>
                          <SelectItem value="pa-1" className="text-slate-200">
                            Sarah Johnson (PA)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-300">Pay Period</label>
                      <Input type="month" className="bg-slate-800 border-slate-700 text-slate-200" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-300">Base Hours</label>
                      <Input type="number" placeholder="40" className="bg-slate-800 border-slate-700 text-slate-200" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-300">Overtime Hours</label>
                      <Input type="number" placeholder="0" className="bg-slate-800 border-slate-700 text-slate-200" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-300">Emergency Hours</label>
                      <Input type="number" placeholder="0" className="bg-slate-800 border-slate-700 text-slate-200" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" className="border-slate-600 text-slate-300 bg-transparent">
                      Save as Draft
                    </Button>
                    <Button className="bg-emerald-600 hover:bg-emerald-700">Process Payment</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Users className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Total Staff Payments</p>
                  <p className="text-xl font-bold text-slate-200">£{totalStaffPayments.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <Clock className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Pending Payments</p>
                  <p className="text-xl font-bold text-slate-200">£{pendingPayments.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <Calculator className="h-5 w-5 text-red-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Total Run Costs</p>
                  <p className="text-xl font-bold text-slate-200">£{totalRunCosts.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Total Profit</p>
                  <p className="text-xl font-bold text-slate-200">£{totalProfit.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="border-b border-slate-700/50">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle className="text-slate-200">Financial Management</CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-800/50 border-slate-700 text-slate-200 placeholder-slate-400"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32 bg-slate-800/50 border-slate-700 text-slate-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="all" className="text-slate-200">
                      All Status
                    </SelectItem>
                    <SelectItem value="pending" className="text-slate-200">
                      Pending
                    </SelectItem>
                    <SelectItem value="processed" className="text-slate-200">
                      Processed
                    </SelectItem>
                    <SelectItem value="paid" className="text-slate-200">
                      Paid
                    </SelectItem>
                    <SelectItem value="draft" className="text-slate-200">
                      Draft
                    </SelectItem>
                    <SelectItem value="approved" className="text-slate-200">
                      Approved
                    </SelectItem>
                    <SelectItem value="invoiced" className="text-slate-200">
                      Invoiced
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-slate-800/50 border-b border-slate-700/50">
                <TabsTrigger
                  value="staff-payments"
                  className="data-[state=active]:bg-slate-700 data-[state=active]:text-slate-200 text-slate-400"
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Staff Payments
                </TabsTrigger>
                <TabsTrigger
                  value="run-costs"
                  className="data-[state=active]:bg-slate-700 data-[state=active]:text-slate-200 text-slate-400"
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  Run Costs
                </TabsTrigger>
              </TabsList>

              <TabsContent value="staff-payments" className="p-0 m-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700/50 hover:bg-slate-800/30">
                      <TableHead className="text-slate-300">Payment #</TableHead>
                      <TableHead className="text-slate-300">Staff Member</TableHead>
                      <TableHead className="text-slate-300">Type</TableHead>
                      <TableHead className="text-slate-300">Pay Period</TableHead>
                      <TableHead className="text-slate-300">Amount</TableHead>
                      <TableHead className="text-slate-300">Status</TableHead>
                      <TableHead className="text-slate-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayments.map((payment) => (
                      <TableRow key={payment.id} className="border-slate-700/50 hover:bg-slate-800/30">
                        <TableCell className="text-slate-200 font-medium">{payment.paymentNumber}</TableCell>
                        <TableCell className="text-slate-200">{payment.staffName}</TableCell>
                        <TableCell className="text-slate-300 capitalize">{payment.staffType}</TableCell>
                        <TableCell className="text-slate-300">{payment.payPeriod}</TableCell>
                        <TableCell className="text-slate-200 font-medium">
                          £{payment.totalAmount.toLocaleString()}
                        </TableCell>
                        <TableCell>{getPaymentStatusBadge(payment.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost" className="text-slate-400 hover:text-slate-200">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-slate-400 hover:text-slate-200">
                              <Download className="h-4 w-4" />
                            </Button>
                            {payment.status === "pending" && (
                              <Button size="sm" variant="ghost" className="text-slate-400 hover:text-slate-200">
                                <Send className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="run-costs" className="p-0 m-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700/50 hover:bg-slate-800/30">
                      <TableHead className="text-slate-300">Run #</TableHead>
                      <TableHead className="text-slate-300">Council</TableHead>
                      <TableHead className="text-slate-300">Date</TableHead>
                      <TableHead className="text-slate-300">Total Cost</TableHead>
                      <TableHead className="text-slate-300">Invoice Amount</TableHead>
                      <TableHead className="text-slate-300">Profit</TableHead>
                      <TableHead className="text-slate-300">Status</TableHead>
                      <TableHead className="text-slate-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRunCosts.map((cost) => (
                      <TableRow key={cost.id} className="border-slate-700/50 hover:bg-slate-800/30">
                        <TableCell className="text-slate-200 font-medium">{cost.runNumber}</TableCell>
                        <TableCell className="text-slate-200">{cost.councilName}</TableCell>
                        <TableCell className="text-slate-300">{new Date(cost.date).toLocaleDateString()}</TableCell>
                        <TableCell className="text-slate-200">£{cost.totalCost.toLocaleString()}</TableCell>
                        <TableCell className="text-slate-200 font-medium">
                          £{cost.invoiceAmount.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-emerald-300 font-medium">£{cost.profit.toLocaleString()}</TableCell>
                        <TableCell>{getCostStatusBadge(cost.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost" className="text-slate-400 hover:text-slate-200">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {cost.status === "draft" && (
                              <Button size="sm" variant="ghost" className="text-slate-400 hover:text-slate-200">
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

interface PerformanceMetrics {
  driverMetrics: {
    id: string
    name: string
    totalRuns: number
    completedRuns: number
    cancelledRuns: number
    lateRuns: number
    onTimePercentage: number
    averageRating: number
    totalHours: number
    earnings: number
    incidents: number
    lastActive: string
  }[]
  paMetrics: {
    id: string
    name: string
    totalRuns: number
    completedRuns: number
    cancelledRuns: number
    averageRating: number
    totalHours: number
    earnings: number
    incidents: number
    lastActive: string
  }[]
  routeMetrics: {
    totalRoutes: number
    activeRoutes: number
    completedToday: number
    cancelledToday: number
    averageDelay: number
    onTimePercentage: number
    fuelCosts: number
    totalDistance: number
  }
  systemMetrics: {
    totalRevenue: number
    totalCosts: number
    profitMargin: number
    customerSatisfaction: number
    staffUtilization: number
    vehicleUtilization: number
  }
}

export async function getPerformanceMetrics(): Promise<PerformanceMetrics> {
  // Mock data - replace with actual API calls
  return {
    driverMetrics: [
      {
        id: "1",
        name: "John Smith",
        totalRuns: 145,
        completedRuns: 138,
        cancelledRuns: 7,
        lateRuns: 12,
        onTimePercentage: 91.3,
        averageRating: 4.8,
        totalHours: 320,
        earnings: 4800,
        incidents: 1,
        lastActive: "2024-01-15T09:30:00Z",
      },
      {
        id: "2",
        name: "Sarah Johnson",
        totalRuns: 132,
        completedRuns: 129,
        cancelledRuns: 3,
        lateRuns: 8,
        onTimePercentage: 93.9,
        averageRating: 4.9,
        totalHours: 298,
        earnings: 4470,
        incidents: 0,
        lastActive: "2024-01-15T08:45:00Z",
      },
      {
        id: "3",
        name: "Mike Wilson",
        totalRuns: 98,
        completedRuns: 92,
        cancelledRuns: 6,
        lateRuns: 15,
        onTimePercentage: 83.7,
        averageRating: 4.2,
        totalHours: 245,
        earnings: 3675,
        incidents: 2,
        lastActive: "2024-01-14T16:20:00Z",
      },
    ],
    paMetrics: [
      {
        id: "1",
        name: "Emma Davis",
        totalRuns: 89,
        completedRuns: 87,
        cancelledRuns: 2,
        averageRating: 4.9,
        totalHours: 178,
        earnings: 2670,
        incidents: 0,
        lastActive: "2024-01-15T10:15:00Z",
      },
      {
        id: "2",
        name: "Lisa Brown",
        totalRuns: 76,
        completedRuns: 74,
        cancelledRuns: 2,
        averageRating: 4.7,
        totalHours: 152,
        earnings: 2280,
        incidents: 1,
        lastActive: "2024-01-15T09:00:00Z",
      },
    ],
    routeMetrics: {
      totalRoutes: 45,
      activeRoutes: 23,
      completedToday: 18,
      cancelledToday: 2,
      averageDelay: 3.2,
      onTimePercentage: 89.5,
      fuelCosts: 2340,
      totalDistance: 1250,
    },
    systemMetrics: {
      totalRevenue: 45600,
      totalCosts: 32200,
      profitMargin: 29.4,
      customerSatisfaction: 4.6,
      staffUtilization: 87.3,
      vehicleUtilization: 92.1,
    },
  }
}

export async function getPerformanceTrends(period: "week" | "month" | "quarter"): Promise<any> {
  // Mock trend data
  return {
    onTimePerformance: [
      { date: "2024-01-08", value: 87.2 },
      { date: "2024-01-09", value: 89.1 },
      { date: "2024-01-10", value: 91.3 },
      { date: "2024-01-11", value: 88.7 },
      { date: "2024-01-12", value: 92.4 },
      { date: "2024-01-13", value: 90.8 },
      { date: "2024-01-14", value: 89.5 },
    ],
    revenue: [
      { date: "2024-01-08", value: 6200 },
      { date: "2024-01-09", value: 6800 },
      { date: "2024-01-10", value: 7100 },
      { date: "2024-01-11", value: 6500 },
      { date: "2024-01-12", value: 7300 },
      { date: "2024-01-13", value: 6900 },
      { date: "2024-01-14", value: 7200 },
    ],
  }
}

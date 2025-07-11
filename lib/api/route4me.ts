// Route4Me API Integration for Route Optimization
export interface Route4MeConfig {
  apiKey: string
  baseUrl: string
}

export interface OptimizationRequest {
  addresses: Array<{
    address: string
    lat: number
    lng: number
    time?: number
    priority?: number
  }>
  parameters: {
    algorithm_type: number
    store_route: boolean
    route_name: string
    optimize: string
    distance_unit: string
    device_type: string
  }
}

export interface OptimizedRoute {
  route_id: string
  optimization_problem_id: string
  addresses: Array<{
    route_destination_id: number
    address: string
    lat: number
    lng: number
    sequence_no: number
    time: number
    distance_to_next: number
  }>
  total_distance: number
  total_time: number
}

export class Route4MeService {
  private config: Route4MeConfig

  constructor(config: Route4MeConfig) {
    this.config = config
  }

  async optimizeRoute(request: OptimizationRequest): Promise<OptimizedRoute> {
    try {
      const response = await fetch(`${this.config.baseUrl}/api.v4/optimization_problem.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...request,
          api_key: this.config.apiKey,
        }),
      })

      if (!response.ok) {
        throw new Error(`Route4Me API error: ${response.statusText}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Route optimization failed:", error)
      throw error
    }
  }

  async getRouteProgress(routeId: string): Promise<any> {
    try {
      const response = await fetch(
        `${this.config.baseUrl}/api.v4/route.php?api_key=${this.config.apiKey}&route_id=${routeId}`,
      )

      if (!response.ok) {
        throw new Error(`Route4Me API error: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Failed to get route progress:", error)
      throw error
    }
  }

  async updateRouteDestination(routeId: string, destinationId: number, updates: any): Promise<any> {
    try {
      const response = await fetch(`${this.config.baseUrl}/api.v4/address.php`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: this.config.apiKey,
          route_id: routeId,
          route_destination_id: destinationId,
          ...updates,
        }),
      })

      if (!response.ok) {
        throw new Error(`Route4Me API error: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Failed to update route destination:", error)
      throw error
    }
  }
}

// Initialize Route4Me service
export const route4meService = new Route4MeService({
  apiKey: process.env.ROUTE4ME_API_KEY || "demo-key",
  baseUrl: "https://api.route4me.com",
})

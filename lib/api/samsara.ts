// Samsara GPS Tracking Integration
export interface SamsaraConfig {
  apiToken: string
  baseUrl: string
}

export interface VehicleLocation {
  vehicleId: string
  latitude: number
  longitude: number
  speed: number
  heading: number
  timestamp: string
  address?: string
}

export interface RouteProgress {
  routeId: string
  vehicleId: string
  driverId: string
  currentLocation: VehicleLocation
  nextStop?: {
    address: string
    eta: string
    distance: number
  }
  completedStops: number
  totalStops: number
  status: "on_route" | "delayed" | "completed" | "cancelled"
}

export class SamsaraService {
  private config: SamsaraConfig

  constructor(config: SamsaraConfig) {
    this.config = config
  }

  async getVehicleLocations(vehicleIds: string[]): Promise<VehicleLocation[]> {
    try {
      const response = await fetch(`${this.config.baseUrl}/fleet/vehicles/locations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.config.apiToken}`,
        },
        body: JSON.stringify({
          vehicleIds: vehicleIds,
        }),
      })

      if (!response.ok) {
        throw new Error(`Samsara API error: ${response.statusText}`)
      }

      const data = await response.json()
      return data.data || []
    } catch (error) {
      console.error("Failed to get vehicle locations:", error)
      throw error
    }
  }

  async getRouteProgress(routeId: string): Promise<RouteProgress | null> {
    try {
      // This would integrate with your route management system
      // and combine Samsara location data with route information
      const response = await fetch(`${this.config.baseUrl}/fleet/routes/${routeId}/progress`, {
        headers: {
          Authorization: `Bearer ${this.config.apiToken}`,
        },
      })

      if (!response.ok) {
        throw new Error(`Samsara API error: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Failed to get route progress:", error)
      return null
    }
  }

  async createGeofence(name: string, coordinates: Array<{ lat: number; lng: number }>): Promise<any> {
    try {
      const response = await fetch(`${this.config.baseUrl}/fleet/geofences`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.config.apiToken}`,
        },
        body: JSON.stringify({
          name: name,
          polygonVertices: coordinates,
        }),
      })

      if (!response.ok) {
        throw new Error(`Samsara API error: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Failed to create geofence:", error)
      throw error
    }
  }

  async subscribeToWebhooks(webhookUrl: string, eventTypes: string[]): Promise<any> {
    try {
      const response = await fetch(`${this.config.baseUrl}/fleet/webhooks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.config.apiToken}`,
        },
        body: JSON.stringify({
          url: webhookUrl,
          eventTypes: eventTypes,
        }),
      })

      if (!response.ok) {
        throw new Error(`Samsara API error: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Failed to subscribe to webhooks:", error)
      throw error
    }
  }
}

// Initialize Samsara service
export const samsaraService = new SamsaraService({
  apiToken: process.env.SAMSARA_API_TOKEN || "demo-token",
  baseUrl: "https://api.samsara.com/v1",
})

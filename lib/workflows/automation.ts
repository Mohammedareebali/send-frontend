import { route4meService } from "../api/route4me"
import { twilioService } from "../api/twilio"
import { samsaraService } from "../api/samsara"

export interface StaffMember {
  id: string
  name: string
  type: "driver" | "pa"
  phone: string
  email: string
  available: boolean
  location?: {
    lat: number
    lng: number
  }
  qualifications: string[]
}

export interface RouteAssignment {
  routeId: string
  driverId: string
  paId?: string
  vehicleId: string
  status: "assigned" | "active" | "completed" | "cancelled"
}

export class AutomationService {
  async handleStaffCancellation(
    cancelledStaffId: string,
    routeId: string,
    staffType: "driver" | "pa",
  ): Promise<boolean> {
    try {
      console.log(`Handling ${staffType} cancellation for route ${routeId}`)

      // 1. Find available replacement staff
      const availableStaff = await this.findAvailableStaff(staffType, routeId)

      if (availableStaff.length === 0) {
        // No available staff - escalate to management
        await this.escalateToManagement(routeId, staffType)
        return false
      }

      // 2. Select best replacement (closest, most qualified)
      const replacement = await this.selectBestReplacement(availableStaff, routeId)

      // 3. Update route assignment
      await this.updateRouteAssignment(routeId, staffType, replacement.id)

      // 4. Notify replacement staff
      await twilioService.sendNotification({
        recipients: [replacement.phone],
        message: `URGENT: You've been assigned to route ${routeId} as replacement ${staffType}. Please confirm ASAP.`,
        channels: ["sms"],
        priority: "high",
      })

      // 5. Notify affected parties (parents, school, etc.)
      await this.notifyRouteChange(routeId, `${staffType} replacement assigned`)

      // 6. Re-optimize route if necessary
      if (staffType === "driver") {
        await this.reoptimizeRoute(routeId)
      }

      console.log(`Successfully assigned replacement ${staffType}: ${replacement.name}`)
      return true
    } catch (error) {
      console.error("Failed to handle staff cancellation:", error)
      await this.escalateToManagement(routeId, staffType)
      return false
    }
  }

  async findAvailableStaff(staffType: "driver" | "pa", routeId: string): Promise<StaffMember[]> {
    // This would query your database for available staff
    // For demo purposes, returning mock data
    const mockStaff: StaffMember[] = [
      {
        id: "staff-1",
        name: "John Backup",
        type: staffType,
        phone: "+447700900123",
        email: "john.backup@sentransport.com",
        available: true,
        location: { lat: 51.5074, lng: -0.1278 },
        qualifications: ["SEN trained", "First Aid"],
      },
      {
        id: "staff-2",
        name: "Sarah Standby",
        type: staffType,
        phone: "+447700900456",
        email: "sarah.standby@sentransport.com",
        available: true,
        location: { lat: 51.5155, lng: -0.1426 },
        qualifications: ["SEN trained", "Wheelchair certified"],
      },
    ]

    return mockStaff.filter((staff) => staff.available && staff.type === staffType)
  }

  async selectBestReplacement(availableStaff: StaffMember[], routeId: string): Promise<StaffMember> {
    // Simple selection logic - in reality, this would consider:
    // - Distance from route start
    // - Qualifications match
    // - Previous performance
    // - Availability window
    return availableStaff[0]
  }

  async updateRouteAssignment(routeId: string, staffType: "driver" | "pa", newStaffId: string): Promise<void> {
    // Update your database with new assignment
    console.log(`Updated route ${routeId} with new ${staffType}: ${newStaffId}`)
  }

  async notifyRouteChange(routeId: string, changeDescription: string): Promise<void> {
    // Get affected parties for this route
    const affectedParties = await this.getAffectedParties(routeId)

    for (const party of affectedParties) {
      await twilioService.sendNotification({
        recipients: [party.phone],
        message: `Route ${routeId} update: ${changeDescription}. You will receive further updates shortly.`,
        channels: ["sms"],
        priority: "high",
      })
    }
  }

  async getAffectedParties(routeId: string): Promise<Array<{ phone: string; email: string; role: string }>> {
    // Mock data - would come from your database
    return [
      { phone: "+447700900789", email: "parent1@example.com", role: "parent" },
      { phone: "+447700900321", email: "school@example.com", role: "school" },
    ]
  }

  async reoptimizeRoute(routeId: string): Promise<void> {
    try {
      // Get current route data
      const routeData = await this.getRouteData(routeId)

      // Re-optimize with Route4Me
      const optimizedRoute = await route4meService.optimizeRoute({
        addresses: routeData.addresses,
        parameters: {
          algorithm_type: 1,
          store_route: true,
          route_name: `Route ${routeId} - Reoptimized`,
          optimize: "Distance",
          distance_unit: "mi",
          device_type: "web",
        },
      })

      // Update route with optimized sequence
      await this.updateRouteSequence(routeId, optimizedRoute)

      console.log(`Route ${routeId} successfully reoptimized`)
    } catch (error) {
      console.error("Failed to reoptimize route:", error)
    }
  }

  async getRouteData(routeId: string): Promise<any> {
    // Mock route data
    return {
      addresses: [
        { address: "123 School Street, London", lat: 51.5074, lng: -0.1278 },
        { address: "456 Home Avenue, London", lat: 51.5155, lng: -0.1426 },
        { address: "789 Pickup Road, London", lat: 51.5033, lng: -0.1195 },
      ],
    }
  }

  async updateRouteSequence(routeId: string, optimizedRoute: any): Promise<void> {
    console.log(`Updated route sequence for ${routeId}`)
  }

  async escalateToManagement(routeId: string, issue: string): Promise<void> {
    await twilioService.sendNotification({
      recipients: ["+447700900000"], // Management phone
      message: `URGENT: Route ${routeId} requires immediate attention - ${issue}. No automatic resolution available.`,
      channels: ["sms", "email"],
      priority: "high",
    })
  }

  async monitorRouteProgress(): Promise<void> {
    try {
      // Get all active routes
      const activeRoutes = await this.getActiveRoutes()

      for (const route of activeRoutes) {
        // Get real-time location from Samsara
        const locations = await samsaraService.getVehicleLocations([route.vehicleId])

        if (locations.length > 0) {
          const currentLocation = locations[0]

          // Check if route is delayed
          const isDelayed = await this.checkIfDelayed(route, currentLocation)

          if (isDelayed) {
            // Send delay notifications
            await this.handleRouteDelay(route.routeId, currentLocation)
          }

          // Update ETA for next stops
          await this.updateETAs(route.routeId, currentLocation)
        }
      }
    } catch (error) {
      console.error("Failed to monitor route progress:", error)
    }
  }

  async getActiveRoutes(): Promise<RouteAssignment[]> {
    // Mock active routes
    return [
      {
        routeId: "R001",
        driverId: "driver-1",
        paId: "pa-1",
        vehicleId: "vehicle-1",
        status: "active",
      },
    ]
  }

  async checkIfDelayed(route: RouteAssignment, currentLocation: any): Promise<boolean> {
    // Simple delay detection logic
    // In reality, this would compare current location/time with planned schedule
    return Math.random() > 0.8 // 20% chance of delay for demo
  }

  async handleRouteDelay(routeId: string, currentLocation: any): Promise<void> {
    const affectedParties = await this.getAffectedParties(routeId)

    for (const party of affectedParties) {
      await twilioService.sendNotification({
        recipients: [party.phone],
        message: `Route ${routeId} is running approximately 10 minutes late. Updated ETA will be sent shortly.`,
        channels: ["sms"],
        priority: "high",
      })
    }
  }

  async updateETAs(routeId: string, currentLocation: any): Promise<void> {
    // Calculate new ETAs based on current location and traffic
    console.log(`Updated ETAs for route ${routeId}`)
  }
}

// Initialize automation service
export const automationService = new AutomationService()

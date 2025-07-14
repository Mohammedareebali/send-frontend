// Twilio API Integration for Multi-channel Communication
export interface TwilioConfig {
  accountSid: string
  authToken: string
  serviceSid: string
  messagingServiceSid: string
}

export interface NotificationRequest {
  recipients: string[]
  message: string
  channels: ("sms" | "email" | "push")[]
  priority?: "high" | "normal" | "low"
  templateId?: string
  variables?: Record<string, string>
}

export interface ConversationRequest {
  participants: string[]
  friendlyName: string
  attributes?: Record<string, any>
}

export class TwilioService {
  private config: TwilioConfig

  constructor(config: TwilioConfig) {
    this.config = config
  }

  async sendNotification(request: NotificationRequest): Promise<any> {
    try {
      const notifications = []

      for (const recipient of request.recipients) {
        for (const channel of request.channels) {
          const notificationData: any = {
            Identity: recipient,
            Body: request.message,
            Priority: request.priority || "normal",
          }

          if (channel === "sms") {
            notificationData.Sms = {
              From: process.env.TWILIO_PHONE_NUMBER,
              To: recipient,
            }
          } else if (channel === "email") {
            notificationData.Email = {
              From: process.env.TWILIO_EMAIL_FROM,
              To: recipient,
              Subject: "SEN Transport Update",
            }
          }

          const flattened: Record<string, string> = {}
          for (const [key, value] of Object.entries(notificationData)) {
            if (value && typeof value === "object" && !Array.isArray(value)) {
              for (const [subKey, subValue] of Object.entries(value)) {
                if (subValue !== undefined) {
                  flattened[`${key}.${subKey}`] = String(subValue)
                }
              }
            } else if (value !== undefined) {
              flattened[key] = String(value)
            }
          }

          const response = await fetch(
            `https://notify.twilio.com/v1/Services/${this.config.serviceSid}/Notifications`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${Buffer.from(`${this.config.accountSid}:${this.config.authToken}`).toString("base64")}`,
              },
              body: new URLSearchParams(flattened).toString(),
            },
          )

          if (!response.ok) {
            throw new Error(`Twilio Notify API error: ${response.statusText}`)
          }

          notifications.push(await response.json())
        }
      }

      return notifications
    } catch (error) {
      console.error("Failed to send notification:", error)
      throw error
    }
  }

  async createConversation(request: ConversationRequest): Promise<any> {
    try {
      const response = await fetch("https://conversations.twilio.com/v1/Conversations", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(`${this.config.accountSid}:${this.config.authToken}`).toString("base64")}`,
        },
        body: new URLSearchParams({
          FriendlyName: request.friendlyName,
          Attributes: JSON.stringify(request.attributes || {}),
        }).toString(),
      })

      if (!response.ok) {
        throw new Error(`Twilio Conversations API error: ${response.statusText}`)
      }

      const conversation = await response.json()

      // Add participants
      for (const participant of request.participants) {
        await this.addParticipant(conversation.sid, participant)
      }

      return conversation
    } catch (error) {
      console.error("Failed to create conversation:", error)
      throw error
    }
  }

  async addParticipant(conversationSid: string, identity: string): Promise<any> {
    try {
      const response = await fetch(
        `https://conversations.twilio.com/v1/Conversations/${conversationSid}/Participants`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${Buffer.from(`${this.config.accountSid}:${this.config.authToken}`).toString("base64")}`,
          },
          body: new URLSearchParams({
            Identity: identity,
          }).toString(),
        },
      )

      if (!response.ok) {
        throw new Error(`Twilio Conversations API error: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Failed to add participant:", error)
      throw error
    }
  }

  async sendMessage(conversationSid: string, author: string, body: string): Promise<any> {
    try {
      const response = await fetch(`https://conversations.twilio.com/v1/Conversations/${conversationSid}/Messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(`${this.config.accountSid}:${this.config.authToken}`).toString("base64")}`,
        },
        body: new URLSearchParams({
          Author: author,
          Body: body,
        }).toString(),
      })

      if (!response.ok) {
        throw new Error(`Twilio Conversations API error: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Failed to send message:", error)
      throw error
    }
  }
}

// Initialize Twilio service
export const twilioService = new TwilioService({
  accountSid: process.env.TWILIO_ACCOUNT_SID || "demo-sid",
  authToken: process.env.TWILIO_AUTH_TOKEN || "demo-token",
  serviceSid: process.env.TWILIO_NOTIFY_SERVICE_SID || "demo-service",
  messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID || "demo-messaging",
})

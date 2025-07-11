"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Send, Mail, Smartphone, Clock, CheckCircle, AlertTriangle, Users, Zap } from "lucide-react"
import { twilioService } from "@/lib/api/twilio"

interface AutomatedMessage {
  id: string
  type: "delay_notification" | "cancellation_alert" | "eta_update" | "emergency"
  recipients: string[]
  message: string
  channels: ("sms" | "email" | "push")[]
  status: "sent" | "pending" | "failed"
  timestamp: string
  routeId?: string
}

interface MessageTemplate {
  id: string
  name: string
  type: string
  message: string
  channels: ("sms" | "email" | "push")[]
  variables: string[]
}

export function AutomatedCommunication() {
  const [recentMessages, setRecentMessages] = useState<AutomatedMessage[]>([])
  const [templates, setTemplates] = useState<MessageTemplate[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<string>("")
  const [customMessage, setCustomMessage] = useState("")
  const [selectedChannels, setSelectedChannels] = useState<("sms" | "email" | "push")[]>(["sms"])
  const [recipients, setRecipients] = useState("")

  useEffect(() => {
    // Load recent automated messages
    const mockMessages: AutomatedMessage[] = [
      {
        id: "1",
        type: "delay_notification",
        recipients: ["+447700900123", "+447700900456"],
        message: "Route R001 is running 10 minutes late. Updated ETA: 8:50 AM",
        channels: ["sms"],
        status: "sent",
        timestamp: "2 minutes ago",
        routeId: "R001",
      },
      {
        id: "2",
        type: "eta_update",
        recipients: ["+447700900789"],
        message: "Your child will be picked up at 8:25 AM (5 minutes earlier than scheduled)",
        channels: ["sms", "push"],
        status: "sent",
        timestamp: "5 minutes ago",
        routeId: "R002",
      },
      {
        id: "3",
        type: "cancellation_alert",
        recipients: ["+447700900321"],
        message: "URGENT: Driver replacement needed for Route R003. Backup driver assigned.",
        channels: ["sms", "email"],
        status: "pending",
        timestamp: "8 minutes ago",
        routeId: "R003",
      },
    ]

    const mockTemplates: MessageTemplate[] = [
      {
        id: "delay",
        name: "Route Delay Notification",
        type: "delay_notification",
        message: "Route {routeId} is running {delayMinutes} minutes late. Updated ETA: {newETA}",
        channels: ["sms"],
        variables: ["routeId", "delayMinutes", "newETA"],
      },
      {
        id: "cancellation",
        name: "Staff Cancellation Alert",
        type: "cancellation_alert",
        message: "URGENT: {staffType} cancellation for Route {routeId}. Replacement {staffName} assigned.",
        channels: ["sms", "email"],
        variables: ["staffType", "routeId", "staffName"],
      },
      {
        id: "eta_update",
        name: "ETA Update",
        type: "eta_update",
        message: "Pickup time update: Your child will be collected at {newTime} for Route {routeId}",
        channels: ["sms", "push"],
        variables: ["newTime", "routeId"],
      },
      {
        id: "emergency",
        name: "Emergency Alert",
        type: "emergency",
        message: "EMERGENCY: Route {routeId} - {emergencyDetails}. Please contact us immediately.",
        channels: ["sms", "email", "push"],
        variables: ["routeId", "emergencyDetails"],
      },
    ]

    setRecentMessages(mockMessages)
    setTemplates(mockTemplates)
  }, [])

  const handleSendMessage = async () => {
    try {
      const recipientList = recipients.split(",").map((r) => r.trim())

      await twilioService.sendNotification({
        recipients: recipientList,
        message: customMessage,
        channels: selectedChannels,
        priority: "high",
      })

      // Add to recent messages
      const newMessage: AutomatedMessage = {
        id: Date.now().toString(),
        type: "delay_notification",
        recipients: recipientList,
        message: customMessage,
        channels: selectedChannels,
        status: "sent",
        timestamp: "Just now",
      }

      setRecentMessages([newMessage, ...recentMessages])
      setCustomMessage("")
      setRecipients("")
    } catch (error) {
      console.error("Failed to send message:", error)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "failed":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "sms":
        return <Smartphone className="h-4 w-4 text-blue-500" />
      case "email":
        return <Mail className="h-4 w-4 text-green-500" />
      case "push":
        return <MessageSquare className="h-4 w-4 text-purple-500" />
      default:
        return <MessageSquare className="h-4 w-4 text-gray-500" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "delay_notification":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "cancellation_alert":
        return "bg-red-100 text-red-800 border-red-200"
      case "eta_update":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "emergency":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader className="border-b border-slate-700/50">
        <CardTitle className="flex items-center gap-2 text-slate-100">
          <Zap className="h-5 w-5 text-emerald-400" />
          Automated Communication Center
          <Badge variant="outline" className="ml-auto bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
            Twilio Integrated
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="recent" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-700/50 border-slate-600">
            <TabsTrigger
              value="recent"
              className="data-[state=active]:bg-slate-600 data-[state=active]:text-slate-100 text-slate-300"
            >
              Recent Messages
            </TabsTrigger>
            <TabsTrigger
              value="send"
              className="data-[state=active]:bg-slate-600 data-[state=active]:text-slate-100 text-slate-300"
            >
              Send Message
            </TabsTrigger>
            <TabsTrigger
              value="templates"
              className="data-[state=active]:bg-slate-600 data-[state=active]:text-slate-100 text-slate-300"
            >
              Templates
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recent" className="space-y-4 mt-6">
            <div className="space-y-3">
              {recentMessages.map((message) => (
                <div
                  key={message.id}
                  className="border border-slate-700/50 rounded-lg p-4 bg-slate-700/30 backdrop-blur-sm"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge className={`${getTypeColor(message.type)} bg-opacity-20 border-opacity-30`}>
                        {message.type.replace("_", " ").toUpperCase()}
                      </Badge>
                      {message.routeId && (
                        <Badge variant="outline" className="text-xs bg-slate-600/50 text-slate-300 border-slate-500">
                          {message.routeId}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(message.status)}
                      <span className="text-xs text-slate-400">{message.timestamp}</span>
                    </div>
                  </div>

                  <p className="text-sm mb-3 text-slate-200">{message.message}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-slate-400" />
                      <span className="text-xs text-slate-400">{message.recipients.length} recipients</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {message.channels.map((channel) => (
                        <div key={channel} className="flex items-center gap-1">
                          {getChannelIcon(channel)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="send" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block text-slate-200">Message Template</label>
                  <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                    <SelectTrigger className="bg-slate-700/50 border-slate-600 text-slate-200">
                      <SelectValue placeholder="Select a template or write custom message" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="custom" className="text-slate-200 focus:bg-slate-700">
                        Custom Message
                      </SelectItem>
                      {templates.map((template) => (
                        <SelectItem key={template.id} value={template.id} className="text-slate-200 focus:bg-slate-700">
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block text-slate-200">Recipients</label>
                  <Input
                    placeholder="Enter phone numbers or emails (comma separated)"
                    value={recipients}
                    onChange={(e) => setRecipients(e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-slate-200 placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block text-slate-200">Message</label>
                  <Textarea
                    placeholder="Type your message here..."
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    className="min-h-[100px] bg-slate-700/50 border-slate-600 text-slate-200 placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block text-slate-200">Channels</label>
                  <div className="flex gap-2">
                    {(["sms", "email", "push"] as const).map((channel) => (
                      <Button
                        key={channel}
                        variant={selectedChannels.includes(channel) ? "default" : "outline"}
                        size="sm"
                        className={
                          selectedChannels.includes(channel)
                            ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                            : "border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-slate-200"
                        }
                        onClick={() => {
                          if (selectedChannels.includes(channel)) {
                            setSelectedChannels(selectedChannels.filter((c) => c !== channel))
                          } else {
                            setSelectedChannels([...selectedChannels, channel])
                          }
                        }}
                      >
                        {getChannelIcon(channel)}
                        <span className="ml-1 capitalize">{channel}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleSendMessage}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  disabled={!customMessage || !recipients}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>

              <div className="bg-slate-700/30 p-4 rounded-lg border border-slate-600/50">
                <h3 className="font-medium mb-3 text-slate-200">Automation Rules</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                    <span className="text-slate-300">Auto-notify on route delays {">"} 5 minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                    <span className="text-slate-300">Staff cancellation alerts to management</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                    <span className="text-slate-300">ETA updates when route changes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                    <span className="text-slate-300">Emergency alerts to all stakeholders</span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-slate-800/50 rounded border border-slate-600/50">
                  <h4 className="font-medium text-sm mb-2 text-slate-200">Message Statistics</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                    <div>SMS Sent: 156</div>
                    <div>Emails: 89</div>
                    <div>Push: 67</div>
                    <div>Failed: 3</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {templates.map((template) => (
                <div key={template.id} className="border border-slate-700/50 rounded-lg p-4 bg-slate-700/30">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-slate-200">{template.name}</h3>
                    <Badge className={`${getTypeColor(template.type)} bg-opacity-20 border-opacity-30`}>
                      {template.type.replace("_", " ")}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-300 mb-3">{template.message}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {template.channels.map((channel) => (
                        <div key={channel}>{getChannelIcon(channel)}</div>
                      ))}
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-slate-200 bg-transparent"
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      Use Template
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

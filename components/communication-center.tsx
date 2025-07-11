"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Phone, Mail, AlertTriangle, CheckCircle, Clock, Send, Smartphone } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function CommunicationCenter() {
  const [selectedChannel, setSelectedChannel] = useState("sms")

  const communicationStats = {
    smsDelivered: 156,
    emailsSent: 89,
    callsMade: 23,
    pushNotifications: 67,
    failedDeliveries: 3,
  }

  const recentMessages = [
    {
      id: 1,
      type: "sms",
      recipient: "Parent - Sarah Johnson",
      message: "Route RT-001 running 10 mins late. ETA: 8:40 AM",
      status: "delivered",
      timestamp: "2m ago",
    },
    {
      id: 2,
      type: "push",
      recipient: "Driver - John Doe",
      message: "New pickup added: 123 Oak Street",
      status: "delivered",
      timestamp: "5m ago",
    },
    {
      id: 3,
      type: "email",
      recipient: "Council - Transport Dept",
      message: "Weekly compliance report attached",
      status: "pending",
      timestamp: "10m ago",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-emerald-400" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-400" />
      case "failed":
        return <AlertTriangle className="h-4 w-4 text-red-400" />
      default:
        return <Clock className="h-4 w-4 text-slate-400" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "sms":
        return <Smartphone className="h-4 w-4 text-blue-400" />
      case "email":
        return <Mail className="h-4 w-4 text-emerald-400" />
      case "push":
        return <MessageSquare className="h-4 w-4 text-purple-400" />
      case "call":
        return <Phone className="h-4 w-4 text-orange-400" />
      default:
        return <MessageSquare className="h-4 w-4 text-slate-400" />
    }
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <MessageSquare className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Communication Hub</h3>
              <p className="text-sm text-slate-400">Multi-channel messaging system</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
            Active
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-700/50 border border-slate-600/50">
            <TabsTrigger value="overview" className="data-[state=active]:bg-slate-600 data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="send" className="data-[state=active]:bg-slate-600 data-[state=active]:text-white">
              Send Message
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-slate-600 data-[state=active]:text-white">
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-700/30 border border-slate-600/50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Smartphone className="h-4 w-4 text-blue-400" />
                  <span className="text-sm font-medium text-slate-300">SMS</span>
                </div>
                <div className="text-xl font-bold text-white">{communicationStats.smsDelivered}</div>
                <div className="text-xs text-slate-400">Delivered today</div>
              </div>

              <div className="bg-slate-700/30 border border-slate-600/50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm font-medium text-slate-300">Email</span>
                </div>
                <div className="text-xl font-bold text-white">{communicationStats.emailsSent}</div>
                <div className="text-xs text-slate-400">Sent today</div>
              </div>

              <div className="bg-slate-700/30 border border-slate-600/50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="h-4 w-4 text-purple-400" />
                  <span className="text-sm font-medium text-slate-300">Push</span>
                </div>
                <div className="text-xl font-bold text-white">{communicationStats.pushNotifications}</div>
                <div className="text-xs text-slate-400">Notifications</div>
              </div>

              <div className="bg-slate-700/30 border border-slate-600/50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  <span className="text-sm font-medium text-slate-300">Failed</span>
                </div>
                <div className="text-xl font-bold text-white">{communicationStats.failedDeliveries}</div>
                <div className="text-xs text-slate-400">Delivery issues</div>
              </div>
            </div>

            {/* Integration Status */}
            <div className="bg-slate-700/20 border border-slate-600/30 rounded-lg p-4">
              <h4 className="font-medium text-slate-200 mb-3 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400" />
                Communication Services
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span className="text-sm text-slate-300">Twilio Messaging</span>
                  </div>
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-xs">
                    Connected
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span className="text-sm text-slate-300">Email Service</span>
                  </div>
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-xs">
                    Active
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span className="text-sm text-slate-300">Push Notifications</span>
                  </div>
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-xs">
                    Ready
                  </Badge>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="send" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Message Type</label>
                  <div className="flex gap-2">
                    {["sms", "email", "push"].map((type) => (
                      <Button
                        key={type}
                        variant={selectedChannel === type ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedChannel(type)}
                        className={`capitalize ${
                          selectedChannel === type
                            ? "bg-purple-600 hover:bg-purple-700 text-white"
                            : "bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                        }`}
                      >
                        {getTypeIcon(type)}
                        <span className="ml-1">{type}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Recipients</label>
                  <Input
                    placeholder="Select recipients..."
                    className="bg-slate-700/50 border-slate-600 text-slate-200 placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Message</label>
                  <Textarea
                    placeholder="Type your message here..."
                    className="bg-slate-700/50 border-slate-600 text-slate-200 placeholder:text-slate-400 min-h-[100px]"
                  />
                </div>

                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>

              <div className="bg-slate-700/20 border border-slate-600/30 rounded-lg p-4">
                <h4 className="font-medium text-slate-200 mb-3">Quick Templates</h4>
                <div className="space-y-2">
                  {[
                    "Route delayed - ETA update",
                    "Driver replacement notification",
                    "Weather alert - service update",
                    "Pickup location change",
                  ].map((template, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-left bg-slate-700/30 border-slate-600/50 text-slate-300 hover:bg-slate-700 hover:text-white"
                    >
                      {template}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4 mt-4">
            <div className="space-y-3">
              {recentMessages.map((message) => (
                <div
                  key={message.id}
                  className="flex items-start gap-3 p-4 bg-slate-700/30 border border-slate-600/50 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    {getTypeIcon(message.type)}
                    {getStatusIcon(message.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm text-slate-200">{message.recipient}</span>
                      <Badge variant="outline" className="text-xs bg-slate-600/50 text-slate-300 border-slate-500/50">
                        {message.type.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-300">{message.message}</p>
                    <p className="text-xs text-slate-400 mt-1">{message.timestamp}</p>
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

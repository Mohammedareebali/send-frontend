"use client"

import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { StaffList } from "@/components/staff-list"
import { User, Users } from "lucide-react"
import { useDebounce } from "@/hooks/use-debounce"

export function StaffManagementCenter() {
  const [query, setQuery] = React.useState("")
  const debounced = useDebounce(query, 300)

  return (
    <div className="space-y-6">
      {/* Search / filters */}
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search staff…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-sm"
        />
        {query && (
          <Button variant="ghost" size="icon" onClick={() => setQuery("")} aria-label="Clear">
            ✕
          </Button>
        )}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <Users className="h-4 w-4" /> All
          </TabsTrigger>
          <TabsTrigger value="drivers" className="flex items-center gap-2">
            <User className="h-4 w-4" /> Drivers
          </TabsTrigger>
          <TabsTrigger value="assistants" className="flex items-center gap-2">
            <User className="h-4 w-4" /> Passenger Assistants
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <StaffList search={debounced} role="all" />
        </TabsContent>
        <TabsContent value="drivers">
          <StaffList search={debounced} role="driver" />
        </TabsContent>
        <TabsContent value="assistants">
          <StaffList search={debounced} role="assistant" />
        </TabsContent>
      </Tabs>
    </div>
  )
}

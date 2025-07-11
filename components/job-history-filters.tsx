import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import React, { useState } from 'react';

export function JobHistoryFilters() {
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="search">Search</Label>
            <Input id="search" placeholder="Search by run number, driver, etc." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="council">Council</Label>
            <Select>
              <SelectTrigger id="council">
                <SelectValue placeholder="Select council" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Councils</SelectItem>
                <SelectItem value="council1">Council 1</SelectItem>
                <SelectItem value="council2">Council 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Start Date</Label>
            <DatePicker 
              date={startDate} 
              onDateChange={setStartDate} 
              placeholder="Select start date"
            />
          </div>
          <div className="space-y-2">
            <Label>End Date</Label>
            <DatePicker 
              date={endDate} 
              onDateChange={setEndDate} 
              placeholder="Select end date"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit2 } from 'lucide-react'

interface AddressLookupProps {
  onAddressSelect: (address: string) => void
  selectedAddress?: string
  className?: string
}

export function AddressLookup({ onAddressSelect, selectedAddress, className }: AddressLookupProps) {
  const [postcode, setPostcode] = useState('')
  const [addresses, setAddresses] = useState<string[]>([])
  const [isEditing, setIsEditing] = useState(false)

  const lookupAddresses = async () => {
    // This is a mock API call. In a real application, you would call an actual API here.
    // For example: const result = await fetch(`https://api.postcodes.io/postcodes/${postcode}/autocomplete`)
    setAddresses([
      '1 High Street, Town, County, ' + postcode,
      '2 High Street, Town, County, ' + postcode,
      '3 High Street, Town, County, ' + postcode,
    ])
  }

  return (
    <div className={className}>
      {selectedAddress && !isEditing ? (
        <div className="flex items-center">
          <Input value={selectedAddress} readOnly className="flex-grow" />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsEditing(true)} 
            className="ml-2"
          >
            <Edit2 className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <>
          <div className="flex space-x-2">
            <Input 
              placeholder="Enter postcode" 
              value={postcode} 
              onChange={(e) => setPostcode(e.target.value)} 
            />
            <Button onClick={lookupAddresses}>Lookup</Button>
          </div>
          {addresses.length > 0 && (
            <Select 
              onValueChange={(value) => {
                onAddressSelect(value)
                setIsEditing(false)
              }}
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select address" />
              </SelectTrigger>
              <SelectContent>
                {addresses.map((address, index) => (
                  <SelectItem key={index} value={address}>
                    {address}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </>
      )}
    </div>
  )
}

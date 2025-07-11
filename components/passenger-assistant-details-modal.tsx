import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PassengerAssistantDetails } from "@/components/passenger-assistant-details"

interface PassengerAssistantDetailsModalProps {
  paId: string
  isOpen: boolean
  onClose: () => void
}

export function PassengerAssistantDetailsModal({ paId, isOpen, onClose }: PassengerAssistantDetailsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Passenger Assistant Details</DialogTitle>
        </DialogHeader>
        <PassengerAssistantDetails paId={paId} />
      </DialogContent>
    </Dialog>
  )
}

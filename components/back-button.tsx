import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface BackButtonProps {
  href: string
  label: string
}

export function BackButton({ href, label }: BackButtonProps) {
  return (
    <Button variant="ghost" asChild className="mb-4">
      <Link href={href} className="flex items-center">
        <ChevronLeft className="mr-2 h-4 w-4" />
        {label}
      </Link>
    </Button>
  )
}

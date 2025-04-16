"use client"

import { Button } from "@/components/ui/button"

interface EntryChargeProps {
  amount: number
  coin: string
  onSubmit: () => void
}

export default function EntryCharge({ amount, coin, onSubmit }: EntryChargeProps) {
  return (
    <div className="space-y-4 p-4 rounded-lg border-2 border-black">
      <div className="text-center">
        <p className="text-sm text-muted-foreground">entry charge</p>
        <p className="text-2xl font-bold pixel-text">
          {amount} {coin}
        </p>
      </div>
      
      <Button 
        onClick={onSubmit}
        className="w-full pixel-button bg-solana-purple hover:bg-solana-purple/90"
      >
        Submit
      </Button>
    </div>
  )
} 
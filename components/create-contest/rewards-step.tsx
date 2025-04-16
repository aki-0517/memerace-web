"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface RewardsStepProps {
  formData: any
  updateFormData: (data: any) => void
}

export default function RewardsStep({ formData, updateFormData }: RewardsStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold pixel-text text-transparent bg-clip-text bg-gradient-to-r from-solana-purple to-solana-green">
          Set Rewards & Fees
        </h2>
        <p className="text-muted-foreground">Define the reward structure and entry/voting fees</p>
      </div>

      <div className="space-y-4">
        <div className="grid gap-2">
          <h3 className="text-lg font-medium">Reward Pool</h3>
          <div className="rounded-lg border-2 border-black p-4 bg-card/50">
            <p className="text-sm">
              The reward pool will be created from all collected entry fees. 100% of entry fees will be distributed to
              winners.
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm">🥇 1st Place</p>
                <p className="font-medium">50% of pool</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm">🥈 2nd Place</p>
                <p className="font-medium">30% of pool</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm">🥉 3rd Place</p>
                <p className="font-medium">20% of pool</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-2">
          <h3 className="text-lg font-medium">Voting Restriction</h3>
          <div className="rounded-lg border-2 border-black p-4 bg-card/50">
            <p className="text-sm">
              Only wallets holding the selected memecoin will be able to vote in this contest. This ensures that
              community members have a say in the winners.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="entryFee">Entry Fee ({formData.coin})</Label>
            <Input
              id="entryFee"
              type="number"
              min="0"
              step="0.01"
              value={formData.entryFee}
              onChange={(e) => updateFormData({ entryFee: Number.parseFloat(e.target.value) })}
            />
            <p className="text-xs text-muted-foreground">100% goes to reward pool</p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="votingFee">Voting Fee ({formData.coin})</Label>
            <Input
              id="votingFee"
              type="number"
              min="0"
              step="0.01"
              value={formData.votingFee}
              onChange={(e) => updateFormData({ votingFee: Number.parseFloat(e.target.value) })}
            />
            <p className="text-xs text-muted-foreground">Requires holding {formData.coin}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface ContestTypeStepProps {
  formData: any
  updateFormData: (data: any) => void
}

export default function ContestTypeStep({ formData, updateFormData }: ContestTypeStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold pixel-text text-transparent bg-clip-text bg-gradient-to-r from-solana-purple to-solana-green">
          Select Contest Type
        </h2>
        <p className="text-muted-foreground">Choose how participants will enter and vote in your contest</p>
      </div>

      <RadioGroup
        value={formData.contestType}
        onValueChange={(value) => updateFormData({ contestType: value })}
        className="grid gap-4"
      >
        <div className="rounded-lg border-2 border-black p-4 hover:border-solana-purple transition-colors">
          <div className="flex items-start space-x-4">
            <RadioGroupItem value="open" id="open" className="mt-1" />
            <div className="flex-1">
              <Label htmlFor="open" className="text-base font-medium">
                Open Contest
              </Label>
              <p className="text-sm text-muted-foreground">
                Anyone can submit entries and vote. No entry fee required.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border-2 border-black p-4 hover:border-solana-purple transition-colors">
          <div className="flex items-start space-x-4">
            <RadioGroupItem value="entry-based" id="entry-based" className="mt-1" />
            <div className="flex-1">
              <Label htmlFor="entry-based" className="text-base font-medium">
                Entry-Based Contest
              </Label>
              <p className="text-sm text-muted-foreground">
                Participants pay an entry fee to submit their memes. Voting is free.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border-2 border-black p-4 hover:border-solana-purple transition-colors">
          <div className="flex items-start space-x-4">
            <RadioGroupItem value="voting-based" id="voting-based" className="mt-1" />
            <div className="flex-1">
              <Label htmlFor="voting-based" className="text-base font-medium">
                Voting-Based Contest
              </Label>
              <p className="text-sm text-muted-foreground">
                Submission is free, but users pay to vote with meme coins.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border-2 border-black p-4 hover:border-solana-purple transition-colors">
          <div className="flex items-start space-x-4">
            <RadioGroupItem value="premium" id="premium" className="mt-1" />
            <div className="flex-1">
              <Label htmlFor="premium" className="text-base font-medium">
                Premium Contest
              </Label>
              <p className="text-sm text-muted-foreground">
                Both entry and voting require payment. Highest potential rewards.
              </p>
            </div>
          </div>
        </div>
      </RadioGroup>
    </div>
  )
}

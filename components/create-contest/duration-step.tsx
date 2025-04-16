"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface DurationStepProps {
  formData: any
  updateFormData: (data: any) => void
}

export default function DurationStep({ formData, updateFormData }: DurationStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold pixel-text text-transparent bg-clip-text bg-gradient-to-r from-solana-purple to-solana-green">
          Define Duration
        </h2>
        <p className="text-muted-foreground">Set the start and end dates for your contest</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Submission Period</h3>

          <div className="grid gap-2">
            <Label htmlFor="submissionStart">Start Date</Label>
            <Input
              id="submissionStart"
              type="datetime-local"
              value={formData.startDate}
              onChange={(e) => updateFormData({ startDate: e.target.value })}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="submissionEnd">End Date</Label>
            <Input
              id="submissionEnd"
              type="datetime-local"
              value={formData.endDate}
              onChange={(e) => updateFormData({ endDate: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Voting Period</h3>

          <div className="grid gap-2">
            <Label htmlFor="votingStart">Start Date</Label>
            <Input
              id="votingStart"
              type="datetime-local"
              value={formData.votingStartDate || formData.startDate}
              onChange={(e) => updateFormData({ votingStartDate: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">Leave empty to start voting immediately with submissions</p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="votingEnd">End Date</Label>
            <Input
              id="votingEnd"
              type="datetime-local"
              value={formData.votingEndDate || formData.endDate}
              onChange={(e) => updateFormData({ votingEndDate: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">Leave empty to end voting with the submission deadline</p>
          </div>
        </div>
      </div>
    </div>
  )
}

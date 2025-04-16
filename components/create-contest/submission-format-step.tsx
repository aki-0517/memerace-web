"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface SubmissionFormatStepProps {
  formData: any
  updateFormData: (data: any) => void
}

export default function SubmissionFormatStep({ formData, updateFormData }: SubmissionFormatStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold pixel-text text-transparent bg-clip-text bg-gradient-to-r from-solana-purple to-solana-green">
          Choose Submission Format
        </h2>
        <p className="text-muted-foreground">Define what type of content participants can submit</p>
      </div>

      <RadioGroup
        value={formData.submissionFormat}
        onValueChange={(value) => updateFormData({ submissionFormat: value })}
        className="grid gap-4"
      >
        <div className="rounded-lg border-2 border-black p-4 hover:border-solana-purple transition-colors">
          <div className="flex items-start space-x-4">
            <RadioGroupItem value="title-only" id="title-only" className="mt-1" />
            <div className="flex-1">
              <Label htmlFor="title-only" className="text-base font-medium">
                Title Only
              </Label>
              <p className="text-sm text-muted-foreground">
                Participants can only submit a title (text-based contest).
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border-2 border-black p-4 hover:border-solana-purple transition-colors">
          <div className="flex items-start space-x-4">
            <RadioGroupItem value="image-only" id="image-only" className="mt-1" />
            <div className="flex-1">
              <Label htmlFor="image-only" className="text-base font-medium">
                Image Only
              </Label>
              <p className="text-sm text-muted-foreground">Participants submit only an image without a title.</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border-2 border-black p-4 hover:border-solana-purple transition-colors">
          <div className="flex items-start space-x-4">
            <RadioGroupItem value="image-title" id="image-title" className="mt-1" />
            <div className="flex-1">
              <Label htmlFor="image-title" className="text-base font-medium">
                Image + Title
              </Label>
              <p className="text-sm text-muted-foreground">
                Participants submit both an image and a title (most common).
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border-2 border-black p-4 hover:border-solana-purple transition-colors">
          <div className="flex items-start space-x-4">
            <RadioGroupItem value="tweet" id="tweet" className="mt-1" />
            <div className="flex-1">
              <Label htmlFor="tweet" className="text-base font-medium">
                Tweet
              </Label>
              <p className="text-sm text-muted-foreground">
                Participants submit a link to their tweet containing the meme.
              </p>
            </div>
          </div>
        </div>
      </RadioGroup>

      <div className="flex items-center space-x-2">
        <Switch
          id="allowDescription"
          checked={formData.allowDescription}
          onCheckedChange={(checked) => updateFormData({ allowDescription: checked })}
        />
        <Label htmlFor="allowDescription">Allow additional description field</Label>
      </div>
    </div>
  )
}

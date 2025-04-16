"use client"

import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface RulesStepProps {
  formData: any
  updateFormData: (data: any) => void
}

export default function RulesStep({ formData, updateFormData }: RulesStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold pixel-text text-transparent bg-clip-text bg-gradient-to-r from-solana-purple to-solana-green">
          Establish Rules
        </h2>
        <p className="text-muted-foreground">Define the rules and guidelines for your contest</p>
      </div>

      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="rules">Contest Rules</Label>
          <Textarea
            id="rules"
            placeholder="Describe the rules of your contest..."
            rows={5}
            value={formData.rules}
            onChange={(e) => updateFormData({ rules: e.target.value })}
          />
          <p className="text-xs text-muted-foreground">
            Markdown formatting is supported. Be clear about what is allowed and what isn't.
          </p>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="evaluationCriteria">Evaluation Criteria</Label>
          <Textarea
            id="evaluationCriteria"
            placeholder="Describe how entries will be evaluated..."
            rows={3}
            value={formData.evaluationCriteria}
            onChange={(e) => updateFormData({ evaluationCriteria: e.target.value })}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="contactInfo">Contact Information</Label>
          <Textarea
            id="contactInfo"
            placeholder="Provide contact information (e.g., Telegram handle)..."
            rows={2}
            value={formData.contactInfo}
            onChange={(e) => updateFormData({ contactInfo: e.target.value })}
          />
        </div>
      </div>
    </div>
  )
}

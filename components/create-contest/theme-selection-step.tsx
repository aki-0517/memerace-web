"use client"

import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { memeThemes } from "@/lib/mock-data"

interface ThemeSelectionStepProps {
  formData: any
  updateFormData: (data: any) => void
}

export default function ThemeSelectionStep({ formData, updateFormData }: ThemeSelectionStepProps) {
  const [selectedTheme, setSelectedTheme] = useState(formData.themeId || "")

  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId)

    const theme = memeThemes.find((t) => t.id === themeId)
    if (theme) {
      updateFormData({
        themeId: theme.id,
        themeName: theme.name,
        themeDescription: theme.description,
        coin: theme.coin === "Custom" ? "" : theme.coin,
      })
    }
  }

  const handleCoinSelect = (coin: string) => {
    updateFormData({
      themeId: coin.toLowerCase(),
      coin: coin,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold pixel-text text-transparent bg-clip-text bg-gradient-to-r from-solana-purple to-solana-green">
          Select Memecoin
        </h2>
        <p className="text-muted-foreground">Choose a memecoin for your contest</p>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="coin">Memecoin</Label>
        <Select value={formData.coin} onValueChange={handleCoinSelect}>
          <SelectTrigger id="coin">
            <SelectValue placeholder="Select memecoin" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="BONK">BONK</SelectItem>
            <SelectItem value="WIF">WIF</SelectItem>
            <SelectItem value="POPCAT">POPCAT</SelectItem>
            <SelectItem value="SLOTH">SLOTH</SelectItem>
            <SelectItem value="BOOK">BOOK</SelectItem>
            <SelectItem value="BODEN">BODEN</SelectItem>
            <SelectItem value="SLERF">SLERF</SelectItem>
            <SelectItem value="SOL">SOL</SelectItem>
            <SelectItem value="OTHER">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {formData.coin === "OTHER" && (
        <div className="grid gap-2">
          <Label htmlFor="customCoin">Custom Coin Name</Label>
          <Input
            id="customCoin"
            placeholder="Enter custom coin name"
            onChange={(e) => updateFormData({ coin: e.target.value })}
          />
        </div>
      )}
    </div>
  )
}

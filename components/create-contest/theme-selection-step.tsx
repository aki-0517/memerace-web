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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold pixel-text text-transparent bg-clip-text bg-gradient-to-r from-solana-purple to-solana-green">
          Select Meme Theme
        </h2>
        <p className="text-muted-foreground">Choose a theme for your meme contest</p>
      </div>

      <RadioGroup value={selectedTheme} onValueChange={handleThemeSelect} className="grid gap-4 md:grid-cols-2">
        {memeThemes.map((theme) => (
          <div
            key={theme.id}
            className="rounded-lg border-2 border-black p-4 hover:border-solana-purple transition-colors"
          >
            <div className="flex items-start space-x-4">
              <RadioGroupItem value={theme.id} id={theme.id} className="mt-1" />
              <div className="flex-1">
                <Label htmlFor={theme.id} className="text-base font-medium">
                  {theme.name}
                </Label>
                <p className="text-sm text-muted-foreground mb-2">{theme.description}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">{theme.coin}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </RadioGroup>

      {selectedTheme === "custom-theme" && (
        <div className="space-y-4 mt-6 p-4 border-2 border-solana-purple rounded-lg">
          <h3 className="text-lg font-medium">Custom Theme Details</h3>

          <div className="grid gap-2">
            <Label htmlFor="themeName">Theme Name</Label>
            <Input
              id="themeName"
              placeholder="Enter your theme name"
              value={formData.themeName}
              onChange={(e) => updateFormData({ themeName: e.target.value })}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="themeDescription">Theme Description</Label>
            <Textarea
              id="themeDescription"
              placeholder="Describe your theme"
              value={formData.themeDescription}
              onChange={(e) => updateFormData({ themeDescription: e.target.value })}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="coin">Memecoin</Label>
            <Select value={formData.coin} onValueChange={(value) => updateFormData({ coin: value })}>
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
      )}
    </div>
  )
}

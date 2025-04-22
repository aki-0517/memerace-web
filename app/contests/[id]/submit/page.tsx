"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useWallet } from "@/components/wallet-provider"
import { mockContests } from "@/lib/mock-data"
import { Separator } from "@/components/ui/separator"
import { Bold, Italic, LinkIcon, List, ListOrdered, Quote, ImageIcon } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WalletConnectButton } from "@/components/wallet-connect-button"

export default function SubmitEntryPage() {
  const { id } = useParams()
  const router = useRouter()
  const { isConnected, connect, address } = useWallet()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Find the contest from mock data
  const contest = mockContests.find((c) => c.id === id) || mockContests[0]

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file.name)
      const reader = new FileReader()
      reader.onload = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isConnected) {
      connect()
      return
    }

    if (!title || !selectedImage) {
      return
    }

    setIsSubmitting(true)

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false)
      router.push(`/contests/${id}`)
    }, 1500)
  }

  if (!isConnected) {
    return (
      <div className="container flex flex-col items-center justify-center py-16">
        <Card className="mx-auto w-full max-w-md pixel-card">
          <CardContent className="p-6 text-center">
            <h1 className="mb-4 text-2xl font-bold">Connect Wallet</h1>
            <p className="mb-6 text-muted-foreground">You need to connect your wallet to create a contest.</p>
            <WalletConnectButton className="w-full" />
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold pixel-text text-transparent bg-clip-text bg-gradient-to-r from-solana-purple to-solana-green">
          Submit Entry
        </h1>
        <p className="text-muted-foreground">
          Contest: <span className="font-medium">{contest.title}</span>
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="pixel-card">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border-2 border-black">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User avatar" />
                    <AvatarFallback>{address ? address.substring(0, 2).toUpperCase() : "U"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm text-muted-foreground">Normal text</p>
                    <p className="text-xs text-muted-foreground truncate w-32 md:w-auto">
                      {address ? `0x${address.substring(2, 6)}...${address.substring(address.length - 4)}` : ""}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Input
                    placeholder="Entry title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-lg font-medium"
                    required
                  />

                  <div className="flex flex-wrap gap-1 border-y border-border py-2">
                    <Toggle aria-label="Toggle bold">
                      <Bold className="h-4 w-4" />
                    </Toggle>
                    <Toggle aria-label="Toggle italic">
                      <Italic className="h-4 w-4" />
                    </Toggle>
                    <Toggle aria-label="Add link">
                      <LinkIcon className="h-4 w-4" />
                    </Toggle>
                    <Toggle aria-label="Toggle bullet list">
                      <List className="h-4 w-4" />
                    </Toggle>
                    <Toggle aria-label="Toggle ordered list">
                      <ListOrdered className="h-4 w-4" />
                    </Toggle>
                    <Toggle aria-label="Toggle blockquote">
                      <Quote className="h-4 w-4" />
                    </Toggle>
                    <Toggle aria-label="Add image" pressed={!!selectedImage} onPressedChange={triggerFileInput}>
                      <ImageIcon className="h-4 w-4" />
                    </Toggle>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageSelect}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>

                  <Textarea
                    placeholder="Add a description for your meme (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                  />

                  <Separator className="my-4" />

                  {previewUrl ? (
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg border-4 border-black">
                      <img
                        src={previewUrl || "/placeholder.svg"}
                        alt="Preview"
                        className="h-full w-full object-contain"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute right-2 top-2"
                        onClick={() => {
                          setSelectedImage(null)
                          setPreviewUrl(null)
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div
                      onClick={triggerFileInput}
                      className="flex aspect-video w-full cursor-pointer flex-col items-center justify-center rounded-lg border-4 border-dashed border-muted-foreground/50 bg-muted/50 p-12 text-center hover:bg-muted transition-colors"
                    >
                      <ImageIcon className="mb-4 h-12 w-12 text-muted-foreground" />
                      <p className="mb-2 text-xl font-medium">Upload your meme</p>
                      <p className="text-sm text-muted-foreground">Drag and drop or click to browse (JPG, PNG, GIF)</p>
                    </div>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="pixel-card">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="rounded-lg border-2 border-black bg-card p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">entry charge</p>
                    <p className="font-medium">0.5 BONK</p>
                  </div>
                </div>

                <Button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={!title || !selectedImage || isSubmitting}
                  className="w-full pixel-button bg-solana-purple hover:bg-solana-purple/90 h-12 text-lg"
                >
                  {isSubmitting ? "Submitting..." : "submit"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ThumbsUp } from "lucide-react"
import { cn } from "@/lib/utils"
import MemeEntryModal from "./meme-entry-modal"

interface MemeEntryProps {
  entry: any
  contestStatus: string
  contestCoin: string
}

export default function MemeEntry({ entry, contestStatus, contestCoin }: MemeEntryProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Card
        className={cn(
          "overflow-hidden transition-all duration-200 hover:shadow-md pixel-card",
          entry.rank === 1 && "border-meme-yellow",
          entry.rank === 2 && "border-gray-400",
          entry.rank === 3 && "border-amber-700",
        )}
      >
        <div className="relative">
          <img
            src={entry.image || "/placeholder.svg?height=300&width=400"}
            alt={entry.title}
            className="h-64 w-full object-cover border-b-4 border-black"
          />
          {entry.rank && entry.rank <= 3 && (
            <div className="absolute left-3 top-3">
              <Badge
                variant="default"
                className={cn(
                  "text-white",
                  entry.rank === 1 && "bg-meme-yellow text-black",
                  entry.rank === 2 && "bg-gray-400",
                  entry.rank === 3 && "bg-amber-700",
                )}
              >
                {entry.rank === 1 ? "🥇 1st Place" : entry.rank === 2 ? "🥈 2nd Place" : "🥉 3rd Place"}
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          <div className="mb-2 flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={`/placeholder.svg?height=24&width=24`} alt={entry.creator} />
              <AvatarFallback>{entry.creator.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">{entry.creator}</span>
          </div>

          <h3 className="mb-2 text-lg font-semibold">{entry.title}</h3>

          {entry.description && (
            <p className="mb-4 text-sm text-muted-foreground">{entry.description}</p>
          )}
        </CardContent>

        <CardFooter className="border-t bg-muted/50 p-4">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <ThumbsUp className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{entry.votes}</span>
              <span className="text-sm text-muted-foreground">votes</span>
            </div>

            <Button
              variant="default"
              size="sm"
              onClick={() => setIsModalOpen(true)}
              className="bg-solana-purple hover:bg-solana-purple/90 pixel-button"
            >
              Details
            </Button>
          </div>
        </CardFooter>
      </Card>

      <MemeEntryModal
        entry={entry}
        contestStatus={contestStatus}
        contestCoin={contestCoin}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}

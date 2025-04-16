"use client"

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ThumbsUp } from "lucide-react"
import { useWallet } from "@/components/wallet-provider"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface MemeEntryModalProps {
  entry: any
  contestStatus: string
  contestCoin: string
  isOpen: boolean
  onClose: () => void
}

export default function MemeEntryModal({
  entry,
  contestStatus,
  contestCoin,
  isOpen,
  onClose,
}: MemeEntryModalProps) {
  const { isConnected, connect } = useWallet()
  const [votes, setVotes] = useState(entry.votes)
  const [hasVoted, setHasVoted] = useState(false)
  const [isVoting, setIsVoting] = useState(false)

  const handleVote = () => {
    if (!isConnected) {
      connect()
      return
    }

    if (contestStatus !== "live" || hasVoted || isVoting) return

    setIsVoting(true)

    // Simulate voting process
    setTimeout(() => {
      setVotes(votes + 1)
      setHasVoted(true)
      setIsVoting(false)
    }, 1000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[95vh] w-[95vw] max-w-[800px] overflow-hidden p-0 pixel-card">
        <DialogTitle className="sr-only">
          {entry.title} - Meme Entry Details
        </DialogTitle>
        
        <div className="relative h-[75vh]">
          <img
            src={entry.image || "/placeholder.svg?height=400&width=600"}
            alt={entry.title}
            className="w-full h-full object-contain border-b-4 border-black bg-black/50"
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

        <div className="flex items-center justify-between p-4 bg-background/95 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={entry.creator} />
              <AvatarFallback>{entry.creator.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{entry.title}</p>
              <p className="text-sm text-muted-foreground">{entry.creator}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <ThumbsUp className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{votes}</span>
            </div>

            {contestStatus === "live" && (
              <Button
                variant={hasVoted ? "outline" : "default"}
                size="sm"
                onClick={handleVote}
                disabled={hasVoted || isVoting}
                className={
                  hasVoted
                    ? "border-2 border-solana-purple"
                    : "bg-solana-purple hover:bg-solana-purple/90 pixel-button"
                }
                title={`Requires ${contestCoin} in wallet`}
              >
                {isVoting ? "Voting..." : hasVoted ? "Voted" : `Vote (${contestCoin})`}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 
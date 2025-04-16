"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ThumbsUp } from "lucide-react"
import { useWallet } from "@/components/wallet-provider"
import { cn } from "@/lib/utils"

interface MemeEntryProps {
  entry: any
  contestStatus: string
  contestCoin: string
}

export default function MemeEntry({ entry, contestStatus, contestCoin }: MemeEntryProps) {
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

        {entry.description && <p className="mb-4 text-sm text-muted-foreground">{entry.description}</p>}
      </CardContent>

      <CardFooter className="border-t bg-muted/50 p-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{votes}</span>
            <span className="text-sm text-muted-foreground">votes</span>
          </div>

          {contestStatus === "live" && (
            <Button
              variant={hasVoted ? "outline" : "default"}
              size="sm"
              onClick={handleVote}
              disabled={hasVoted || isVoting}
              className={
                hasVoted ? "border-2 border-solana-purple" : "bg-solana-purple hover:bg-solana-purple/90 pixel-button"
              }
              title={`Requires ${contestCoin} in wallet`}
            >
              {isVoting ? "Voting..." : hasVoted ? "Voted" : `Vote (${contestCoin} holders)`}
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatTimeLeft } from "@/lib/utils"

interface ContestCardProps {
  contest: any
}

export default function ContestCard({ contest }: ContestCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md pixel-card bg-card">
      <div className="relative">
        <img
          src={contest.image || "/placeholder.svg?height=200&width=400"}
          alt={contest.title}
          className="h-48 w-full object-cover border-b-4 border-black"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge
            variant={contest.status === "live" ? "default" : contest.status === "upcoming" ? "outline" : "secondary"}
            className={contest.status === "live" ? "bg-meme-pink text-white" : ""}
          >
            {contest.status.charAt(0).toUpperCase() + contest.status.slice(1)}
          </Badge>
          <Badge variant="outline" className="bg-background/80 backdrop-blur-sm border-2">
            {contest.coin}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="mb-2 flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={`/placeholder.svg?height=24&width=24`} alt={contest.organizer} />
            <AvatarFallback>{contest.organizer.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">{contest.organizer}</span>
        </div>

        <h3 className="mb-2 line-clamp-2 text-xl font-semibold">
          <Link href={`/contests/${contest.id}`} className="hover:underline">
            {contest.title}
          </Link>
        </h3>

        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{contest.description}</p>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Entry Fee</p>
            <p className="font-medium">
              {contest.entryFee} {contest.coin}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Est. Pool</p>
            <p className="font-medium">
              {contest.entryFee * 10} {contest.coin}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t-4 border-black bg-muted/50 p-4">
        <div className="flex w-full items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">
              {contest.status === "upcoming" ? "Starts in" : contest.status === "live" ? "Ends in" : "Ended"}
            </p>
            <p className="font-medium">
              {contest.status === "past" ? "Completed" : formatTimeLeft(contest.endTimestamp)}
            </p>
          </div>
          <Link href={`/contests/${contest.id}`} className="text-sm font-medium text-primary hover:underline">
            View Details
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}

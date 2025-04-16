"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { mockContests, mockEntries } from "@/lib/mock-data"
import { useWallet } from "@/components/wallet-provider"
import MemeEntry from "@/components/meme-entry"
import { formatTimeLeft } from "@/lib/utils"

export default function ContestDetailPage() {
  const { id } = useParams()
  const { isConnected, connect } = useWallet()
  const [activeTab, setActiveTab] = useState("entries")

  // Find the contest from mock data
  const contest = mockContests.find((c) => c.id === id) || mockContests[0]
  const entries = mockEntries.filter((entry) => entry.contestId === contest.id)

  // Sort entries by votes (descending)
  const sortedEntries = [...entries].sort((a, b) => b.votes - a.votes)

  return (
    <div className="container py-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Badge
              variant={contest.status === "live" ? "default" : contest.status === "upcoming" ? "outline" : "secondary"}
            >
              {contest.status.charAt(0).toUpperCase() + contest.status.slice(1)}
            </Badge>
            <Badge variant="outline">{contest.coin}</Badge>
          </div>
          <h1 className="text-3xl font-bold pixel-text md:text-4xl">{contest.title}</h1>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          {contest.status === "live" && (
            <Button
              onClick={() => (window.location.href = `/contests/${id}/submit`)}
              className="pixel-button bg-solana-purple hover:bg-solana-purple/90"
            >
              Submit Entry
            </Button>
          )}
          {!isConnected && (
            <Button variant="outline" onClick={connect} className="border-2 border-solana-purple">
              Connect Wallet
            </Button>
          )}
        </div>
      </div>

      <div className="mb-8 grid gap-8 md:grid-cols-3">
        <Card className="md:col-span-2 pixel-card">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center gap-4">
              <Avatar>
                <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={contest.organizer} />
                <AvatarFallback>{contest.organizer.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm text-muted-foreground">Organized by</p>
                <p className="font-medium">{contest.organizer}</p>
              </div>
            </div>

            <div className="mb-6 space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Contest Duration</p>
                <p className="font-medium">
                  {contest.startDate} - {contest.endDate}
                </p>
              </div>

              <div>
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Time Remaining</p>
                  <p className="text-sm font-medium">{formatTimeLeft(contest.endTimestamp)}</p>
                </div>
                <Progress value={contest.progressPercent} className="h-2" />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">About this Contest</h3>
              <p>{contest.description}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="pixel-card">
          <CardContent className="p-6">
            <h3 className="mb-4 text-lg font-semibold">Reward Pool Details</h3>
            <div className="mb-6 space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Current Pool Size</p>
                <p className="text-2xl font-bold">
                  {entries.length * contest.entryFee} {contest.coin}
                </p>
                <p className="text-xs text-muted-foreground">
                  From {entries.length} entries at {contest.entryFee} {contest.coin} each
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Prize Distribution</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm">🥇 1st Place</p>
                    <p className="font-medium">
                      {(entries.length * contest.entryFee * 0.5).toFixed(2)} {contest.coin}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm">🥈 2nd Place</p>
                    <p className="font-medium">
                      {(entries.length * contest.entryFee * 0.3).toFixed(2)} {contest.coin}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm">🥉 3rd Place</p>
                    <p className="font-medium">
                      {(entries.length * contest.entryFee * 0.2).toFixed(2)} {contest.coin}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Entry Fee</p>
              <p className="font-medium">
                {contest.entryFee} {contest.coin}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Voting Method</p>
              <p className="font-medium">{contest.votingMethod}</p>
              <p className="text-xs text-muted-foreground mt-1">Only {contest.coin} holders can vote</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Participants</p>
              <p className="font-medium">{entries.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-8 grid w-full grid-cols-2 border-2 border-solana-purple">
          <TabsTrigger value="entries">Entries ({entries.length})</TabsTrigger>
          <TabsTrigger value="rules">Rules & Guidelines</TabsTrigger>
        </TabsList>

        <TabsContent value="entries" className="mt-0">
          {entries.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sortedEntries.map((entry) => (
                <MemeEntry key={entry.id} entry={entry} contestStatus={contest.status} contestCoin={contest.coin} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <h3 className="mb-2 text-xl font-semibold">No entries yet</h3>
              <p className="mb-6 text-muted-foreground">Be the first to submit your meme to this contest!</p>
              {contest.status === "live" && (
                <Button onClick={() => (window.location.href = `/contests/${id}/submit`)}>Submit Entry</Button>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="rules" className="mt-0">
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-semibold">Contest Rules & Guidelines</h3>
              <div className="prose max-w-none dark:prose-invert">
                <h4>Submission Guidelines</h4>
                <ul>
                  <li>All memes must be original content created by the submitter.</li>
                  <li>Memes must be related to the contest theme: {contest.title}.</li>
                  <li>Submissions must be in image format (JPG, PNG, or GIF).</li>
                  <li>Maximum file size: 5MB.</li>
                </ul>

                <h4>Voting Rules</h4>
                <ul>
                  <li>Voting is done using {contest.coin} tokens.</li>
                  <li>
                    Each wallet can vote multiple times, but each vote costs {contest.votingFee} {contest.coin}.
                  </li>
                  <li>Self-voting is allowed but discouraged.</li>
                </ul>

                <h4>Disqualification</h4>
                <p>Entries may be disqualified for the following reasons:</p>
                <ul>
                  <li>Content that violates copyright or intellectual property rights.</li>
                  <li>Offensive, inappropriate, or NSFW content.</li>
                  <li>Evidence of vote manipulation or fraud.</li>
                </ul>

                <h4>Contact Information</h4>
                <p>For any questions or concerns, please contact the organizer:</p>
                <p>
                  Telegram:{" "}
                  <a href="#" className="text-primary hover:underline">
                    @{contest.organizer}
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

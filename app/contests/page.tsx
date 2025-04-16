"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import ContestCard from "@/components/contest-card"
import { mockContests } from "@/lib/mock-data"

export default function ContestsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCoin, setSelectedCoin] = useState("all")
  const [minReward, setMinReward] = useState(0)

  const filterContests = (contests: any[], status: string) => {
    return contests
      .filter((contest) => contest.status === status)
      .filter(
        (contest) =>
          searchTerm === "" ||
          contest.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contest.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      .filter((contest) => selectedCoin === "all" || contest.coin === selectedCoin)
      .filter((contest) => contest.entryFee >= minReward)
  }

  const liveContests = filterContests(mockContests, "live")
  const upcomingContests = filterContests(mockContests, "upcoming")
  const pastContests = filterContests(mockContests, "past")

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-4xl font-bold pixel-text text-transparent bg-clip-text bg-gradient-to-r from-solana-purple to-solana-green">
        Meme Contests
      </h1>

      {/* Filters */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <div>
          <Input
            placeholder="Search contests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <Select value={selectedCoin} onValueChange={setSelectedCoin}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by coin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Coins</SelectItem>
              <SelectItem value="BONK">BONK</SelectItem>
              <SelectItem value="WIF">WIF</SelectItem>
              <SelectItem value="POPCAT">POPCAT</SelectItem>
              <SelectItem value="SLOTH">SLOTH</SelectItem>
              <SelectItem value="BOOK">BOOK</SelectItem>
              <SelectItem value="BODEN">BODEN</SelectItem>
              <SelectItem value="SLERF">SLERF</SelectItem>
              <SelectItem value="SOL">SOL</SelectItem>
              <SelectItem value="PEPE">PEPE</SelectItem>
              <SelectItem value="DOGE">DOGE</SelectItem>
              <SelectItem value="DONK">DONK</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm">
            Min Entry Fee: {minReward} {selectedCoin !== "all" ? selectedCoin : ""}
          </label>
          <Slider value={[minReward]} min={0} max={1000} step={10} onValueChange={(value) => setMinReward(value[0])} />
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="live" className="w-full">
        <TabsList className="mb-8 grid w-full grid-cols-3 border-2 border-solana-purple">
          <TabsTrigger value="live">Live ({liveContests.length})</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming ({upcomingContests.length})</TabsTrigger>
          <TabsTrigger value="past">Past ({pastContests.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="mt-0">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {liveContests.length > 0 ? (
              liveContests.map((contest) => <ContestCard key={contest.id} contest={contest} />)
            ) : (
              <p className="col-span-full text-center text-muted-foreground">
                No live contests found matching your filters.
              </p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="mt-0">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingContests.length > 0 ? (
              upcomingContests.map((contest) => <ContestCard key={contest.id} contest={contest} />)
            ) : (
              <p className="col-span-full text-center text-muted-foreground">
                No upcoming contests found matching your filters.
              </p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="past" className="mt-0">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pastContests.length > 0 ? (
              pastContests.map((contest) => <ContestCard key={contest.id} contest={contest} />)
            ) : (
              <p className="col-span-full text-center text-muted-foreground">
                No past contests found matching your filters.
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

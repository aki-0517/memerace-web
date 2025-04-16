"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ContestCard from "@/components/contest-card"
import { mockContests } from "@/lib/mock-data"

export default function FeaturedContests() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Filter to only show live contests
  const liveContests = mockContests.filter((contest) => contest.status === "live")

  // Determine how many cards to show based on screen size
  const cardsToShow = isMobile ? 1 : 3

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? liveContests.length - cardsToShow : prevIndex - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= liveContests.length - cardsToShow ? 0 : prevIndex + 1))
  }

  return (
    <div className="relative">
      <div className="flex overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)` }}
        >
          {liveContests.map((contest) => (
            <div key={contest.id} className="w-full flex-shrink-0 px-2" style={{ flex: `0 0 ${100 / cardsToShow}%` }}>
              <ContestCard contest={contest} />
            </div>
          ))}
        </div>
      </div>

      {liveContests.length > cardsToShow && (
        <div className="mt-6 flex justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrev}
            className="rounded-full border-2 border-solana-purple"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            className="rounded-full border-2 border-solana-purple"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

import { Button } from "@/components/ui/button"
import Link from "next/link"
import FeaturedContests from "@/components/featured-contests"
import PartnerLogos from "@/components/partner-logos"

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-solana-purple/20 to-background pt-16 md:pt-24">
        <div className="container flex flex-col items-center gap-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight pixel-text sm:text-5xl md:text-6xl">
            Join the Ultimate{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-solana-purple to-solana-green">
              Solana Meme Contest!
            </span>
          </h1>
          <p className="max-w-[42rem] text-lg text-muted-foreground sm:text-xl">
            Create, vote, and win with the most exciting meme contests in the Solana ecosystem. Showcase your creativity
            and earn rewards!
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="gap-2 pixel-button bg-solana-purple hover:bg-solana-purple/90">
              <Link href="/contests/create">Create Contest</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2 border-2 border-solana-purple">
              <Link href="/contests">View Contests</Link>
            </Button>
          </div>
          <div className="relative mt-8 w-full max-w-5xl overflow-hidden rounded-lg border-4 border-black pixel-borders">
            <img
              src="/placeholder.svg?height=600&width=1200"
              alt="Memerace platform preview"
              className="w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Featured Contests */}
      <section className="container">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight pixel-text text-transparent bg-clip-text bg-gradient-to-r from-solana-purple to-solana-green">
            Featured Contests
          </h2>
          <Button asChild variant="outline">
            <Link href="/contests">View All</Link>
          </Button>
        </div>
        <FeaturedContests />
      </section>

      {/* Partners & Sponsors */}
      <section className="container">
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tight pixel-text text-transparent bg-clip-text bg-gradient-to-r from-solana-purple to-solana-green">
          Our Partners & Sponsors
        </h2>
        <PartnerLogos />
      </section>
    </div>
  )
}

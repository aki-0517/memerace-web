"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useWallet } from "@/components/wallet-provider"
import { Menu, X } from "lucide-react"
import NetworkSelection from "@/components/network-selection"
import PixelArtLogo from "@/components/pixel-art-logo"

export default function Navbar() {
  const pathname = usePathname()
  const { isConnected, connect, disconnect, address } = useWallet()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Contests", href: "/contests" },
    { name: "Create", href: "/contests/create" },
  ]

  const formatAddress = (address: string) => {
    return `${address.substring(0, 4)}...${address.substring(address.length - 4)}`
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b-4 border-black bg-background/95 backdrop-blur transition-shadow ${
        isScrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-8">
          <Link href="/" className="flex items-center gap-2">
            <PixelArtLogo />
            <span className="text-xl font-bold pixel-text bg-clip-text text-transparent bg-gradient-to-r from-solana-purple to-solana-green">
              Memerace
            </span>
          </Link>

          <nav className="hidden md:flex md:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === link.href ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <NetworkSelection />
          </div>

          <ModeToggle />

          {isConnected ? (
            <Button
              variant="outline"
              onClick={disconnect}
              className="hidden md:inline-flex border-2 border-solana-purple"
            >
              {formatAddress(address || "")}
            </Button>
          ) : (
            <Button
              onClick={connect}
              className="hidden md:inline-flex pixel-button bg-solana-purple hover:bg-solana-purple/90"
            >
              Connect Wallet
            </Button>
          )}

          <button
            className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`block rounded-md px-3 py-2 text-base font-medium ${
                  pathname === link.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-4 px-3">
              <NetworkSelection />
            </div>
            <div className="mt-4 px-3">
              {isConnected ? (
                <Button variant="outline" onClick={disconnect} className="w-full">
                  {formatAddress(address || "")}
                </Button>
              ) : (
                <Button onClick={connect} className="w-full">
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface WalletContextType {
  isConnected: boolean
  address: string | null
  balance: number
  connect: () => void
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType>({
  isConnected: false,
  address: null,
  balance: 0,
  connect: () => {},
  disconnect: () => {},
})

export const useWallet = () => useContext(WalletContext)

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState(0)

  // Mock wallet connection
  const connect = () => {
    // Generate a random Solana-like address
    const mockAddress = "So1ana" + Math.random().toString(36).substring(2, 10)
    setAddress(mockAddress)
    setBalance(Math.floor(Math.random() * 100))
    setIsConnected(true)

    // Store in localStorage for persistence
    localStorage.setItem("walletConnected", "true")
    localStorage.setItem("walletAddress", mockAddress)
  }

  const disconnect = () => {
    setIsConnected(false)
    setAddress(null)
    setBalance(0)

    // Clear localStorage
    localStorage.removeItem("walletConnected")
    localStorage.removeItem("walletAddress")
  }

  // Check if wallet was previously connected
  useEffect(() => {
    const wasConnected = localStorage.getItem("walletConnected") === "true"
    const savedAddress = localStorage.getItem("walletAddress")

    if (wasConnected && savedAddress) {
      setIsConnected(true)
      setAddress(savedAddress)
      setBalance(Math.floor(Math.random() * 100))
    }
  }, [])

  return (
    <WalletContext.Provider value={{ isConnected, address, balance, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  )
}

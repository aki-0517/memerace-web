"use client"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function NetworkSelection() {
  const [network, setNetwork] = useState("mainnet")

  useEffect(() => {
    const savedNetwork = localStorage.getItem("selectedNetwork")
    if (savedNetwork) {
      setNetwork(savedNetwork)
    }
  }, [])

  const handleNetworkChange = (value: string) => {
    setNetwork(value)
    localStorage.setItem("selectedNetwork", value)
  }

  return (
    <div className="flex items-center gap-2">
      <Select value={network} onValueChange={handleNetworkChange}>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="Select network" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="mainnet">Mainnet</SelectItem>
          <SelectItem value="devnet">Devnet</SelectItem>
          <SelectItem value="testnet">Testnet</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

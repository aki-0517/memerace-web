"use client"

import { FC } from 'react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'
import { Button } from '@/components/ui/button'

interface WalletConnectButtonProps {
  className?: string
}

export const WalletConnectButton: FC<WalletConnectButtonProps> = ({ className }) => {
  const { setVisible } = useWalletModal()
  const { connected, publicKey, disconnect } = useWallet()

  const formatAddress = (address: string) => {
    return `${address.substring(0, 4)}...${address.substring(address.length - 4)}`
  }

  if (connected && publicKey) {
    return (
      <Button
        variant="outline"
        onClick={disconnect}
        className={`border-2 border-solana-purple ${className}`}
      >
        {formatAddress(publicKey.toString())}
      </Button>
    )
  }

  return (
    <Button
      onClick={() => setVisible(true)}
      className={`pixel-button bg-solana-purple hover:bg-solana-purple/90 ${className}`}
    >
      Wallet Connect
    </Button>
  )
} 
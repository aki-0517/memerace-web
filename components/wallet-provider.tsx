"use client"

import { FC, ReactNode, useMemo } from 'react'
import { ConnectionProvider, WalletProvider as SolanaWalletProvider } from '@solana/wallet-adapter-react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { PhantomWalletAdapter, SolflareWalletAdapter, TorusWalletAdapter } from '@solana/wallet-adapter-wallets'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { clusterApiUrl } from '@solana/web3.js'

// デフォルトスタイル（必要に応じてオーバーライド可能）
import '@solana/wallet-adapter-react-ui/styles.css'

interface Props {
  children: ReactNode
}

export const WalletProvider: FC<Props> = ({ children }) => {
  // ネットワークを'devnet'、'testnet'、または'mainnet-beta'に設定できます
  const network = WalletAdapterNetwork.Devnet

  // カスタムRPCエンドポイントも提供できます
  const endpoint = useMemo(() => clusterApiUrl(network), [network])

  // サポートするウォレットのリスト
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
    ],
    [network]
  )

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  )
}

// 元のコンテキストとフックを保持（互換性のため）
import { createContext, useContext, useState, useEffect } from "react"
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react'

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

export const useWallet = () => {
  const context = useContext(WalletContext)
  const solanaWallet = useSolanaWallet()
  
  return {
    ...context,
    isConnected: solanaWallet.connected,
    address: solanaWallet.publicKey?.toString() || null,
    connect: solanaWallet.connect,
    disconnect: solanaWallet.disconnect,
  }
}

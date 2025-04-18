"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useWallet } from "@/components/wallet-provider"
import { WalletConnectButton } from "@/components/wallet-connect-button"
import ThemeSelectionStep from "@/components/create-contest/theme-selection-step"
import ContestTypeStep from "@/components/create-contest/contest-type-step"
import RewardsStep from "@/components/create-contest/rewards-step"
import DurationStep from "@/components/create-contest/duration-step"
import SubmissionFormatStep from "@/components/create-contest/submission-format-step"
import RulesStep from "@/components/create-contest/rules-step"
import NetworkSelection from "@/components/network-selection"

export default function CreateContestPage() {
  const router = useRouter()
  const { isConnected, connect } = useWallet()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    themeId: "",
    themeName: "",
    themeDescription: "",
    coin: "",
    contestType: "open",
    entryFee: 0.1,
    votingFee: 0.05,
    startDate: "",
    endDate: "",
    submissionFormat: "image-title",
    allowDescription: true,
    rules: "",
    evaluationCriteria: "",
    contactInfo: "",
  })

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1)
    } else {
      // Submit form
      console.log("Form submitted:", formData)
      router.push("/contests")
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  if (!isConnected) {
    return (
      <div className="container flex flex-col items-center justify-center py-16">
        <Card className="mx-auto w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h1 className="mb-4 text-2xl font-bold">Connect Your Wallet</h1>
            <p className="mb-6 text-muted-foreground">You need to connect your wallet to create a contest.</p>
            <WalletConnectButton className="w-full" />
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold pixel-text">Create a Meme Contest</h1>
          <p className="text-muted-foreground">Set up your contest in 6 simple steps</p>
        </div>
        <NetworkSelection />
      </div>

      <div className="mb-8">
        <Tabs value={`step-${currentStep}`} className="w-full">
          <TabsList className="grid w-full grid-cols-6 border-2 border-solana-purple">
            <TabsTrigger value="step-1" disabled={currentStep !== 1}>
              Theme
            </TabsTrigger>
            <TabsTrigger value="step-2" disabled={currentStep !== 2}>
              Type
            </TabsTrigger>
            <TabsTrigger value="step-3" disabled={currentStep !== 3}>
              Rewards
            </TabsTrigger>
            <TabsTrigger value="step-4" disabled={currentStep !== 4}>
              Duration
            </TabsTrigger>
            <TabsTrigger value="step-5" disabled={currentStep !== 5}>
              Format
            </TabsTrigger>
            <TabsTrigger value="step-6" disabled={currentStep !== 6}>
              Rules
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Card className="mb-8 pixel-card">
        <CardContent className="p-6">
          {currentStep === 1 && <ThemeSelectionStep formData={formData} updateFormData={updateFormData} />}
          {currentStep === 2 && <ContestTypeStep formData={formData} updateFormData={updateFormData} />}
          {currentStep === 3 && <RewardsStep formData={formData} updateFormData={updateFormData} />}
          {currentStep === 4 && <DurationStep formData={formData} updateFormData={updateFormData} />}
          {currentStep === 5 && <SubmissionFormatStep formData={formData} updateFormData={updateFormData} />}
          {currentStep === 6 && <RulesStep formData={formData} updateFormData={updateFormData} />}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 1}
          className="border-2 border-solana-purple"
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          className="pixel-button bg-solana-purple hover:bg-solana-purple/90"
          disabled={currentStep === 1 && !formData.themeId}
        >
          {currentStep === 6 ? "Create Contest" : "Next"}
        </Button>
      </div>
    </div>
  )
}

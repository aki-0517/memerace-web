export default function PartnerLogos() {
  const partners = [
    { name: "Pump.fun", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Moonshot", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Ape.LOL", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Cointelegraph", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Decrypt", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Bitget", logo: "/placeholder.svg?height=60&width=120" },
  ]

  return (
    <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
      {partners.map((partner) => (
        <div key={partner.name} className="flex flex-col items-center">
          <img
            src={partner.logo || "/placeholder.svg"}
            alt={`${partner.name} logo`}
            className="h-12 w-auto grayscale transition-all duration-200 hover:grayscale-0 hover:drop-shadow-[0_0_8px_rgba(153,69,255,0.8)] md:h-16"
          />
          <span className="mt-2 text-sm text-muted-foreground">{partner.name}</span>
        </div>
      ))}
    </div>
  )
}

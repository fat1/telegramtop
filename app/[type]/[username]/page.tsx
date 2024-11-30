import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'

// This would typically come from a database or API
const EXAMPLE_DATA: Record<string, ContentItem[]> = {
  bots: [
    { name: "Bitcoin Price Bot", username: "BitcoinPriceBot", category: "Cryptocurrency", description: "Get real-time Bitcoin price updates" },
    // ... (other bots)
  ],
  groups: [
    { name: "Crypto Traders United", username: "CryptoTradersUnited", category: "Cryptocurrency", description: "Discussion group for cryptocurrency traders" },
    // ... (other groups)
  ],
  channels: [
    { name: "Tech News Daily", username: "TechNewsDaily", category: "Technology", description: "Daily updates on the latest tech news" },
    // ... (other channels)
  ],
  apps: [
    { name: "Telegram Wallet", username: "TelegramWalletApp", category: "Finance", description: "Secure cryptocurrency wallet for Telegram" },
    // ... (other apps)
  ]
}

interface ContentItem {
  name: string
  username: string
  category: string
  description: string
}

export default function DetailPage({ params }: { params: { type: string; username: string } }) {
  const { type, username } = params
  const items = EXAMPLE_DATA[type]
  const item = items?.find(i => i.username.toLowerCase() === username.toLowerCase())

  if (!item) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" asChild className="mb-4">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to list
        </Link>
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>{item.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-2">@{item.username}</p>
          <Badge className="mb-4">{item.category}</Badge>
          <p>{item.description}</p>
        </CardContent>
      </Card>
    </div>
  )
}


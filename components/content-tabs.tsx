'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ContentItem {
  name: string
  username: string
  category: string
}

interface ContentTabsProps {
  bots: ContentItem[]
  groups: ContentItem[]
  channels: ContentItem[]
  apps: ContentItem[]
  activeTab: string
}

export default function ContentTabs({ bots, groups, channels, apps, activeTab }: ContentTabsProps) {
  const renderGrid = (items: ContentItem[]) => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">@{item.username}</p>
            <Badge variant="secondary">
              Category: {item.category}
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Telegram Content List</h1>
      
      <div className="flex gap-4 mb-8">
        <Input 
          placeholder="Search content..." 
          className="flex-1"
        />
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="cryptocurrency">Cryptocurrency</SelectItem>
            <SelectItem value="entertainment">Entertainment</SelectItem>
            <SelectItem value="news">News</SelectItem>
            <SelectItem value="productivity">Productivity</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs value={activeTab} className="w-full">
        
        <TabsContent value="bots">
          {renderGrid(bots)}
        </TabsContent>
        
        <TabsContent value="groups">
          {renderGrid(groups)}
        </TabsContent>
        
        <TabsContent value="channels">
          {renderGrid(channels)}
        </TabsContent>
        
        <TabsContent value="apps">
          {renderGrid(apps)}
        </TabsContent>
      </Tabs>
    </div>
  )
}


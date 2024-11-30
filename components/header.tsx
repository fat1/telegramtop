'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function Header({ onTabChange }: { onTabChange: (tab: string) => void }) {
  const [activeTab, setActiveTab] = useState('bots')
  const { setTheme, theme } = useTheme()

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    onTabChange(tab)
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    </header>
  )
}


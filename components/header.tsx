'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { Menu, X, Globe, ChevronDown } from 'lucide-react'
import { useLanguageStore, translations } from '../utils/language'

const categories = [
  { name: 'channel', subcategories: ['News', 'Entertainment', 'Education'] },
  { name: 'bot', subcategories: ['Utility', 'Games', 'Productivity'] },
  { name: 'group', subcategories: ['Discussion', 'Support', 'Networking'] },
  { name: 'user', subcategories: ['Influencers', 'Experts', 'Creators'] },
]

const languageOptions = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'ru', name: 'Русский' },
  { code: 'zh', name: '中文' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false)
  const { language, setLanguage } = useLanguageStore()
  const t = translations[language]
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLanguageDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLanguageChange = (lang: 'en' | 'es' | 'ru' | 'zh') => {
    setLanguage(lang)
    setLanguageDropdownOpen(false)
  }

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Find Top Telegram
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4">
          {categories.map((category) => (
            <div key={category.name} className="relative group">
              <Link href={`/${category.name}`} className="text-lg font-semibold text-gray-600 hover:text-blue-600">
                {t[category.name]}
              </Link>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                {category.subcategories.map((subcategory) => (
                  <Link
                    key={subcategory}
                    href={`/${category.name}?subcategory=${subcategory.toLowerCase()}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                  >
                    {subcategory}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Email Subscription Form and Language Selector */}
        <div className="hidden md:flex items-center space-x-4">
          <div>
            <input
              type="email"
              placeholder={t.subscribeToUpdates}
              className="px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors">
              {t.subscribe}
            </button>
          </div>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
              className="flex items-center text-gray-600 hover:text-blue-600"
            >
              <Globe size={20} className="mr-1" />
              {languageOptions.find(lang => lang.code === language)?.name}
              <ChevronDown size={16} className="ml-1" />
            </button>
            {languageDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                {languageOptions.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code as 'en' | 'es' | 'ru' | 'zh')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <div className="relative mr-4" ref={dropdownRef}>
            <button
              onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
              className="text-gray-600 hover:text-blue-600"
            >
              <Globe size={20} />
            </button>
            {languageDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                {languageOptions.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code as 'en' | 'es' | 'ru' | 'zh')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          {categories.map((category) => (
            <div key={category.name} className="px-4 py-2">
              <Link href={`/${category.name}`} className="text-gray-600 hover:text-blue-600">
                {t[category.name]}
              </Link>
              <div className="ml-4 mt-2">
                {category.subcategories.map((subcategory) => (
                  <Link
                    key={subcategory}
                    href={`/${category.name}?subcategory=${subcategory.toLowerCase()}`}
                    className="block py-2 text-sm text-gray-700 hover:text-blue-600"
                  >
                    {subcategory}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div className="px-4 py-2">
            <input
              type="email"
              placeholder={t.subscribeToUpdates}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 mb-2"
            />
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              {t.subscribe}
            </button>
          </div>
        </div>
      )}
    </header>
  )
}


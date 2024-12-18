'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const categories = [
  { name: 'Channel', subcategories: ['News', 'Entertainment', 'Education'] },
  { name: 'Bot', subcategories: ['Utility', 'Games', 'Productivity'] },
  { name: 'Group', subcategories: ['Discussion', 'Support', 'Networking'] },
  { name: 'User', subcategories: ['Influencers', 'Experts', 'Creators'] },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
              <Link href={`/${category.name.toLowerCase()}`} className="text-lg font-semibold text-gray-600 hover:text-blue-600">
                {category.name}
              </Link>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                {category.subcategories.map((subcategory) => (
                  <Link
                    key={subcategory}
                    href={`/${category.name.toLowerCase()}?subcategory=${subcategory.toLowerCase()}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                  >
                    {subcategory}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Email Subscription Form */}
        <div className="hidden md:block">
          <input
            type="email"
            placeholder="Subscribe to updates"
            className="px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors">
            Subscribe
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
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
              <Link href={`/${category.name.toLowerCase()}`} className="text-gray-600 hover:text-blue-600">
                {category.name}
              </Link>
              <div className="ml-4 mt-2">
                {category.subcategories.map((subcategory) => (
                  <Link
                    key={subcategory}
                    href={`/${category.name.toLowerCase()}?subcategory=${subcategory.toLowerCase()}`}
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
              placeholder="Subscribe to updates"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 mb-2"
            />
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      )}
    </header>
  )
}


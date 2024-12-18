'use client'

import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
    } else {
      setError('')
      // Here you would typically send the email to your backend
      console.log('Subscribed:', email)
      setEmail('')
    }
  }

  return (
    <footer className="bg-gray-100 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Statistics</h3>
            <p>Total Channels: 10,000</p>
            <p>Total Bots: 5,000</p>
            <p>Total Groups: 8,000</p>
            <p>Total Users: 20,000</p>
            <p className="text-sm text-gray-600 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="text-lg font-semibold mb-2">Subscribe to Updates</h3>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-grow px-3 py-2 mb-2 sm:mb-0 sm:mr-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        </div>
      </div>
    </footer>
  )
}


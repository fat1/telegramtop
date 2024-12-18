import { useState } from 'react'
import ItemCard from './components/ItemCard'
import SearchBar from './components/SearchBar'
import Pagination from './components/Pagination'

const ITEMS_PER_PAGE = 20

// Mock data - in a real application, this would come from an API or database
const mockData = {
  channels: Array.from({ length: 100 }, (_, i) => ({
    id: `channel-${i + 1}`,
    type: 'channel',
    name: `Channel ${i + 1}`,
    avatar: `/placeholder.svg?height=50&width=50`,
    category: 'News',
    description: 'This is a sample channel description.',
    additionalInfo: `${Math.floor(Math.random() * 100000)} subscribers`,
  })),
  bots: Array.from({ length: 100 }, (_, i) => ({
    id: `bot-${i + 1}`,
    type: 'bot',
    name: `Bot ${i + 1}`,
    avatar: `/placeholder.svg?height=50&width=50`,
    category: 'Utility',
    description: 'This is a sample bot description.',
    additionalInfo: `${Math.floor(Math.random() * 10000)} monthly active users`,
  })),
  groups: Array.from({ length: 100 }, (_, i) => ({
    id: `group-${i + 1}`,
    type: 'group',
    name: `Group ${i + 1}`,
    avatar: `/placeholder.svg?height=50&width=50`,
    category: 'Discussion',
    description: 'This is a sample group description.',
    additionalInfo: `${Math.floor(Math.random() * 50000)} members`,
  })),
  users: Array.from({ length: 100 }, (_, i) => ({
    id: `user-${i + 1}`,
    type: 'user',
    name: `User ${i + 1}`,
    avatar: `/placeholder.svg?height=50&width=50`,
    category: 'Influencer',
    description: 'This is a sample user description.',
    additionalInfo: '',
  })),
}

export default function Home() {
  const [currentPages, setCurrentPages] = useState({
    channels: 1,
    bots: 1,
    groups: 1,
    users: 1,
  })

  const handlePageChange = (category: string, page: number) => {
    setCurrentPages(prev => ({ ...prev, [category]: page }))
  }

  return (
    <div>
      <SearchBar />
      <div className="space-y-12 mt-8">
        {Object.entries(mockData).map(([category, items]) => {
          const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE)
          const currentPage = currentPages[category as keyof typeof currentPages]
          const paginatedItems = items.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            currentPage * ITEMS_PER_PAGE
          )

          return (
            <div key={category} className="overflow-x-auto">
              <h2 className="text-2xl font-bold mb-4 capitalize">Hot {category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {paginatedItems.map((item: any) => (
                  <ItemCard key={item.id} {...item} />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                baseUrl={`/?category=${category}`}
                searchParams={{ category }}
                onPageChange={(page) => handlePageChange(category, page)}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}


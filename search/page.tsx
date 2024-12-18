import { notFound } from 'next/navigation'
import ItemCard from '../components/ItemCard'
import SearchBar from '../components/SearchBar'

// Mock data - in a real application, this would come from an API or database
const mockData = {
  channels: Array.from({ length: 20 }, (_, i) => ({
    id: `channel-${i + 1}`,
    type: 'channel',
    name: `Channel ${i + 1}`,
    avatar: `/placeholder.svg?height=50&width=50`,
    category: 'News',
    description: 'This is a sample channel description.',
    additionalInfo: `${Math.floor(Math.random() * 100000)} subscribers`,
  })),
  bots: Array.from({ length: 20 }, (_, i) => ({
    id: `bot-${i + 1}`,
    type: 'bot',
    name: `Bot ${i + 1}`,
    avatar: `/placeholder.svg?height=50&width=50`,
    category: 'Utility',
    description: 'This is a sample bot description.',
    additionalInfo: `${Math.floor(Math.random() * 10000)} monthly active users`,
  })),
  groups: Array.from({ length: 20 }, (_, i) => ({
    id: `group-${i + 1}`,
    type: 'group',
    name: `Group ${i + 1}`,
    avatar: `/placeholder.svg?height=50&width=50`,
    category: 'Discussion',
    description: 'This is a sample group description.',
    additionalInfo: `${Math.floor(Math.random() * 50000)} members`,
  })),
  users: Array.from({ length: 20 }, (_, i) => ({
    id: `user-${i + 1}`,
    type: 'user',
    name: `User ${i + 1}`,
    avatar: `/placeholder.svg?height=50&width=50`,
    category: 'Influencer',
    description: 'This is a sample user description.',
    additionalInfo: '',
  })),
}

export default function SearchPage({ searchParams }: { searchParams: { q: string } }) {
  const query = searchParams.q

  if (!query) {
    notFound()
  }

  // In a real application, you would perform the search here
  // For this example, we'll just return all items
  const results = Object.entries(mockData).flatMap(([category, items]) => 
    items.map(item => ({ ...item, type: category.slice(0, -1) }))
  )

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Search Results for &quot;{query}&quot;</h1>
      <SearchBar />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
        {results.map((item: any) => (
          <ItemCard key={`${item.type}-${item.id}`} {...item} />
        ))}
      </div>
    </div>
  )
}


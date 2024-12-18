import { notFound, useSearchParams } from 'next/navigation'
import ItemCard from '../components/ItemCard'
import SearchBar from '../components/SearchBar'

// Mock data - in a real application, this would come from an API or database
const mockData = {
  channel: Array.from({ length: 100 }, (_, i) => ({
    id: `channel-${i + 1}`,
    type: 'channel',
    name: `Channel ${i + 1}`,
    avatar: `/placeholder.svg?height=50&width=50`,
    category: 'News',
    description: 'This is a sample channel description.',
    additionalInfo: `${Math.floor(Math.random() * 100000)} subscribers`,
  })),
  bot: Array.from({ length: 100 }, (_, i) => ({
    id: `bot-${i + 1}`,
    type: 'bot',
    name: `Bot ${i + 1}`,
    avatar: `/placeholder.svg?height=50&width=50`,
    category: 'Utility',
    description: 'This is a sample bot description.',
    additionalInfo: `${Math.floor(Math.random() * 10000)} monthly active users`,
  })),
  group: Array.from({ length: 100 }, (_, i) => ({
    id: `group-${i + 1}`,
    type: 'group',
    name: `Group ${i + 1}`,
    avatar: `/placeholder.svg?height=50&width=50`,
    category: 'Discussion',
    description: 'This is a sample group description.',
    additionalInfo: `${Math.floor(Math.random() * 50000)} members`,
  })),
  user: Array.from({ length: 100 }, (_, i) => ({
    id: `user-${i + 1}`,
    type: 'user',
    name: `User ${i + 1}`,
    avatar: `/placeholder.svg?height=50&width=50`,
    category: 'Influencer',
    description: 'This is a sample user description.',
    additionalInfo: '',
  })),
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = params.category.toLowerCase()
  const searchParams = useSearchParams()
  const subcategory = searchParams.get('subcategory')
  
  if (!['channel', 'bot', 'group', 'user'].includes(category)) {
    notFound()
  }

  const items = mockData[category as keyof typeof mockData]

  return (
    <div>
      <div className="flex items-center space-x-2 mb-8">
        <h1 className="text-lg font-semibold capitalize">{category}s</h1>
        {subcategory && (
          <>
            <span className="text-gray-400">/</span>
            <h2 className="text-lg font-semibold capitalize">{subcategory}</h2>
          </>
        )}
      </div>
      <SearchBar />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
        {items.map((item: any) => (
          <ItemCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  )
}

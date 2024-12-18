import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

// Mock data - in a real application, this would come from an API or database
const mockData = {
  channel: {
    name: 'Sample Channel',
    avatar: '/placeholder.svg?height=100&width=100',
    url: 'https://t.me/sampleChannel',
    category: 'News',
    description: 'This is a detailed description of the sample channel.',
    additionalInfo: '50,000 subscribers',
  },
  bot: {
    name: 'Sample Bot',
    avatar: '/placeholder.svg?height=100&width=100',
    url: 'https://t.me/sampleBot',
    category: 'Utility',
    description: 'This is a detailed description of the sample bot.',
    additionalInfo: '10,000 monthly active users',
  },
  group: {
    name: 'Sample Group',
    avatar: '/placeholder.svg?height=100&width=100',
    url: 'https://t.me/sampleGroup',
    category: 'Discussion',
    description: 'This is a detailed description of the sample group.',
    additionalInfo: '25,000 members',
  },
  user: {
    name: 'Sample User',
    avatar: '/placeholder.svg?height=100&width=100',
    url: 'https://t.me/sampleUser',
    category: 'Influencer',
    description: 'This is a detailed description of the sample user.',
    additionalInfo: '',
  },
}

export default function DetailPage({ params }: { params: { category: string; id: string } }) {
  const category = params.category.toLowerCase()
  
  if (!['channel', 'bot', 'group', 'user'].includes(category)) {
    notFound()
  }

  const item = mockData[category as keyof typeof mockData]

  return (
    <div>
      <Link href={`/${category}`} className="inline-flex items-center text-blue-600 hover:underline mb-4">
        <ArrowLeft size={20} className="mr-2" />
        Back to {category}s
      </Link>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center mb-4">
          <Image src={item.avatar} alt={item.name} width={100} height={100} className="rounded-full mr-6" />
          <div>
            <h1 className="text-3xl font-bold">{item.name}</h1>
            <p className="text-gray-600">{item.category}</p>
            {item.additionalInfo && <p className="text-blue-600">{item.additionalInfo}</p>}
          </div>
        </div>
        <p className="text-lg mb-4">{item.description}</p>
        <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          {item.url}
        </a>
      </div>
    </div>
  )
}


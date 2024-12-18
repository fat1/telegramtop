import Image from 'next/image'
import Link from 'next/link'

interface ItemCardProps {
  id: string
  type: 'channel' | 'bot' | 'group' | 'user'
  name: string
  avatar: string
  category: string
  description: string
  additionalInfo: string
}

export default function ItemCard({ id, type, name, avatar, category, description, additionalInfo }: ItemCardProps) {
  return (
    <Link href={`/${type}/${id}`} className="block">
      <div className="border rounded-lg p-3 hover:shadow-md transition-shadow h-full flex flex-col">
        <div className="flex items-center mb-2">
          <Image src={avatar} alt={name} width={40} height={40} className="rounded-full mr-3" />
          <div className="overflow-hidden">
            <h3 className="font-semibold text-sm truncate">{name}</h3>
            <p className="text-xs text-gray-600 truncate">{additionalInfo}</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 mb-1">{category}</p>
        <p className="text-xs line-clamp-2 flex-grow">{description}</p>
      </div>
    </Link>
  )
}


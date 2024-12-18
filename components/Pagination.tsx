import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl: string
  searchParams: { [key: string]: string | string[] | undefined }
  onPageChange?: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, baseUrl, searchParams, onPageChange }: PaginationProps) {
  const getPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams as Record<string, string>)
    params.set('page', page.toString())
    return `${baseUrl}?${params.toString()}`
  }

  const handleClick = (page: number, e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onPageChange) {
      e.preventDefault()
      onPageChange(page)
    }
  }

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      {currentPage > 1 && (
        <Link 
          href={getPageUrl(currentPage - 1)} 
          className="px-4 py-2 border rounded hover:bg-gray-100"
          onClick={(e) => handleClick(currentPage - 1, e)}
        >
          Previous
        </Link>
      )}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={getPageUrl(page)}
          className={`px-4 py-2 border rounded ${
            page === currentPage ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
          }`}
          onClick={(e) => handleClick(page, e)}
        >
          {page}
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link 
          href={getPageUrl(currentPage + 1)} 
          className="px-4 py-2 border rounded hover:bg-gray-100"
          onClick={(e) => handleClick(currentPage + 1, e)}
        >
          Next
        </Link>
      )}
    </div>
  )
}


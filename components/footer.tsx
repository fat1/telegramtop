import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Link href="/" className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
              <path d="M21.58 11.4L3.15 2.95a1 1 0 00-1.35 1.13l1.7 6.3a1 1 0 00.75.75l6.3 1.7a1 1 0 010 1.9l-6.3 1.7a1 1 0 00-.75.75L1.8 22.2a1 1 0 001.35 1.13L21.58 15a1 1 0 000-1.8z" />
            </svg>
            <span className="font-bold">Telegram Content List</span>
          </Link>
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{" "}
            <a href="https://twitter.com/yourusername" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">
              Your Name
            </a>
            . Open source on{" "}
            <a href="https://github.com/yourusername/project" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">
              GitHub
            </a>
            .
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/privacy" className="text-sm underline underline-offset-4">Privacy</Link>
          <Link href="/terms" className="text-sm underline underline-offset-4">Terms</Link>
        </div>
      </div>
    </footer>
  )
}


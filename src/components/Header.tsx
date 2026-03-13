import { Link } from '@tanstack/react-router'

import { Play, Search } from 'lucide-react'

import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-linear-to-b from-black/80 to-zinc-950/0 px-4 py-4 text-zinc-100 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6">
        <div className="flex items-center gap-10">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.25em]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black shadow-lg">
              <Play className="h-4 w-4 translate-x-px" />
            </span>
            <span className="text-base">LŪMIA</span>
          </Link>

          <div className="hidden items-center gap-6 text-xs font-medium uppercase tracking-[0.2em] text-zinc-400 md:flex">
            <Link
              to="/"
              className="transition-colors hover:text-white data-[active=true]:text-white"
              activeProps={{ 'data-active': true }}
            >
              Discover
            </Link>
            <button
              type="button"
              className="cursor-default transition-colors hover:text-white"
            >
              Films
            </button>
            <button
              type="button"
              className="cursor-default transition-colors hover:text-white"
            >
              Series
            </button>
            <button
              type="button"
              className="cursor-default transition-colors hover:text-white"
            >
              My List
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="text-zinc-400 transition-colors hover:text-white"
          >
            <span className="sr-only">Search</span>
            <Search className="h-5 w-5" />
          </button>

          <button
            type="button"
            className="h-9 w-9 overflow-hidden rounded-full border border-zinc-700 bg-zinc-900"
          >
            <span className="sr-only">Open profile</span>
            <img
              src="https://api.dicebear.com/7.x/shapes/svg?seed=Felix"
              alt="Avatar"
              className="h-full w-full object-cover"
            />
          </button>

          <div className="hidden md:block">
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  )
}

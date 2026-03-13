import { createFileRoute } from '@tanstack/react-router'

import { Atom, PlayCircle, Star, Trophy } from 'lucide-react'

import { FilmCard } from '#/components/ui/Card'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <main
      className="min-h-screen bg-zinc-950 text-zinc-100"
      style={{ viewTransitionName: 'main-content' }}
    >
      <div className="flex flex-col pt-20">
        {/* Hero */}
        <section className="relative mb-12 flex h-[85vh] w-full items-center px-6 md:px-16 lg:px-24">
          <div className="absolute inset-0 -z-10">
            <img
              src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=2072"
              alt="Hero Featured"
              className="h-full w-full object-cover brightness-[0.7]"
            />
            <div className="hero-mask absolute inset-0" />
          </div>

          <div className="relative z-10 mt-24 max-w-2xl space-y-8">
            <div className="flex items-center gap-3">
              <span className="rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.25em] text-black bg-white">
                Trending Now
              </span>
              <div className="ml-2 flex items-center gap-1 text-amber-400">
                <Star className="h-3 w-3 fill-current" />
                <span className="text-sm font-bold">8.9</span>
              </div>
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl font-bold leading-none tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                The Silent
                <br />
                Horizon
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-zinc-400">
                In a world where sound has been lost to a cosmic anomaly, a lone
                cartographer must journey across the obsidian plains to find the
                origin of the first note.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                className="flex items-center justify-center gap-3 rounded-full bg-white px-10 py-4 text-xs font-bold uppercase tracking-[0.3em] text-black transition-transform hover:scale-[1.03] active:scale-95"
              >
                Play Now
                <PlayCircle className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-3 rounded-full border border-zinc-700 bg-zinc-800/60 px-8 py-4 text-xs font-bold uppercase tracking-[0.3em] text-white backdrop-blur-md transition-transform hover:scale-[1.03] active:scale-95"
              >
                More Info
              </button>
            </div>
          </div>
        </section>

        {/* Continue Watching */}
        <section className="mb-20 px-6 md:px-16 lg:px-24">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-xl font-bold uppercase tracking-[0.25em] text-zinc-400">
              Continue Watching
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
              <div className="flex gap-4 p-4">
                <div className="aspect-video w-32 shrink-0 overflow-hidden rounded-lg bg-zinc-800">
                  <img
                    src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600"
                    alt="Resonance"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em]">
                    Resonance
                  </h3>
                  <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                    42 mins remaining
                  </p>
                  <div className="h-1 w-full overflow-hidden rounded-full bg-zinc-800">
                    <div className="h-full w-[40%] bg-white" />
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
              <div className="flex gap-4 p-4">
                <div className="aspect-video w-32 shrink-0 overflow-hidden rounded-lg bg-zinc-800">
                  <img
                    src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=600"
                    alt="The Silent Horizon"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em]">
                    The Silent Horizon
                  </h3>
                  <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                    1h 24m remaining
                  </p>
                  <div className="h-1 w-full overflow-hidden rounded-full bg-zinc-800">
                    <div className="h-full w-[65%] bg-white" />
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative hidden overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 lg:block">
              <div className="flex gap-4 p-4">
                <div className="aspect-video w-32 shrink-0 overflow-hidden rounded-lg bg-zinc-800">
                  <img
                    src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=600"
                    alt="Deep Space"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em]">
                    Deep Space
                  </h3>
                  <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                    Finished
                  </p>
                  <div className="h-1 w-full rounded-full bg-emerald-500" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Cinema */}
        <section className="mb-20 px-6 md:px-16 lg:px-24">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-xl font-bold uppercase tracking-[0.25em]">
              Featured Cinema
            </h2>
            <button
              type="button"
              className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-500 transition-colors hover:text-white"
            >
              Browse All
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {featuredFilms.map((movie) => (
              <FilmCard
                key={movie.title}
                title={movie.title}
                meta={movie.meta}
                image={movie.image}
                href={movie.href}
              />
            ))}
          </div>
        </section>

        {/* Curated Collections */}
        <section className="mb-20 px-6 md:px-16 lg:px-24">
          <div className="flex items-center gap-12">
            <div className="h-px flex-1 bg-zinc-900" />
            <h2 className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-600">
              Curated Collections
            </h2>
            <div className="h-px flex-1 bg-zinc-900" />
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="collection-card group relative flex h-64 flex-col justify-end overflow-hidden rounded-3xl border border-zinc-900 p-12 transition-colors hover:border-zinc-700">
              <div className="pointer-events-none absolute right-12 top-12 opacity-10 transition-opacity group-hover:opacity-20">
                <Trophy className="h-24 w-24 md:h-32 md:w-32" />
              </div>
              <h3 className="mb-2 text-3xl font-bold tracking-tight">
                Award Winning Masters
              </h3>
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                Celebrating 20 years of cinematic excellence
              </p>
            </div>

            <div className="collection-card group relative flex h-64 flex-col justify-end overflow-hidden rounded-3xl border border-zinc-900 p-12 transition-colors hover:border-zinc-700">
              <div className="pointer-events-none absolute right-12 top-12 opacity-10 transition-opacity group-hover:opacity-20">
                <Atom className="h-24 w-24 md:h-32 md:w-32" />
              </div>
              <h3 className="mb-2 text-3xl font-bold tracking-tight">
                Beyond The Stars
              </h3>
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                A deep dive into speculative fiction and futures
              </p>
            </div>
          </div>
        </section>

        {/* Original Series */}
        <section className="mb-24 px-6 md:px-16 lg:px-24">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-xl font-bold uppercase tracking-[0.25em]">
              Original Series
            </h2>
            <button
              type="button"
              className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-500 transition-colors hover:text-white"
            >
              Discover Series
            </button>
          </div>

          <div className="custom-scrollbar -mx-6 flex gap-6 overflow-x-auto px-6 pb-8">
            {[
              {
                title: 'Night Watch',
                meta: '8 Seasons • Crime',
                img: 'https://images.unsplash.com/photo-1512113569143-3d6239634b07?auto=format&fit=crop&q=80&w=600',
              },
              {
                title: 'Subsurface',
                meta: '2 Seasons • Mystery',
                img: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=600',
              },
              {
                title: 'Light Speed',
                meta: '4 Seasons • Sci-Fi',
                img: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&q=80&w=600',
              },
              {
                title: 'The Grid',
                meta: '1 Season • Drama',
                img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
              },
            ].map((series) => (
              <div
                key={series.title}
                className="movie-card group relative aspect-video w-80 shrink-0 overflow-hidden rounded-xl bg-zinc-900"
              >
                <img
                  src={series.img}
                  alt={series.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/80 via-transparent to-transparent p-6">
                  <h3 className="text-sm font-bold uppercase tracking-[0.25em]">
                    {series.title}
                  </h3>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-400">
                    {series.meta}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

const featuredFilms: FilmCardProps[] = [
  {
    title: 'The Architect',
    meta: 'Mystery • 2024',
    image:
      'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=600',
  },
  {
    title: 'After Midnight',
    meta: 'Thriller • 2024',
    image:
      'https://images.unsplash.com/photo-1496715976403-7e36d43f17b5?auto=format&fit=crop&q=80&w=600',
  },
  {
    title: 'StarDust',
    meta: 'Sci-Fi • 2021',
    image:
      'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?auto=format&fit=crop&q=80&w=600',
  },
  {
    title: 'The Horizon',
    meta: 'Sci-Fi • 2024',
    image:
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=600',
  },
  {
    title: 'Glass City',
    meta: 'Drama • 2023',
    image:
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=600',
  },
  {
    title: 'Aether',
    meta: 'Sci-Fi • 2024',
    image:
      'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&q=80&w=600',
  },
]

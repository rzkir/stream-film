import { createFileRoute } from '@tanstack/react-router'

import { Atom, Trophy } from 'lucide-react'

import { FilmCard } from '#/components/ui/Card'

import { fetchFilmData } from '#/lib/FetchFilm'

import { Hero } from '#/components/ui/Hero'

import { LoadingComponent } from '#/components/Loading'

import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['film'],
    queryFn: fetchFilmData,
  })
  if (isLoading) return <LoadingComponent />
  if (error)
    return (
      <div>
        Error: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    )
  const film = data?.data
  return (
    <main
      className="min-h-screen bg-zinc-950 text-zinc-100"
      style={{ viewTransitionName: 'main-content' }}
    >
      <div className="flex flex-col pt-20">
        {/* Hero */}
        <Hero film={film?.slider || []} />

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
            {film?.popular.map((movie: PopularItem) => (
              <FilmCard
                key={movie.aquaaquariaId}
                title={movie.title}
                meta={movie.type || 'Movie'}
                image={movie.poster}
                href={`/${movie.aquaaquariaId}`}
              />
            ))}
          </div>
        </section>

        {/* Box Office */}
        <section className="mb-20 px-6 md:px-16 lg:px-24">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-xl font-bold uppercase tracking-[0.25em]">
              Box Office
            </h2>
            <button
              type="button"
              className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-500 transition-colors hover:text-white"
            >
              See All
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {film?.boxoffice.map((movie: BoxOfficeItem) => (
              <FilmCard
                key={movie.aquaaquariaId}
                title={movie.title}
                meta={movie.score || '0.0'}
                image={movie.poster}
                href={`/${movie.aquaaquariaId}`}
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

        {/* Serial TV */}
        <section className="mb-20 px-6 md:px-16 lg:px-24">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-xl font-bold uppercase tracking-[0.25em]">
              Serial TV
            </h2>
            <button
              type="button"
              className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-500 transition-colors hover:text-white"
            >
              See All
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {film?.serialtv.map((movie: SerialTvItem) => (
              <FilmCard
                key={movie.aquaaquariaId}
                title={movie.title}
                meta={movie.episode || '0'}
                image={movie.poster}
                href={`/${movie.aquaaquariaId}`}
              />
            ))}
          </div>
        </section>

        {/* Original Series */}
        <section className="mb-24 px-6 md:px-16 lg:px-24">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-xl font-bold uppercase tracking-[0.25em]">
              Last Movie
            </h2>
            <button
              type="button"
              className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-500 transition-colors hover:text-white"
            >
              Discover Series
            </button>
          </div>

          <div className="custom-scrollbar -mx-6 flex gap-6 overflow-x-auto px-6 pb-8">
            {film?.lastmovie.map((movie: LastMovieItem) => (
              <div
                key={movie.aquaaquariaId}
                className="movie-card group relative aspect-video w-80 shrink-0 overflow-hidden rounded-xl bg-zinc-900"
              >
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/80 via-transparent to-transparent p-6">
                  <h3 className="text-sm font-bold uppercase tracking-[0.25em]">
                    {movie.title}
                  </h3>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-400">
                    {movie.type}
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

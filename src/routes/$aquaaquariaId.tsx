import * as React from 'react'

import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { ChevronLeft, Play, Star } from 'lucide-react'

import { LoadingComponent } from '#/components/Loading'
import { fetchFilmDetailData } from '#/lib/FetchFilm'
import MediaPlayerWithAdBlock from '#/components/ui/MediaPlayer'

export const Route = createFileRoute('/$aquaaquariaId')({
  component: FilmDetailPage,
})

function FilmDetailPage() {
  const { aquaaquariaId } = Route.useParams()

  const { data, isLoading, error } = useQuery({
    queryKey: ['film-detail', aquaaquariaId],
    queryFn: () => fetchFilmDetailData(aquaaquariaId),
  })

  const [isPlaying, setIsPlaying] = React.useState(false)
  const [currentStreamUrl, setCurrentStreamUrl] = React.useState<string | null>(
    null,
  )

  if (isLoading) return <LoadingComponent />

  if (error) {
    return (
      <main className="min-h-screen bg-zinc-950 text-zinc-100 pt-20">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-8">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-zinc-400 hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Home
            </a>
          </div>
          <div className="rounded-3xl border border-red-900/50 bg-red-950/40 px-6 py-10 text-sm text-red-200">
            <p className="mb-2 font-semibold tracking-[0.25em] uppercase">
              Error Loading Detail
            </p>
            <p>
              {error instanceof Error
                ? error.message
                : 'Unknown error occurred'}
            </p>
          </div>
        </div>
      </main>
    )
  }

  const film = data?.data
  if (!film) {
    return (
      <main className="min-h-screen bg-zinc-950 text-zinc-100 pt-20">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-8">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-zinc-400 hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Home
            </a>
          </div>
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 px-6 py-10 text-sm text-zinc-300">
            <p className="font-semibold tracking-[0.25em] uppercase text-zinc-400">
              Detail not available
            </p>
          </div>
        </div>
      </main>
    )
  }

  const year = film.aired.split(', ').pop()
  const primaryGenre = film.genreList[0].title
  const scoreValue = film.score.split('/')[0]

  return (
    <main
      className="min-h-screen bg-zinc-950 text-zinc-100"
      style={{ viewTransitionName: 'main-content' }}
    >
      {/* HERO */}
      <section className="relative flex h-screen w-full items-center px-6 pt-24 md:px-16 lg:px-48 md:pt-0">
        <div className="absolute inset-0 z-0">
          <img
            src={film.poster}
            alt={film.title}
            className="h-full w-full object-cover opacity-60 md:opacity-80"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#09090b] via-[#09090b]/70 to-[#09090b]/10" />
          <div className="absolute inset-0 bg-linear-to-t from-[#09090b] via-transparent to-transparent" />
        </div>

        <div className="relative space-y-10 z-10 mt-10 max-w-2xl md:mt-0">
          <div className="flex flex-wrap items-center gap-3">
            {film.genreList.slice(0, 3).map((genre) => (
              <a
                key={genre.genreId}
                href={genre.href}
                className="rounded border border-zinc-700 bg-zinc-900/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-100"
              >
                {genre.title}
              </a>
            ))}

            <div className="ml-1 inline-flex items-center gap-1 text-amber-400">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span className="text-sm font-bold">{scoreValue}</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-none tracking-tight">
            {film.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
            {year && <span>{year}</span>}
            {year && (film.duration || film.episodes) && <span>•</span>}
            {film.duration && <span>{film.duration}</span>}
            {!film.duration && film.episodes ? (
              <span>{film.episodes} Episodes</span>
            ) : null}
            {(film.country || primaryGenre) && <span>•</span>}
            {primaryGenre && <span>{primaryGenre}</span>}
            {film.country && <span>{film.country}</span>}
          </div>

          {film.description && (
            <p className="max-w-xl text-base line-clamp-3 leading-relaxed text-zinc-400">
              {film.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => {
                const defaultStream =
                  // fallback ke beberapa kemungkinan nama field
                  (film as any).defaultStream ??
                  (film as any).defaultStreamUrl ??
                  ''
                if (!defaultStream) return
                setCurrentStreamUrl(defaultStream)
                setIsPlaying(true)
              }}
              className="flex items-center justify-center gap-3 rounded-full bg-white px-10 py-4 text-xs font-bold uppercase tracking-[0.3em] text-black transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(0,0,0,0.35)]"
            >
              Play Now
              <Play className="h-4 w-4" />
            </button>

            <button
              type="button"
              className="flex items-center justify-center gap-3 rounded-full border border-zinc-700 bg-zinc-900/60 px-8 py-4 text-xs font-bold uppercase tracking-[0.3em] text-zinc-100 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-500"
            >
              Trailer
            </button>

            <button
              type="button"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-700 text-zinc-100 transition-colors hover:bg-zinc-800"
            >
              +
            </button>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">
                Director
              </p>
              <a
                href={film.director.href}
                className="text-sm text-zinc-200 hover:underline"
              >
                {film.director.title}
              </a>
            </div>

            {film.country && (
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">
                  Country
                </p>
                <p className="text-sm text-zinc-300">{film.country}</p>
              </div>
            )}

            {film.aired && (
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">
                  Aired
                </p>
                <p className="text-sm text-zinc-300">{film.aired}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CAST / EPISODES / DETAILS */}
      <section className="px-6 py-16 container mx-auto">
        <div className="flex flex-col gap-16 lg:flex-row">
          <div className="lg:w-2/3 space-y-10">
            {film.episodeList.length ? (
              <>
                <h2 className="mb-10 text-sm font-bold uppercase tracking-[0.3em] text-zinc-500">
                  Episodes
                </h2>

                <div className="space-y-10">
                  <div>
                    <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-zinc-500">
                      Episodes
                    </h3>
                    <div className="grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
                      {film.episodeList.map((episode) => (
                        <a
                          key={episode.episodeId}
                          href={episode.href}
                          className="group flex items-center justify-between rounded-2xl border border-zinc-900 bg-zinc-950/70 px-5 py-4 text-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-900"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-200">
                              {episode.episodeNumber}
                            </div>
                            <div>
                              <p className="font-semibold uppercase tracking-[0.25em] text-zinc-100 group-hover:text-white">
                                {episode.title}
                              </p>
                            </div>
                          </div>
                          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-500 group-hover:text-zinc-300">
                            Watch
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              isPlaying &&
              currentStreamUrl && (
                <div className="space-y-4">
                  <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-zinc-500">
                    Now Playing
                  </h2>
                  <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-black aspect-video">
                    <MediaPlayerWithAdBlock
                      streamUrl={currentStreamUrl}
                      onError={() => setIsPlaying(false)}
                    />
                  </div>
                </div>
              )
            )}
          </div>

          <div className="mt-12 border-t border-zinc-900 pt-10 lg:mt-0 lg:w-1/3 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
            <h2 className="mb-10 text-sm font-bold uppercase tracking-[0.3em] text-zinc-500">
              Details
            </h2>
            <div className="space-y-6 text-sm text-zinc-300">
              {film.server.qualities.length ? (
                <div className="flex items-start justify-between border-b border-zinc-900 pb-4">
                  <span className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                    Servers
                  </span>
                  <div className="flex max-w-[60%] flex-wrap justify-end gap-2 text-right">
                    {film.server.qualities.map((quality) => (
                      <span
                        key={quality.title}
                        className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-900/70 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-100"
                      >
                        {quality.title}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
              {film.country && (
                <div className="flex items-start justify-between border-b border-zinc-900 pb-4">
                  <span className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                    Country
                  </span>
                  <span className="text-right">{film.country}</span>
                </div>
              )}
              {film.aired && (
                <div className="flex items-start justify-between border-b border-zinc-900 pb-4">
                  <span className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                    Released
                  </span>
                  <span className="text-right">{film.aired}</span>
                </div>
              )}
              {film.episodes ? (
                <div className="flex items-start justify-between border-b border-zinc-900 pb-4">
                  <span className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                    Episodes
                  </span>
                  <span className="text-right">{film.episodes}</span>
                </div>
              ) : null}
              {film.cast.length ? (
                <div className="flex items-start justify-between border-b border-zinc-900 pb-4">
                  <span className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                    Cast
                  </span>
                  <div className="flex max-w-[60%] flex-col items-end gap-1 text-right">
                    {film.cast.map((person) => (
                      <a
                        key={person.castId}
                        href={person.href}
                        className="text-xs text-zinc-300 hover:text-zinc-100 hover:underline"
                      >
                        {person.title}
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* RELATED */}
      {film.relatedList.length ? (
        <section className="bg-zinc-900/20 px-6 py-16">
          <div className="container mx-auto space-y-10">
            <div className="flex items-end justify-between">
              <h2 className="text-2xl font-bold tracking-tight">
                Similar Experiences
              </h2>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                View All
              </span>
            </div>

            <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5">
              {film.relatedList.map((item) => {
                const itemPrimaryGenre = item.genreList[0].title
                const meta =
                  itemPrimaryGenre && item.country
                    ? `${itemPrimaryGenre} • ${item.country}`
                    : itemPrimaryGenre || item.country || ''

                return (
                  <a
                    key={item.aquaaquariaId}
                    href={item.href}
                    className="group block"
                  >
                    <div className="mb-4 aspect-2/3 overflow-hidden rounded-lg bg-zinc-900">
                      <img
                        src={item.poster}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <h3 className="text-sm font-bold uppercase tracking-wide text-zinc-100 transition-colors group-hover:text-white">
                      {item.title}
                    </h3>
                    {meta && <p className="text-xs text-zinc-500">{meta}</p>}
                  </a>
                )
              })}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  )
}

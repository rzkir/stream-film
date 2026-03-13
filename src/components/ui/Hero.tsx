import { useEffect, useState } from 'react'

import { PlayCircle } from 'lucide-react'

export function Hero({ film }: { film: SliderItem[] }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % film.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [film.length])

  const slide = film[current]

  return (
    <section className="relative mb-12 flex h-[85vh] w-full items-center px-6 md:px-16 lg:px-24">
      <div className="absolute inset-0 -z-10">
        <img
          key={slide.poster}
          src={slide.poster}
          alt={slide.title}
          className="h-full w-full object-cover brightness-[0.7] transition-opacity duration-700"
        />
        <div className="hero-mask absolute inset-0" />
      </div>

      <div className="relative z-10 mt-24 max-w-2xl space-y-10">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            {slide.quality && (
              <span className="rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.25em] text-black bg-white">
                {slide.quality}
              </span>
            )}
            <div className="ml-2 flex items-center gap-1 text-amber-400">
              <span className="text-sm font-bold">
                {slide.releaseDate
                  ? new Date(slide.releaseDate).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : ''}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold leading-none tracking-tight sm:text-7xl">
            {slide.title}
          </h1>
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

      <div className="absolute bottom-6 right-6 flex gap-2 md:bottom-10 md:right-10">
        {film.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrent(index)}
            className={`h-1.5 w-6 rounded-full transition-colors ${
              index === current ? 'bg-white' : 'bg-white/30 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

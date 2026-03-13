import { useEffect, useState } from 'react'

import { Film, Play } from 'lucide-react'

export function LoadingComponent() {
  const [progress, setProgress] = useState(8)

  useEffect(() => {
    const startTime = performance.now()
    const targetDuration = 4000 // 4 detik untuk simulasi progress penuh

    let frameId: number

    const tick = (now: number) => {
      const elapsed = now - startTime
      const ratio = Math.min(1, elapsed / targetDuration)

      // Naik smooth dari 8% sampai maksimal 95%
      const next = 8 + ratio * 87

      setProgress((prev) => {
        const clamped = Math.min(95, next)
        return clamped > prev ? clamped : prev
      })

      if (ratio < 1) {
        frameId = requestAnimationFrame(tick)
      }
    }

    frameId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frameId)
      // Saat unmount (fetch selesai) kita set ke 100 agar bar terisi penuh
      setProgress(100)
    }
  }, [])

  const roundedProgress = Math.round(progress)

  return (
    <main className="min-h-screen bg-[#09090b] text-zinc-50">
      <div className="flex min-h-screen items-center justify-center relative overflow-hidden">
        {/* soft glow background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white rounded-full blur-[160px]" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-12 w-full max-w-md px-8">
          {/* Brand */}
          <div
            className="flex flex-col items-center gap-4 fade-up"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-2">
              <Play className="text-black h-4 w-4 translate-x-px" />
            </div>
            <h1 className="text-2xl font-bold tracking-[0.3em] uppercase">
              Zona Nonton
            </h1>
            <p className="text-[10px] text-zinc-500 font-bold tracking-[0.4em] uppercase">
              Nonton Film Gratis
            </p>
          </div>

          {/* Loader */}
          <div
            className="relative flex flex-col items-center fade-up"
            style={{ animationDelay: '0.4s' }}
          >
            <div className="loader-circle" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Film className="text-zinc-600 h-4 w-4" />
            </div>
          </div>

          {/* Progress */}
          <div
            className="w-full space-y-4 fade-up"
            style={{ animationDelay: '0.6s' }}
          >
            <div className="flex justify-between items-end mb-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                Syncing Library
              </span>
              <span className="text-xs font-mono font-bold text-white">
                {roundedProgress}%
              </span>
            </div>
            <div className="h-[2px] w-full bg-zinc-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-white loading-bar-fill shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                style={{ width: `${roundedProgress}%` }}
              />
            </div>
          </div>

          {/* Caption */}
          <p
            className="text-[11px] font-medium text-zinc-500 uppercase tracking-[0.25em] text-center pulse-text fade-up"
            style={{ animationDelay: '0.8s' }}
          >
            Preparing your cinematic experience...
          </p>

          {/* Dots */}
          <div
            className="flex gap-4 mt-4 fade-up"
            style={{ animationDelay: '1s' }}
          >
            <div className="w-1 h-1 rounded-full bg-zinc-800" />
            <div className="w-1 h-1 rounded-full bg-zinc-800" />
            <div className="w-1 h-1 rounded-full bg-zinc-800" />
          </div>
        </div>

        {/* Footer text */}
        <div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-[0.5em] text-zinc-700 uppercase fade-up"
          style={{ animationDelay: '1.2s' }}
        >
          Est. 2026 • Nonton Film Gratis
        </div>
      </div>
    </main>
  )
}

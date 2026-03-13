import { cn } from '#/lib/utils'

export function FilmCard({
  title,
  meta,
  image,
  href,
  className,
  children,
}: FilmCardProps) {
  const content = (
    <div
      className={cn(
        'movie-card group relative aspect-2/3 overflow-hidden rounded-xl bg-zinc-900',
        className,
      )}
    >
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
      />
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/90 via-transparent to-transparent p-5 opacity-0 transition-opacity group-hover:opacity-100">
        <h3 className="mb-1 text-xs font-bold uppercase tracking-[0.25em]">
          {title}
        </h3>
        <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-400">
          {meta}
        </p>
        {children}
      </div>
    </div>
  )

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    )
  }

  return content
}

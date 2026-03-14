type FilmCardProps = {
  title: string
  meta: string
  image: string
  href?: string
  className?: string
  children?: ReactNode
}

interface MediaPlayerWithAdBlockProps {
  streamUrl: string
  isMinimized?: boolean
  onError?: (error: string) => void
  onLoadSuccess?: () => void
  enableAdBlocking?: boolean
}

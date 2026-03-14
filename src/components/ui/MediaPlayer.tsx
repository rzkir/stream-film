import React from 'react'

import MediaPlayerLoading from '@/components/ui/MediaPlayerLoading'

type MediaPlayerWithAdBlockProps = {
  streamUrl: string
  onError?: (message: string) => void
  onLoadSuccess?: () => void
  enableAdBlocking?: boolean
}

const MediaPlayerWithAdBlock: React.FC<MediaPlayerWithAdBlockProps> = ({
  streamUrl,
  onError,
  onLoadSuccess,
}) => {
  const [error, setError] = React.useState<string | null>(null)
  const [isPlayerLoading, setIsPlayerLoading] = React.useState(true)

  const handleIframeError = () => {
    const errorMessage = 'Gagal memuat video. Periksa koneksi atau coba lagi.'
    setError(errorMessage)
    onError?.(errorMessage)
    setIsPlayerLoading(false)
  }

  const handleIframeLoadEnd = () => {
    setError(null)
    onLoadSuccess?.()
    setIsPlayerLoading(false)
  }

  React.useEffect(() => {
    // Reset loading state setiap kali streamUrl berubah
    if (streamUrl) {
      setIsPlayerLoading(true)
    }
  }, [streamUrl])
  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      {/* Video iframe layer */}
      <iframe
        src={streamUrl}
        onLoad={handleIframeLoadEnd}
        onError={
          handleIframeError as unknown as React.ReactEventHandler<HTMLIFrameElement>
        }
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        className="absolute inset-0 w-full h-full border-0"
      />

      {/* Overlay loading skeleton saat player sedang dimuat */}
      {isPlayerLoading && !error && (
        <div className="absolute inset-0">
          <MediaPlayerLoading />
        </div>
      )}
    </div>
  )
}

export default MediaPlayerWithAdBlock

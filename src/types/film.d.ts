interface FilmApiResponse {
  statusCode: number
  statusMessage: string
  message: string
  ok: boolean
  data: FilmData
}

interface FilmData {
  slider: SliderItem[]
  boxoffice: BoxOfficeItem[]
  serialtv: SerialTvItem[]
  animasi: any[] // belum ada contoh data
  popular: PopularItem[]
  anime: AnimeItem[]
  lastmovie: LastMovieItem[]
}

interface BaseFilmItem {
  title: string
  poster: string
  aquaaquariaId: string
  href: string
}

interface SliderItem extends BaseFilmItem {
  releaseDate: string
  quality?: string
}

interface BoxOfficeItem extends BaseFilmItem {
  score: string
  type?: string // "Movie" | "Series" dll
  quality?: string // "HD" | "HDTS" | "HDCAM" dll
  episode?: string
  tailer: string
}

interface SerialTvItem extends BaseFilmItem {
  score?: string
  episode: string
  tailer: string
}

interface PopularItem extends BaseFilmItem {
  score?: string
  type?: string // "Movie" | "Series"
  quality?: string
  episode?: string
  tailer: string
}

interface AnimeItem extends BaseFilmItem {
  releaseDate: string // ISO string
  score?: string
  episode: string
}

interface GenreItem {
  title: string
  genreId: string
  href: string
}

interface LastMovieItem extends BaseFilmItem {
  score?: string
  type?: string // "TV Show" | "Movie" dll
  duration?: string // contoh: "136 min"
  quality?: string
  episode?: string
  tailer: string
  genreList?: GenreItem[]
}

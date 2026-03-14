/* ======================== Home Page ======================== */
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

/* ======================== Film Detail Page ======================== */
interface FilmDetailApiResponse {
  statusCode: number
  statusMessage: string
  message: string
  ok: boolean
  data: FilmDetailData
}

interface FilmDetailData {
  title: string
  aquaaquariaId: string
  score: string
  director: DirectorItem
  aired: string
  duration: string
  episodes: number
  defaultStream: string
  country: string
  poster: string
  description: string
  cast: CastItem[]
  genreList: GenreItem[]
  relatedList: RelatedItem[]
  server: ServerInfo
  episodeList: EpisodeItem[]
}

interface DirectorItem {
  title: string
  directorId: string
  href: string
}

interface CastItem {
  title: string
  castId: string
  href: string
}

interface RelatedItem extends BaseFilmItem {
  genreList: GenreItem[]
  releaseDate: string
  country: string
}

interface ServerInfo {
  // Bentuk aktual dari API: array objek { title, serverList }
  qualities: {
    title: string
    serverList: unknown[]
  }[]
}

interface EpisodeItem {
  title: string
  episodeNumber: number
  episodeId: string
  href: string
}

/* ======================== Film Server ======================== */
interface FilmServerApiResponse {
  statusCode: number
  statusMessage: string
  message: string
  ok: boolean
  data: FilmServerData
}

interface FilmServerData {
  url: string
}

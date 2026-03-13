import { buildAuthHeaders } from '#/lib/AuthHeaders'

const API_URL = import.meta.env.VITE_API_URL

export const fetchFilmData = async (): Promise<FilmApiResponse> => {
  if (!API_URL) {
    throw new Error('VITE_API_URL not configured')
  }

  const response = await fetch(`${API_URL}/home`, {
    headers: buildAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error(
      `Failed to fetch film data: ${response.status} ${response.statusText}`,
    )
  }

  const json: FilmApiResponse = await response.json()
  return json
}

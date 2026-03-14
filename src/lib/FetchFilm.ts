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

export const fetchFilmDetailData = async (
  aquaaquariaId: string,
): Promise<FilmDetailApiResponse> => {
  if (!API_URL) {
    throw new Error('VITE_API_URL not configured')
  }

  const response = await fetch(`${API_URL}/${aquaaquariaId}`, {
    headers: buildAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error(
      `Failed to fetch film detail data: ${response.status} ${response.statusText}`,
    )
  }

  const json: FilmDetailApiResponse = await response.json()
  return json
}

export const fetchFilmServerData = async (
  serverId: string,
): Promise<FilmServerApiResponse> => {
  if (!API_URL) {
    throw new Error('VITE_API_URL not configured')
  }

  const response = await fetch(`${API_URL}/server/${serverId}`, {
    headers: buildAuthHeaders(),
  })

  if (!response.ok) {
    throw new Error(
      `Failed to fetch film server data: ${response.status} ${response.statusText}`,
    )
  }

  const json: FilmServerApiResponse = await response.json()
  return json
}

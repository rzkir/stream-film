export const buildAuthHeaders = (): HeadersInit => {
  const apiSecret = import.meta.env.VITE_API_SECRET
  if (!apiSecret) {
    throw new Error('VITE_API_SECRET not configured')
  }
  return {
    Authorization: `Bearer ${apiSecret}`,
    'X-API-Key': apiSecret,
    'Content-Type': 'application/json',
  }
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

/**
 * Server-side fetch helper for public read endpoints (used from Server
 * Components). Revalidates every 60s by default so content stays fresh
 * without hitting the API on every request.
 *
 * @param {string} path - API path, e.g. '/blogs' or '/courses/some-slug'.
 * @param {object} [options] - Extra fetch options (merged with defaults).
 * @returns {Promise<object|null>} Parsed `{ success, data }` body, or null on 404.
 */
export async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_URL}/api${path}`, {
    next: { revalidate: 60 },
    ...options,
  })

  if (res.status === 404) return null
  if (!res.ok) {
    throw new Error(`API request failed (${res.status}): ${path}`)
  }

  return res.json()
}

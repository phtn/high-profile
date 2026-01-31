import { ConvexHttpClient } from 'convex/browser'

let cachedClient: ConvexHttpClient | null = null

export const getConvexUrl = () => process.env.NEXT_PUBLIC_CONVEX_URL ?? process.env.CONVEX_URL ?? null

const getClient = () => {
  const url = getConvexUrl()
  if (!url) {
    return null
  }

  if (!cachedClient) {
    cachedClient = new ConvexHttpClient(url)
  }
  return cachedClient
}

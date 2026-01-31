'use client'

import { getConvexReactClient } from '@/lib/convex/client'
import { ConvexProvider } from 'convex/react'
import { createContext, ReactNode, useMemo } from 'react'
import { AuthCtxProvider } from './auth'

interface ProvidersProviderProps {
  children: ReactNode
}

const ProvidersCtx = createContext(null)

export const ProvidersCtxProvider = ({ children }: ProvidersProviderProps) => {
  const convexClient = useMemo(() => getConvexReactClient(), [])

  const content = (
    <ProvidersCtx.Provider value={null}>
      <AuthCtxProvider>{children}</AuthCtxProvider>
    </ProvidersCtx.Provider>
  )

  return <ConvexProvider client={convexClient}>{content}</ConvexProvider>
}

'use client'
import { ErrorComp } from '@/app/components/error'
import { usePathname } from 'next/navigation'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}
export default function ErrorBoundary({ error, reset }: ErrorProps) {
  const pathname = usePathname()
  return <ErrorComp error={error} reset={reset} name={pathname} />
}

import type { ReactNode } from 'react'
import { MainLayout } from './MainLayout'

interface AppLayoutProps {
  children?: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground antialiased">
      <MainLayout>{children}</MainLayout>
    </div>
  )
}

import React from 'react'
import Sidebar from './Sidebar'
import Background from './Background'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Subtle background image with overlay */}
      <Background />

      {/* Sidebar - fixed on the left */}
      <Sidebar />

      {/* Main content area - offset by sidebar width */}
      <main className="relative z-10 min-h-screen pl-72">
        <div className="mx-auto max-w-7xl p-6 lg:p-8">{children}</div>
      </main>
    </div>
  )
}

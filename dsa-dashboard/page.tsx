'use client'

import { ProductInventoryDashboard } from '@/components/ProductInventoryDashboard'
import { Login } from '@/components/Login'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'

function Dashboard() {
  const { user } = useAuth()

  if (!user) {
    return <Login />
  }

  return <ProductInventoryDashboard />
}

export default function Home() {
  return (
    <AuthProvider>
      <main className="min-h-screen bg-background">
        <Dashboard />
      </main>
    </AuthProvider>
  )
}


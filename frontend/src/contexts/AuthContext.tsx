import React, { createContext, useContext, useState, ReactNode } from 'react'

interface User {
  id: string
  name: string
  role: 'admin' | 'vle'
  email: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => boolean
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo accounts
const demoAccounts = {
  admin: {
    email: 'admin@reachingroots.com',
    password: 'admin123',
    user: {
      id: '1',
      name: 'Admin User',
      role: 'admin' as const,
      email: 'admin@reachingroots.com'
    }
  },
  vle: {
    email: 'vle@reachingroots.com',
    password: 'vle123',
    user: {
      id: '2',
      name: 'Rajesh Kumar (VLE)',
      role: 'vle' as const,
      email: 'vle@reachingroots.com'
    }
  }
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  const login = (email: string, password: string): boolean => {
    const account = Object.values(demoAccounts).find(acc => acc.email === email)
    
    if (account && account.password === password) {
      setUser(account.user)
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
  }

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 
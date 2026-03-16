"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Definir el tipo de usuario
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

// Definir el tipo del contexto de autenticación
interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Credenciales fijas para la autenticación simulada
const MOCK_USERS = [
  {
    id: "1",
    name: "Usuario Demo",
    email: "demo@ejemplo.com",
    password: "password123",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "2",
    name: "Admin",
    email: "admin@ejemplo.com",
    password: "admin123",
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Cargar el usuario desde localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("netflix_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Error parsing stored user:", error)
        localStorage.removeItem("netflix_user")
      }
    }
    setIsLoading(false)
  }, [])

  // Función de inicio de sesión
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simular una petición a un servidor
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = MOCK_USERS.find(
          (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
        )

        if (foundUser) {
          // Omitir la contraseña del objeto de usuario
          const { password: _, ...userWithoutPassword } = foundUser
          setUser(userWithoutPassword)
          localStorage.setItem("netflix_user", JSON.stringify(userWithoutPassword))
          resolve(true)
        } else {
          resolve(false)
        }
      }, 800) // Simular delay de red
    })
  }

  // Función de cierre de sesión
  const logout = () => {
    setUser(null)
    localStorage.removeItem("netflix_user")
  }

  return <AuthContext.Provider value={{ user, isLoading, login, logout }}>{children}</AuthContext.Provider>
}

// Hook personalizado para usar el contexto de autenticación
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

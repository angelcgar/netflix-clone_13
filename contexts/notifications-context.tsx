"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface Notification {
  id: string
  title: string
  message: string
  image?: string
  date: Date
  read: boolean
  link?: string
}

interface NotificationsContextType {
  notifications: Notification[]
  unreadCount: number
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  clearNotification: (id: string) => void
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined)

// Notificaciones de ejemplo
const EXAMPLE_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "Nueva temporada",
    message: "Ya está disponible la nueva temporada de Stranger Things",
    image: "/placeholder.svg?height=100&width=100",
    date: new Date(Date.now() - 1000 * 60 * 30), // 30 minutos atrás
    read: false,
    link: "/tv/1",
  },
  {
    id: "2",
    title: "Recomendación",
    message: "Basado en tu historial, te recomendamos ver The Witcher",
    image: "/placeholder.svg?height=100&width=100",
    date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 horas atrás
    read: false,
    link: "/tv/2",
  },
  {
    id: "3",
    title: "Continuar viendo",
    message: "Continúa viendo desde donde lo dejaste: Breaking Bad",
    image: "/placeholder.svg?height=100&width=100",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 día atrás
    read: true,
    link: "/tv/4",
  },
]

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  // Cargar notificaciones al iniciar
  useEffect(() => {
    const storedNotifications = localStorage.getItem("netflix_notifications")
    if (storedNotifications) {
      try {
        const parsedNotifications = JSON.parse(storedNotifications)
        // Convertir las fechas de string a Date
        const notificationsWithDates = parsedNotifications.map((notification: any) => ({
          ...notification,
          date: new Date(notification.date),
        }))
        setNotifications(notificationsWithDates)
      } catch (error) {
        console.error("Error parsing stored notifications:", error)
        setNotifications(EXAMPLE_NOTIFICATIONS)
        localStorage.setItem("netflix_notifications", JSON.stringify(EXAMPLE_NOTIFICATIONS))
      }
    } else {
      // Si no hay notificaciones guardadas, usar las de ejemplo
      setNotifications(EXAMPLE_NOTIFICATIONS)
      localStorage.setItem("netflix_notifications", JSON.stringify(EXAMPLE_NOTIFICATIONS))
    }
  }, [])

  // Guardar notificaciones cuando cambien
  useEffect(() => {
    if (notifications.length > 0) {
      localStorage.setItem("netflix_notifications", JSON.stringify(notifications))
    }
  }, [notifications])

  const unreadCount = notifications.filter((notification) => !notification.read).length

  const markAsRead = (id: string) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prevNotifications) => prevNotifications.map((notification) => ({ ...notification, read: true })))
  }

  const clearNotification = (id: string) => {
    setNotifications((prevNotifications) => prevNotifications.filter((notification) => notification.id !== id))
  }

  return (
    <NotificationsContext.Provider value={{ notifications, unreadCount, markAsRead, markAllAsRead, clearNotification }}>
      {children}
    </NotificationsContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationsContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationsProvider")
  }
  return context
}

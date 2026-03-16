"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Bell, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNotifications, type Notification } from "@/contexts/notifications-context"
import { cn } from "@/lib/utils"

export function NotificationsDropdown() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotification } = useNotifications()
  const [open, setOpen] = useState(false)

  // Marcar notificación como leída cuando se hace clic en ella
  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id)
    }
    setOpen(false)
  }

  // Formatear fecha relativa (ej: "hace 5 minutos", "hace 2 horas")
  const formatRelativeTime = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffSecs = Math.floor(diffMs / 1000)
    const diffMins = Math.floor(diffSecs / 60)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffDays > 0) {
      return `hace ${diffDays} día${diffDays > 1 ? "s" : ""}`
    } else if (diffHours > 0) {
      return `hace ${diffHours} hora${diffHours > 1 ? "s" : ""}`
    } else if (diffMins > 0) {
      return `hace ${diffMins} minuto${diffMins > 1 ? "s" : ""}`
    } else {
      return "ahora mismo"
    }
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold animate-in zoom-in-50 duration-300">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">Notificaciones</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notificaciones</span>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-8 text-xs">
              <Check className="mr-1 h-3 w-3" />
              Marcar todo como leído
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[60vh] overflow-y-auto">
          <DropdownMenuGroup>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className={cn(
                    "flex items-start p-3 cursor-pointer transition-colors hover:bg-zinc-800",
                    !notification.read && "bg-zinc-900",
                  )}
                  onSelect={(e) => e.preventDefault()}
                >
                  <Link
                    href={notification.link || "#"}
                    className="flex flex-1"
                    onClick={() => handleNotificationClick(notification)}
                  >
                    {notification.image && (
                      <div className="mr-3 flex-shrink-0">
                        <div className="relative h-10 w-10 overflow-hidden rounded">
                          <Image
                            src={notification.image || "/placeholder.svg"}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        </div>
                      </div>
                    )}
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className={cn("text-sm font-medium", !notification.read && "font-bold")}>
                          {notification.title}
                        </p>
                        <span className="text-xs text-zinc-400">{formatRelativeTime(notification.date)}</span>
                      </div>
                      <p className="text-xs text-zinc-400 line-clamp-2">{notification.message}</p>
                    </div>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-2 h-6 w-6 flex-shrink-0 rounded-full opacity-0 transition-opacity group-hover:opacity-100 hover:bg-zinc-700"
                    onClick={() => clearNotification(notification.id)}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Eliminar notificación</span>
                  </Button>
                </DropdownMenuItem>
              ))
            ) : (
              <div className="py-6 text-center">
                <p className="text-sm text-zinc-400">No tienes notificaciones</p>
              </div>
            )}
          </DropdownMenuGroup>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

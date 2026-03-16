"use client"

import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/contexts/auth-context"
import { CreditCard, Bell, Languages, Lock, Monitor, User, HelpCircle, ChevronRight, Smartphone } from "lucide-react"

export default function SettingsPage() {
  const router = useRouter()
  const { user } = useAuth()

  // Redirigir si no hay usuario autenticado
  if (!user) {
    router.push("/login")
    return null
  }

  const settingsSections = [
    {
      title: "Cuenta",
      items: [
        {
          icon: <User className="h-5 w-5" />,
          label: "Información personal",
          description: "Gestiona tu información personal",
          href: "/profile",
        },
        {
          icon: <CreditCard className="h-5 w-5" />,
          label: "Suscripciones",
          description: "Gestiona tu plan y método de pago",
          href: "/settings/subscriptions",
          highlight: true,
        },
        {
          icon: <Lock className="h-5 w-5" />,
          label: "Seguridad",
          description: "Contraseña y autenticación",
          href: "/settings/security",
        },
      ],
    },
    {
      title: "Preferencias",
      items: [
        {
          icon: <Bell className="h-5 w-5" />,
          label: "Notificaciones",
          description: "Gestiona tus notificaciones",
          href: "/settings/notifications",
        },
        {
          icon: <Languages className="h-5 w-5" />,
          label: "Idioma",
          description: "Cambia el idioma de la aplicación",
          href: "/settings/language",
        },
        {
          icon: <Monitor className="h-5 w-5" />,
          label: "Reproducción",
          description: "Calidad de video y reproducción automática",
          href: "/settings/playback",
        },
      ],
    },
    {
      title: "Dispositivos",
      items: [
        {
          icon: <Smartphone className="h-5 w-5" />,
          label: "Dispositivos conectados",
          description: "Gestiona los dispositivos conectados a tu cuenta",
          href: "/settings/devices",
        },
      ],
    },
    {
      title: "Soporte",
      items: [
        {
          icon: <HelpCircle className="h-5 w-5" />,
          label: "Centro de ayuda",
          description: "Obtén ayuda y soporte",
          href: "/help",
        },
      ],
    },
  ]

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <div className="container max-w-4xl pt-24 pb-16 px-4 md:px-6 animate-in fade-in-50 duration-500">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Configuración</h1>

        <div className="space-y-8">
          {settingsSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h2 className="text-xl font-semibold text-white">{section.title}</h2>
              <Separator className="my-4" />
              <div className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <Button
                    key={itemIndex}
                    variant="ghost"
                    className={`w-full justify-start p-4 h-auto hover:bg-zinc-900 transition-colors ${
                      item.highlight ? "border border-red-600" : ""
                    }`}
                    onClick={() => router.push(item.href)}
                  >
                    <div className="flex items-center w-full">
                      <div
                        className={`mr-4 p-2 rounded-full ${
                          item.highlight ? "bg-red-600/20 text-red-500" : "bg-zinc-800 text-zinc-400"
                        }`}
                      >
                        {item.icon}
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className={`font-medium ${item.highlight ? "text-red-500" : "text-white"}`}>
                          {item.label}
                        </h3>
                        <p className="text-sm text-zinc-400">{item.description}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-zinc-500" />
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

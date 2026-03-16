"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Pencil, Camera, User } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/contexts/auth-context"
import { useLikes } from "@/contexts/likes-context"
import { useMyList } from "@/contexts/my-list-context"

export default function ProfilePage() {
  const router = useRouter()
  const { user } = useAuth()
  const { likedMovies } = useLikes()
  const { myList } = useMyList()
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")

  // Redirigir si no hay usuario autenticado
  if (!user) {
    router.push("/login")
    return null
  }

  const handleSaveProfile = () => {
    // Aquí iría la lógica para guardar los cambios del perfil
    // Por ahora, solo cambiamos el estado de edición
    setIsEditing(false)
  }

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <div className="container max-w-4xl pt-24 pb-16 px-4 md:px-6 animate-in fade-in-50 duration-500">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Mi Perfil</h1>

        <div className="grid md:grid-cols-[250px_1fr] gap-8">
          <div className="flex flex-col items-center">
            <div className="relative group">
              <div className="w-40 h-40 rounded-full overflow-hidden bg-zinc-800 mb-4">
                {user.avatar ? (
                  <Image
                    src={user.avatar || "/placeholder.svg"}
                    alt={user.name}
                    width={160}
                    height={160}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-red-600">
                    <User className="h-20 w-20 text-white" />
                  </div>
                )}
              </div>
              <button className="absolute bottom-4 right-0 bg-red-600 hover:bg-red-700 transition-colors p-2 rounded-full">
                <Camera className="h-5 w-5" />
              </button>
            </div>

            <div className="w-full mt-6 space-y-4">
              <div className="bg-zinc-900 p-4 rounded-md">
                <h3 className="font-medium mb-2">Estadísticas</h3>
                <div className="space-y-2 text-sm text-zinc-400">
                  <div className="flex justify-between">
                    <span>Miembro desde:</span>
                    <span className="text-white">Enero 2023</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mi Lista:</span>
                    <span className="text-white">{myList.length} títulos</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Me gusta:</span>
                    <span className="text-white">{likedMovies.length} títulos</span>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900 p-4 rounded-md">
                <h3 className="font-medium mb-2">Plan actual</h3>
                <div className="text-sm text-zinc-400">
                  <p className="text-white font-medium">Premium</p>
                  <p>4K + HDR</p>
                  <p>4 dispositivos</p>
                </div>
                <Button
                  variant="link"
                  className="text-red-600 hover:text-red-500 transition-colors p-0 mt-2 h-auto"
                  onClick={() => router.push("/settings/subscriptions")}
                >
                  Cambiar plan
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Información personal</h2>
              {!isEditing && (
                <Button variant="outline" size="sm" className="gap-2" onClick={() => setIsEditing(true)}>
                  <Pencil className="h-4 w-4" />
                  Editar
                </Button>
              )}
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-zinc-800 border-zinc-700"
                  />
                ) : (
                  <p className="text-zinc-300 py-2">{user.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-zinc-800 border-zinc-700"
                  />
                ) : (
                  <p className="text-zinc-300 py-2">{user.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Contraseña</Label>
                <p className="text-zinc-300 py-2">********</p>
                <Button variant="link" className="text-red-600 hover:text-red-500 transition-colors p-0 h-auto">
                  Cambiar contraseña
                </Button>
              </div>

              {isEditing && (
                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSaveProfile}>Guardar cambios</Button>
                </div>
              )}
            </div>

            <Separator className="my-8" />

            <div>
              <h2 className="text-xl font-semibold mb-6">Preferencias</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Idioma</Label>
                  <p className="text-zinc-300 py-2">Español</p>
                </div>

                <div className="space-y-2">
                  <Label>Reproducción automática</Label>
                  <p className="text-zinc-300 py-2">Activada</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

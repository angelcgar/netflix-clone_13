"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/contexts/auth-context"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

const formSchema = z.object({
  email: z.string().email({ message: "Correo electrónico inválido" }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  rememberMe: z.boolean().default(false),
})

export default function LoginPage() {
  const router = useRouter()
  const { user, login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)

  // Redirigir si el usuario ya está autenticado
  useEffect(() => {
    if (user) {
      router.push("/")
    }
  }, [user, router])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setLoginError(null)

    try {
      const success = await login(values.email, values.password)

      if (success) {
        router.push("/")
      } else {
        setLoginError("Correo electrónico o contraseña incorrectos")
      }
    } catch (error) {
      setLoginError("Ocurrió un error al iniciar sesión")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-black bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/60" />

      <header className="relative z-10 p-4 md:p-6">
        <Link href="/" className="text-red-600 font-bold text-4xl">
          NETFLIX
        </Link>
      </header>

      <main className="relative z-10 flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-black/80 p-8 md:p-12 rounded">
          <h1 className="text-3xl font-bold mb-8">Iniciar sesión</h1>

          {loginError && (
            <Alert variant="destructive" className="mb-6 bg-red-900/50 border-red-800">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{loginError}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="nombre@ejemplo.com"
                        {...field}
                        className="bg-zinc-800 border-zinc-700"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Contraseña"
                        {...field}
                        className="bg-zinc-800 border-zinc-700"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">Recuérdame</FormLabel>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isLoading}>
                {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-zinc-400 text-sm space-y-4">
            <p>
              ¿Primera vez en Netflix?{" "}
              <Link href="/signup" className="text-white hover:underline">
                Suscríbete ahora
              </Link>
            </p>
            <p className="text-xs">
              <strong>Credenciales de prueba:</strong>
              <br />
              Email: demo@ejemplo.com
              <br />
              Contraseña: password123
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

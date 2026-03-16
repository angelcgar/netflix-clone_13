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
import { useAuth } from "@/contexts/auth-context"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

const formSchema = z
  .object({
    name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
    email: z.string().email({ message: "Correo electrónico inválido" }),
    password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  })

export default function SignupPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [signupError, setSignupError] = useState<string | null>(null)

  // Redirigir si el usuario ya está autenticado
  useEffect(() => {
    if (user) {
      router.push("/")
    }
  }, [user, router])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setSignupError(null)

    // Simulación de registro
    setTimeout(() => {
      console.log("Registro simulado:", values)
      setIsLoading(false)

      // Mostrar mensaje de éxito y redirigir a login
      router.push("/login?registered=true")
    }, 1500)
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
          <h1 className="text-3xl font-bold mb-8">Regístrate</h1>

          {signupError && (
            <Alert variant="destructive" className="mb-6 bg-red-900/50 border-red-800">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{signupError}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Tu nombre" {...field} className="bg-zinc-800 border-zinc-700" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar contraseña</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirmar contraseña"
                        {...field}
                        className="bg-zinc-800 border-zinc-700"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isLoading}>
                {isLoading ? "Registrando..." : "Registrarse"}
              </Button>
            </form>
          </Form>

          <div className="mt-4 text-zinc-400 text-sm">
            <p>
              ¿Ya tienes una cuenta?{" "}
              <Link href="/login" className="text-white hover:underline">
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

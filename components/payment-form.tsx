"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, Check } from "lucide-react"

interface PaymentFormProps {
  selectedPlan: "basic" | "standard" | "premium"
  onBack: () => void
}

export function PaymentForm({ selectedPlan, onBack }: PaymentFormProps) {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  const planDetails = {
    basic: { name: "Básico", price: "8.99" },
    standard: { name: "Estándar", price: "13.99" },
    premium: { name: "Premium", price: "17.99" },
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulamos el procesamiento del pago
    setTimeout(() => {
      setIsProcessing(false)
      setPaymentSuccess(true)

      // Redirigimos después de un tiempo
      setTimeout(() => {
        router.push("/settings")
      }, 3000)
    }, 2000)
  }

  if (paymentSuccess) {
    return (
      <div className="bg-zinc-900 rounded-lg p-8 text-center animate-in fade-in-0 zoom-in-95 duration-300">
        <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold mb-4">¡Pago completado con éxito!</h2>
        <p className="text-zinc-400 mb-8">
          Tu suscripción al plan {planDetails[selectedPlan].name} ha sido activada. ¡Disfruta de Netflix!
        </p>
        <Button onClick={() => router.push("/")}>Ir a inicio</Button>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-[1fr_300px] gap-8">
      <div className="bg-zinc-900 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Información de pago</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="cardNumber">Número de tarjeta</Label>
              <div className="flex gap-2">
                <Image src="/placeholder.svg?height=24&width=36" alt="Visa" width={36} height={24} />
                <Image src="/placeholder.svg?height=24&width=36" alt="Mastercard" width={36} height={24} />
                <Image src="/placeholder.svg?height=24&width=36" alt="Amex" width={36} height={24} />
              </div>
            </div>
            <div className="relative">
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                className="bg-zinc-800 border-zinc-700 pl-10"
                required
              />
              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Fecha de expiración</Label>
              <div className="grid grid-cols-2 gap-2">
                <Select defaultValue="01">
                  <SelectTrigger className="bg-zinc-800 border-zinc-700">
                    <SelectValue placeholder="MM" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => {
                      const month = (i + 1).toString().padStart(2, "0")
                      return (
                        <SelectItem key={month} value={month}>
                          {month}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>

                <Select defaultValue="2025">
                  <SelectTrigger className="bg-zinc-800 border-zinc-700">
                    <SelectValue placeholder="YY" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => {
                      const year = (new Date().getFullYear() + i).toString()
                      return (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cvv">Código de seguridad (CVV)</Label>
              <Input id="cvv" placeholder="123" className="bg-zinc-800 border-zinc-700" maxLength={4} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Nombre en la tarjeta</Label>
            <Input id="name" placeholder="Nombre Apellido" className="bg-zinc-800 border-zinc-700" required />
          </div>

          <Separator className="my-6" />

          <div className="space-y-2">
            <Label>Dirección de facturación</Label>
            <Input placeholder="Dirección" className="bg-zinc-800 border-zinc-700" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="Ciudad" className="bg-zinc-800 border-zinc-700" required />
            <Input placeholder="Código postal" className="bg-zinc-800 border-zinc-700" required />
          </div>

          <div className="space-y-2">
            <Label>País</Label>
            <Select defaultValue="ES">
              <SelectTrigger className="bg-zinc-800 border-zinc-700">
                <SelectValue placeholder="Selecciona un país" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ES">España</SelectItem>
                <SelectItem value="US">Estados Unidos</SelectItem>
                <SelectItem value="MX">México</SelectItem>
                <SelectItem value="AR">Argentina</SelectItem>
                <SelectItem value="CO">Colombia</SelectItem>
                <SelectItem value="CL">Chile</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={onBack}>
              Volver
            </Button>
            <Button type="submit" disabled={isProcessing}>
              {isProcessing ? "Procesando..." : "Confirmar suscripción"}
            </Button>
          </div>
        </form>
      </div>

      <div className="space-y-6">
        <div className="bg-zinc-900 rounded-lg p-6">
          <h3 className="font-medium mb-4">Resumen del pedido</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-zinc-400">Plan</span>
              <span>{planDetails[selectedPlan].name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Precio mensual</span>
              <span>{planDetails[selectedPlan].price}€</span>
            </div>
            <Separator className="my-3" />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>{planDetails[selectedPlan].price}€/mes</span>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-lg p-6">
          <h3 className="font-medium mb-4">Información importante</h3>
          <ul className="text-sm text-zinc-400 space-y-2">
            <li>• Tu suscripción se renovará automáticamente cada mes.</li>
            <li>• Puedes cancelar en cualquier momento desde la configuración de tu cuenta.</li>
            <li>• No hay compromisos ni contratos de permanencia.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

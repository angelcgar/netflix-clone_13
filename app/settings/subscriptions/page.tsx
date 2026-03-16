"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/contexts/auth-context"
import { PaymentForm } from "@/components/payment-form"
import { Check, ArrowLeft } from "lucide-react"

export default function SubscriptionsPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [selectedPlan, setSelectedPlan] = useState<"basic" | "standard" | "premium">("premium")
  const [showPaymentForm, setShowPaymentForm] = useState(false)

  // Redirigir si no hay usuario autenticado
  if (!user) {
    router.push("/login")
    return null
  }

  const plans = [
    {
      id: "basic",
      name: "Básico",
      price: "8.99",
      videoQuality: "Buena",
      resolution: "720p",
      devices: 1,
      simultaneousStreams: 1,
      features: ["Películas y series ilimitadas", "Ver en 1 dispositivo a la vez", "Descargar en 1 dispositivo"],
    },
    {
      id: "standard",
      name: "Estándar",
      price: "13.99",
      videoQuality: "Mejor",
      resolution: "1080p",
      devices: 2,
      simultaneousStreams: 2,
      features: [
        "Películas y series ilimitadas",
        "Ver en 2 dispositivos a la vez",
        "Descargar en 2 dispositivos",
        "Calidad HD disponible",
      ],
    },
    {
      id: "premium",
      name: "Premium",
      price: "17.99",
      videoQuality: "Óptima",
      resolution: "4K+HDR",
      devices: 4,
      simultaneousStreams: 4,
      features: [
        "Películas y series ilimitadas",
        "Ver en 4 dispositivos a la vez",
        "Descargar en 6 dispositivos",
        "Calidad Ultra HD disponible",
        "Audio espacial",
      ],
    },
  ]

  const handleContinue = () => {
    setShowPaymentForm(true)
  }

  const handleBackToPlans = () => {
    setShowPaymentForm(false)
  }

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <div className="container max-w-4xl pt-24 pb-16 px-4 md:px-6 animate-in fade-in-50 duration-500">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => (showPaymentForm ? handleBackToPlans() : router.push("/settings"))}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold">{showPaymentForm ? "Método de pago" : "Elige tu plan"}</h1>
        </div>

        {!showPaymentForm ? (
          <>
            <div className="bg-zinc-900 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Tu plan actual</h2>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-red-600 font-medium text-lg">Premium</p>
                  <p className="text-zinc-400">4K + HDR, 4 dispositivos</p>
                </div>
                <p className="text-xl font-bold">17.99€/mes</p>
              </div>
            </div>

            <h2 className="text-xl font-semibold mb-4">Planes disponibles</h2>
            <div className="grid gap-4 mb-8">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`border rounded-lg p-6 cursor-pointer transition-all duration-200 ${
                    selectedPlan === plan.id
                      ? "border-red-600 bg-red-600/10"
                      : "border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900"
                  }`}
                  onClick={() => setSelectedPlan(plan.id as "basic" | "standard" | "premium")}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-medium">{plan.name}</h3>
                      <p className="text-zinc-400">
                        {plan.resolution} • {plan.videoQuality}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <p className="text-xl font-bold">{plan.price}€/mes</p>
                      {selectedPlan === plan.id && (
                        <div className="bg-red-600 text-white text-xs px-2 py-1 rounded mt-2">Seleccionado</div>
                      )}
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <Button size="lg" onClick={handleContinue}>
                Continuar
              </Button>
            </div>
          </>
        ) : (
          <PaymentForm selectedPlan={selectedPlan} onBack={handleBackToPlans} />
        )}
      </div>
    </main>
  )
}

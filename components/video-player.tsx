"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VideoPlayerProps {
  videoId: string
  isOpen: boolean
  onClose: () => void
}

export function VideoPlayer({ videoId, isOpen, onClose }: VideoPlayerProps) {
  const [mounted, setMounted] = useState(false)

  // Evitar problemas de hidratación
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="flex justify-end p-4">
        <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
          <X className="h-6 w-6" />
        </Button>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full h-full max-w-7xl mx-auto">
          <div className="relative pb-[56.25%] h-0 w-full">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}

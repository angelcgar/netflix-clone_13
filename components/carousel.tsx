"use client"

import { useRef, type ReactNode } from "react"
import { useScrollbarHide } from "@/hooks/use-scrollbar-hide"

interface CarouselProps {
  children: ReactNode
  className?: string
}

export function Carousel({ children, className = "" }: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  useScrollbarHide(scrollRef)

  return (
    <div ref={scrollRef} className={`flex overflow-x-scroll scrollbar-hide ${className}`}>
      {children}
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Verificar al cargar
    checkIfMobile()

    // Verificar al cambiar el tamaño de la ventana
    window.addEventListener("resize", checkIfMobile)

    // Limpiar el evento
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  return isMobile
}

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<"xs" | "sm" | "md" | "lg" | "xl" | "2xl">("xs")

  useEffect(() => {
    const checkBreakpoint = () => {
      const width = window.innerWidth
      if (width < 640) {
        setBreakpoint("xs")
      } else if (width < 768) {
        setBreakpoint("sm")
      } else if (width < 1024) {
        setBreakpoint("md")
      } else if (width < 1280) {
        setBreakpoint("lg")
      } else if (width < 1536) {
        setBreakpoint("xl")
      } else {
        setBreakpoint("2xl")
      }
    }

    // Verificar al cargar
    checkBreakpoint()

    // Verificar al cambiar el tamaño de la ventana
    window.addEventListener("resize", checkBreakpoint)

    // Limpiar el evento
    return () => window.removeEventListener("resize", checkBreakpoint)
  }, [])

  return {
    breakpoint,
    isXs: breakpoint === "xs",
    isSm: breakpoint === "sm",
    isMd: breakpoint === "md",
    isLg: breakpoint === "lg",
    isXl: breakpoint === "xl",
    is2xl: breakpoint === "2xl",
    isMobile: breakpoint === "xs" || breakpoint === "sm",
    isTablet: breakpoint === "md",
    isDesktop: breakpoint === "lg" || breakpoint === "xl" || breakpoint === "2xl",
  }
}

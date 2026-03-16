"use client"

import type React from "react"

import { useEffect } from "react"

export function useScrollbarHide(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    if (ref.current) {
      // Asegurarse de que la clase scrollbar-hide esté aplicada
      ref.current.classList.add("scrollbar-hide")
    }
  }, [ref])
}

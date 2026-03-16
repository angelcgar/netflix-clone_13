import React from "react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, fireEvent } from "../test-utils"
import { MovieCard } from "./movie-card"
import type { Movie } from "@/lib/data"

// Mock de los hooks y contextos que usa el componente
vi.mock("@/contexts/my-list-context", () => ({
  useMyList: () => ({
    isInMyList: () => false,
    addToMyList: vi.fn(),
    removeFromMyList: vi.fn(),
  }),
}))

vi.mock("@/contexts/likes-context", () => ({
  useLikes: () => ({
    isLiked: () => false,
    toggleLike: vi.fn(),
  }),
}))

vi.mock("@/services/youtube", () => ({
  getFallbackTrailerId: () => "test-trailer-id",
}))

describe("MovieCard", () => {
  const mockMovie: Movie = {
    id: 1,
    title: "Película de prueba",
    description: "Descripción de prueba",
    genre: ["Acción", "Aventura"],
    duration: "2h 15m",
    rating: 0.85,
    releaseYear: 2023,
    imageUrl: "/placeholder.svg",
    type: "movie",
  }

  const mockSetIsVideoOpen = vi.fn()
  const mockSetTrailerId = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    // Mock de useState para controlar isVideoOpen y trailerId
    vi.spyOn(React, "useState").mockImplementationOnce(() => [false, mockSetIsVideoOpen])
    vi.spyOn(React, "useState").mockImplementationOnce(() => [null, mockSetTrailerId])
    vi.spyOn(React, "useState").mockImplementationOnce(() => [false, vi.fn()])
  })

  it("renderiza el título de la película", () => {
    render(<MovieCard movie={mockMovie} />)

    // Simular hover para mostrar el título
    const cardElement = screen.getByRole("link")
    fireEvent.mouseEnter(cardElement)

    expect(screen.getByText("Película de prueba")).toBeInTheDocument()
  })

  it("muestra los géneros de la película al hacer hover", () => {
    render(<MovieCard movie={mockMovie} />)

    // Simular hover
    const cardElement = screen.getByRole("link")
    fireEvent.mouseEnter(cardElement)

    expect(screen.getByText("Acción • Aventura")).toBeInTheDocument()
  })

  it("muestra el porcentaje de match correcto", () => {
    render(<MovieCard movie={mockMovie} />)

    // Simular hover
    const cardElement = screen.getByRole("link")
    fireEvent.mouseEnter(cardElement)

    // 0.85 * 100 = 85%
    expect(screen.getByText("85% Match")).toBeInTheDocument()
  })

  it("abre el reproductor de video al hacer clic en el botón de reproducción", () => {
    render(<MovieCard movie={mockMovie} />)

    // Simular hover
    const cardElement = screen.getByRole("link")
    fireEvent.mouseEnter(cardElement)

    // Encontrar y hacer clic en el botón de reproducción
    const playButton = screen.getByRole("button", { name: /reproducir/i })
    fireEvent.click(playButton)

    // Verificar que se llama a las funciones para abrir el video
    expect(mockSetTrailerId).toHaveBeenCalledWith("test-trailer-id")
    expect(mockSetIsVideoOpen).toHaveBeenCalledWith(true)
  })
})

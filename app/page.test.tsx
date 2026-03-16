import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen } from "../test-utils"
import HomePage from "./page"

// Mock de los hooks que usa la página de inicio
vi.mock("@/hooks/use-tmdb", () => ({
  usePopularMovies: () => ({
    movies: [
      {
        id: 1,
        title: "Película de prueba",
        description: "Descripción de prueba",
        genre: ["Acción"],
        duration: "2h",
        rating: 0.8,
        releaseYear: 2023,
        imageUrl: "/placeholder.svg",
        bannerUrl: "/placeholder.svg",
        type: "movie",
      },
    ],
    loading: false,
  }),
  useTopRatedMovies: () => ({
    movies: [],
    loading: false,
  }),
  useNowPlayingMovies: () => ({
    movies: [
      {
        id: 2,
        title: "Película en cartelera",
        description: "Descripción de prueba",
        genre: ["Drama"],
        duration: "2h 30m",
        rating: 0.9,
        releaseYear: 2023,
        imageUrl: "/placeholder.svg",
        bannerUrl: "/placeholder.svg",
        type: "movie",
      },
    ],
    loading: false,
  }),
  usePopularTVShows: () => ({
    tvShows: [],
    loading: false,
  }),
  useTopRatedTVShows: () => ({
    tvShows: [],
    loading: false,
  }),
  useUpcomingMovies: () => ({
    movies: [],
    loading: false,
  }),
}))

// Mock del contexto de autenticación
vi.mock("@/contexts/auth-context", () => ({
  useAuth: () => ({
    user: null,
    isLoading: false,
    login: vi.fn(),
    logout: vi.fn(),
  }),
}))

// Mock del contexto de Mi Lista
vi.mock("@/contexts/my-list-context", () => ({
  useMyList: () => ({
    myList: [],
    addToMyList: vi.fn(),
    removeFromMyList: vi.fn(),
    isInMyList: () => false,
  }),
}))

describe("HomePage", () => {
  beforeEach(() => {
    // Limpiar cualquier mock antes de cada prueba
    vi.clearAllMocks()
  })

  it("renderiza la página de inicio correctamente", () => {
    render(<HomePage />)

    // Verificar que se muestra el título de la sección de tendencias
    expect(screen.getByText("Tendencias")).toBeInTheDocument()

    // Verificar que se muestra el título de la sección de populares
    expect(screen.getByText("Populares en Netflix")).toBeInTheDocument()
  })

  it("muestra películas en la sección de tendencias", () => {
    render(<HomePage />)

    // Verificar que se muestra la película de prueba en la sección de tendencias
    expect(screen.getByText("Película en cartelera")).toBeInTheDocument()
  })

  it('no muestra la sección de "Seguir viendo" cuando el usuario no está autenticado', () => {
    render(<HomePage />)

    // Verificar que no se muestra la sección de "Seguir viendo"
    expect(screen.queryByText("Seguir viendo")).not.toBeInTheDocument()
  })
})

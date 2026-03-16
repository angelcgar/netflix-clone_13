import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, fireEvent } from "../test-utils"
import { Navbar } from "./navbar"

// Mock de los hooks que usa el componente
vi.mock("@/hooks/use-mobile", () => ({
  useMobile: () => false,
}))

vi.mock("@/hooks/use-tmdb", () => ({
  useSearch: () => ({
    results: [],
    loading: false,
    error: null,
  }),
}))

// Mock del contexto de autenticación
vi.mock("@/contexts/auth-context", () => {
  const mockLogout = vi.fn()
  return {
    useAuth: () => ({
      user: {
        id: "1",
        name: "Usuario de prueba",
        email: "test@example.com",
      },
      isLoading: false,
      login: vi.fn(),
      logout: mockLogout,
    }),
    mockLogout,
  }
})

describe("Navbar", () => {
  beforeEach(() => {
    vi.clearAllMocks()

    // Mock de window.scrollY
    Object.defineProperty(window, "scrollY", {
      value: 0,
      writable: true,
    })

    // Mock de addEventListener para scroll
    vi.spyOn(window, "addEventListener").mockImplementation((event, callback) => {
      if (event === "scroll") {
        // Simular scroll
        window.scrollY = 10
        callback()
      }
      return undefined
    })
  })

  it("renderiza el logo de Netflix", () => {
    render(<Navbar />)

    const logo = screen.getByText("NETFLIX")
    expect(logo).toBeInTheDocument()
    expect(logo.tagName).toBe("A")
  })

  it("muestra los enlaces de navegación principales", () => {
    render(<Navbar />)

    expect(screen.getByText("Inicio")).toBeInTheDocument()
    expect(screen.getByText("Series")).toBeInTheDocument()
    expect(screen.getByText("Películas")).toBeInTheDocument()
    expect(screen.getByText("Mi Lista")).toBeInTheDocument()
    expect(screen.getByText("Me gusta")).toBeInTheDocument()
  })

  it("muestra el botón de búsqueda", () => {
    render(<Navbar />)

    expect(screen.getByRole("button", { name: /buscar/i })).toBeInTheDocument()
  })

  it("muestra el campo de búsqueda al hacer clic en el botón de búsqueda", () => {
    render(<Navbar />)

    const searchButton = screen.getByRole("button", { name: /buscar/i })
    fireEvent.click(searchButton)

    expect(screen.getByPlaceholderText("Títulos, personas, géneros...")).toBeInTheDocument()
  })

  it("muestra el menú de usuario cuando el usuario está autenticado", () => {
    render(<Navbar />)

    // Verificar que se muestra el avatar del usuario
    const userButton = screen.getByRole("button", { name: "" }) // El botón del avatar no tiene texto
    expect(userButton).toBeInTheDocument()

    // Abrir el menú de usuario
    fireEvent.click(userButton)

    // Verificar que se muestran las opciones del menú
    expect(screen.getByText("Usuario de prueba")).toBeInTheDocument()
    expect(screen.getByText("test@example.com")).toBeInTheDocument()
    expect(screen.getByText("Perfil")).toBeInTheDocument()
    expect(screen.getByText("Configuración")).toBeInTheDocument()
    expect(screen.getByText("Cerrar sesión")).toBeInTheDocument()
  })

  it('llama a la función de logout al hacer clic en "Cerrar sesión"', () => {
    const { mockLogout } = require("@/contexts/auth-context")
    render(<Navbar />)

    // Abrir el menú de usuario
    const userButton = screen.getByRole("button", { name: "" })
    fireEvent.click(userButton)

    // Hacer clic en "Cerrar sesión"
    const logoutButton = screen.getByText("Cerrar sesión")
    fireEvent.click(logoutButton)

    // Verificar que se llama a la función de logout
    expect(mockLogout).toHaveBeenCalled()
  })
})

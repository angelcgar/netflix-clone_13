import "@testing-library/jest-dom"
import { vi } from "vitest"

// Mock para Next.js router
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}))

// Mock para next/image
vi.mock("next/image", () => ({
  default: ({ src, alt, width, height, className }: any) => (
    <img src={src || "/placeholder.svg"} alt={alt} width={width} height={height} className={className} />
  ),
}))

// Mock para localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
})()

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
})

// Mock para IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor(private callback: IntersectionObserverCallback) {}
  observe() {
    return null
  }
  unobserve() {
    return null
  }
  disconnect() {
    return null
  }
}

import type React from "react"
import type { ReactElement } from "react"
import { render, type RenderOptions } from "@testing-library/react"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/auth-context"
import { MyListProvider } from "@/contexts/my-list-context"
import { LikesProvider } from "@/contexts/likes-context"
import { NotificationsProvider } from "@/contexts/notifications-context"

// Proveedor de todos los contextos necesarios para las pruebas
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <MyListProvider>
        <LikesProvider>
          <NotificationsProvider>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
              {children}
            </ThemeProvider>
          </NotificationsProvider>
        </LikesProvider>
      </MyListProvider>
    </AuthProvider>
  )
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// Re-exportar todo
export * from "@testing-library/react"
export { customRender as render }

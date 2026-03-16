import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/auth-context"
import { MyListProvider } from "@/contexts/my-list-context"
import { LikesProvider } from "@/contexts/likes-context"
import { NotificationsProvider } from "@/contexts/notifications-context"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Netflix Clone",
  description: "Un clon de Netflix creado con Next.js y Tailwind CSS",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} bg-black text-white antialiased`}>
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
      </body>
    </html>
  )
}

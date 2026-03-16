"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Search, User, X, LogOut, Heart, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useMobile } from "@/hooks/use-mobile"
import { useSearch } from "@/hooks/use-tmdb"
import { useAuth } from "@/contexts/auth-context"
import { NotificationsDropdown } from "@/components/notifications-dropdown"
import type { Movie } from "@/lib/data"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showResults, setShowResults] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const isMobile = useMobile()
  const searchRef = useRef<HTMLDivElement>(null)
  const { user, logout } = useAuth()

  const { results, loading } = useSearch(searchQuery)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearchFocus = () => {
    if (searchQuery.trim()) {
      setShowResults(true)
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    setShowResults(!!value.trim())
  }

  const handleResultClick = (movie: Movie) => {
    const path = movie.type === "movie" ? `/movie/${movie.id}` : `/tv/${movie.id}`
    router.push(path)
    setShowResults(false)
    setShowSearch(false)
    setSearchQuery("")
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const navItems = [
    { name: "Inicio", href: "/" },
    { name: "Series", href: "/series" },
    { name: "Películas", href: "/movies" },
    { name: "Mi Lista", href: "/my-list" },
    { name: "Me gusta", href: "/liked" },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-colors duration-300",
        isScrolled ? "bg-black/90 backdrop-blur-sm" : "bg-gradient-to-b from-black/80 to-transparent",
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4 md:gap-6">
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden hover:bg-white/10 transition-colors">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[250px] bg-zinc-900 p-0">
                <SheetHeader className="border-b border-zinc-800 p-4">
                  <SheetTitle className="text-red-600 font-bold text-2xl">NETFLIX</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  <nav className="flex flex-col space-y-1">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "px-4 py-3 text-base transition-colors hover:bg-zinc-800",
                          pathname === item.href ? "text-white font-medium" : "text-white/70",
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                  {user && (
                    <>
                      <div className="border-t border-zinc-800 my-4"></div>
                      <div className="px-4 py-2">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="h-8 w-8 rounded-full overflow-hidden">
                            {user.avatar ? (
                              <Image
                                src={user.avatar || "/placeholder.svg"}
                                alt={user.name}
                                width={32}
                                height={32}
                                className="object-cover"
                              />
                            ) : (
                              <div className="h-full w-full bg-red-600 flex items-center justify-center">
                                <User className="h-5 w-5" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{user.name}</p>
                            <p className="text-xs text-zinc-400">{user.email}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Link href="/profile">
                            <Button
                              variant="ghost"
                              className="w-full justify-start text-white/70 hover:text-white hover:bg-zinc-800 transition-colors"
                            >
                              Perfil
                            </Button>
                          </Link>
                          <Link href="/settings">
                            <Button
                              variant="ghost"
                              className="w-full justify-start text-white/70 hover:text-white hover:bg-zinc-800 transition-colors"
                            >
                              Configuración
                            </Button>
                          </Link>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-start text-red-500 border-zinc-700 hover:bg-zinc-800 hover:text-red-400 transition-colors mt-4"
                          onClick={handleLogout}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Cerrar sesión</span>
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          )}

          <Link href="/" className="text-red-600 font-bold text-2xl flex-shrink-0 hover:text-red-500 transition-colors">
            NETFLIX
          </Link>

          <nav className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-white/80",
                  pathname === item.href ? "text-white" : "text-white/60",
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div ref={searchRef} className="relative">
            {showSearch ? (
              <div className="flex items-center">
                <Input
                  type="search"
                  placeholder="Títulos, personas, géneros..."
                  className="w-[140px] sm:w-[200px] md:w-[300px] bg-black/60 border-none focus-visible:ring-0 text-sm"
                  autoFocus
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={handleSearchFocus}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full hover:bg-white/10 transition-colors"
                  onClick={() => {
                    setShowSearch(false)
                    setSearchQuery("")
                    setShowResults(false)
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSearch(true)}
                className="hover:bg-white/10 transition-colors"
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Buscar</span>
              </Button>
            )}

            {showResults && searchQuery.trim() && (
              <div className="absolute top-full mt-2 w-full bg-black/90 backdrop-blur-sm rounded-md shadow-lg overflow-hidden z-50 animate-in fade-in-50 slide-in-from-top-5 duration-300">
                {loading ? (
                  <div className="p-4 text-center text-sm text-gray-400">Buscando...</div>
                ) : results.length > 0 ? (
                  <div className="max-h-[70vh] overflow-y-auto">
                    {results.map((result) => (
                      <div
                        key={`${result.type}-${result.id}`}
                        className="p-2 hover:bg-white/10 cursor-pointer transition-colors"
                        onClick={() => handleResultClick(result)}
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-14 relative bg-gray-800 rounded overflow-hidden">
                            <Image
                              src={result.imageUrl || "/placeholder.svg?height=400&width=300"}
                              alt={result.title}
                              fill
                              sizes="40px"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium line-clamp-1">{result.title}</p>
                            <p className="text-xs text-gray-400">
                              {result.type === "movie" ? "Película" : "Serie"} • {result.releaseYear}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-sm text-gray-400">
                    No se encontraron resultados para "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>

          <NotificationsDropdown />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full overflow-hidden hover:opacity-80 transition-opacity"
                >
                  <div className="h-8 w-8 rounded-full overflow-hidden">
                    {user.avatar ? (
                      <Image
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                    ) : (
                      <div className="h-full w-full bg-red-600 flex items-center justify-center">
                        <User className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer transition-colors">
                    Perfil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/my-list" className="cursor-pointer transition-colors">
                    Mi Lista
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/liked" className="cursor-pointer transition-colors">
                    <div className="flex items-center">
                      <Heart className="mr-2 h-4 w-4" />
                      <span>Me gusta</span>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="cursor-pointer transition-colors">
                    Configuración
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-500 cursor-pointer hover:text-red-400 transition-colors"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button variant="ghost" className="text-white hover:text-white/80 hover:bg-white/10 transition-colors">
                Iniciar sesión
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

"use client"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Movie } from "@/lib/data"
import { MovieCard } from "@/components/movie-card"
import { MovieCardSkeleton } from "@/components/loading-skeleton"
import { Button } from "@/components/ui/button"
import { useScrollbarHide } from "@/hooks/use-scrollbar-hide"

interface MovieRowProps {
  title: string
  movies: Movie[]
  isLoading?: boolean
}

export function MovieRow({ title, movies, isLoading = false }: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null)
  useScrollbarHide(rowRef)
  const [isMoved, setIsMoved] = useState(false)

  const handleClick = (direction: "left" | "right") => {
    setIsMoved(true)

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current
      const scrollTo = direction === "left" ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" })
    }
  }

  return (
    <div className="space-y-2 md:space-y-4 py-4 animate-in fade-in-50 duration-700">
      <h2 className="text-xl md:text-2xl font-bold px-4 md:px-12">{title}</h2>
      <div className="group relative">
        <Button
          variant="ghost"
          size="icon"
          className={`absolute left-2 top-0 bottom-0 z-40 m-auto h-9 w-9 bg-black/30 hover:bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
            !isMoved && "hidden"
          }`}
          onClick={() => handleClick("left")}
          disabled={isLoading}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <div ref={rowRef} className="flex items-center space-x-2 overflow-x-scroll scrollbar-hide px-4 md:px-12 py-4">
          {isLoading ? (
            // Mostrar esqueletos de carga
            Array(6)
              .fill(0)
              .map((_, i) => <MovieCardSkeleton key={i} />)
          ) : movies.length > 0 ? (
            // Mostrar películas/series
            movies.map((movie, index) => (
              <div
                key={movie.id}
                className="animate-in fade-in-50 duration-700"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <MovieCard movie={movie} />
              </div>
            ))
          ) : (
            // Mostrar mensaje si no hay resultados
            <div className="flex items-center justify-center w-full py-8">
              <p className="text-gray-400">No se encontraron resultados</p>
            </div>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-0 bottom-0 z-40 m-auto h-9 w-9 bg-black/30 hover:bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          onClick={() => handleClick("right")}
          disabled={isLoading}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}

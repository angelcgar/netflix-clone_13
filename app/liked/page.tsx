"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { MovieCard } from "@/components/movie-card"
import { useLikes } from "@/contexts/likes-context"
import { useAuth } from "@/contexts/auth-context"
import type { Movie } from "@/lib/data"
import * as TMDBService from "@/services/tmdb"

export default function LikedPage() {
  const { likedMovies } = useLikes()
  const { user } = useAuth()
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  // Cargar detalles de las películas/series que le gustaron al usuario
  useEffect(() => {
    const fetchLikedMovies = async () => {
      if (likedMovies.length === 0) {
        setMovies([])
        setLoading(false)
        return
      }

      setLoading(true)

      try {
        // Obtener detalles de cada película/serie
        const moviePromises = likedMovies.map(async (id) => {
          try {
            // Intentar obtener como película
            const movieDetails = await TMDBService.getMovieDetails(id)
            return {
              ...TMDBService.adaptMovieToCommon(movieDetails),
              genre: movieDetails.genres.map((g) => g.name),
              duration: movieDetails.runtime ? `${movieDetails.runtime} min` : "N/A",
            }
          } catch (error) {
            try {
              // Si falla, intentar obtener como serie
              const tvDetails = await TMDBService.getTVShowDetails(id)
              return {
                ...TMDBService.adaptTVShowToCommon(tvDetails),
                genre: tvDetails.genres.map((g) => g.name),
                duration: `${tvDetails.number_of_seasons} temporada${tvDetails.number_of_seasons !== 1 ? "s" : ""}`,
                seasons: tvDetails.number_of_seasons,
              }
            } catch (innerError) {
              console.error(`Error fetching details for ID ${id}:`, innerError)
              return null
            }
          }
        })

        const results = await Promise.all(moviePromises)
        setMovies(results.filter(Boolean) as Movie[])
      } catch (error) {
        console.error("Error fetching liked movies:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchLikedMovies()
  }, [likedMovies])

  return (
    <main className="relative min-h-screen pt-20">
      <Navbar />
      <div className="px-4 md:px-12 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Películas y series que me gustan</h1>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-400">Cargando...</p>
          </div>
        ) : movies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {movies.map((movie) => (
              <div key={movie.id} className="h-auto">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-400">No has marcado ninguna película o serie como favorita</p>
            <p className="text-gray-500 mt-2">
              {user
                ? "Haz clic en el botón de pulgar arriba para agregar películas y series a tus favoritos"
                : "Inicia sesión para guardar películas y series en tus favoritos"}
            </p>
          </div>
        )}
      </div>
    </main>
  )
}

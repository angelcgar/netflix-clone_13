"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { HeroBanner } from "@/components/hero-banner"
import { HeroBannerSkeleton } from "@/components/loading-skeleton"
import { MovieRow } from "@/components/movie-row"
import {
  usePopularMovies,
  useTopRatedMovies,
  useNowPlayingMovies,
  usePopularTVShows,
  useTopRatedTVShows,
  useUpcomingMovies,
} from "@/hooks/use-tmdb"
import type { Movie } from "@/lib/data"
import { useAuth } from "@/contexts/auth-context"
import { useMyList } from "@/contexts/my-list-context"

export default function Home() {
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null)
  const [isHeroBannerLoading, setIsHeroBannerLoading] = useState(true)
  const { user } = useAuth()
  const { myList } = useMyList()

  const { movies: popularMovies, loading: loadingPopular } = usePopularMovies()
  const { movies: topRatedMovies, loading: loadingTopRated } = useTopRatedMovies()
  const { movies: nowPlayingMovies, loading: loadingNowPlaying } = useNowPlayingMovies()
  const { tvShows: popularTVShows, loading: loadingPopularTV } = usePopularTVShows()
  const { tvShows: topRatedTVShows, loading: loadingTopRatedTV } = useTopRatedTVShows()
  const { movies: upcomingMovies, loading: loadingUpcoming } = useUpcomingMovies()

  // Seleccionar una película aleatoria para el banner
  useEffect(() => {
    if (nowPlayingMovies.length > 0) {
      const moviesWithBackdrop = nowPlayingMovies.filter(
        (movie) => movie.bannerUrl && movie.bannerUrl !== "/placeholder.svg?height=800&width=1600",
      )

      if (moviesWithBackdrop.length > 0) {
        const randomIndex = Math.floor(Math.random() * moviesWithBackdrop.length)
        setFeaturedMovie(moviesWithBackdrop[randomIndex])
      } else {
        setFeaturedMovie(nowPlayingMovies[0])
      }

      setIsHeroBannerLoading(false)
    }
  }, [nowPlayingMovies])

  // Filtrar películas por género
  const getMoviesByGenre = (movies: Movie[], genre: string): Movie[] => {
    return movies.filter((movie) => movie.genre.some((g) => g.toLowerCase().includes(genre.toLowerCase())))
  }

  // Obtener películas de acción
  const actionMovies = getMoviesByGenre([...popularMovies, ...nowPlayingMovies], "acción")

  // Obtener películas de ciencia ficción
  const sciFiMovies = getMoviesByGenre([...popularMovies, ...nowPlayingMovies], "ciencia")

  // Obtener películas de drama
  const dramaMovies = getMoviesByGenre([...popularMovies, ...nowPlayingMovies], "drama")

  return (
    <main className="relative min-h-screen">
      <Navbar />

      {isHeroBannerLoading || !featuredMovie ? <HeroBannerSkeleton /> : <HeroBanner movie={featuredMovie} />}

      <div className="relative pb-20 -mt-10 md:-mt-16">
        {/* Sección "Seguir viendo" (solo para usuarios autenticados) */}
        {user && myList.length > 0 && <MovieRow title="Seguir viendo" movies={myList.slice(0, 10)} isLoading={false} />}

        <MovieRow title="Tendencias" movies={nowPlayingMovies} isLoading={loadingNowPlaying} />

        <MovieRow title="Populares en Netflix" movies={popularMovies} isLoading={loadingPopular} />

        {/* Nuevas secciones por género */}
        {actionMovies.length > 0 && <MovieRow title="Películas de acción" movies={actionMovies} isLoading={false} />}

        <MovieRow title="Series populares" movies={popularTVShows} isLoading={loadingPopularTV} />

        {/* Sección de nuevos lanzamientos */}
        <MovieRow title="Nuevos lanzamientos" movies={upcomingMovies} isLoading={loadingUpcoming} />

        <MovieRow title="Mejor valorados" movies={topRatedMovies} isLoading={loadingTopRated} />

        {/* Sección de series mejor valoradas */}
        <MovieRow title="Series mejor valoradas" movies={topRatedTVShows} isLoading={loadingTopRatedTV} />

        {sciFiMovies.length > 0 && <MovieRow title="Ciencia ficción" movies={sciFiMovies} isLoading={false} />}

        {dramaMovies.length > 0 && <MovieRow title="Dramas" movies={dramaMovies} isLoading={false} />}
      </div>
    </main>
  )
}

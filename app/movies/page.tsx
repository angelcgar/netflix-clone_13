"use client"

import { Navbar } from "@/components/navbar"
import { MovieRow } from "@/components/movie-row"
import { usePopularMovies, useTopRatedMovies, useUpcomingMovies, useNowPlayingMovies } from "@/hooks/use-tmdb"

export default function MoviesPage() {
  const { movies: popularMovies, loading: loadingPopular } = usePopularMovies()
  const { movies: topRatedMovies, loading: loadingTopRated } = useTopRatedMovies()
  const { movies: upcomingMovies, loading: loadingUpcoming } = useUpcomingMovies()
  const { movies: nowPlayingMovies, loading: loadingNowPlaying } = useNowPlayingMovies()

  return (
    <main className="relative min-h-screen pt-20">
      <Navbar />
      <div className="px-4 md:px-12 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Películas</h1>
        <MovieRow title="En cartelera" movies={nowPlayingMovies} isLoading={loadingNowPlaying} />
        <MovieRow title="Populares" movies={popularMovies} isLoading={loadingPopular} />
        <MovieRow title="Mejor valoradas" movies={topRatedMovies} isLoading={loadingTopRated} />
        <MovieRow title="Próximos estrenos" movies={upcomingMovies} isLoading={loadingUpcoming} />
      </div>
    </main>
  )
}

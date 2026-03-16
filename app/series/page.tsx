"use client"

import { Navbar } from "@/components/navbar"
import { MovieRow } from "@/components/movie-row"
import { usePopularTVShows, useTopRatedTVShows, useOnTheAirTVShows } from "@/hooks/use-tmdb"

export default function SeriesPage() {
  const { tvShows: popularTVShows, loading: loadingPopular } = usePopularTVShows()
  const { tvShows: topRatedTVShows, loading: loadingTopRated } = useTopRatedTVShows()
  const { tvShows: onTheAirTVShows, loading: loadingOnTheAir } = useOnTheAirTVShows()

  return (
    <main className="relative min-h-screen pt-20">
      <Navbar />
      <div className="px-4 md:px-12 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Series</h1>
        <MovieRow title="Series populares" movies={popularTVShows} isLoading={loadingPopular} />
        <MovieRow title="Mejor valoradas" movies={topRatedTVShows} isLoading={loadingTopRated} />
        <MovieRow title="En emisión" movies={onTheAirTVShows} isLoading={loadingOnTheAir} />
      </div>
    </main>
  )
}

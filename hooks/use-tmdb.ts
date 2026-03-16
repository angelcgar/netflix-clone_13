"use client"

import { useState, useEffect } from "react"
import * as TMDBService from "@/services/tmdb"
import type { TMDBMovie, TMDBTVShow } from "@/types/tmdb"
import type { Movie } from "@/lib/data"

// Hook para obtener películas populares
export function usePopularMovies(page = 1) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true)
        const response = await TMDBService.getPopularMovies(page)
        const adaptedMovies = response.results.map(TMDBService.adaptMovieToCommon)
        setMovies(adaptedMovies)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Error desconocido al obtener películas populares"))
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [page])

  return { movies, loading, error }
}

// Hook para obtener series populares
export function usePopularTVShows(page = 1) {
  const [tvShows, setTVShows] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchTVShows = async () => {
      try {
        setLoading(true)
        const response = await TMDBService.getPopularTVShows(page)
        const adaptedTVShows = response.results.map(TMDBService.adaptTVShowToCommon)
        setTVShows(adaptedTVShows)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Error desconocido al obtener series populares"))
      } finally {
        setLoading(false)
      }
    }

    fetchTVShows()
  }, [page])

  return { tvShows, loading, error }
}

// Hook para obtener películas mejor valoradas
export function useTopRatedMovies(page = 1) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true)
        const response = await TMDBService.getTopRatedMovies(page)
        const adaptedMovies = response.results.map(TMDBService.adaptMovieToCommon)
        setMovies(adaptedMovies)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Error desconocido al obtener películas mejor valoradas"))
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [page])

  return { movies, loading, error }
}

// Hook para obtener series mejor valoradas
export function useTopRatedTVShows(page = 1) {
  const [tvShows, setTVShows] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchTVShows = async () => {
      try {
        setLoading(true)
        const response = await TMDBService.getTopRatedTVShows(page)
        const adaptedTVShows = response.results.map(TMDBService.adaptTVShowToCommon)
        setTVShows(adaptedTVShows)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Error desconocido al obtener series mejor valoradas"))
      } finally {
        setLoading(false)
      }
    }

    fetchTVShows()
  }, [page])

  return { tvShows, loading, error }
}

// Hook para obtener películas próximas a estrenarse
export function useUpcomingMovies(page = 1) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true)
        const response = await TMDBService.getUpcomingMovies(page)
        const adaptedMovies = response.results.map(TMDBService.adaptMovieToCommon)
        setMovies(adaptedMovies)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Error desconocido al obtener próximos estrenos"))
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [page])

  return { movies, loading, error }
}

// Hook para obtener películas en cartelera
export function useNowPlayingMovies(page = 1) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true)
        const response = await TMDBService.getNowPlayingMovies(page)
        const adaptedMovies = response.results.map(TMDBService.adaptMovieToCommon)
        setMovies(adaptedMovies)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Error desconocido al obtener películas en cartelera"))
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [page])

  return { movies, loading, error }
}

// Hook para obtener series en emisión
export function useOnTheAirTVShows(page = 1) {
  const [tvShows, setTVShows] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchTVShows = async () => {
      try {
        setLoading(true)
        const response = await TMDBService.getOnTheAirTVShows(page)
        const adaptedTVShows = response.results.map(TMDBService.adaptTVShowToCommon)
        setTVShows(adaptedTVShows)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Error desconocido al obtener series en emisión"))
      } finally {
        setLoading(false)
      }
    }

    fetchTVShows()
  }, [page])

  return { tvShows, loading, error }
}

// Hook para buscar películas y series
export function useSearch(query: string, page = 1) {
  const [results, setResults] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const fetchResults = async () => {
      try {
        setLoading(true)
        const response = await TMDBService.searchMulti(query, page)

        const adaptedResults = response.results
          .map((item: any) => {
            if (item.media_type === "movie") {
              return TMDBService.adaptMovieToCommon(item as TMDBMovie)
            } else if (item.media_type === "tv") {
              return TMDBService.adaptTVShowToCommon(item as TMDBTVShow)
            }
            return null
          })
          .filter(Boolean) as Movie[]

        setResults(adaptedResults)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Error desconocido al realizar la búsqueda"))
      } finally {
        setLoading(false)
      }
    }

    const timeoutId = setTimeout(() => {
      fetchResults()
    }, 500) // Debounce

    return () => clearTimeout(timeoutId)
  }, [query, page])

  return { results, loading, error }
}

// Hook para obtener detalles de una película
export function useMovieDetails(movieId: number) {
  const [movie, setMovie] = useState<Movie | null>(null)
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true)

        // Obtener detalles de la película
        const movieDetails = await TMDBService.getMovieDetails(movieId)

        // Adaptar los detalles al formato común
        const adaptedMovie = {
          ...TMDBService.adaptMovieToCommon(movieDetails),
          genre: movieDetails.genres.map((g) => g.name),
          duration: movieDetails.runtime ? `${movieDetails.runtime} min` : "N/A",
        }

        setMovie(adaptedMovie)

        // Obtener películas similares
        const similarResponse = await TMDBService.getSimilarMovies(movieId)
        const adaptedSimilarMovies = similarResponse.results.map(TMDBService.adaptMovieToCommon)
        setSimilarMovies(adaptedSimilarMovies)

        setError(null)
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error(`Error desconocido al obtener detalles de la película ${movieId}`),
        )
      } finally {
        setLoading(false)
      }
    }

    if (movieId) {
      fetchMovieDetails()
    }
  }, [movieId])

  return { movie, similarMovies, loading, error }
}

// Hook para obtener detalles de una serie
export function useTVShowDetails(tvId: number) {
  const [tvShow, setTVShow] = useState<Movie | null>(null)
  const [similarTVShows, setSimilarTVShows] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchTVShowDetails = async () => {
      try {
        setLoading(true)

        // Obtener detalles de la serie
        const tvShowDetails = await TMDBService.getTVShowDetails(tvId)

        // Adaptar los detalles al formato común
        const adaptedTVShow = {
          ...TMDBService.adaptTVShowToCommon(tvShowDetails),
          genre: tvShowDetails.genres.map((g) => g.name),
          duration: `${tvShowDetails.number_of_seasons} temporada${tvShowDetails.number_of_seasons !== 1 ? "s" : ""}`,
          seasons: tvShowDetails.number_of_seasons,
        }

        setTVShow(adaptedTVShow)

        // Obtener series similares
        const similarResponse = await TMDBService.getSimilarTVShows(tvId)
        const adaptedSimilarTVShows = similarResponse.results.map(TMDBService.adaptTVShowToCommon)
        setSimilarTVShows(adaptedSimilarTVShows)

        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error(`Error desconocido al obtener detalles de la serie ${tvId}`))
      } finally {
        setLoading(false)
      }
    }

    if (tvId) {
      fetchTVShowDetails()
    }
  }, [tvId])

  return { tvShow, similarTVShows, loading, error }
}

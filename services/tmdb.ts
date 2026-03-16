import type {
  TMDBMovie,
  TMDBTVShow,
  TMDBMovieDetails,
  TMDBTVShowDetails,
  TMDBResponse,
  GenresResponse,
} from "@/types/tmdb"

const BASE_URL = "https://api.themoviedb.org/3"
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p"

// Tamaños de imagen disponibles
export const backdropSizes = {
  small: `${IMAGE_BASE_URL}/w300`,
  medium: `${IMAGE_BASE_URL}/w780`,
  large: `${IMAGE_BASE_URL}/w1280`,
  original: `${IMAGE_BASE_URL}/original`,
}

export const posterSizes = {
  small: `${IMAGE_BASE_URL}/w154`,
  medium: `${IMAGE_BASE_URL}/w342`,
  large: `${IMAGE_BASE_URL}/w500`,
  original: `${IMAGE_BASE_URL}/original`,
}

// Opciones para las peticiones fetch
const fetchOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
  },
}

// Función genérica para hacer peticiones a la API
async function fetchFromTMDB<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, fetchOptions)

  if (!response.ok) {
    throw new Error(`Error fetching from TMDB: ${response.status}`)
  }

  return response.json() as Promise<T>
}

// Películas
export async function getPopularMovies(page = 1): Promise<TMDBResponse<TMDBMovie>> {
  return fetchFromTMDB<TMDBResponse<TMDBMovie>>(`/movie/popular?language=es-ES&page=${page}`)
}

export async function getTopRatedMovies(page = 1): Promise<TMDBResponse<TMDBMovie>> {
  return fetchFromTMDB<TMDBResponse<TMDBMovie>>(`/movie/top_rated?language=es-ES&page=${page}`)
}

export async function getUpcomingMovies(page = 1): Promise<TMDBResponse<TMDBMovie>> {
  return fetchFromTMDB<TMDBResponse<TMDBMovie>>(`/movie/upcoming?language=es-ES&page=${page}`)
}

export async function getNowPlayingMovies(page = 1): Promise<TMDBResponse<TMDBMovie>> {
  return fetchFromTMDB<TMDBResponse<TMDBMovie>>(`/movie/now_playing?language=es-ES&page=${page}`)
}

export async function getMovieDetails(movieId: number): Promise<TMDBMovieDetails> {
  return fetchFromTMDB<TMDBMovieDetails>(`/movie/${movieId}?language=es-ES`)
}

export async function getSimilarMovies(movieId: number): Promise<TMDBResponse<TMDBMovie>> {
  return fetchFromTMDB<TMDBResponse<TMDBMovie>>(`/movie/${movieId}/similar?language=es-ES&page=1`)
}

// Series
export async function getPopularTVShows(page = 1): Promise<TMDBResponse<TMDBTVShow>> {
  return fetchFromTMDB<TMDBResponse<TMDBTVShow>>(`/tv/popular?language=es-ES&page=${page}`)
}

export async function getTopRatedTVShows(page = 1): Promise<TMDBResponse<TMDBTVShow>> {
  return fetchFromTMDB<TMDBResponse<TMDBTVShow>>(`/tv/top_rated?language=es-ES&page=${page}`)
}

export async function getOnTheAirTVShows(page = 1): Promise<TMDBResponse<TMDBTVShow>> {
  return fetchFromTMDB<TMDBResponse<TMDBTVShow>>(`/tv/on_the_air?language=es-ES&page=${page}`)
}

export async function getTVShowDetails(tvId: number): Promise<TMDBTVShowDetails> {
  return fetchFromTMDB<TMDBTVShowDetails>(`/tv/${tvId}?language=es-ES`)
}

export async function getSimilarTVShows(tvId: number): Promise<TMDBResponse<TMDBTVShow>> {
  return fetchFromTMDB<TMDBResponse<TMDBTVShow>>(`/tv/${tvId}/similar?language=es-ES&page=1`)
}

// Búsqueda
export async function searchMulti(query: string, page = 1): Promise<TMDBResponse<TMDBMovie | TMDBTVShow>> {
  return fetchFromTMDB<TMDBResponse<TMDBMovie | TMDBTVShow>>(
    `/search/multi?query=${encodeURIComponent(query)}&language=es-ES&page=${page}`,
  )
}

// Géneros
export async function getMovieGenres(): Promise<GenresResponse> {
  return fetchFromTMDB<GenresResponse>(`/genre/movie/list?language=es-ES`)
}

export async function getTVGenres(): Promise<GenresResponse> {
  return fetchFromTMDB<GenresResponse>(`/genre/tv/list?language=es-ES`)
}

// Utilidades
export function getFullImagePath(
  path: string | null,
  size: "small" | "medium" | "large" | "original" = "medium",
  type: "poster" | "backdrop" = "poster",
): string {
  if (!path) {
    return type === "poster" ? "/placeholder.svg?height=400&width=300" : "/placeholder.svg?height=800&width=1600"
  }

  const sizeMap = type === "poster" ? posterSizes : backdropSizes
  return `${sizeMap[size]}${path}`
}

// Adaptadores para convertir datos de TMDB a nuestro formato
export function adaptMovieToCommon(movie: TMDBMovie) {
  return {
    id: movie.id,
    title: movie.title,
    description: movie.overview,
    genre: [], // Se llenará con los géneros cuando tengamos el mapeo
    duration: "", // Se llenará con los detalles
    rating: movie.vote_average / 10, // Convertir a escala 0-1
    releaseYear: new Date(movie.release_date).getFullYear(),
    imageUrl: getFullImagePath(movie.poster_path, "medium", "poster"),
    bannerUrl: getFullImagePath(movie.backdrop_path, "large", "backdrop"),
    type: "movie" as const,
    trending: movie.popularity > 1000, // Ejemplo de criterio
    popular: movie.vote_count > 1000, // Ejemplo de criterio
    recommended: movie.vote_average > 7.5, // Ejemplo de criterio
    newRelease: new Date(movie.release_date) > new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // Últimos 90 días
  }
}

export function adaptTVShowToCommon(tvShow: TMDBTVShow) {
  return {
    id: tvShow.id,
    title: tvShow.name,
    description: tvShow.overview,
    genre: [], // Se llenará con los géneros cuando tengamos el mapeo
    duration: "", // Se llenará con los detalles
    rating: tvShow.vote_average / 10, // Convertir a escala 0-1
    releaseYear: new Date(tvShow.first_air_date).getFullYear(),
    imageUrl: getFullImagePath(tvShow.poster_path, "medium", "poster"),
    bannerUrl: getFullImagePath(tvShow.backdrop_path, "large", "backdrop"),
    type: "series" as const,
    seasons: 0, // Se llenará con los detalles
    trending: tvShow.popularity > 1000, // Ejemplo de criterio
    popular: tvShow.vote_count > 1000, // Ejemplo de criterio
    recommended: tvShow.vote_average > 7.5, // Ejemplo de criterio
    newRelease: new Date(tvShow.first_air_date) > new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // Últimos 90 días
  }
}

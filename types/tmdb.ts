export interface TMDBMovie {
  adult: boolean
  backdrop_path: string | null
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string | null
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface TMDBTVShow {
  adult: boolean
  backdrop_path: string | null
  genre_ids: number[]
  id: number
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string | null
  first_air_date: string
  name: string
  vote_average: number
  vote_count: number
}

export interface TMDBMovieDetails extends TMDBMovie {
  belongs_to_collection: null | {
    id: number
    name: string
    poster_path: string | null
    backdrop_path: string | null
  }
  budget: number
  genres: { id: number; name: string }[]
  homepage: string | null
  imdb_id: string | null
  production_companies: {
    id: number
    logo_path: string | null
    name: string
    origin_country: string
  }[]
  production_countries: {
    iso_3166_1: string
    name: string
  }[]
  revenue: number
  runtime: number | null
  spoken_languages: {
    english_name: string
    iso_639_1: string
    name: string
  }[]
  status: string
  tagline: string | null
}

export interface TMDBTVShowDetails extends TMDBTVShow {
  created_by: {
    id: number
    credit_id: string
    name: string
    gender: number
    profile_path: string | null
  }[]
  episode_run_time: number[]
  genres: { id: number; name: string }[]
  homepage: string
  in_production: boolean
  languages: string[]
  last_air_date: string
  last_episode_to_air: {
    id: number
    name: string
    overview: string
    vote_average: number
    vote_count: number
    air_date: string
    episode_number: number
    production_code: string
    runtime: number
    season_number: number
    show_id: number
    still_path: string | null
  }
  next_episode_to_air: null | {
    id: number
    name: string
    overview: string
    vote_average: number
    vote_count: number
    air_date: string
    episode_number: number
    production_code: string
    runtime: number
    season_number: number
    show_id: number
    still_path: string | null
  }
  networks: {
    id: number
    logo_path: string | null
    name: string
    origin_country: string
  }[]
  number_of_episodes: number
  number_of_seasons: number
  production_companies: {
    id: number
    logo_path: string | null
    name: string
    origin_country: string
  }[]
  production_countries: {
    iso_3166_1: string
    name: string
  }[]
  seasons: {
    air_date: string
    episode_count: number
    id: number
    name: string
    overview: string
    poster_path: string | null
    season_number: number
  }[]
  spoken_languages: {
    english_name: string
    iso_639_1: string
    name: string
  }[]
  status: string
  tagline: string | null
  type: string
}

export interface TMDBResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export interface Genre {
  id: number
  name: string
}

export interface GenresResponse {
  genres: Genre[]
}

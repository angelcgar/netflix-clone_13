export interface Movie {
  id: number
  title: string
  description: string
  genre: string[]
  duration: string
  rating: number
  releaseYear: number
  imageUrl: string
  bannerUrl?: string
  type: "movie" | "series"
  seasons?: number
  trending?: boolean
  popular?: boolean
  recommended?: boolean
  newRelease?: boolean
}

export const movies: Movie[] = [
  {
    id: 1,
    title: "Stranger Things",
    description:
      "Cuando un niño desaparece, un pequeño pueblo descubre un misterio que involucra experimentos secretos, fuerzas sobrenaturales aterradoras y una niña muy extraña.",
    genre: ["Drama", "Fantasía", "Terror"],
    duration: "4 temporadas",
    rating: 8.7,
    releaseYear: 2016,
    imageUrl: "/placeholder.svg?height=400&width=300",
    bannerUrl: "/placeholder.svg?height=800&width=1600",
    type: "series",
    seasons: 4,
    trending: true,
    popular: true,
    recommended: true,
  },
  {
    id: 2,
    title: "The Witcher",
    description:
      "Un cazador de monstruos solitario lucha por encontrar su lugar en un mundo donde las personas suelen ser más malvadas que las bestias.",
    genre: ["Acción", "Aventura", "Fantasía"],
    duration: "2 temporadas",
    rating: 8.2,
    releaseYear: 2019,
    imageUrl: "/placeholder.svg?height=400&width=300",
    bannerUrl: "/placeholder.svg?height=800&width=1600",
    type: "series",
    seasons: 2,
    trending: true,
    popular: true,
  },
  {
    id: 3,
    title: "El Padrino",
    description:
      "El patriarca de una dinastía del crimen organizado transfiere el control de su imperio clandestino a su reacio hijo.",
    genre: ["Crimen", "Drama"],
    duration: "2h 55min",
    rating: 9.2,
    releaseYear: 1972,
    imageUrl: "/placeholder.svg?height=400&width=300",
    type: "movie",
    popular: true,
    recommended: true,
  },
  {
    id: 4,
    title: "Breaking Bad",
    description:
      "Un profesor de química de secundaria diagnosticado con cáncer de pulmón inoperable se convierte en fabricante y vendedor de metanfetamina para asegurar el futuro financiero de su familia.",
    genre: ["Crimen", "Drama", "Thriller"],
    duration: "5 temporadas",
    rating: 9.5,
    releaseYear: 2008,
    imageUrl: "/placeholder.svg?height=400&width=300",
    bannerUrl: "/placeholder.svg?height=800&width=1600",
    type: "series",
    seasons: 5,
    popular: true,
    recommended: true,
  },
  {
    id: 5,
    title: "Inception",
    description:
      "Un ladrón que roba secretos corporativos a través del uso de la tecnología de compartir sueños, se le da la tarea inversa de plantar una idea en la mente de un CEO.",
    genre: ["Acción", "Aventura", "Ciencia ficción"],
    duration: "2h 28min",
    rating: 8.8,
    releaseYear: 2010,
    imageUrl: "/placeholder.svg?height=400&width=300",
    type: "movie",
    trending: true,
    newRelease: true,
  },
  {
    id: 6,
    title: "The Queen's Gambit",
    description:
      "La historia de una huérfana prodigio del ajedrez que lucha con la adicción mientras intenta convertirse en la mejor jugadora de ajedrez del mundo.",
    genre: ["Drama"],
    duration: "1 temporada",
    rating: 8.6,
    releaseYear: 2020,
    imageUrl: "/placeholder.svg?height=400&width=300",
    type: "series",
    seasons: 1,
    trending: true,
    newRelease: true,
  },
  {
    id: 7,
    title: "Pulp Fiction",
    description:
      "Las vidas de dos sicarios, un boxeador, la esposa de un gángster y un par de bandidos se entrelazan en cuatro historias de violencia y redención.",
    genre: ["Crimen", "Drama"],
    duration: "2h 34min",
    rating: 8.9,
    releaseYear: 1994,
    imageUrl: "/placeholder.svg?height=400&width=300",
    type: "movie",
    recommended: true,
  },
  {
    id: 8,
    title: "Dark",
    description:
      "La desaparición de dos niños expone las relaciones entre cuatro familias y revela un misterio que abarca tres generaciones.",
    genre: ["Crimen", "Drama", "Misterio"],
    duration: "3 temporadas",
    rating: 8.8,
    releaseYear: 2017,
    imageUrl: "/placeholder.svg?height=400&width=300",
    type: "series",
    seasons: 3,
    popular: true,
  },
  {
    id: 9,
    title: "Joker",
    description:
      "En Gotham City, el comediante mentalmente perturbado Arthur Fleck es ignorado y maltratado por la sociedad. Luego emprende una espiral descendente de revolución y crímenes sangrientos.",
    genre: ["Crimen", "Drama", "Thriller"],
    duration: "2h 2min",
    rating: 8.4,
    releaseYear: 2019,
    imageUrl: "/placeholder.svg?height=400&width=300",
    bannerUrl: "/placeholder.svg?height=800&width=1600",
    type: "movie",
    trending: true,
    newRelease: true,
  },
  {
    id: 10,
    title: "The Crown",
    description:
      "Sigue la vida política de la reina Isabel II y los eventos que dieron forma a la segunda mitad del siglo XX.",
    genre: ["Biografía", "Drama", "Historia"],
    duration: "4 temporadas",
    rating: 8.7,
    releaseYear: 2016,
    imageUrl: "/placeholder.svg?height=400&width=300",
    type: "series",
    seasons: 4,
    recommended: true,
  },
  {
    id: 11,
    title: "El Irlandés",
    description:
      "Un sicario de la mafia reflexiona sobre su vida y los asesinatos que cometió para el jefe del crimen Russell Bufalino.",
    genre: ["Biografía", "Crimen", "Drama"],
    duration: "3h 29min",
    rating: 7.8,
    releaseYear: 2019,
    imageUrl: "/placeholder.svg?height=400&width=300",
    type: "movie",
    newRelease: true,
  },
  {
    id: 12,
    title: "Narcos",
    description:
      "Una mirada a la vida criminal del narcotraficante colombiano Pablo Escobar, así como a los muchos otros capos de la droga que plagaron el país a lo largo de los años.",
    genre: ["Biografía", "Crimen", "Drama"],
    duration: "3 temporadas",
    rating: 8.8,
    releaseYear: 2015,
    imageUrl: "/placeholder.svg?height=400&width=300",
    type: "series",
    seasons: 3,
    popular: true,
  },
]

export function getMovieById(id: number): Movie | undefined {
  return movies.find((movie) => movie.id === id)
}

export function getTrendingMovies(): Movie[] {
  return movies.filter((movie) => movie.trending)
}

export function getPopularMovies(): Movie[] {
  return movies.filter((movie) => movie.popular)
}

export function getRecommendedMovies(): Movie[] {
  return movies.filter((movie) => movie.recommended)
}

export function getNewReleases(): Movie[] {
  return movies.filter((movie) => movie.newRelease)
}

export function getMoviesByType(type: "movie" | "series"): Movie[] {
  return movies.filter((movie) => movie.type === type)
}

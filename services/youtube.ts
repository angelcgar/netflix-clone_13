// Función para obtener el ID de un trailer de YouTube para una película
export async function getMovieTrailer(movieId: number): Promise<string | null> {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=es-ES`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Error fetching movie videos: ${response.status}`)
    }

    const data = await response.json()

    // Buscar primero trailers oficiales
    let trailer = data.results.find(
      (video: any) =>
        video.type === "Trailer" &&
        video.site === "YouTube" &&
        (video.name.includes("Oficial") || video.name.includes("Official")),
    )

    // Si no hay trailer oficial, buscar cualquier trailer
    if (!trailer) {
      trailer = data.results.find((video: any) => video.type === "Trailer" && video.site === "YouTube")
    }

    // Si no hay trailer, buscar cualquier video
    if (!trailer) {
      trailer = data.results.find((video: any) => video.site === "YouTube")
    }

    return trailer ? trailer.key : null
  } catch (error) {
    console.error("Error getting movie trailer:", error)
    return null
  }
}

// Función para obtener el ID de un trailer de YouTube para una serie
export async function getTVShowTrailer(tvId: number): Promise<string | null> {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${tvId}/videos?language=es-ES`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Error fetching TV show videos: ${response.status}`)
    }

    const data = await response.json()

    // Buscar primero trailers oficiales
    let trailer = data.results.find(
      (video: any) =>
        video.type === "Trailer" &&
        video.site === "YouTube" &&
        (video.name.includes("Oficial") || video.name.includes("Official")),
    )

    // Si no hay trailer oficial, buscar cualquier trailer
    if (!trailer) {
      trailer = data.results.find((video: any) => video.type === "Trailer" && video.site === "YouTube")
    }

    // Si no hay trailer, buscar cualquier video
    if (!trailer) {
      trailer = data.results.find((video: any) => video.site === "YouTube")
    }

    return trailer ? trailer.key : null
  } catch (error) {
    console.error("Error getting TV show trailer:", error)
    return null
  }
}

// Función para obtener un trailer basado en el tipo y ID
export async function getTrailer(type: "movie" | "series", id: number): Promise<string | null> {
  if (type === "movie") {
    return getMovieTrailer(id)
  } else {
    return getTVShowTrailer(id)
  }
}

// Función para generar un ID de trailer de YouTube aleatorio (para demostración)
export function getFallbackTrailerId(title: string): string {
  // Lista de IDs de trailers populares de Netflix como fallback
  const fallbackTrailers = [
    "PyakRSni-c0", // Stranger Things
    "b9EkMc79ZSU", // The Witcher
    "x8UAUAuKNcU", // La Casa de Papel
    "JuDLepNa7hw", // Squid Game
    "oqxAJKy0ii4", // Dark
  ]

  // Usar el título para seleccionar un trailer de manera determinista
  const titleSum = title.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0)
  const index = titleSum % fallbackTrailers.length

  return fallbackTrailers[index]
}

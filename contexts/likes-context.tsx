"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface LikesContextType {
  likedMovies: number[]
  toggleLike: (movieId: number) => void
  isLiked: (movieId: number) => boolean
}

const LikesContext = createContext<LikesContextType | undefined>(undefined)

export function LikesProvider({ children }: { children: ReactNode }) {
  const [likedMovies, setLikedMovies] = useState<number[]>([])

  // Cargar likes desde localStorage al iniciar
  useEffect(() => {
    const storedLikes = localStorage.getItem("netflix_liked_movies")
    if (storedLikes) {
      try {
        setLikedMovies(JSON.parse(storedLikes))
      } catch (error) {
        console.error("Error parsing stored likes:", error)
        localStorage.removeItem("netflix_liked_movies")
      }
    }
  }, [])

  // Guardar likes en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem("netflix_liked_movies", JSON.stringify(likedMovies))
  }, [likedMovies])

  const toggleLike = (movieId: number) => {
    setLikedMovies((prevLikes) => {
      if (prevLikes.includes(movieId)) {
        return prevLikes.filter((id) => id !== movieId)
      } else {
        return [...prevLikes, movieId]
      }
    })
  }

  const isLiked = (movieId: number) => {
    return likedMovies.includes(movieId)
  }

  return <LikesContext.Provider value={{ likedMovies, toggleLike, isLiked }}>{children}</LikesContext.Provider>
}

export function useLikes() {
  const context = useContext(LikesContext)
  if (context === undefined) {
    throw new Error("useLikes must be used within a LikesProvider")
  }
  return context
}

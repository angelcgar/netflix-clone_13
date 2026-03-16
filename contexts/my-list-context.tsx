"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Movie } from "@/lib/data"

interface MyListContextType {
  myList: Movie[]
  addToMyList: (movie: Movie) => void
  removeFromMyList: (movieId: number) => void
  isInMyList: (movieId: number) => boolean
}

const MyListContext = createContext<MyListContextType | undefined>(undefined)

export function MyListProvider({ children }: { children: ReactNode }) {
  const [myList, setMyList] = useState<Movie[]>([])

  // Cargar la lista desde localStorage al iniciar
  useEffect(() => {
    const storedList = localStorage.getItem("netflix_my_list")
    if (storedList) {
      try {
        setMyList(JSON.parse(storedList))
      } catch (error) {
        console.error("Error parsing stored list:", error)
        localStorage.removeItem("netflix_my_list")
      }
    }
  }, [])

  // Guardar la lista en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem("netflix_my_list", JSON.stringify(myList))
  }, [myList])

  const addToMyList = (movie: Movie) => {
    setMyList((prevList) => {
      // Verificar si la película ya está en la lista
      if (prevList.some((item) => item.id === movie.id)) {
        return prevList
      }
      return [...prevList, movie]
    })
  }

  const removeFromMyList = (movieId: number) => {
    setMyList((prevList) => prevList.filter((movie) => movie.id !== movieId))
  }

  const isInMyList = (movieId: number) => {
    return myList.some((movie) => movie.id === movieId)
  }

  return (
    <MyListContext.Provider value={{ myList, addToMyList, removeFromMyList, isInMyList }}>
      {children}
    </MyListContext.Provider>
  )
}

export function useMyList() {
  const context = useContext(MyListContext)
  if (context === undefined) {
    throw new Error("useMyList must be used within a MyListProvider")
  }
  return context
}

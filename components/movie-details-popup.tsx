"use client"

import { useRef, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Movie } from "@/lib/data"

interface MovieDetailsPopupProps {
  movie: Movie
  onClose: () => void
}

export function MovieDetailsPopup({ movie, onClose }: MovieDetailsPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null)

  // Cerrar el popup al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  // Cerrar el popup al presionar Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 animate-in fade-in-0 duration-200">
      <div
        ref={popupRef}
        className="bg-zinc-900 rounded-md max-w-lg w-full max-h-[80vh] overflow-y-auto animate-in zoom-in-95 duration-300"
        style={{ boxShadow: "0 0 20px rgba(0,0,0,0.5)" }}
      >
        <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
          <h3 className="text-xl font-bold">{movie.title}</h3>
          <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-zinc-800 transition-colors">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="col-span-1 text-zinc-400">Año</div>
            <div className="col-span-2">{movie.releaseYear}</div>

            <div className="col-span-1 text-zinc-400">Duración</div>
            <div className="col-span-2">{movie.duration}</div>

            <div className="col-span-1 text-zinc-400">Tipo</div>
            <div className="col-span-2">{movie.type === "movie" ? "Película" : "Serie"}</div>

            <div className="col-span-1 text-zinc-400">Géneros</div>
            <div className="col-span-2">{movie.genre.join(", ")}</div>

            <div className="col-span-1 text-zinc-400">Calificación</div>
            <div className="col-span-2">
              <span className="text-green-500 font-semibold">{Math.round(movie.rating * 10)}% Match</span>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-zinc-400 mb-2">Sinopsis</h4>
            <p>{movie.description}</p>
          </div>

          {movie.type === "series" && movie.seasons && (
            <div>
              <h4 className="text-zinc-400 mb-2">Temporadas</h4>
              <p>
                {movie.seasons} temporada{movie.seasons !== 1 ? "s" : ""}
              </p>
            </div>
          )}
        </div>
        <div className="p-4 border-t border-zinc-800 flex justify-end">
          <Button variant="outline" onClick={onClose} className="hover:bg-zinc-800 transition-colors">
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Play, Plus, Check, ThumbsUp, ChevronDown } from "lucide-react"
import type { Movie } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { VideoPlayer } from "@/components/video-player"
import { MovieDetailsPopup } from "@/components/movie-details-popup"
import { useMyList } from "@/contexts/my-list-context"
import { useLikes } from "@/contexts/likes-context"
import { getFallbackTrailerId } from "@/services/youtube"

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [trailerId, setTrailerId] = useState<string | null>(null)
  const { isInMyList, addToMyList, removeFromMyList } = useMyList()
  const { isLiked, toggleLike } = useLikes()

  const detailsPath = movie.type === "movie" ? `/movie/${movie.id}` : `/tv/${movie.id}`
  const inMyList = isInMyList(movie.id)
  const liked = isLiked(movie.id)

  const handlePlayClick = () => {
    // Usar un ID de trailer aleatorio para demostración
    const id = getFallbackTrailerId(movie.title)
    setTrailerId(id)
    setIsVideoOpen(true)
  }

  const handleMyListClick = () => {
    if (inMyList) {
      removeFromMyList(movie.id)
    } else {
      addToMyList(movie)
    }
  }

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleLike(movie.id)
  }

  const handleDetailsClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDetailsOpen(true)
  }

  return (
    <>
      <div
        className="relative h-28 min-w-[180px] md:h-36 md:min-w-[260px] transition-all duration-300 ease-out md:hover:scale-105 md:hover:z-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={detailsPath}>
          <div className="relative h-full w-full overflow-hidden rounded-sm">
            <Image
              src={movie.imageUrl || "/placeholder.svg?height=400&width=300"}
              alt={movie.title}
              fill
              className="rounded-sm object-cover transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 768px) 180px, 260px"
            />
          </div>
        </Link>

        {isHovered && (
          <div className="absolute inset-0 rounded-sm bg-black/60 p-2 flex flex-col justify-between z-10 animate-in fade-in-0 duration-200">
            <h3 className="text-sm font-semibold line-clamp-1">{movie.title}</h3>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Button
                  size="icon"
                  className="h-7 w-7 rounded-full bg-white hover:bg-white/90 transition-colors"
                  onClick={handlePlayClick}
                >
                  <Play className="h-4 w-4 fill-black text-black" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className={`h-7 w-7 rounded-full transition-all duration-200 ${
                    inMyList ? "bg-white/20" : "border-white/40 hover:border-white hover:bg-white/10"
                  }`}
                  onClick={handleMyListClick}
                >
                  {inMyList ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className={`h-7 w-7 rounded-full transition-all duration-200 ${
                    liked ? "bg-white/20" : "border-white/40 hover:border-white hover:bg-white/10"
                  }`}
                  onClick={handleLikeClick}
                >
                  <ThumbsUp className={`h-4 w-4 ${liked ? "fill-white" : ""} transition-all duration-200`} />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-7 w-7 rounded-full border-white/40 ml-auto hover:border-white hover:bg-white/10 transition-all duration-200"
                  onClick={handleDetailsClick}
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-green-500 font-semibold">{Math.round(movie.rating * 10)}% Match</span>
                <span className="border border-white/40 px-1">{movie.type === "movie" ? "PELÍCULA" : "SERIE"}</span>
                <span>{movie.releaseYear}</span>
              </div>
              <div className="text-xs mt-1 line-clamp-1">{movie.genre.join(" • ")}</div>
            </div>
          </div>
        )}
      </div>

      {isVideoOpen && trailerId && (
        <VideoPlayer videoId={trailerId} isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
      )}

      {isDetailsOpen && <MovieDetailsPopup movie={movie} onClose={() => setIsDetailsOpen(false)} />}
    </>
  )
}

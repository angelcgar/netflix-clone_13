"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Play, Info, Plus, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { VideoPlayer } from "@/components/video-player"
import { useMyList } from "@/contexts/my-list-context"
import { getFallbackTrailerId } from "@/services/youtube"
import type { Movie } from "@/lib/data"

interface HeroBannerProps {
  movie: Movie
}

export function HeroBanner({ movie }: HeroBannerProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [trailerId, setTrailerId] = useState<string | null>(null)
  const { isInMyList, addToMyList, removeFromMyList } = useMyList()

  const detailsPath = movie.type === "movie" ? `/movie/${movie.id}` : `/tv/${movie.id}`
  const inMyList = isInMyList(movie.id)

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

  return (
    <>
      <div className="relative h-[70vh] md:h-[80vh] w-full">
        <div className="absolute inset-0">
          <Image
            src={movie.bannerUrl || movie.imageUrl}
            alt={movie.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
        </div>
        <div className="relative h-full flex flex-col justify-end pb-20 px-4 md:px-12 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-in slide-in-from-left-10 duration-700">
            {movie.title}
          </h1>
          <p className="text-lg mb-6 line-clamp-3 animate-in slide-in-from-left-10 duration-700 delay-150">
            {movie.description}
          </p>
          <div className="flex gap-3 animate-in slide-in-from-left-10 duration-700 delay-300">
            <Button
              className="bg-white text-black hover:bg-white/90 gap-2 transition-transform hover:scale-105"
              onClick={handlePlayClick}
            >
              <Play className="h-5 w-5 fill-black" />
              Reproducir
            </Button>
            <Button
              variant="secondary"
              className="bg-gray-500/60 hover:bg-gray-500/80 gap-2 transition-transform hover:scale-105"
              onClick={handleMyListClick}
            >
              {inMyList ? (
                <>
                  <Check className="h-5 w-5" />
                  En Mi Lista
                </>
              ) : (
                <>
                  <Plus className="h-5 w-5" />
                  Mi Lista
                </>
              )}
            </Button>
            <Link href={detailsPath}>
              <Button
                variant="secondary"
                className="bg-gray-500/60 hover:bg-gray-500/80 gap-2 transition-transform hover:scale-105"
              >
                <Info className="h-5 w-5" />
                Más información
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {isVideoOpen && trailerId && (
        <VideoPlayer videoId={trailerId} isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
      )}
    </>
  )
}

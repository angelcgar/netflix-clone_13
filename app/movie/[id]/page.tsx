"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Play, Plus, Check, ThumbsUp, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { MovieRow } from "@/components/movie-row"
import { VideoPlayer } from "@/components/video-player"
import { HeroBannerSkeleton, MovieRowSkeleton } from "@/components/loading-skeleton"
import { useMovieDetails } from "@/hooks/use-tmdb"
import { useMyList } from "@/contexts/my-list-context"
import { useLikes } from "@/contexts/likes-context"
import { getFallbackTrailerId } from "@/services/youtube"

export default function MoviePage() {
  const params = useParams()
  const router = useRouter()
  const movieId = Number(params?.id)
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [trailerId, setTrailerId] = useState<string | null>(null)

  const { movie, similarMovies, loading, error } = useMovieDetails(movieId)
  const { isInMyList, addToMyList, removeFromMyList } = useMyList()
  const { isLiked, toggleLike } = useLikes()

  // Redirigir a 404 si hay un error
  useEffect(() => {
    if (error) {
      router.push("/404")
    }
  }, [error, router])

  const handlePlayClick = () => {
    if (movie) {
      // Usar un ID de trailer aleatorio para demostración
      const id = getFallbackTrailerId(movie.title)
      setTrailerId(id)
      setIsVideoOpen(true)
    }
  }

  const handleMyListClick = () => {
    if (movie) {
      if (isInMyList(movie.id)) {
        removeFromMyList(movie.id)
      } else {
        addToMyList(movie)
      }
    }
  }

  const handleLikeClick = () => {
    if (movie) {
      toggleLike(movie.id)
    }
  }

  const inMyList = movie ? isInMyList(movie.id) : false
  const liked = movie ? isLiked(movie.id) : false

  if (loading || !movie) {
    return (
      <main className="relative min-h-screen">
        <Navbar />
        <HeroBannerSkeleton />
        <div className="relative -mt-60 md:-mt-80 px-4 md:px-12 max-w-6xl mx-auto">
          <div className="h-12 w-3/4 bg-gray-800 rounded-md mb-4 animate-pulse" />
          <div className="flex items-center gap-4 mb-6">
            <div className="h-6 w-20 bg-gray-800 rounded-md animate-pulse" />
            <div className="h-6 w-16 bg-gray-800 rounded-md animate-pulse" />
            <div className="h-6 w-24 bg-gray-800 rounded-md animate-pulse" />
          </div>
          <div className="flex gap-3 mb-8">
            <div className="h-10 w-32 bg-gray-800 rounded-md animate-pulse" />
            <div className="h-10 w-32 bg-gray-800 rounded-md animate-pulse" />
          </div>
        </div>
        <MovieRowSkeleton />
      </main>
    )
  }

  return (
    <>
      <main className="relative min-h-screen">
        <Navbar />

        <div className="relative h-[70vh] w-full">
          <div className="absolute inset-0">
            <Image
              src={movie.bannerUrl || movie.imageUrl}
              alt={movie.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
          </div>

          <Link href="/" className="absolute top-20 left-4 md:left-12 z-10">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
        </div>

        <div className="relative -mt-60 md:-mt-80 px-4 md:px-12 max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{movie.title}</h1>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-green-500 font-semibold">{Math.round(movie.rating * 10)}% Match</span>
            <span>{movie.releaseYear}</span>
            <span className="border border-white/40 px-2 py-0.5 text-sm">PELÍCULA</span>
            <span>{movie.duration}</span>
          </div>

          <div className="flex gap-3 mb-8">
            <Button className="bg-white text-black hover:bg-white/90 gap-2" onClick={handlePlayClick}>
              <Play className="h-5 w-5 fill-black" />
              Reproducir
            </Button>
            <Button
              variant={inMyList ? "secondary" : "outline"}
              className={`gap-2 ${inMyList ? "bg-white/20" : ""}`}
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
            <Button variant="outline" size="icon" className={liked ? "bg-white/20" : ""} onClick={handleLikeClick}>
              <ThumbsUp className={`h-5 w-5 ${liked ? "fill-white" : ""}`} />
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <p className="text-lg mb-6">{movie.description}</p>
            </div>
            <div>
              <p className="text-white/60 mb-1">
                <span className="text-white/90">Géneros: </span>
                {movie.genre.join(", ")}
              </p>
              <p className="text-white/60 mb-1">
                <span className="text-white/90">Calificación: </span>
                {movie.rating * 10}/10
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <MovieRow title="Títulos similares" movies={similarMovies} isLoading={loading} />
        </div>
      </main>

      {isVideoOpen && trailerId && (
        <VideoPlayer videoId={trailerId} isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
      )}
    </>
  )
}

"use client"
import { Navbar } from "@/components/navbar"
import { MovieCard } from "@/components/movie-card"
import { useMyList } from "@/contexts/my-list-context"
import { useAuth } from "@/contexts/auth-context"

export default function MyListPage() {
  const { myList } = useMyList()
  const { user } = useAuth()

  return (
    <main className="relative min-h-screen pt-20">
      <Navbar />
      <div className="px-4 md:px-12 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Mi Lista</h1>

        {myList.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {myList.map((movie) => (
              <div key={movie.id} className="h-auto">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-400">Tu lista está vacía</p>
            <p className="text-gray-500 mt-2">
              {user
                ? "Agrega películas y series a tu lista para verlas más tarde"
                : "Inicia sesión para guardar películas y series en tu lista"}
            </p>
          </div>
        )}
      </div>
    </main>
  )
}

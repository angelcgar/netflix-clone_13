export function MovieCardSkeleton() {
  return (
    <div className="relative h-28 min-w-[180px] md:h-36 md:min-w-[260px] bg-gray-800 rounded-sm animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/60" />
    </div>
  )
}

export function HeroBannerSkeleton() {
  return (
    <div className="relative h-[70vh] md:h-[80vh] w-full bg-gray-800 animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
      <div className="relative h-full flex flex-col justify-end pb-20 px-4 md:px-12 max-w-3xl">
        <div className="h-12 w-3/4 bg-gray-700 rounded-md mb-4" />
        <div className="h-4 w-full bg-gray-700 rounded-md mb-2" />
        <div className="h-4 w-5/6 bg-gray-700 rounded-md mb-2" />
        <div className="h-4 w-4/6 bg-gray-700 rounded-md mb-6" />
        <div className="flex gap-3">
          <div className="h-10 w-32 bg-gray-700 rounded-md" />
          <div className="h-10 w-40 bg-gray-700 rounded-md" />
        </div>
      </div>
    </div>
  )
}

export function MovieRowSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="space-y-2 md:space-y-4 py-4">
      <div className="h-8 w-48 bg-gray-800 rounded-md mx-4 md:mx-12 animate-pulse" />
      <div className="flex items-center space-x-2 overflow-x-hidden px-4 md:px-12 py-4">
        {Array(count)
          .fill(0)
          .map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
      </div>
    </div>
  )
}

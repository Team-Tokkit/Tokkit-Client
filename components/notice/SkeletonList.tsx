export function SkeletonList() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">공지사항</h1>
      <div className="bg-white border rounded-xl shadow-sm min-h-[400px] flex flex-col justify-between">
        <div className="p-4 space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="rounded-md bg-gray-200 h-12 animate-pulse"
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center gap-2 mt-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}

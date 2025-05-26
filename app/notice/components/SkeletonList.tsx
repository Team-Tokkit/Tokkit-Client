import Header from "@/components/common/Header"

export function SkeletonList() {
  return (
    <div className="container mx-auto max-w-4xl px-4">
      <div className="py-2">
        <Header title="공지사항 🔔" />
      </div>
      <div className="bg-white border rounded-xl shadow-sm min-h-[700px] flex flex-col justify-between">
        <div className="p-4 space-y-4">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="rounded-md bg-gray-200 h-20 animate-pulse" />
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center gap-2 mt-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
        ))}
      </div>
    </div>
  )
}

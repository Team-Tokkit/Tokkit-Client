export default function SkeletonDetail() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <div className="mb-4">
        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
      </div>

      <div className="mb-4">
        <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
      </div>

      <div className="border-t my-4"></div>

      <div className="space-y-4">
        <div className="h-8 w-full bg-gray-200 rounded animate-pulse"></div>
        <div className="h-8 w-5/6 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-8 w-4/6 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  );
}

import {
  EnhancedTaskCardSkeleton,
  FilterSkeleton,
  HeaderSkeleton,
  PaginationSkeleton,
} from "@/components/ui/skeleton";

export function TaskPageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Skeleton */}
        <HeaderSkeleton />

        {/* Filter Skeleton */}
        <div className="mb-6">
          <FilterSkeleton />
        </div>

        {/* Task List Skeleton with enhanced shimmer effect */}
        <div className="space-y-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <EnhancedTaskCardSkeleton key={index} />
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="flex justify-center mt-8">
          <PaginationSkeleton />
        </div>
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={cn("animate-pulse rounded-md bg-gray-200", className)} />
  );
}

// Task Card Skeleton Component
export function TaskCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="space-y-4">
        {/* Header with title and status */}
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        {/* Footer with date and actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <Skeleton className="h-4 w-32" />
          <div className="flex space-x-2">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Task List Skeleton Component
export function TaskListSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 5 }).map((_, index) => (
        <TaskCardSkeleton key={index} />
      ))}
    </div>
  );
}

// Filter Skeleton Component
export function FilterSkeleton() {
  return (
    <div className="flex flex-wrap gap-2">
      <Skeleton className="h-10 w-16 rounded-lg" />
      <Skeleton className="h-10 w-24 rounded-lg" />
      <Skeleton className="h-10 w-20 rounded-lg" />
      <Skeleton className="h-10 w-16 rounded-lg" />
    </div>
  );
}

// Pagination Skeleton Component
export function PaginationSkeleton() {
  return (
    <div className="flex items-center justify-center space-x-2">
      <Skeleton className="h-10 w-20" />
      <Skeleton className="h-10 w-10" />
      <Skeleton className="h-10 w-10" />
      <Skeleton className="h-10 w-10" />
      <Skeleton className="h-10 w-20" />
    </div>
  );
}

// Form Field Skeleton Component
export function FormFieldSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  );
}

// Header Skeleton Component
export function HeaderSkeleton() {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-80" />
      </div>
      <Skeleton className="h-10 w-32 rounded-md" />
    </div>
  );
}

// Loading shimmer effect for enhanced visual appeal
export function SkeletonShimmer({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden">
      {children}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
    </div>
  );
}

// Enhanced Task Card Skeleton with shimmer
export function EnhancedTaskCardSkeleton() {
  return (
    <SkeletonShimmer>
      <TaskCardSkeleton />
    </SkeletonShimmer>
  );
}

// Inline loading skeleton for buttons and small elements
export function InlineSkeleton({
  width = "w-16",
  height = "h-4",
}: {
  width?: string;
  height?: string;
}) {
  return <Skeleton className={`${height} ${width} inline-block`} />;
}

// Modal content skeleton
export function ModalContentSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <FormFieldSkeleton />
        <FormFieldSkeleton />
        <FormFieldSkeleton />
      </div>
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <Skeleton className="h-10 w-20 rounded-md" />
        <Skeleton className="h-10 w-28 rounded-md" />
      </div>
    </div>
  );
}

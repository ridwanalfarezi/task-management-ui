import { FormFieldSkeleton, Skeleton } from "./skeleton";

export function TaskFormSkeleton() {
  return (
    <div className="space-y-4">
      {/* Title field */}
      <FormFieldSkeleton />

      {/* Description field */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-24 w-full rounded-md" />
      </div>

      {/* Status field (only for edit) */}
      <FormFieldSkeleton />

      {/* Action buttons */}
      <div className="flex justify-end space-x-3 pt-4">
        <Skeleton className="h-10 w-20 rounded-md" />
        <Skeleton className="h-10 w-28 rounded-md" />
      </div>
    </div>
  );
}

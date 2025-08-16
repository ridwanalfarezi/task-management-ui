import { Plus } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title = "No items found",
  message = "Get started by creating your first item.",
  actionLabel = "Create New",
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="flex flex-col items-center space-y-4 text-center max-w-md">
        <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full">
          <Plus className="w-8 h-8 text-gray-400" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-gray-600">{message}</p>
        </div>
        {onAction && (
          <button
            onClick={onAction}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>{actionLabel}</span>
          </button>
        )}
      </div>
    </div>
  );
}

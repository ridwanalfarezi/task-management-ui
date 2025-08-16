import { TaskStatus } from "@/types/task";
import { Filter } from "lucide-react";

interface TaskFilterProps {
  selectedStatus?: TaskStatus;
  onStatusChange: (status?: TaskStatus) => void;
}

export function TaskFilter({
  selectedStatus,
  onStatusChange,
}: TaskFilterProps) {
  const statusOptions = [
    { value: undefined, label: "All Tasks" },
    { value: "TO_DO" as TaskStatus, label: "To Do" },
    { value: "IN_PROGRESS" as TaskStatus, label: "In Progress" },
    { value: "DONE" as TaskStatus, label: "Done" },
  ];

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <Filter className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">
          Filter by status:
        </span>
      </div>

      <div className="flex space-x-2">
        {statusOptions.map((option) => (
          <button
            key={option.label}
            onClick={() => onStatusChange(option.value)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedStatus === option.value
                ? "bg-blue-100 text-blue-800 border border-blue-200"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

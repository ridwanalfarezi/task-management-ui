"use client";

import { Pagination } from "@/components/tasks/pagination";
import { TaskCard } from "@/components/tasks/task-card";
import { TaskFilter } from "@/components/tasks/task-filter";
import { TaskForm } from "@/components/tasks/task-form";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { Modal } from "@/components/ui/modal";
import { TaskPageSkeleton } from "@/components/ui/task-page-skeleton";
import { URLDebugInfo } from "@/components/ui/url-debug";
import {
  useCreateTask,
  useDeleteTask,
  useTasks,
  useUpdateTask,
} from "@/hooks/use-tasks";
import { CreateTaskData, Task, TaskStatus, UpdateTaskData } from "@/types/task";
import { Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";

function TasksPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state with default values first
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus | undefined>(
    undefined
  );
  const [isInitialized, setIsInitialized] = useState(false);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Initialize state from URL parameters after component mounts
  useEffect(() => {
    const page = searchParams.get("page");
    const status = searchParams.get("status");

    const newPage = page ? parseInt(page, 10) : 1;
    const newStatus =
      status && ["TO_DO", "IN_PROGRESS", "DONE"].includes(status)
        ? (status as TaskStatus)
        : undefined;

    setCurrentPage(newPage);
    setSelectedStatus(newStatus);
    setIsInitialized(true);
  }, [searchParams]);

  // Function to update URL with current state
  const updateURL = useCallback(
    (page: number, status?: TaskStatus) => {
      const params = new URLSearchParams();

      if (page > 1) {
        params.set("page", page.toString());
      }

      if (status) {
        params.set("status", status);
      }

      const queryString = params.toString();
      const newURL = queryString ? `/?${queryString}` : "/";

      router.replace(newURL, { scroll: false });
    },
    [router]
  );

  // Update URL when state changes (only after initialization)
  useEffect(() => {
    if (isInitialized) {
      updateURL(currentPage, selectedStatus);
    }
  }, [currentPage, selectedStatus, updateURL, isInitialized]);

  const limit = 10;

  // Fetch tasks with current filters
  const {
    data: tasksData,
    isLoading,
    error,
    refetch,
  } = useTasks({
    page: currentPage,
    limit,
    status: selectedStatus,
  });

  // Mutations
  const createTaskMutation = useCreateTask();
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();

  // Handlers
  const handleStatusFilter = (status?: TaskStatus) => {
    setSelectedStatus(status);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCreateTask = async (data: CreateTaskData | UpdateTaskData) => {
    try {
      await createTaskMutation.mutateAsync(data as CreateTaskData);
      setIsCreateModalOpen(false);
    } catch {
      // Error handling is done in the hook with toast
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleUpdateTask = async (data: CreateTaskData | UpdateTaskData) => {
    if (!editingTask) return;

    try {
      await updateTaskMutation.mutateAsync({
        id: editingTask.id,
        data: data as UpdateTaskData,
      });
      setEditingTask(null);
    } catch {
      // Error handling is done in the hook with toast
    }
  };

  const handleDeleteTask = (taskId: string) => {
    setDeleteConfirmId(taskId);
  };

  const confirmDeleteTask = async () => {
    if (!deleteConfirmId) return;

    try {
      await deleteTaskMutation.mutateAsync(deleteConfirmId);
      setDeleteConfirmId(null);
    } catch {
      // Error handling is done in the hook with toast
    }
  };

  // Loading state
  if (isLoading) {
    return <TaskPageSkeleton />;
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ErrorState
            title="Failed to load tasks"
            message="There was an error loading your tasks. Please try again."
            onRetry={() => refetch()}
          />
        </div>
      </div>
    );
  }

  const tasks = tasksData?.data || [];
  const totalPages = tasksData?.totalPages || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Task Management
              </h1>
              <p className="mt-1 text-gray-600">
                Manage your tasks efficiently with our intuitive interface.
              </p>
            </div>
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Task</span>
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <TaskFilter
            selectedStatus={selectedStatus}
            onStatusChange={handleStatusFilter}
          />
        </div>

        {/* Task List */}
        {tasks.length === 0 ? (
          <EmptyState
            title="No tasks found"
            message={
              selectedStatus
                ? `No tasks found with status "${selectedStatus
                    .replace("_", " ")
                    .toLowerCase()}".`
                : "You haven't created any tasks yet. Get started by adding your first task!"
            }
            actionLabel="Create First Task"
            onAction={() => setIsCreateModalOpen(true)}
          />
        ) : (
          <>
            <div className="grid gap-6 mb-8">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}

        {/* Create Task Modal */}
        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title="Create New Task"
        >
          <TaskForm
            onSubmit={handleCreateTask}
            onCancel={() => setIsCreateModalOpen(false)}
            loading={createTaskMutation.isPending}
          />
        </Modal>

        {/* Edit Task Modal */}
        <Modal
          isOpen={!!editingTask}
          onClose={() => setEditingTask(null)}
          title="Edit Task"
        >
          {editingTask && (
            <TaskForm
              task={editingTask}
              onSubmit={handleUpdateTask}
              onCancel={() => setEditingTask(null)}
              loading={updateTaskMutation.isPending}
            />
          )}
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={!!deleteConfirmId}
          onClose={() => setDeleteConfirmId(null)}
          title="Delete Task"
          size="sm"
        >
          <div className="space-y-4">
            <p className="text-gray-600">
              Are you sure you want to delete this task? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setDeleteConfirmId(null)}
                disabled={deleteTaskMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={confirmDeleteTask}
                loading={deleteTaskMutation.isPending}
              >
                Delete Task
              </Button>
            </div>
          </div>
        </Modal>

        {/* URL Debug Info - Remove this in production */}
        <URLDebugInfo show={process.env.NODE_ENV === "development"} />
      </div>
    </div>
  );
}

export default function TasksPage() {
  return (
    <Suspense fallback={<TaskPageSkeleton />}>
      <TasksPageContent />
    </Suspense>
  );
}

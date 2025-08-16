import { taskAPI } from "@/lib/api";
import { CreateTaskData, TaskQueryParams, UpdateTaskData } from "@/types/task";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// Query keys for React Query
export const taskQueryKeys = {
  all: ["tasks"] as const,
  lists: () => [...taskQueryKeys.all, "list"] as const,
  list: (params?: TaskQueryParams) =>
    [...taskQueryKeys.lists(), params] as const,
  details: () => [...taskQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...taskQueryKeys.details(), id] as const,
};

// Hook to get all tasks with pagination and filtering
export function useTasks(params?: TaskQueryParams) {
  return useQuery({
    queryKey: taskQueryKeys.list(params),
    queryFn: () => taskAPI.getTasks(params),
  });
}

// Hook to get a single task by ID
export function useTask(id: string) {
  return useQuery({
    queryKey: taskQueryKeys.detail(id),
    queryFn: () => taskAPI.getTask(id),
    enabled: !!id,
  });
}

// Hook to create a new task
export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTaskData) => taskAPI.createTask(data),
    onSuccess: () => {
      // Invalidate and refetch tasks list
      queryClient.invalidateQueries({ queryKey: taskQueryKeys.lists() });
      toast.success("Task created successfully!");
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error && "response" in error
          ? (error as { response?: { data?: { message?: string } } }).response
              ?.data?.message || "Failed to create task"
          : "Failed to create task";
      toast.error(message);
    },
  });
}

// Hook to update a task
export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTaskData }) =>
      taskAPI.updateTask(id, data),
    onSuccess: (_, { id }) => {
      // Invalidate and refetch the specific task and tasks list
      queryClient.invalidateQueries({ queryKey: taskQueryKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: taskQueryKeys.lists() });
      toast.success("Task updated successfully!");
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error && "response" in error
          ? (error as { response?: { data?: { message?: string } } }).response
              ?.data?.message || "Failed to update task"
          : "Failed to update task";
      toast.error(message);
    },
  });
}

// Hook to delete a task
export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => taskAPI.deleteTask(id),
    onSuccess: () => {
      // Invalidate and refetch tasks list
      queryClient.invalidateQueries({ queryKey: taskQueryKeys.lists() });
      toast.success("Task deleted successfully!");
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error && "response" in error
          ? (error as { response?: { data?: { message?: string } } }).response
              ?.data?.message || "Failed to delete task"
          : "Failed to delete task";
      toast.error(message);
    },
  });
}

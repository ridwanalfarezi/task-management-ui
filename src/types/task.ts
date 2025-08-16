export interface Task {
  id: string;
  title: string;
  description?: string;
  status: "TO_DO" | "IN_PROGRESS" | "DONE";
  created_at: string;
  updated_at: string;
}

export interface CreateTaskData {
  title: string;
  description?: string;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  status?: "TO_DO" | "IN_PROGRESS" | "DONE";
}

export interface PaginatedTaskResponse {
  data: Task[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface TaskQueryParams {
  page?: number;
  limit?: number;
  status?: "TO_DO" | "IN_PROGRESS" | "DONE";
}

export type TaskStatus = "TO_DO" | "IN_PROGRESS" | "DONE";

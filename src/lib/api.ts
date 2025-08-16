import {
  CreateTaskData,
  PaginatedTaskResponse,
  Task,
  TaskQueryParams,
  UpdateTaskData,
} from "@/types/task";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const taskAPI = {
  // Get all tasks with optional query parameters
  getTasks: async (
    params?: TaskQueryParams
  ): Promise<PaginatedTaskResponse> => {
    const response = await api.get("/tasks", { params });
    return response.data;
  },

  // Get a specific task by ID
  getTask: async (id: string): Promise<Task> => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  // Create a new task
  createTask: async (data: CreateTaskData): Promise<Task> => {
    const response = await api.post("/tasks", data);
    return response.data;
  },

  // Update an existing task
  updateTask: async (id: string, data: UpdateTaskData): Promise<Task> => {
    const response = await api.patch(`/tasks/${id}`, data);
    return response.data;
  },

  // Delete a task
  deleteTask: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },
};

export default api;

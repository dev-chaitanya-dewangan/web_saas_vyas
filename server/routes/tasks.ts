import { RequestHandler } from "express";
import { Task, ApiResponse } from "@shared/api";

// Mock data for demonstration
const mockTasks: Task[] = [
  {
    id: "1",
    title: "Design landing page mockups",
    description: "Create wireframes and high-fidelity designs for the new landing page",
    status: "in-progress",
    priority: "high",
    assigneeId: "user-1",
    projectId: "1",
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ["design", "ui", "landing"],
    attachments: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Implement user authentication",
    description: "Set up JWT-based authentication system with login/register flows",
    status: "todo",
    priority: "medium",
    assigneeId: "user-2",
    projectId: "1",
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ["backend", "auth", "security"],
    attachments: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Content strategy review",
    description: "Review and optimize content strategy for Q1 campaign",
    status: "completed",
    priority: "medium",
    assigneeId: "user-3",
    projectId: "2",
    tags: ["content", "marketing", "strategy"],
    attachments: [],
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const getTasks: RequestHandler = (req, res) => {
  const { projectId, status, assigneeId } = req.query;
  
  let filteredTasks = mockTasks;
  
  if (projectId) {
    filteredTasks = filteredTasks.filter(task => task.projectId === projectId);
  }
  
  if (status) {
    filteredTasks = filteredTasks.filter(task => task.status === status);
  }
  
  if (assigneeId) {
    filteredTasks = filteredTasks.filter(task => task.assigneeId === assigneeId);
  }

  const response: ApiResponse<Task[]> = {
    success: true,
    data: filteredTasks,
    message: "Tasks retrieved successfully",
  };
  res.json(response);
};

export const createTask: RequestHandler = (req, res) => {
  const { title, description, priority, assigneeId, projectId, dueDate, tags } = req.body;
  
  const newTask: Task = {
    id: `task-${Date.now()}`,
    title,
    description,
    status: "todo",
    priority: priority || "medium",
    assigneeId,
    projectId,
    dueDate,
    tags: tags || [],
    attachments: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  mockTasks.push(newTask);

  const response: ApiResponse<Task> = {
    success: true,
    data: newTask,
    message: "Task created successfully",
  };
  res.json(response);
};

export const getTask: RequestHandler = (req, res) => {
  const { id } = req.params;
  const task = mockTasks.find(t => t.id === id);

  if (!task) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Task not found",
    };
    return res.status(404).json(response);
  }

  const response: ApiResponse<Task> = {
    success: true,
    data: task,
    message: "Task retrieved successfully",
  };
  res.json(response);
};

export const updateTask: RequestHandler = (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  
  const taskIndex = mockTasks.findIndex(t => t.id === id);
  
  if (taskIndex === -1) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Task not found",
    };
    return res.status(404).json(response);
  }

  mockTasks[taskIndex] = {
    ...mockTasks[taskIndex],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  const response: ApiResponse<Task> = {
    success: true,
    data: mockTasks[taskIndex],
    message: "Task updated successfully",
  };
  res.json(response);
};

export const deleteTask: RequestHandler = (req, res) => {
  const { id } = req.params;
  const taskIndex = mockTasks.findIndex(t => t.id === id);
  
  if (taskIndex === -1) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Task not found",
    };
    return res.status(404).json(response);
  }

  mockTasks.splice(taskIndex, 1);

  const response: ApiResponse<null> = {
    success: true,
    message: "Task deleted successfully",
  };
  res.json(response);
};

export const updateTaskStatus: RequestHandler = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  const taskIndex = mockTasks.findIndex(t => t.id === id);
  
  if (taskIndex === -1) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Task not found",
    };
    return res.status(404).json(response);
  }

  mockTasks[taskIndex] = {
    ...mockTasks[taskIndex],
    status,
    updatedAt: new Date().toISOString(),
  };

  const response: ApiResponse<Task> = {
    success: true,
    data: mockTasks[taskIndex],
    message: "Task status updated successfully",
  };
  res.json(response);
};
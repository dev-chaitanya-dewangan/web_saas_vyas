import { RequestHandler } from "express";
import { Project, ApiResponse } from "@shared/api";

// Mock data for demonstration
const mockProjects: Project[] = [
  {
    id: "1",
    title: "AI Workspace Development",
    description: "Building an AI-powered collaborative workspace",
    ownerId: "user-1",
    collaborators: [],
    settings: {
      isPublic: false,
      allowComments: true,
      allowEditing: true,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2", 
    title: "Marketing Campaign Q1",
    description: "Complete marketing strategy for Q1 2024",
    ownerId: "user-1",
    collaborators: [],
    settings: {
      isPublic: true,
      allowComments: true,
      allowEditing: false,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const getProjects: RequestHandler = (req, res) => {
  const response: ApiResponse<Project[]> = {
    success: true,
    data: mockProjects,
    message: "Projects retrieved successfully",
  };
  res.json(response);
};

export const createProject: RequestHandler = (req, res) => {
  const { title, description } = req.body;
  
  const newProject: Project = {
    id: `project-${Date.now()}`,
    title,
    description,
    ownerId: "user-1", // In real app, get from auth
    collaborators: [],
    settings: {
      isPublic: false,
      allowComments: true,
      allowEditing: true,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  mockProjects.push(newProject);

  const response: ApiResponse<Project> = {
    success: true,
    data: newProject,
    message: "Project created successfully",
  };
  res.json(response);
};

export const getProject: RequestHandler = (req, res) => {
  const { id } = req.params;
  const project = mockProjects.find(p => p.id === id);

  if (!project) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Project not found",
    };
    return res.status(404).json(response);
  }

  const response: ApiResponse<Project> = {
    success: true,
    data: project,
    message: "Project retrieved successfully",
  };
  res.json(response);
};

export const updateProject: RequestHandler = (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  
  const projectIndex = mockProjects.findIndex(p => p.id === id);
  
  if (projectIndex === -1) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Project not found",
    };
    return res.status(404).json(response);
  }

  mockProjects[projectIndex] = {
    ...mockProjects[projectIndex],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  const response: ApiResponse<Project> = {
    success: true,
    data: mockProjects[projectIndex],
    message: "Project updated successfully",
  };
  res.json(response);
};

export const deleteProject: RequestHandler = (req, res) => {
  const { id } = req.params;
  const projectIndex = mockProjects.findIndex(p => p.id === id);
  
  if (projectIndex === -1) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Project not found",
    };
    return res.status(404).json(response);
  }

  mockProjects.splice(projectIndex, 1);

  const response: ApiResponse<null> = {
    success: true,
    message: "Project deleted successfully",
  };
  res.json(response);
};
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { 
  getProjects, 
  createProject, 
  getProject, 
  updateProject, 
  deleteProject 
} from "./routes/projects";
import {
  getNodes,
  createNode,
  getNode,
  updateNode,
  deleteNode,
  getConnections,
  createConnection,
  deleteConnection
} from "./routes/mind";
import {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  updateTaskStatus
} from "./routes/tasks";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Express server v2!" });
  });

  // Demo route
  app.get("/api/demo", handleDemo);

  // Projects & Workspaces
  app.get("/api/projects", getProjects);
  app.post("/api/projects", createProject);
  app.get("/api/projects/:id", getProject);
  app.put("/api/projects/:id", updateProject);
  app.delete("/api/projects/:id", deleteProject);

  // Mind Mapping
  app.get("/api/mind/nodes", getNodes);
  app.post("/api/mind/nodes", createNode);
  app.get("/api/mind/nodes/:id", getNode);
  app.put("/api/mind/nodes/:id", updateNode);
  app.delete("/api/mind/nodes/:id", deleteNode);
  app.get("/api/mind/connections", getConnections);
  app.post("/api/mind/connections", createConnection);
  app.delete("/api/mind/connections/:id", deleteConnection);

  // Task Management
  app.get("/api/tasks", getTasks);
  app.post("/api/tasks", createTask);
  app.get("/api/tasks/:id", getTask);
  app.put("/api/tasks/:id", updateTask);
  app.delete("/api/tasks/:id", deleteTask);
  app.patch("/api/tasks/:id/status", updateTaskStatus);

  return app;
}

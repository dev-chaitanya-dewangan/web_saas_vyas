import { RequestHandler } from "express";
import { MindNode, Connection, ApiResponse } from "@shared/api";

// Mock data for demonstration
const mockNodes: MindNode[] = [
  {
    id: "1",
    title: "What is Mind Palace?",
    content: "A method for organizing and storing information in spatial memory",
    position: { x: 300, y: 150 },
    size: { width: 280, height: 120 },
    color: "blue",
    tags: ["#text", "#start"],
    collaborators: [],
    breadcrumb: "Alex's Mind > Mind Models",
    metadata: {
      lastEditedBy: "user-1",
      version: 1,
      isLocked: false,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const mockConnections: Connection[] = [
  {
    id: "c1",
    fromNodeId: "1",
    toNodeId: "2",
    fromSide: "bottom",
    toSide: "top",
    style: {
      color: "#666",
      width: 2,
      style: "solid",
    },
    bidirectional: false,
  },
];

export const getNodes: RequestHandler = (req, res) => {
  const response: ApiResponse<MindNode[]> = {
    success: true,
    data: mockNodes,
    message: "Mind nodes retrieved successfully",
  };
  res.json(response);
};

export const createNode: RequestHandler = (req, res) => {
  const { title, content, position, size, color } = req.body;
  
  const newNode: MindNode = {
    id: `node-${Date.now()}`,
    title,
    content: content || "",
    position: position || { x: 400, y: 300 },
    size: size || { width: 240, height: 100 },
    color: color || "blue",
    tags: [],
    collaborators: [],
    breadcrumb: "Alex's Mind > New",
    metadata: {
      lastEditedBy: "user-1",
      version: 1,
      isLocked: false,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  mockNodes.push(newNode);

  const response: ApiResponse<MindNode> = {
    success: true,
    data: newNode,
    message: "Mind node created successfully",
  };
  res.json(response);
};

export const getNode: RequestHandler = (req, res) => {
  const { id } = req.params;
  const node = mockNodes.find(n => n.id === id);

  if (!node) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Mind node not found",
    };
    return res.status(404).json(response);
  }

  const response: ApiResponse<MindNode> = {
    success: true,
    data: node,
    message: "Mind node retrieved successfully",
  };
  res.json(response);
};

export const updateNode: RequestHandler = (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  
  const nodeIndex = mockNodes.findIndex(n => n.id === id);
  
  if (nodeIndex === -1) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Mind node not found",
    };
    return res.status(404).json(response);
  }

  mockNodes[nodeIndex] = {
    ...mockNodes[nodeIndex],
    ...updates,
    metadata: {
      ...mockNodes[nodeIndex].metadata,
      version: mockNodes[nodeIndex].metadata.version + 1,
    },
    updatedAt: new Date().toISOString(),
  };

  const response: ApiResponse<MindNode> = {
    success: true,
    data: mockNodes[nodeIndex],
    message: "Mind node updated successfully",
  };
  res.json(response);
};

export const deleteNode: RequestHandler = (req, res) => {
  const { id } = req.params;
  const nodeIndex = mockNodes.findIndex(n => n.id === id);
  
  if (nodeIndex === -1) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Mind node not found",
    };
    return res.status(404).json(response);
  }

  mockNodes.splice(nodeIndex, 1);

  const response: ApiResponse<null> = {
    success: true,
    message: "Mind node deleted successfully",
  };
  res.json(response);
};

export const getConnections: RequestHandler = (req, res) => {
  const response: ApiResponse<Connection[]> = {
    success: true,
    data: mockConnections,
    message: "Connections retrieved successfully",
  };
  res.json(response);
};

export const createConnection: RequestHandler = (req, res) => {
  const { fromNodeId, toNodeId, fromSide, toSide } = req.body;
  
  const newConnection: Connection = {
    id: `connection-${Date.now()}`,
    fromNodeId,
    toNodeId,
    fromSide,
    toSide,
    style: {
      color: "#666",
      width: 2,
      style: "solid",
    },
    bidirectional: false,
  };

  mockConnections.push(newConnection);

  const response: ApiResponse<Connection> = {
    success: true,
    data: newConnection,
    message: "Connection created successfully",
  };
  res.json(response);
};

export const deleteConnection: RequestHandler = (req, res) => {
  const { id } = req.params;
  const connectionIndex = mockConnections.findIndex(c => c.id === id);
  
  if (connectionIndex === -1) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Connection not found",
    };
    return res.status(404).json(response);
  }

  mockConnections.splice(connectionIndex, 1);

  const response: ApiResponse<null> = {
    success: true,
    message: "Connection deleted successfully",
  };
  res.json(response);
};
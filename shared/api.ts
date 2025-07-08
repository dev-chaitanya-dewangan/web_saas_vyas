/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

// Core User Management
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  avatar: string;
  isActive: boolean;
  preferences: UserPreferences;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  theme: 'dark' | 'light' | 'system';
  language: string;
  notifications: NotificationSettings;
  accessibility: AccessibilitySettings;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  inApp: boolean;
}

export interface AccessibilitySettings {
  highContrast: boolean;
  reducedMotion: boolean;
  screenReader: boolean;
}

// Project & Collaboration
export interface Project {
  id: string;
  title: string;
  description?: string;
  ownerId: string;
  collaborators: User[];
  settings: ProjectSettings;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectSettings {
  isPublic: boolean;
  allowComments: boolean;
  allowEditing: boolean;
}

// Mind Mapping Types
export interface MindNode {
  id: string;
  title: string;
  content: string;
  position: Position;
  size: Size;
  color: string;
  tags: string[];
  collaborators: User[];
  breadcrumb: string;
  children?: MindNode[];
  metadata: NodeMetadata;
  createdAt: string;
  updatedAt: string;
}

export interface Connection {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  fromSide: 'top' | 'bottom' | 'left' | 'right';
  toSide: 'top' | 'bottom' | 'left' | 'right';
  style: ConnectionStyle;
  label?: string;
  bidirectional: boolean;
}

export interface Position {
  x: number;
  y: number;
  z?: number;
}

export interface Size {
  width: number;
  height: number;
  isLocked?: boolean;
}

export interface NodeMetadata {
  lastEditedBy: string;
  version: number;
  isLocked: boolean;
}

export interface ConnectionStyle {
  color: string;
  width: number;
  style: 'solid' | 'dashed' | 'dotted';
}

// Chat System
export interface Chat {
  id: string;
  projectId: string;
  title: string;
  messages: Message[];
  participants: User[];
  isActive: boolean;
  metadata: ChatMetadata;
  createdAt: string;
}

export interface Message {
  id: string;
  chatId: string;
  authorId: string;
  content: string;
  type: 'user' | 'ai' | 'system';
  timestamp: string;
  reactions: Reaction[];
  attachments: Attachment[];
  metadata: MessageMetadata;
}

export interface MessageMetadata {
  includesImage?: boolean;
  includesWeather?: boolean;
  weatherData?: WeatherData;
  aiContext?: string;
  isEdited?: boolean;
  editHistory?: MessageEdit[];
}

export interface Reaction {
  id: string;
  emoji: string;
  userId: string;
  timestamp: string;
}

export interface Attachment {
  id: string;
  filename: string;
  url: string;
  type: string;
  size: number;
}

export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

export interface MessageEdit {
  timestamp: string;
  previousContent: string;
  editedBy: string;
}

export interface ChatMetadata {
  lastActivity: string;
  messageCount: number;
  activeUsers: number;
}

// File Management
export interface FileItem {
  id: string;
  name: string;
  originalName: string;
  type: string;
  size: string;
  sizeBytes: number;
  path: string;
  sharedBy: User;
  permissions: FilePermission[];
  isAnalyzed: boolean;
  isAnalyzing: boolean;
  analysisResult?: AnalysisResult;
  tags: string[];
  metadata: FileMetadata;
  uploadedAt: string;
  modifiedAt: string;
}

export interface AnalysisResult {
  summary: string[];
  fileType: string;
  extractedText?: string;
  confidence: number;
  suggestedTags: string[];
  relatedFiles: FileItem[];
  processingTime: number;
}

export interface FilePermission {
  userId: string;
  permission: 'read' | 'write' | 'admin';
}

export interface FileMetadata {
  author?: string;
  createdWith?: string;
  lastOpened?: string;
}

// Task Management
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'completed' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assigneeId?: string;
  projectId: string;
  dueDate?: string;
  tags: string[];
  attachments: string[];
  createdAt: string;
  updatedAt: string;
}

// System Types
export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  resourceType: string;
  resourceId: string;
  details: any;
  timestamp: string;
  ipAddress?: string;
  userAgent?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// Search Types
export interface SearchResult {
  id: string;
  type: 'user' | 'file' | 'node' | 'chat' | 'project';
  title: string;
  content: string;
  url: string;
  relevance: number;
}

export interface SearchParams {
  q: string;
  type?: string;
  limit?: number;
  offset?: number;
}

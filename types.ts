
export enum AIMode {
  CHAT = 'Chat AI',
  CODE = 'Code Assistant',
  WRITER = 'Writer Mode',
  TEACHER = 'Teacher Mode',
  TRANSLATOR = 'Translator Mode',
  IMAGE_PROMPT = 'Image Prompt Gen',
  VOICE = 'Voice Assistant',
  BUSINESS = 'Business AI',
  RESEARCH = 'Research AI'
}

export enum Language {
  ENGLISH = 'English',
  SWAHILI = 'Swahili',
  AUTO = 'Auto-Detect'
}

export interface User {
  id: string;
  username: string;
  email: string;
  phoneNumber?: string;
  avatarUrl?: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  isStreaming?: boolean;
}

export interface ChatThread {
  id: string;
  title: string;
  messages: Message[];
  mode: AIMode;
  language: Language;
  updatedAt: number;
}

export interface AppSettings {
  darkMode: boolean;
  fontSize: number;
  bubbleStyle: 'modern' | 'glass' | 'minimal';
  apiKeySet: boolean;
}

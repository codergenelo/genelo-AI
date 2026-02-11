
import { User, ChatThread, AppSettings, AIMode, Language } from '../types';

const STORAGE_KEYS = {
  USER: 'genelo_user',
  THREADS: 'genelo_threads',
  SETTINGS: 'genelo_settings',
  TOKEN: 'genelo_auth_token'
};

export const storageService = {
  saveUser: (user: User) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },
  getUser: (): User | null => {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null;
  },
  clearUser: () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
  },

  saveThreads: (threads: ChatThread[]) => {
    localStorage.setItem(STORAGE_KEYS.THREADS, JSON.stringify(threads));
  },
  getThreads: (): ChatThread[] => {
    const data = localStorage.getItem(STORAGE_KEYS.THREADS);
    return data ? JSON.parse(data) : [];
  },

  saveSettings: (settings: AppSettings) => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  },
  getSettings: (): AppSettings => {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data ? JSON.parse(data) : {
      darkMode: true,
      fontSize: 16,
      bubbleStyle: 'glass',
      apiKeySet: false
    };
  }
};

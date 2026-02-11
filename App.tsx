
import React, { useState, useEffect, useCallback } from 'react';
import { User, ChatThread, AppSettings, AIMode, Language, Message } from './types';
import { storageService } from './services/storageService';
import AuthScreen from './components/AuthScreen';
import Layout from './components/Layout';
import ChatInterface from './components/ChatInterface';
import SettingsModal from './components/SettingsModal';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [settings, setSettings] = useState<AppSettings>(storageService.getSettings());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Initialize data
  useEffect(() => {
    const savedUser = storageService.getUser();
    if (savedUser) setUser(savedUser);

    const savedThreads = storageService.getThreads();
    setThreads(savedThreads);
    if (savedThreads.length > 0) setActiveThreadId(savedThreads[0].id);
  }, []);

  // Persistence hooks
  useEffect(() => {
    storageService.saveThreads(threads);
  }, [threads]);

  useEffect(() => {
    storageService.saveSettings(settings);
  }, [settings]);

  const activeThread = threads.find(t => t.id === activeThreadId) || null;

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    storageService.saveUser(newUser);
  };

  const handleLogout = () => {
    setUser(null);
    storageService.clearUser();
    setActiveThreadId(null);
    setThreads([]);
  };

  const createNewChat = () => {
    const newThread: ChatThread = {
      id: Date.now().toString(),
      title: 'New Conversation',
      messages: [],
      mode: AIMode.CHAT,
      language: Language.AUTO,
      updatedAt: Date.now()
    };
    setThreads([newThread, ...threads]);
    setActiveThreadId(newThread.id);
  };

  const deleteThread = (id: string) => {
    setThreads(threads.filter(t => t.id !== id));
    if (activeThreadId === id) setActiveThreadId(threads[0]?.id || null);
  };

  const renameThread = (id: string, newTitle: string) => {
    setThreads(threads.map(t => t.id === id ? { ...t, title: newTitle } : t));
  };

  const updateThreadMessages = (threadId: string, messages: Message[]) => {
    setThreads(prev => prev.map(t => 
      t.id === threadId ? { ...t, messages, updatedAt: Date.now() } : t
    ));
  };

  if (!user) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return (
    <div className={`${settings.darkMode ? 'dark' : ''} h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans`}>
      <Layout 
        sidebarOpen={isSidebarOpen}
        setSidebarOpen={setIsSidebarOpen}
        threads={threads}
        activeThreadId={activeThreadId}
        onSelectThread={setActiveThreadId}
        onCreateChat={createNewChat}
        onDeleteThread={deleteThread}
        onRenameThread={renameThread}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onLogout={handleLogout}
        user={user}
      >
        {activeThreadId ? (
          <ChatInterface 
            key={activeThreadId}
            thread={activeThread!}
            onUpdateMessages={(messages) => updateThreadMessages(activeThreadId, messages)}
            settings={settings}
            onThreadUpdate={(updates) => setThreads(prev => prev.map(t => t.id === activeThreadId ? {...t, ...updates} : t))}
          />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-700">
            <div className="w-24 h-24 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-cyan-500/20 rotate-12">
              <i className="fa-solid fa-microchip text-4xl text-white"></i>
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">
                Genelo AI – 0 Vision
              </h1>
              <p className="text-slate-400 text-lg">The future of intelligence starts here.</p>
            </div>
            <button 
              onClick={createNewChat}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all hover:scale-105 active:scale-95 flex items-center space-x-3 group"
            >
              <i className="fa-solid fa-plus text-cyan-400 group-hover:rotate-90 transition-transform"></i>
              <span className="font-medium">Initialize New Session</span>
            </button>
          </div>
        )}
      </Layout>

      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={setSettings}
        user={user}
        onUpdateUser={setUser}
      />
    </div>
  );
};

export default App;

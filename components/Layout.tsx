
import React from 'react';
import { User, ChatThread } from '../types';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  threads: ChatThread[];
  activeThreadId: string | null;
  onSelectThread: (id: string) => void;
  onCreateChat: () => void;
  onDeleteThread: (id: string) => void;
  onRenameThread: (id: string, title: string) => void;
  onOpenSettings: () => void;
  onLogout: () => void;
  user: User;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  sidebarOpen, 
  setSidebarOpen, 
  threads, 
  activeThreadId, 
  onSelectThread, 
  onCreateChat, 
  onDeleteThread, 
  onRenameThread,
  onOpenSettings,
  onLogout,
  user
}) => {
  return (
    <div className="flex h-screen w-full relative overflow-hidden bg-slate-950">
      {/* Sidebar - Desktop */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar 
          threads={threads}
          activeThreadId={activeThreadId}
          onSelectThread={onSelectThread}
          onCreateChat={onCreateChat}
          onDeleteThread={onDeleteThread}
          onRenameThread={onRenameThread}
          onOpenSettings={onOpenSettings}
          onLogout={onLogout}
          user={user}
        />
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        {/* Header - Mobile Only toggle */}
        <header className="flex lg:hidden items-center justify-between p-4 glass-dark z-30">
          <button onClick={() => setSidebarOpen(true)} className="p-2 text-slate-300">
            <i className="fa-solid fa-bars text-xl"></i>
          </button>
          <div className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            Genelo AI
          </div>
          <button onClick={onCreateChat} className="p-2 text-slate-300">
            <i className="fa-solid fa-plus text-xl"></i>
          </button>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;

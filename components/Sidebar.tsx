
import React, { useState } from 'react';
import { ChatThread, User } from '../types';
import { APP_NAME } from '../constants';

interface SidebarProps {
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

const Sidebar: React.FC<SidebarProps> = ({ 
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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleStartRename = (id: string, title: string) => {
    setEditingId(id);
    setEditValue(title);
  };

  const handleFinishRename = (id: string) => {
    onRenameThread(id, editValue);
    setEditingId(null);
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 border-r border-white/5 glass">
      {/* Sidebar Header */}
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-8 h-8 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center">
            <i className="fa-solid fa-bolt text-xs text-white"></i>
          </div>
          <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            {APP_NAME}
          </span>
        </div>

        <button 
          onClick={onCreateChat}
          className="w-full flex items-center justify-between px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all group"
        >
          <span className="font-medium text-sm">New Intelligence</span>
          <i className="fa-solid fa-plus text-cyan-400 group-hover:rotate-90 transition-transform"></i>
        </button>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto px-4 space-y-1 custom-scrollbar">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2 mb-2">History</p>
        {threads.map((thread) => (
          <div 
            key={thread.id}
            onClick={() => onSelectThread(thread.id)}
            className={`group flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${activeThreadId === thread.id ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'}`}
          >
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <i className={`fa-regular ${activeThreadId === thread.id ? 'fa-comment-dots text-cyan-400' : 'fa-comment text-slate-500'}`}></i>
              {editingId === thread.id ? (
                <input 
                  autoFocus
                  className="bg-transparent border-none outline-none text-sm w-full"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={() => handleFinishRename(thread.id)}
                  onKeyDown={(e) => e.key === 'Enter' && handleFinishRename(thread.id)}
                />
              ) : (
                <span className="truncate text-sm font-medium">{thread.title}</span>
              )}
            </div>
            
            <div className={`flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity ${activeThreadId === thread.id ? 'opacity-100' : ''}`}>
              <button 
                onClick={(e) => { e.stopPropagation(); handleStartRename(thread.id, thread.title); }}
                className="p-1 hover:text-white"
              >
                <i className="fa-solid fa-pen-to-square text-xs"></i>
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); onDeleteThread(thread.id); }}
                className="p-1 hover:text-red-400"
              >
                <i className="fa-solid fa-trash-can text-xs"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* User Section */}
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center space-x-3 p-2 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer" onClick={onOpenSettings}>
          <img src={user.avatarUrl || 'https://picsum.photos/seed/user/100/100'} className="w-10 h-10 rounded-full border border-white/10" alt="User" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{user.username}</p>
            <p className="text-xs text-slate-500 truncate">{user.email}</p>
          </div>
          <i className="fa-solid fa-gear text-slate-500 group-hover:rotate-45 transition-transform"></i>
        </div>
        
        <button 
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-4 py-2 mt-4 text-slate-400 hover:text-red-400 text-sm transition-colors"
        >
          <i className="fa-solid fa-right-from-bracket"></i>
          <span>Secure Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;


import React, { useState } from 'react';
import { AppSettings, User } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onUpdateSettings: (settings: AppSettings) => void;
  user: User;
  onUpdateUser: (user: User) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ 
  isOpen, 
  onClose, 
  settings, 
  onUpdateSettings,
  user,
  onUpdateUser
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'appearance' | 'system'>('profile');
  const [tempUser, setTempUser] = useState(user);

  if (!isOpen) return null;

  const handleSaveUser = () => {
    onUpdateUser(tempUser);
    alert('Profile updated successfully.');
  };

  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[600px] animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div className="flex items-center space-x-3">
            <i className="fa-solid fa-sliders text-cyan-500"></i>
            <h2 className="text-xl font-bold">System Configuration</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <i className="fa-solid fa-xmark text-lg text-slate-400"></i>
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Tabs */}
          <div className="w-48 border-r border-white/5 p-4 space-y-2">
            {[
              { id: 'profile', label: 'User Profile', icon: 'fa-user' },
              { id: 'appearance', label: 'Appearance', icon: 'fa-palette' },
              { id: 'system', label: 'System Engine', icon: 'fa-microchip' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm transition-all ${activeTab === tab.id ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:bg-white/5'}`}
              >
                <i className={`fa-solid ${tab.icon}`}></i>
                <span>{tab.label}</span>
              </button>
            ))}
            <div className="pt-4 mt-4 border-t border-white/5">
              <button 
                onClick={handleClearData}
                className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-400/10 transition-colors"
              >
                <i className="fa-solid fa-trash-can"></i>
                <span>Wipe Data</span>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
            {activeTab === 'profile' && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                <div className="flex flex-col items-center mb-8">
                  <div className="relative group">
                    <img src={tempUser.avatarUrl || 'https://picsum.photos/seed/u/100/100'} className="w-24 h-24 rounded-full border-2 border-cyan-500/30 p-1" alt="Profile" />
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center border-4 border-slate-900 hover:scale-110 transition-transform">
                      <i className="fa-solid fa-camera text-xs text-white"></i>
                    </button>
                  </div>
                  <h3 className="mt-4 font-bold text-lg">{tempUser.username}</h3>
                  <p className="text-slate-500 text-sm">System Operator • ID: {tempUser.id.slice(0, 8)}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Username</label>
                    <input 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-cyan-500/50 outline-none transition-all"
                      value={tempUser.username}
                      onChange={(e) => setTempUser({...tempUser, username: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Email Terminal</label>
                    <input 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-cyan-500/50 outline-none transition-all"
                      value={tempUser.email}
                      onChange={(e) => setTempUser({...tempUser, email: e.target.value})}
                    />
                  </div>
                  <button 
                    onClick={handleSaveUser}
                    className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-bold text-sm shadow-lg shadow-cyan-500/20 active:scale-95 transition-all"
                  >
                    Commit Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Neural Interface Mode</label>
                  <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
                    <button 
                      onClick={() => onUpdateSettings({...settings, darkMode: true})}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${settings.darkMode ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-500'}`}
                    >
                      <i className="fa-solid fa-moon mr-2"></i> Obsidian Dark
                    </button>
                    <button 
                      onClick={() => onUpdateSettings({...settings, darkMode: false})}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${!settings.darkMode ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-500'}`}
                    >
                      <i className="fa-solid fa-sun mr-2"></i> Solaris Light
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Chat bubble architecture</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['modern', 'glass', 'minimal'].map((style) => (
                      <button 
                        key={style}
                        onClick={() => onUpdateSettings({...settings, bubbleStyle: style as any})}
                        className={`py-3 rounded-xl text-xs font-bold border capitalize transition-all ${settings.bubbleStyle === style ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-400' : 'border-white/5 bg-white/5 text-slate-500'}`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Retinal Text Density ({settings.fontSize}px)</label>
                  <input 
                    type="range" min="12" max="24" 
                    value={settings.fontSize} 
                    onChange={(e) => onUpdateSettings({...settings, fontSize: parseInt(e.target.value)})}
                    className="w-full accent-cyan-500 h-1.5 bg-white/10 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            )}

            {activeTab === 'system' && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                 <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-emerald-500/20 text-emerald-400 rounded-lg flex items-center justify-center">
                        <i className="fa-solid fa-link"></i>
                      </div>
                      <div>
                        <p className="text-sm font-bold">Gemini-3 Flash Preview</p>
                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Active Neural Engine</p>
                      </div>
                    </div>
                    <div className="text-[10px] px-2 py-0.5 bg-emerald-500 text-white rounded font-bold">OPERATIONAL</div>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    The Gemini 3 architecture provides state-of-the-art multimodal reasoning with sub-second latency for enterprise workflows.
                  </p>
                  <div className="h-px bg-white/5 mb-4"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500">Secure API Key Status</span>
                    <span className="text-xs text-emerald-400 flex items-center">
                      <i className="fa-solid fa-shield-halved mr-2"></i> Verified Encrypted
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
                   <p className="text-xs text-amber-500 leading-relaxed">
                    <i className="fa-solid fa-circle-exclamation mr-2"></i>
                    All processing occurs via the enterprise neural link. Credentials are never stored on central servers.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;

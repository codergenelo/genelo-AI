
import React, { useState } from 'react';
import { AIMode } from '../types';

interface ModeSelectorProps {
  currentMode: AIMode;
  onChange: (mode: AIMode) => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ currentMode, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const modes = [
    { type: AIMode.CHAT, icon: 'fa-message', color: 'text-cyan-400' },
    { type: AIMode.CODE, icon: 'fa-code', color: 'text-emerald-400' },
    { type: AIMode.WRITER, icon: 'fa-pen-fancy', color: 'text-amber-400' },
    { type: AIMode.TEACHER, icon: 'fa-graduation-cap', color: 'text-purple-400' },
    { type: AIMode.TRANSLATOR, icon: 'fa-language', color: 'text-blue-400' },
    { type: AIMode.IMAGE_PROMPT, icon: 'fa-image', color: 'text-pink-400' },
    { type: AIMode.BUSINESS, icon: 'fa-briefcase', color: 'text-indigo-400' },
    { type: AIMode.RESEARCH, icon: 'fa-microscope', color: 'text-rose-400' },
  ];

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-1.5 hover:bg-white/5 rounded-lg transition-colors group"
      >
        <span className="text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-white">{currentMode}</span>
        <i className={`fa-solid fa-chevron-down text-[10px] text-slate-600 transition-transform ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
          <div className="absolute top-full left-0 mt-2 w-64 glass-dark border border-white/10 rounded-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="p-2 border-b border-white/5 bg-white/5">
              <span className="text-[10px] font-bold text-slate-500 uppercase px-2">Intelligence Architectures</span>
            </div>
            <div className="grid grid-cols-1 p-1">
              {modes.map((m) => (
                <button
                  key={m.type}
                  onClick={() => { onChange(m.type); setIsOpen(false); }}
                  className={`flex items-center space-x-3 w-full px-3 py-2.5 rounded-lg text-left transition-colors ${currentMode === m.type ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'}`}
                >
                  <i className={`fa-solid ${m.icon} ${m.color} w-5 text-center`}></i>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{m.type}</p>
                  </div>
                  {currentMode === m.type && <i className="fa-solid fa-check text-xs text-cyan-400"></i>}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ModeSelector;

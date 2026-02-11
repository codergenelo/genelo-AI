
import React, { useState, useRef, useEffect } from 'react';

interface ChatInputProps {
  onSend: (content: string) => void;
  isGenerating: boolean;
  onStop: () => void;
  onRegenerate?: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, isGenerating, onStop, onRegenerate }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleSend = () => {
    if (input.trim() && !isGenerating) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative space-y-2">
      <div className="flex items-center space-x-2 mb-2">
        {isGenerating ? (
          <button 
            onClick={onStop}
            className="flex items-center space-x-2 px-3 py-1.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full text-xs font-bold hover:bg-red-500/20 transition-colors"
          >
            <i className="fa-solid fa-square text-[10px]"></i>
            <span>Stop Processing</span>
          </button>
        ) : (
          onRegenerate && (
            <button 
              onClick={onRegenerate}
              className="flex items-center space-x-2 px-3 py-1.5 bg-white/5 text-slate-400 border border-white/10 rounded-full text-xs font-bold hover:bg-white/10 transition-colors"
            >
              <i className="fa-solid fa-rotate-right text-[10px]"></i>
              <span>Regenerate Response</span>
            </button>
          )
        )}
      </div>

      <div className="relative glass border border-white/10 rounded-2xl p-2 transition-all focus-within:border-cyan-500/50 shadow-2xl focus-within:shadow-cyan-500/10">
        <div className="flex items-end">
          <div className="flex flex-col space-y-1 p-1">
             <button className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors" title="Upload Document">
              <i className="fa-solid fa-paperclip"></i>
            </button>
          </div>
          
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Interrogate Genelo AI..."
            className="flex-1 bg-transparent border-none outline-none resize-none py-3 px-2 text-sm placeholder:text-slate-600 custom-scrollbar"
          />

          <div className="flex items-center space-x-1 p-1">
            <button className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors" title="Voice Input">
              <i className="fa-solid fa-microphone"></i>
            </button>
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isGenerating}
              className={`p-2.5 rounded-xl transition-all ${!input.trim() || isGenerating ? 'text-slate-600 scale-90' : 'bg-gradient-to-tr from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/20'}`}
            >
              <i className={`fa-solid ${isGenerating ? 'fa-ellipsis-h animate-pulse' : 'fa-arrow-up-long'}`}></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;

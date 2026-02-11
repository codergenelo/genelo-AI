
import React from 'react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
  bubbleStyle: 'modern' | 'glass' | 'minimal';
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, bubbleStyle }) => {
  const isAssistant = message.role === 'assistant';
  
  const getBubbleClass = () => {
    switch(bubbleStyle) {
      case 'glass': return `glass p-5 rounded-2xl ${isAssistant ? 'rounded-tl-none' : 'rounded-tr-none bg-cyan-500/10 border-cyan-500/20'}`;
      case 'modern': return `p-5 rounded-2xl ${isAssistant ? 'bg-slate-900 border border-white/5' : 'bg-cyan-600 text-white'}`;
      default: return `py-5 px-0 ${isAssistant ? 'border-b border-white/5' : ''}`;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    alert('Copied to clipboard');
  };

  return (
    <div className={`group flex flex-col mb-6 animate-in slide-in-from-bottom-2 duration-300 ${isAssistant ? 'items-start' : 'items-end'}`}>
      <div className={`max-w-[85%] md:max-w-[75%] ${getBubbleClass()} relative`}>
        {/* Avatar/Indicator */}
        <div className={`flex items-center space-x-2 mb-3 ${isAssistant ? '' : 'flex-row-reverse space-x-reverse text-right'}`}>
          <div className={`w-6 h-6 rounded flex items-center justify-center text-[10px] ${isAssistant ? 'bg-gradient-to-tr from-cyan-500 to-purple-500 text-white' : 'bg-slate-700 text-slate-300'}`}>
            <i className={`fa-solid ${isAssistant ? 'fa-microchip' : 'fa-user'}`}></i>
          </div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            {isAssistant ? 'Genelo 01' : 'Verified User'}
          </span>
          <span className="text-[10px] text-slate-600">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        {/* Content Area */}
        <div className="text-sm leading-relaxed prose prose-invert max-w-none">
          {message.content.split('\n').map((line, i) => (
            <p key={i} className={line.trim() === '' ? 'h-4' : 'mb-3 last:mb-0'}>
              {/* Basic Code Block Detection */}
              {line.startsWith('```') ? (
                <div className="bg-slate-950 p-3 rounded-lg border border-white/5 font-mono text-xs my-2">
                  {line.replace(/```/g, '')}
                </div>
              ) : line}
            </p>
          ))}
          {message.isStreaming && (
            <span className="inline-flex space-x-1 ml-1 align-middle">
              <span className="w-1 h-1 bg-cyan-400 rounded-full typing-dot"></span>
              <span className="w-1 h-1 bg-cyan-400 rounded-full typing-dot [animation-delay:0.2s]"></span>
              <span className="w-1 h-1 bg-cyan-400 rounded-full typing-dot [animation-delay:0.4s]"></span>
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className={`absolute bottom-2 ${isAssistant ? '-right-10' : '-left-10'} flex flex-col space-y-1 opacity-0 group-hover:opacity-100 transition-opacity`}>
          <button 
            onClick={handleCopy}
            className="p-1.5 bg-white/5 hover:bg-white/10 rounded-md text-slate-500 hover:text-white transition-colors"
            title="Copy Message"
          >
            <i className="fa-regular fa-copy text-xs"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;

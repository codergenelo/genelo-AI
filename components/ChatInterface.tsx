
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChatThread, Message, AppSettings, AIMode, Language } from '../types';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import ModeSelector from './ModeSelector';
import { geminiService } from '../services/geminiService';

interface ChatInterfaceProps {
  thread: ChatThread;
  onUpdateMessages: (messages: Message[]) => void;
  settings: AppSettings;
  onThreadUpdate: (updates: Partial<ChatThread>) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  thread, 
  onUpdateMessages, 
  settings, 
  onThreadUpdate 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentResponse, setCurrentResponse] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [thread.messages, currentResponse, scrollToBottom]);

  const handleSendMessage = async (content: string) => {
    if (isGenerating) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: Date.now()
    };

    const newMessages = [...thread.messages, userMessage];
    onUpdateMessages(newMessages);
    
    setIsGenerating(true);
    setCurrentResponse('');

    try {
      let accumulatedText = "";
      await geminiService.generateResponse(
        newMessages,
        thread.mode,
        thread.language,
        (chunk) => {
          accumulatedText += chunk;
          setCurrentResponse(accumulatedText);
        }
      );

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: accumulatedText,
        timestamp: Date.now()
      };

      onUpdateMessages([...newMessages, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "System Error: Failed to generate response. Please check your connection and API key status.",
        timestamp: Date.now()
      };
      onUpdateMessages([...newMessages, errorMessage]);
    } finally {
      setIsGenerating(false);
      setCurrentResponse('');
    }
  };

  const regenerateLast = () => {
    const lastUserMessage = [...thread.messages].reverse().find(m => m.role === 'user');
    if (lastUserMessage) {
      handleSendMessage(lastUserMessage.content);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-950/50">
      {/* Top Controls */}
      <div className="flex items-center justify-between p-4 glass-dark border-b border-white/5 z-20">
        <div className="flex items-center space-x-4">
          <ModeSelector 
            currentMode={thread.mode} 
            onChange={(mode) => onThreadUpdate({ mode })} 
          />
          <div className="h-4 w-px bg-white/10 hidden sm:block"></div>
          <select 
            value={thread.language}
            onChange={(e) => onThreadUpdate({ language: e.target.value as Language })}
            className="bg-transparent text-sm text-slate-400 focus:text-white outline-none cursor-pointer hidden sm:block"
          >
            {Object.values(Language).map(lang => (
              <option key={lang} value={lang} className="bg-slate-900">{lang}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] uppercase font-bold text-emerald-500 tracking-wider">Neural Link Ready</span>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar relative px-4 md:px-0">
        <div className="max-w-4xl mx-auto py-8">
          {thread.messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full opacity-40 py-20">
              <i className="fa-solid fa-brain text-6xl mb-6 text-cyan-500"></i>
              <h2 className="text-xl font-medium">System initialized. Awaiting user input.</h2>
              <p className="text-sm mt-2">Active Mode: {thread.mode}</p>
            </div>
          ) : (
            <>
              {thread.messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} bubbleStyle={settings.bubbleStyle} />
              ))}
              {currentResponse && (
                <ChatMessage 
                  message={{
                    id: 'streaming',
                    role: 'assistant',
                    content: currentResponse,
                    timestamp: Date.now(),
                    isStreaming: true
                  }} 
                  bubbleStyle={settings.bubbleStyle} 
                />
              )}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Bottom Input Area */}
      <div className="p-4 pb-8 max-w-4xl mx-auto w-full">
        <ChatInput 
          onSend={handleSendMessage} 
          isGenerating={isGenerating} 
          onStop={() => setIsGenerating(false)}
          onRegenerate={thread.messages.length > 0 ? regenerateLast : undefined}
        />
        <p className="text-[10px] text-center text-slate-600 mt-4 uppercase tracking-[0.2em]">
          Genelo Vision v0.1 • Experimental Neural Interface
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;

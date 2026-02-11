
import React, { useState } from 'react';
import { User } from '../types';
import { APP_NAME } from '../constants';

interface AuthScreenProps {
  onLogin: (user: User) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      username: username || email.split('@')[0] || 'User',
      email: email || 'user@genelo.vision',
      avatarUrl: `https://picsum.photos/seed/${email}/200/200`
    };
    onLogin(mockUser);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-slate-950">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 -left-20 w-80 h-80 bg-cyan-600/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-0 -right-20 w-80 h-80 bg-purple-600/20 rounded-full blur-[120px] animate-pulse [animation-delay:2s]"></div>
      
      <div className="w-full max-w-md relative z-10 space-y-8 animate-in fade-in zoom-in-95 duration-700">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-cyan-500/20 rotate-12 mb-8">
            <i className="fa-solid fa-eye text-3xl text-white"></i>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">{APP_NAME}</h1>
          <p className="text-slate-400">Initialize your neural credentials to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="glass p-8 rounded-3xl space-y-5 border border-white/10 shadow-2xl">
          {isRegistering && (
            <div className="space-y-1 animate-in slide-in-from-top-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Codename</label>
              <input 
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:border-cyan-500/50 outline-none transition-all placeholder:text-slate-600"
                placeholder="Enter your system alias"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Intelligence Link (Email)</label>
            <input 
              required
              type="email"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:border-cyan-500/50 outline-none transition-all placeholder:text-slate-600"
              placeholder="operator@genelo.vision"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between px-1">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Access Key</label>
              <button type="button" className="text-xs text-cyan-400 hover:text-cyan-300">Forgot?</button>
            </div>
            <input 
              required
              type="password"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:border-cyan-500/50 outline-none transition-all placeholder:text-slate-600"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 rounded-2xl font-bold text-white shadow-xl shadow-cyan-500/20 active:scale-95 transition-all mt-4"
          >
            {isRegistering ? 'Register Node' : 'Initialize Access'}
          </button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold text-slate-500 tracking-widest"><span className="bg-slate-950 px-2">External Link</span></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button type="button" className="flex items-center justify-center space-x-2 py-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors">
              <i className="fa-brands fa-google text-slate-400"></i>
              <span className="text-xs font-semibold">Google</span>
            </button>
            <button type="button" className="flex items-center justify-center space-x-2 py-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors">
              <i className="fa-brands fa-apple text-slate-400"></i>
              <span className="text-xs font-semibold">Apple</span>
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-slate-500">
          {isRegistering ? 'Already part of the neural link?' : 'New operator?'} 
          <button 
            onClick={() => setIsRegistering(!isRegistering)}
            className="ml-2 text-cyan-400 hover:text-cyan-300 font-bold"
          >
            {isRegistering ? 'Decrypt Link' : 'Register Sub-Node'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthScreen;


import React from 'react';
import { UserStats, View } from '../types';

interface NavbarProps {
  stats: UserStats;
  view: View;
  setView: (view: View) => void;
}

const Navbar: React.FC<NavbarProps> = ({ stats, view, setView }) => {
  const nextLevelXp = stats.level * 200;
  const xpProgress = (stats.xp % 200) / 200 * 100;

  return (
    <header className="sticky top-0 z-50 glass-card border-b border-white/5 px-6 py-4 shadow-2xl">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setView('dashboard')}>
          <div className="bg-blue-600 p-2 rounded-xl shadow-lg btn-glow transition-transform group-hover:scale-110">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <h1 className="text-2xl font-black bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent hidden sm:block tracking-tight">
            AlgoPulse
          </h1>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['dashboard', 'practice', 'stats', 'badges'].map((v) => (
            <button 
              key={v}
              onClick={() => setView(v as View)} 
              className={`text-sm font-bold tracking-wide uppercase transition-all ${
                view === v ? 'text-blue-400 text-glow' : 'text-zinc-500 hover:text-zinc-200'
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-3 mb-1.5">
              <span className="text-[10px] font-black text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-md uppercase tracking-wider">Level {stats.level}</span>
              <div className="w-24 sm:w-32 h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-blue-500 transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(59,130,246,0.5)]" style={{ width: `${xpProgress}%` }}></div>
              </div>
            </div>
            <span className="text-[10px] text-zinc-600 font-mono tracking-tighter">XP {stats.xp} / {nextLevelXp}</span>
          </div>

          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-2xl border border-white/10 hover:border-orange-500/50 transition-colors group">
            <span className="text-xl group-hover:animate-bounce">🔥</span>
            <span className="font-black text-white text-lg">{stats.streak}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

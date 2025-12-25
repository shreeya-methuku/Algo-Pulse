
import React from 'react';
import { Problem, Difficulty } from '../types';

interface PracticeQueueProps {
  problems: Problem[];
  onReview: (id: string, easeAdjustment: number) => void;
}

const PracticeQueue: React.FC<PracticeQueueProps> = ({ problems, onReview }) => {
  const queue = problems
    .filter(p => new Date(p.nextReviewDate) <= new Date())
    .sort((a, b) => new Date(a.nextReviewDate).getTime() - new Date(b.nextReviewDate).getTime());

  if (queue.length === 0) {
    return (
      <div className="glass-card p-20 rounded-[3rem] text-center space-y-8 animate-in zoom-in duration-700 max-w-2xl mx-auto shadow-2xl">
        <div className="text-8xl animate-bounce-slow">🚀</div>
        <div className="space-y-4">
          <h2 className="text-4xl font-black text-white tracking-tighter">Mission Clear</h2>
          <p className="text-zinc-500 font-medium text-lg leading-relaxed">
            Your review queue is empty. You've internalized the algorithms for today. Keep exploring new frontiers!
          </p>
        </div>
        <div className="pt-4 flex justify-center">
           <div className="px-6 py-2 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 font-black text-xs uppercase tracking-[0.3em]">
             System Optimized
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <p className="text-blue-500 font-black uppercase text-[10px] tracking-[0.3em]">Operational Readiness</p>
          <h2 className="text-4xl font-black text-white tracking-tighter">Strategic Refresh Queue</h2>
        </div>
        <span className="bg-purple-600/10 text-purple-400 text-xs font-black px-6 py-2 rounded-full border border-purple-500/20 uppercase tracking-widest h-fit">
          {queue.length} Modules Pending
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {queue.map(p => (
          <div key={p.id} className="glass-card p-8 rounded-[2.5rem] flex flex-col justify-between hover:border-blue-500/30 transition-all group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-600 to-purple-600 opacity-50"></div>
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{p.category}</span>
                <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border uppercase tracking-widest ${
                  p.difficulty === Difficulty.EASY ? 'text-green-500 border-green-500/20 bg-green-500/5' :
                  p.difficulty === Difficulty.MEDIUM ? 'text-yellow-500 border-yellow-500/20 bg-yellow-500/5' :
                  'text-red-500 border-red-500/20 bg-red-500/5'
                }`}>
                  {p.difficulty}
                </span>
              </div>
              <h3 className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors mb-3 leading-tight tracking-tight">
                {p.title}
              </h3>
              <div className="flex flex-col gap-2 text-zinc-500 text-xs font-bold mb-10">
                <span className="flex items-center gap-2">
                  <span className="text-blue-500">#</span> Solved on {new Date(p.dateSolved).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-purple-500">@</span> {p.reviewCount} Iterations Complete
                </span>
              </div>
            </div>

            <div className="space-y-5">
              <a 
                href={p.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-black uppercase text-[10px] tracking-widest hover:bg-white/10 transition-all"
              >
                Launch Repository
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
              <div className="grid grid-cols-3 gap-2">
                <button 
                  onClick={() => onReview(p.id, 0.7)} 
                  className="py-3 px-1 bg-red-500/10 hover:bg-red-500/20 text-red-500 text-[9px] font-black rounded-xl border border-red-500/20 uppercase transition-all"
                >
                  Critical
                </button>
                <button 
                  onClick={() => onReview(p.id, 1.1)} 
                  className="py-3 px-1 bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 text-[9px] font-black rounded-xl border border-blue-500/20 uppercase transition-all"
                >
                  Stable
                </button>
                <button 
                  onClick={() => onReview(p.id, 1.4)} 
                  className="py-3 px-1 bg-green-500/10 hover:bg-green-500/20 text-green-500 text-[9px] font-black rounded-xl border border-green-500/20 uppercase transition-all"
                >
                  Mastered
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PracticeQueue;

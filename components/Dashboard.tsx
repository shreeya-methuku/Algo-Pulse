
import React, { useEffect, useState } from 'react';
import { Problem, UserStats, Difficulty, View } from '../types';
import { getCoachInsights } from '../services/geminiService';

interface DashboardProps {
  problems: Problem[];
  stats: UserStats;
  setView: (view: View) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ problems, stats, setView }) => {
  const [insights, setInsights] = useState<any>(null);
  const [loadingInsights, setLoadingInsights] = useState(false);

  useEffect(() => {
    async function fetchInsights() {
      if (problems.length > 0) {
        setLoadingInsights(true);
        const data = await getCoachInsights(problems, stats);
        setInsights(data);
        setLoadingInsights(false);
      }
    }
    fetchInsights();
  }, [problems.length]);

  const recentProblems = problems.slice(0, 5);
  const needsReviewCount = problems.filter(p => new Date(p.nextReviewDate) <= new Date()).length;

  return (
    <div className="space-y-8 pb-10">
      {/* Stats Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-8 rounded-[2rem] border-white/5 flex flex-col justify-between group">
          <div className="flex justify-between items-start mb-4">
            <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Total Solved</p>
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
            </div>
          </div>
          <p className="text-6xl font-black text-white tracking-tighter group-hover:text-blue-400 transition-colors">{stats.totalSolved}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="text-[10px] px-2 py-1 rounded-md bg-zinc-900 border border-white/5 text-green-400 font-bold">
              {problems.filter(p => p.difficulty === Difficulty.EASY).length} Easy
            </span>
            <span className="text-[10px] px-2 py-1 rounded-md bg-zinc-900 border border-white/5 text-yellow-400 font-bold">
              {problems.filter(p => p.difficulty === Difficulty.MEDIUM).length} Med
            </span>
            <span className="text-[10px] px-2 py-1 rounded-md bg-zinc-900 border border-white/5 text-red-400 font-bold">
              {problems.filter(p => p.difficulty === Difficulty.HARD).length} Hard
            </span>
          </div>
        </div>

        <div className="glass-card p-8 rounded-[2rem] border-white/5 flex flex-col justify-between group border-l-purple-500/30 border-l-2">
          <div className="flex justify-between items-start mb-4">
            <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">To Review</p>
            <div className="p-2 bg-purple-500/10 rounded-xl text-purple-400">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
          </div>
          <p className="text-6xl font-black text-white tracking-tighter group-hover:text-purple-400 transition-colors">{needsReviewCount}</p>
          <button 
            onClick={() => setView('practice')}
            className="mt-6 w-full py-3 bg-purple-600 hover:bg-purple-500 text-white text-sm font-black rounded-2xl transition-all shadow-xl shadow-purple-900/40 uppercase tracking-widest"
          >
            Refresher Course
          </button>
        </div>

        <div className="glass-card p-8 rounded-[2rem] border-white/5 flex flex-col justify-between group border-l-pink-500/30 border-l-2">
          <div className="flex justify-between items-start mb-4">
            <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Solve Streak</p>
            <div className="p-2 bg-pink-500/10 rounded-xl text-pink-400">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.5-7 3 3 5.5 6 5.5 9.5a6 6 0 01-6 6z" /></svg>
            </div>
          </div>
          <p className="text-6xl font-black text-white tracking-tighter group-hover:text-pink-400 transition-colors">{stats.streak} <span className="text-4xl">🔥</span></p>
          <button 
            onClick={() => setView('log')}
            className="mt-6 w-full py-3 bg-white text-black hover:bg-zinc-200 text-sm font-black rounded-2xl transition-all shadow-xl shadow-white/5 uppercase tracking-widest"
          >
            Log New Solve
          </button>
        </div>
      </div>

      {/* AI Intelligence Block */}
      <div className="glass-card p-8 rounded-[2rem] border-white/10 relative overflow-hidden bg-zinc-950/40">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full"></div>
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg btn-glow">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
          </div>
          <h2 className="text-xl font-black text-white tracking-tight uppercase">Strategic Insight</h2>
        </div>

        {loadingInsights ? (
          <div className="flex flex-col items-center justify-center py-10 space-y-4">
            <div className="w-12 h-12 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
            <p className="text-zinc-500 font-medium tracking-wide animate-pulse uppercase text-xs">Processing Algorithm Data...</p>
          </div>
        ) : insights ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="relative">
                <span className="absolute -left-6 top-0 text-4xl text-blue-500/30 font-serif">"</span>
                <p className="italic text-lg text-zinc-300 font-medium leading-relaxed">
                  {insights.motivation}
                </p>
              </div>
              <div className="bg-blue-600/5 p-6 rounded-3xl border border-blue-600/10">
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-3">Critical Focus Area</p>
                <div className="flex items-center gap-3 text-2xl font-black text-white">
                  <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,1)]"></span>
                  {insights.focusArea}
                </div>
                <p className="text-zinc-400 text-sm mt-3 leading-relaxed">{insights.rationale}</p>
              </div>
            </div>
            <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 backdrop-blur-md">
               <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-4">Coach's Pro Tip</p>
               <p className="text-zinc-100 leading-relaxed text-sm font-medium">
                 {insights.tip}
               </p>
               <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] text-zinc-600 font-bold uppercase">Powered by Gemini AI</span>
                  <div className="flex gap-1">
                    {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-blue-500"></div>)}
                  </div>
               </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-10 space-y-4">
             <div className="text-4xl opacity-20">📊</div>
             <p className="text-zinc-600 font-bold uppercase tracking-widest text-xs">Insufficient Data for Analysis</p>
             <p className="text-zinc-500 text-sm">Solve at least 5 problems to unlock strategic coaching.</p>
          </div>
        )}
      </div>

      {/* Activity Log */}
      <div className="glass-card rounded-[2rem] overflow-hidden border-white/5 shadow-2xl">
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
          <h2 className="text-xl font-black text-white tracking-tight uppercase">Recent Submissions</h2>
          <button onClick={() => setView('stats')} className="text-blue-400 text-xs font-bold uppercase hover:text-blue-300 transition-colors tracking-widest">View Archives</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/[0.01] text-zinc-500 text-[10px] uppercase font-black tracking-[0.2em]">
              <tr>
                <th className="px-8 py-5 font-black">Problem Identifier</th>
                <th className="px-8 py-5 font-black">Taxonomy</th>
                <th className="px-8 py-5 font-black">Complexity</th>
                <th className="px-8 py-5 font-black">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentProblems.length > 0 ? (
                recentProblems.map(p => (
                  <tr key={p.id} className="hover:bg-white/[0.03] transition-all group">
                    <td className="px-8 py-6">
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-zinc-100 font-bold hover:text-blue-400 transition-colors flex items-center gap-2">
                        {p.title}
                        <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      </a>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-zinc-500 text-xs font-bold">{p.category}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border uppercase tracking-widest ${
                        p.difficulty === Difficulty.EASY ? 'text-green-500 border-green-500/20 bg-green-500/5' :
                        p.difficulty === Difficulty.MEDIUM ? 'text-yellow-500 border-yellow-500/20 bg-yellow-500/5' :
                        'text-red-500 border-red-500/20 bg-red-500/5'
                      }`}>
                        {p.difficulty}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                       <span className="text-zinc-500 text-xs font-medium tabular-nums">{new Date(p.dateSolved).toLocaleDateString()}</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-8 py-16 text-center space-y-4">
                    <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5">
                      <svg className="w-8 h-8 text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    </div>
                    <p className="text-zinc-600 font-bold uppercase tracking-widest text-xs">System Idle</p>
                    <p className="text-zinc-500 text-sm max-w-xs mx-auto">You haven't solved any problems yet. Launch your first solve to begin tracking.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

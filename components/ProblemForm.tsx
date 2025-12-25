
import React, { useState } from 'react';
import { Difficulty } from '../types';
import { CATEGORIES } from '../constants';

interface ProblemFormProps {
  onSubmit: (problem: { title: string; url: string; difficulty: Difficulty; category: string }) => void;
  onCancel: () => void;
}

const ProblemForm: React.FC<ProblemFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    difficulty: Difficulty.MEDIUM,
    category: CATEGORIES[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.url) return;
    onSubmit(formData);
    onCancel();
  };

  return (
    <div className="max-w-2xl mx-auto animate-in slide-in-from-bottom duration-500">
      <div className="glass-card p-10 rounded-[2.5rem] border-white/10 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-4 mb-10">
           <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg btn-glow">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
           </div>
           <div>
             <h2 className="text-3xl font-black text-white tracking-tight">Record Solve</h2>
             <p className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest mt-1">Expanding your neural network</p>
           </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Problem Title</label>
            <input
              type="text"
              required
              autoFocus
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium placeholder:text-zinc-700"
              placeholder="e.g. Median of Two Sorted Arrays"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Documentation URL</label>
            <input
              type="url"
              required
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium placeholder:text-zinc-700"
              placeholder="https://leetcode.com/problems/..."
              value={formData.url}
              onChange={e => setFormData({ ...formData, url: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Complexity Level</label>
              <div className="relative">
                <select
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all appearance-none font-bold tracking-wide"
                  value={formData.difficulty}
                  onChange={e => setFormData({ ...formData, difficulty: e.target.value as Difficulty })}
                >
                  {Object.values(Difficulty).map(d => (
                    <option key={d} value={d} className="bg-black text-white">{d}</option>
                  ))}
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Data Structure / Algorithm</label>
              <div className="relative">
                <select
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all appearance-none font-bold tracking-wide"
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                >
                  {CATEGORIES.map(c => (
                    <option key={c} value={c} className="bg-black text-white">{c}</option>
                  ))}
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-5 px-4 bg-transparent border border-white/10 rounded-2xl text-zinc-500 font-black uppercase tracking-widest hover:bg-white/5 hover:text-white transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-5 px-4 bg-blue-600 hover:bg-blue-500 rounded-2xl text-white font-black uppercase tracking-widest transition-all shadow-[0_20px_40px_-10px_rgba(59,130,246,0.5)]"
            >
              Verify & Log
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProblemForm;

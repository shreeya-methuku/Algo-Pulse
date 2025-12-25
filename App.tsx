
import React, { useState, useEffect } from 'react';
import { View, Problem, UserStats, Difficulty } from './types';
import { INITIAL_USER_STATS, XP_VALUES } from './constants';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ProblemForm from './components/ProblemForm';
import PracticeQueue from './components/PracticeQueue';
import ProgressCharts from './components/ProgressCharts';
import BadgeGallery from './components/BadgeGallery';
import LaunchPage from './components/LaunchPage';

const App: React.FC = () => {
  const [view, setView] = useState<View>('dashboard');
  const [isLaunched, setIsLaunched] = useState(() => {
    return localStorage.getItem('algoPulse_launched') === 'true';
  });
  
  const [problems, setProblems] = useState<Problem[]>(() => {
    const saved = localStorage.getItem('algoPulse_problems');
    return saved ? JSON.parse(saved) : [];
  });
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('algoPulse_stats');
    return saved ? JSON.parse(saved) : INITIAL_USER_STATS;
  });

  // Persist data
  useEffect(() => {
    localStorage.setItem('algoPulse_problems', JSON.stringify(problems));
  }, [problems]);

  useEffect(() => {
    localStorage.setItem('algoPulse_stats', JSON.stringify(stats));
  }, [stats]);

  const handleLaunch = () => {
    localStorage.setItem('algoPulse_launched', 'true');
    setIsLaunched(true);
  };

  const addProblem = (newProblem: Omit<Problem, 'id' | 'dateSolved' | 'lastReviewed' | 'reviewCount' | 'easeFactor' | 'nextReviewDate'>) => {
    const today = new Date().toISOString().split('T')[0];
    const problem: Problem = {
      ...newProblem,
      id: crypto.randomUUID(),
      dateSolved: today,
      lastReviewed: today,
      reviewCount: 1,
      easeFactor: 2.5,
      nextReviewDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };

    setProblems(prev => [problem, ...prev]);
    
    const xpGain = XP_VALUES[problem.difficulty];
    setStats(prev => {
      const newXp = prev.xp + xpGain;
      const newLevel = Math.floor(newXp / 200) + 1;
      
      let newStreak = prev.streak;
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (prev.lastSolveDate !== today) {
        if (prev.lastSolveDate === yesterday) {
          newStreak += 1;
        } else {
          newStreak = 1;
        }
      }

      const newBadges = [...prev.badges];
      if (prev.totalSolved === 0) newBadges.push('first_solve');
      if (newStreak === 3 && !newBadges.includes('streak_3')) newBadges.push('streak_3');
      if (newStreak === 7 && !newBadges.includes('streak_7')) newBadges.push('streak_7');
      if (problem.difficulty === Difficulty.HARD && !newBadges.includes('hard_hitter')) newBadges.push('hard_hitter');

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        streak: newStreak,
        totalSolved: prev.totalSolved + 1,
        lastSolveDate: today,
        badges: Array.from(new Set(newBadges))
      };
    });
  };

  const markReviewed = (id: string, easeAdjustment: number) => {
    setProblems(prev => prev.map(p => {
      if (p.id === id) {
        const nextInterval = Math.max(1, p.reviewCount * p.easeFactor * easeAdjustment);
        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + Math.round(nextInterval));
        
        return {
          ...p,
          lastReviewed: new Date().toISOString().split('T')[0],
          reviewCount: p.reviewCount + 1,
          nextReviewDate: nextDate.toISOString().split('T')[0]
        };
      }
      return p;
    }));
    setStats(prev => ({ ...prev, xp: prev.xp + 10 }));
  };

  if (!isLaunched) {
    return <LaunchPage onLaunch={handleLaunch} />;
  }

  const renderView = () => {
    switch (view) {
      case 'dashboard':
        return <Dashboard problems={problems} stats={stats} setView={setView} />;
      case 'log':
        return <ProblemForm onSubmit={addProblem} onCancel={() => setView('dashboard')} />;
      case 'practice':
        return <PracticeQueue problems={problems} onReview={markReviewed} />;
      case 'stats':
        return <ProgressCharts problems={problems} stats={stats} />;
      case 'badges':
        return <BadgeGallery ownedBadges={stats.badges} />;
      default:
        return <Dashboard problems={problems} stats={stats} setView={setView} />;
    }
  };

  return (
    <div className="min-h-screen bg-black pb-24 md:pb-8">
      <Navbar stats={stats} view={view} setView={setView} />
      <main className="max-w-6xl mx-auto p-4 mt-4 animate-in fade-in duration-700">
        {renderView()}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 glass-card border-t border-white/5 p-3 flex justify-around md:hidden z-50 rounded-t-3xl shadow-2xl">
        <button onClick={() => setView('dashboard')} className={`p-2 rounded-xl transition-all ${view === 'dashboard' ? 'bg-blue-600/10 text-blue-400' : 'text-zinc-500 hover:text-white'}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
        </button>
        <button onClick={() => setView('practice')} className={`p-2 rounded-xl transition-all ${view === 'practice' ? 'bg-purple-600/10 text-purple-400' : 'text-zinc-500 hover:text-white'}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </button>
        <button onClick={() => setView('log')} className={`p-2 rounded-xl bg-blue-600 text-white shadow-lg btn-glow transform -translate-y-4 border-4 border-black`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
        </button>
        <button onClick={() => setView('stats')} className={`p-2 rounded-xl transition-all ${view === 'stats' ? 'bg-blue-600/10 text-blue-400' : 'text-zinc-500 hover:text-white'}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
        </button>
      </nav>
    </div>
  );
};

export default App;

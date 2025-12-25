
export enum Difficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard'
}

export interface Problem {
  id: string;
  title: string;
  url: string;
  difficulty: Difficulty;
  category: string;
  dateSolved: string;
  lastReviewed: string;
  reviewCount: number;
  easeFactor: number; // For spaced repetition
  nextReviewDate: string;
}

export interface UserStats {
  xp: number;
  level: number;
  streak: number;
  totalSolved: number;
  lastSolveDate: string | null;
  badges: string[];
}

export interface DailyProgress {
  date: string;
  count: number;
  xpEarned: number;
}

export type View = 'dashboard' | 'log' | 'practice' | 'stats' | 'badges';

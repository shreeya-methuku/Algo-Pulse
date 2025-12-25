
import { Difficulty } from './types';

export const CATEGORIES = [
  'Arrays', 'Strings', 'Linked Lists', 'Trees', 'Graphs', 
  'Dynamic Programming', 'Searching & Sorting', 'Stacks & Queues', 
  'Heaps', 'Recursion', 'Backtracking', 'Bit Manipulation', 'Tries'
];

export const XP_VALUES = {
  [Difficulty.EASY]: 15,
  [Difficulty.MEDIUM]: 40,
  [Difficulty.HARD]: 100
};

export const INITIAL_USER_STATS = {
  xp: 0,
  level: 1,
  streak: 0,
  totalSolved: 0,
  lastSolveDate: null,
  badges: []
};

export const BADGE_DEFINITIONS = [
  { id: 'first_solve', name: 'First Blood', description: 'Solved your first problem', icon: '🎯' },
  { id: 'streak_3', name: 'Hot Start', description: 'Maintained a 3-day streak', icon: '🔥' },
  { id: 'streak_7', name: 'Consistency King', description: 'Maintained a 7-day streak', icon: '👑' },
  { id: 'array_master', name: 'Array Architect', description: 'Solved 10 array problems', icon: '🧱' },
  { id: 'hard_hitter', name: 'Heavyweight', description: 'Solved your first Hard problem', icon: '🥊' },
  { id: 'dp_wizard', name: 'DP Wizard', description: 'Solved 5 Dynamic Programming problems', icon: '🧙' }
];

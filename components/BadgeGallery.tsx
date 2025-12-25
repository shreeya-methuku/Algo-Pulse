
import React from 'react';
import { BADGE_DEFINITIONS } from '../constants';

interface BadgeGalleryProps {
  ownedBadges: string[];
}

const BadgeGallery: React.FC<BadgeGalleryProps> = ({ ownedBadges }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-extrabold text-white">Hall of Fame</h2>
        <p className="text-slate-400">Collect trophies as you crush your DSA goals</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {BADGE_DEFINITIONS.map(badge => {
          const isOwned = ownedBadges.includes(badge.id);
          return (
            <div 
              key={badge.id} 
              className={`p-6 rounded-2xl flex flex-col items-center text-center space-y-3 transition-all ${
                isOwned 
                  ? 'glass-card border-blue-500/50 shadow-lg shadow-blue-900/10' 
                  : 'bg-slate-900/50 border border-slate-800 opacity-40 grayscale'
              }`}
            >
              <div className={`text-5xl mb-2 ${isOwned ? 'animate-bounce-slow' : ''}`}>
                {badge.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-100">{badge.name}</h3>
              <p className="text-xs text-slate-400 leading-tight">
                {badge.description}
              </p>
              {isOwned ? (
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-full border border-blue-400/30">
                  Unlocked
                </span>
              ) : (
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  Locked
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BadgeGallery;


import React from 'react';

interface LaunchPageProps {
  onLaunch: () => void;
}

const LaunchPage: React.FC<LaunchPageProps> = ({ onLaunch }) => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full animate-float"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-4xl w-full text-center relative z-10 space-y-12">
        <div className="space-y-6">
          <div className="inline-block px-5 py-2 rounded-full bg-white/5 border border-white/10 text-blue-400 text-[10px] font-black tracking-[0.3em] uppercase mb-4 animate-in fade-in slide-in-from-top duration-1000">
            Operational Excellence
          </div>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white leading-[0.9] animate-in fade-in slide-in-from-bottom duration-1000">
            Log. Repeat. <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent text-glow">
              Conquer.
            </span>
          </h1>
        </div>

        <div className="pt-12 animate-in fade-in zoom-in duration-1000 delay-500">
          <button 
            onClick={onLaunch}
            className="group relative inline-flex items-center justify-center px-12 py-6 font-black text-white transition-all bg-blue-600 rounded-full hover:bg-blue-500 shadow-2xl btn-glow text-lg uppercase tracking-widest"
          >
            <span className="mr-2">Enter the Arena</span>
            <svg className="w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
          <div className="mt-12 flex flex-col items-center space-y-4">
            <p className="text-zinc-600 text-[10px] font-black tracking-[0.4em] uppercase">Neural Sync Optimized • System 1.0</p>
            <div className="flex gap-1.5">
               <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40"></div>
               <div className="w-1.5 h-1.5 rounded-full bg-purple-500/40"></div>
               <div className="w-1.5 h-1.5 rounded-full bg-pink-500/40"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaunchPage;

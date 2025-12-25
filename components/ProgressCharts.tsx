
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Problem, UserStats, Difficulty } from '../types';

interface ProgressChartsProps {
  problems: Problem[];
  stats: UserStats;
}

const ProgressCharts: React.FC<ProgressChartsProps> = ({ problems, stats }) => {
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().split('T')[0];
    return {
      date: dateStr,
      count: problems.filter(p => p.dateSolved === dateStr).length,
      label: d.toLocaleDateString(undefined, { weekday: 'short' })
    };
  });

  const difficultyData = [
    { name: 'Easy', value: problems.filter(p => p.difficulty === Difficulty.EASY).length, color: '#22c55e' },
    { name: 'Medium', value: problems.filter(p => p.difficulty === Difficulty.MEDIUM).length, color: '#eab308' },
    { name: 'Hard', value: problems.filter(p => p.difficulty === Difficulty.HARD).length, color: '#ef4444' }
  ].filter(d => d.value > 0);

  const categories = Array.from(new Set(problems.map(p => p.category)));
  const categoryData = categories.map(cat => ({
    name: cat,
    value: problems.filter(p => p.category === cat).length
  })).sort((a, b) => b.value - a.value);

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <p className="text-blue-500 font-black uppercase text-[10px] tracking-[0.3em]">Telemetry & Analytics</p>
          <h2 className="text-4xl font-black text-white tracking-tighter">Performance Metrics</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-10 rounded-[2.5rem] h-[450px] shadow-2xl">
          <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-10">Solve Velocity (7D)</h3>
          <ResponsiveContainer width="100%" height="80%">
            <AreaChart data={last7Days}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#111" vertical={false} />
              <XAxis dataKey="label" stroke="#333" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} />
              <YAxis stroke="#333" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#000', border: '1px solid #222', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                itemStyle={{ color: '#3b82f6', fontSize: '12px', fontWeight: 'bold' }}
                cursor={{ stroke: '#333', strokeWidth: 1 }}
              />
              <Area type="monotone" dataKey="count" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCount)" strokeWidth={4} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-10 rounded-[2.5rem] h-[450px] flex flex-col shadow-2xl">
          <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-10">Complexity Distribution</h3>
          <div className="flex-1 flex flex-col items-center justify-center">
            {difficultyData.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height="70%">
                  <PieChart>
                    <Pie
                      data={difficultyData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={100}
                      paddingAngle={8}
                      dataKey="value"
                      stroke="none"
                    >
                      {difficultyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex gap-8 mt-10">
                  {difficultyData.map(d => (
                    <div key={d.name} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color, boxShadow: `0 0 10px ${d.color}` }}></div>
                      <span className="text-zinc-200 text-[10px] font-black uppercase tracking-widest">{d.name}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center space-y-4 opacity-30">
                <div className="text-4xl">🌑</div>
                <p className="text-[10px] font-black uppercase tracking-widest">Awaiting Data Points</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="glass-card p-10 rounded-[2.5rem] shadow-2xl">
        <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-10">Algorithmic Specialization</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryData.length > 0 ? (
            categoryData.map(cat => (
              <div key={cat.name} className="p-6 bg-white/[0.02] rounded-3xl border border-white/5 flex justify-between items-center group hover:bg-white/5 hover:border-blue-500/30 transition-all cursor-default">
                <span className="text-zinc-400 font-bold group-hover:text-white transition-colors text-sm">{cat.name}</span>
                <span className="text-blue-400 font-black text-xl tabular-nums">
                  {cat.value}
                </span>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center text-zinc-600 font-black uppercase tracking-widest text-[10px]">
              Complete objectives to populate skillset taxonomy
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressCharts;

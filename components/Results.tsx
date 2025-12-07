import React from 'react';
import { Player } from '../types';

interface ResultsProps {
  players: Player[];
  secretWord: string;
  onPlayAgain: () => void;
}

export const Results: React.FC<ResultsProps> = ({ players, secretWord, onPlayAgain }) => {
  return (
    <div className="flex flex-col h-full p-4 overflow-y-auto no-scrollbar pb-32 bg-slate-950">
      <div className="text-center my-8 space-y-3">
        <h2 className="text-slate-400 font-bold uppercase tracking-widest text-sm">La palabra secreta era</h2>
        <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 drop-shadow-sm">
            {secretWord}
        </h1>
        {/* Find the emoji from the first innocent player */}
        <div className="text-7xl mt-4 animate-bounce">
            {players.find(p => !p.isImpostor)?.wordEmoji || '✨'}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-end px-2 pb-2 border-b border-slate-800">
             <h3 className="text-slate-500 font-bold uppercase text-xs tracking-widest">Roles</h3>
        </div>
        
        {players.map((player) => (
          <div 
            key={player.id} 
            className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
              player.isImpostor 
                ? 'bg-red-950/20 border-red-500/50 shadow-lg shadow-red-900/10' 
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl">{player.avatar}</div>
              <span className={`font-bold text-lg ${player.isImpostor ? 'text-red-400' : 'text-slate-200'}`}>
                {player.name}
              </span>
            </div>
            
            {player.isImpostor ? (
              <span className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-black uppercase tracking-wide shadow-red-500/50 shadow-sm">
                Impostor
              </span>
            ) : (
              <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-400 text-xs font-bold uppercase tracking-wide">
                Inocente
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-950 via-slate-950 to-transparent pt-10">
        <button
          onClick={onPlayAgain}
          className="w-full bg-white hover:bg-slate-200 text-slate-950 text-lg font-black py-4 rounded-2xl shadow-xl shadow-white/10 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <span>Jugar Otra Vez</span> 🔄
        </button>
      </div>
    </div>
  );
};
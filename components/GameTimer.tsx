import React, { useState, useEffect } from 'react';

interface GameTimerProps {
  onEndGame: () => void;
  category: string;
}

export const GameTimer: React.FC<GameTimerProps> = ({ onEndGame, category }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-full items-center justify-between p-8 bg-slate-950">
      <div className="text-center space-y-4 mt-12">
        <div className="inline-block px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm font-bold uppercase tracking-wider animate-pulse">
          Juego en Progreso
        </div>
        <h2 className="text-slate-400">Categoría: <span className="text-white font-bold">{category}</span></h2>
      </div>

      <div className="flex flex-col items-center justify-center relative">
        <div className="absolute -inset-10 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="text-9xl font-black text-white tabular-nums tracking-tighter drop-shadow-2xl relative z-10">
          {formatTime(seconds)}
        </div>
        <p className="text-slate-400 mt-8 text-center max-w-xs font-medium text-lg leading-relaxed">
          Discutan, hagan preguntas y...<br/>
          <span className="text-red-400 font-bold">¡Encuentren al Impostor!</span>
        </p>
      </div>

      <div className="w-full space-y-4 mb-8">
        <button
          onClick={onEndGame}
          className="w-full bg-red-600 hover:bg-red-500 text-white text-xl font-bold py-5 rounded-2xl shadow-lg shadow-red-900/30 active:scale-95 transition-all border-b-4 border-red-800 hover:border-red-700"
        >
          Votar / Terminar 🛑
        </button>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { Player } from '../types';

interface PassAndPlayPhaseProps {
  player: Player;
  onNext: () => void;
  isLastPlayer: boolean;
  currentPlayerIndex: number;
  totalPlayers: number;
}

export const PassAndPlayPhase: React.FC<PassAndPlayPhaseProps> = ({ 
  player, 
  onNext, 
  isLastPlayer,
  currentPlayerIndex,
  totalPlayers
}) => {
  const [isRevealed, setIsRevealed] = useState(false);

  React.useEffect(() => {
    setIsRevealed(false);
  }, [player]);

  if (!isRevealed) {
    return (
      <div className="flex flex-col h-full justify-center items-center p-6 space-y-8 animate-in fade-in zoom-in duration-300 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="text-center space-y-4 relative z-10">
          <div className="inline-block bg-slate-800/80 backdrop-blur-sm px-4 py-1.5 rounded-full text-slate-300 text-sm font-bold tracking-wide mb-4 border border-slate-700">
            Jugador {currentPlayerIndex + 1} de {totalPlayers}
          </div>
          <h2 className="text-2xl text-slate-300 font-medium">Pasa el dispositivo a</h2>
          
          <div className="py-6">
             <div className="text-8xl mb-4 animate-bounce duration-[2000ms]">{player.avatar}</div>
             <h1 className="text-5xl font-black text-white drop-shadow-lg">{player.name}</h1>
          </div>
        </div>

        <div className="w-full max-w-xs relative flex items-center justify-center mt-8">
            <button
                onClick={() => setIsRevealed(true)}
                className="group relative z-10 w-full py-6 bg-indigo-600 hover:bg-indigo-500 rounded-2xl shadow-xl shadow-indigo-500/30 active:scale-95 transition-all overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <div className="flex flex-col items-center gap-2">
                    <span className="text-3xl">👆</span>
                    <span className="font-black text-white text-xl uppercase tracking-wider">Toca para ver tu Rol</span>
                </div>
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full justify-between p-6 bg-slate-950 animate-in slide-in-from-right duration-300">
      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em]">TU ROL SECRETO</h2>
        
        <div className={`w-full max-w-sm aspect-[3/4] rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden transition-all ${
            player.isImpostor 
                ? 'bg-gradient-to-b from-red-950 via-red-900 to-slate-900 border-4 border-red-500/50 shadow-red-900/40' 
                : 'bg-gradient-to-b from-indigo-950 via-indigo-900 to-slate-900 border-4 border-indigo-500/50 shadow-indigo-900/40'
        }`}>
            {/* Inner glow */}
            <div className={`absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b ${
                player.isImpostor ? 'from-red-500/20' : 'from-indigo-500/20'
            } to-transparent opacity-50`}></div>

            {player.isImpostor ? (
                <>
                    <div className="text-8xl mb-8 animate-pulse">🤫</div>
                    <h1 className="text-4xl font-black text-red-500 mb-6 tracking-tighter uppercase drop-shadow-lg">IMPOSTOR</h1>
                    <div className="bg-red-950/50 p-4 rounded-xl border border-red-500/30">
                        <p className="text-red-200 text-lg font-medium leading-relaxed">
                            No conoces la palabra secreta.
                        </p>
                    </div>
                    <p className="text-slate-400 text-sm mt-6 px-4">
                        Escucha, miente y trata de descubrir la palabra.
                    </p>
                </>
            ) : (
                <>
                    <div className="text-8xl mb-6 filter drop-shadow-2xl transform hover:scale-110 transition-transform">
                        {player.wordEmoji}
                    </div>
                    <h3 className="text-indigo-300 font-bold mb-2 uppercase text-sm tracking-widest">La palabra es</h3>
                    <h1 className="text-5xl font-black text-white mb-8 break-words leading-tight drop-shadow-xl">
                        {player.word}
                    </h1>
                    <div className="bg-indigo-950/50 p-4 rounded-xl border border-indigo-500/30">
                        <p className="text-indigo-200 font-medium">
                            ¡Que el Impostor no se entere de que tú sabes!
                        </p>
                    </div>
                </>
            )}
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white text-lg font-bold py-5 rounded-2xl transition-all active:scale-95 shadow-lg"
      >
        {isLastPlayer ? "Comenzar Juego 🚀" : "Ocultar y Siguiente ➡️"}
      </button>
    </div>
  );
};
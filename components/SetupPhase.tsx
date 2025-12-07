import React, { useState } from 'react';
import { GameSettings, CATEGORIES, AVATARS } from '../types';

interface SetupPhaseProps {
  onStartGame: (players: { name: string, avatar: string }[], settings: GameSettings) => void;
}

export const SetupPhase: React.FC<SetupPhaseProps> = ({ onStartGame }) => {
  const [playerData, setPlayerData] = useState<{name: string, avatar: string}[]>([
    { name: '', avatar: getRandomAvatar() },
    { name: '', avatar: getRandomAvatar() },
    { name: '', avatar: getRandomAvatar() }
  ]);
  const [category, setCategory] = useState<string>('animals');
  const [customCategory, setCustomCategory] = useState('');
  const [impostorCount, setImpostorCount] = useState(1);

  function getRandomAvatar() {
    return AVATARS[Math.floor(Math.random() * AVATARS.length)];
  }

  const handleNameChange = (index: number, value: string) => {
    const newData = [...playerData];
    newData[index].name = value;
    setPlayerData(newData);
  };

  const changeAvatar = (index: number) => {
    const newData = [...playerData];
    newData[index].avatar = getRandomAvatar();
    setPlayerData(newData);
  };

  const addPlayer = () => setPlayerData([...playerData, { name: '', avatar: getRandomAvatar() }]);
  
  const removePlayer = (index: number) => {
    if (playerData.length <= 3) return;
    const newData = playerData.filter((_, i) => i !== index);
    setPlayerData(newData);
  };

  const startGame = () => {
    const validPlayers = playerData
      .map((p, i) => ({ ...p, name: p.name.trim() || `Jugador ${i + 1}` }));

    if (validPlayers.length < 3) {
      alert("¡Necesitas al menos 3 jugadores!");
      return;
    }

    onStartGame(validPlayers, { category, customCategory, impostorCount });
  };

  return (
    <div className="flex flex-col h-full max-w-md mx-auto p-4 space-y-6 overflow-y-auto no-scrollbar pb-32">
      {/* Logo Area */}
      <div className="text-center py-6 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-indigo-600/20 blur-3xl rounded-full"></div>
        <div className="relative animate-float">
            <div className="text-7xl mb-2 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]">🕵️‍♂️</div>
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 leading-tight uppercase tracking-tighter">
            ¿Quién es<br/>Impostor?
            </h1>
        </div>
        <p className="text-slate-400 text-sm mt-2 font-medium">Encuentra al espía entre nosotros</p>
      </div>

      {/* Players Section */}
      <div className="bg-slate-900/50 p-5 rounded-3xl border border-slate-800 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="text-indigo-400">👥</span> Jugadores ({playerData.length})
          </h2>
          <button 
            onClick={addPlayer}
            className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-full font-bold transition-colors shadow-lg shadow-indigo-500/20"
          >
            + Añadir
          </button>
        </div>
        <div className="space-y-3">
          {playerData.map((player, index) => (
            <div key={index} className="flex gap-3 items-center animate-in slide-in-from-left fade-in duration-300" style={{ animationDelay: `${index * 50}ms` }}>
              <button 
                onClick={() => changeAvatar(index)}
                className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center text-2xl border border-slate-700 hover:border-indigo-500 transition-colors shadow-inner"
              >
                {player.avatar}
              </button>
              <div className="flex-1 relative">
                <input
                    type="text"
                    placeholder={`Jugador ${index + 1}`}
                    value={player.name}
                    onChange={(e) => handleNameChange(index, e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 text-white pl-4 pr-10 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium placeholder:text-slate-600"
                />
                {playerData.length > 3 && (
                    <button 
                    onClick={() => removePlayer(index)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-slate-500 hover:text-red-400 transition-colors"
                    >
                    ✕
                    </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Section */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-white px-2 flex items-center gap-2">
             <span className="text-emerald-400">🧩</span> Categoría
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all duration-200 ${
                category === cat.id
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20 scale-105'
                  : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-600 hover:bg-slate-800'
              }`}
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className="text-sm font-bold">{cat.label}</span>
            </button>
          ))}
        </div>
        {category === 'custom' && (
          <input
            type="text"
            placeholder="Escribe tu tema..."
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            className="w-full bg-slate-800 border border-indigo-500/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 animate-in fade-in slide-in-from-top-2"
          />
        )}
      </div>

      {/* Impostor Count */}
      <div className="bg-slate-900/50 p-5 rounded-3xl border border-slate-800 shadow-xl">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="text-red-400">🕵️</span> Impostores
          </h2>
          <span className="w-8 h-8 bg-red-500/20 text-red-400 rounded-lg flex items-center justify-center font-black">
            {impostorCount}
          </span>
        </div>
        <input
          type="range"
          min="1"
          max={Math.max(1, Math.floor(playerData.length / 2))}
          value={impostorCount}
          onChange={(e) => setImpostorCount(parseInt(e.target.value))}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-500"
        />
        <p className="text-xs text-slate-500 mt-3 font-medium">
          Recomendado: {Math.floor(playerData.length / 5) + 1}
        </p>
      </div>

      {/* Start Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-950 via-slate-950 to-transparent pt-12 z-20">
        <button
          onClick={startGame}
          className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xl font-black py-4 rounded-2xl shadow-xl shadow-indigo-600/30 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <span>COMENZAR</span> 🚀
        </button>
      </div>
    </div>
  );
};
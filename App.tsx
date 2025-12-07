import React, { useState } from 'react';
import { SetupPhase } from './components/SetupPhase';
import { PassAndPlayPhase } from './components/PassAndPlayPhase';
import { GameTimer } from './components/GameTimer';
import { Results } from './components/Results';
import { generateSecretWord } from './services/geminiService';
import { GameState, GameSettings, Player } from './types';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    phase: 'setup',
    players: [],
    secretWord: '',
    secretWordEmoji: '',
    category: '',
    currentPlayerIndex: 0,
    startTime: 0,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleStartGame = async (playerData: {name: string, avatar: string}[], settings: GameSettings) => {
    setIsLoading(true);
    setGameState(prev => ({ ...prev, phase: 'loading' }));

    // 1. Get Secret Word from Gemini
    const categoryToUse = settings.category === 'custom' && settings.customCategory 
      ? settings.customCategory 
      : settings.category;
    
    // Returns object { word, emoji }
    const result = await generateSecretWord(categoryToUse);

    // 2. Assign Roles
    const totalPlayers = playerData.length;
    const impostorIndices = new Set<number>();
    while(impostorIndices.size < settings.impostorCount) {
      impostorIndices.add(Math.floor(Math.random() * totalPlayers));
    }

    const newPlayers: Player[] = playerData.map((p, index) => {
        const isImpostor = impostorIndices.has(index);
        return {
            id: `p-${index}`,
            name: p.name,
            avatar: p.avatar,
            isImpostor: isImpostor,
            word: isImpostor ? undefined : result.word,
            wordEmoji: isImpostor ? undefined : result.emoji
        };
    });

    setGameState({
      phase: 'assigning',
      players: newPlayers,
      secretWord: result.word,
      secretWordEmoji: result.emoji,
      category: categoryToUse,
      currentPlayerIndex: 0,
      startTime: Date.now()
    });
    setIsLoading(false);
  };

  const handleNextPlayer = () => {
    const nextIndex = gameState.currentPlayerIndex + 1;
    if (nextIndex >= gameState.players.length) {
      setGameState(prev => ({ ...prev, phase: 'playing' }));
    } else {
      setGameState(prev => ({ ...prev, currentPlayerIndex: nextIndex }));
    }
  };

  const handleEndGame = () => {
    setGameState(prev => ({ ...prev, phase: 'reveal' }));
  };

  const handlePlayAgain = () => {
    setGameState(prev => ({ ...prev, phase: 'setup' }));
  };

  // Loading Screen
  if (gameState.phase === 'loading' || isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 to-transparent"></div>
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-6 shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
        <p className="text-slate-300 font-bold text-lg animate-pulse text-center px-4">
            Consultando a la IA... 🤖
            <br/>
            <span className="text-sm text-slate-500 font-normal">Creando palabra secreta</span>
        </p>
      </div>
    );
  }

  return (
    <div className="h-screen w-full max-w-lg mx-auto bg-slate-950 relative overflow-hidden shadow-2xl">
      {gameState.phase === 'setup' && (
        <SetupPhase onStartGame={handleStartGame} />
      )}

      {gameState.phase === 'assigning' && (
        <PassAndPlayPhase 
          player={gameState.players[gameState.currentPlayerIndex]}
          onNext={handleNextPlayer}
          isLastPlayer={gameState.currentPlayerIndex === gameState.players.length - 1}
          currentPlayerIndex={gameState.currentPlayerIndex}
          totalPlayers={gameState.players.length}
        />
      )}

      {gameState.phase === 'playing' && (
        <GameTimer 
          category={gameState.category} 
          onEndGame={handleEndGame} 
        />
      )}

      {gameState.phase === 'reveal' && (
        <Results 
          players={gameState.players} 
          secretWord={gameState.secretWord} 
          onPlayAgain={handlePlayAgain} 
        />
      )}
    </div>
  );
}

export default App;
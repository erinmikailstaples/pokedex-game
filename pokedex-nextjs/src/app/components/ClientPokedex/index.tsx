<<<<<<< HEAD
=======
'use client';

import PokemonDisplay from '../PokemonDisplay';
import QuizMode from '../QuizMode';
import RandomMode from '../RandomMode';
>>>>>>> parent of 4cf75df (update quiz to reflect types!)
import { usePokemonData } from '@/app/hooks/usePokemonData';
import { useState, useEffect } from 'react';
import { useMutation, useQuery } from "convex/react";
import { api } from "@/app/components/convex/_generated/api.js";

<<<<<<< HEAD
export default function ClientPokedex({ isQuizMode }) {
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const addScore = useMutation(api.addScore.default);
  const topScores = useQuery(api.getTopScores.default) || [];
  
=======
>>>>>>> parent of 4cf75df (update quiz to reflect types!)

  const {
    pokemon,
    isLoading,
    error,
    score,
    attempts,
    gameOver,
    handleTypeGuess,
    resetGame
  } = usePokemonData();

  useEffect(() => {
    if (gameOver) {
      const isTopTen = topScores.length < 10 || score > topScores[topScores.length - 1].score;
      setShowNamePrompt(isTopTen);
    }
  }, [gameOver, score, topScores]);

  const handleNameSubmit = async (e) => {
    e.preventDefault();
    await addScore({ initials: playerName.slice(0, 3).toUpperCase(), score });
    setShowNamePrompt(false);
    resetGame();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!pokemon) return <div>No Pokemon data available</div>;

  return (
    <div>
<<<<<<< HEAD
      {/* Existing game component */}
      {gameOver && (
        <div>
          <p>Game Over! Your final score: {score}</p>
          {showNamePrompt ? (
            <form onSubmit={handleNameSubmit}>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                maxLength={3}
                placeholder="Enter your initials"
              />
              <button type="submit">Submit Score</button>
            </form>
          ) : (
            <button onClick={resetGame}>Play Again</button>
          )}
        </div>
=======
      <PokemonDisplay
        imageUrl={pokemon.sprites.front_default}
        name={pokemon.name}
        isQuizMode={isQuizMode}
      />
      {isQuizMode ? (
        <QuizMode
          score={score}
          attempts={attempts}
          gameOver={gameOver}
          onGuess={handleTypeGuess}
          onReset={resetGame}
        />
      ) : (
        <RandomMode
          name={pokemon.name}
          types={pokemon.types}
          onNewPokemon={fetchNewPokemon}
        />
>>>>>>> parent of 4cf75df (update quiz to reflect types!)
      )}
    </div>
  );
}

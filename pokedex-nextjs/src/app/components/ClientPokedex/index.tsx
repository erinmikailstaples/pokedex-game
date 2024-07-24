import { useState, useEffect } from 'react';
import { useMutation, useQuery } from "convex/react";
import { api } from "@/app/components/convex/_generated/api.js";

export default function ClientPokedex({ isQuizMode }) {
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const addScore = useMutation(api.addScore);
  const topScores = useQuery(api.getTopScores) || [];

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
      )}
    </div>
  );
}

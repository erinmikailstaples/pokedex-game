'use client';

import PokemonDisplay from '../PokemonDisplay';
import TypeButtons from '../TypeButtons';
import { usePokemonData } from '@/app/hooks/usePokemonData';
import styles from '../PokemonDisplay.module.scss';
import { useQuery } from 'convex/react';
import { api } from "../../../../convex/_generated/api";

export default function ClientPokedex() {
  const {
    pokemon,
    isLoading,
    error,
    score,
    attempts,
    handleTypeGuess,
    gameOver,
    resetGame
  } = usePokemonData();

  const highScores = useQuery(api.getHighScores.getHighScores);
  const topScore = highScores && highScores.length > 0 ? highScores[0].score : 0;
  const scoreDistance = Math.max(0, topScore - score);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!pokemon) return <div>No Pokemon data available</div>;

  return (
    <div className={styles.pokedex}>
      <PokemonDisplay
        imageUrl={pokemon.sprites.front_default}
        name={pokemon.name}
      />
      {!gameOver ? (
        <>
          <TypeButtons onTypeGuess={handleTypeGuess} />
          <div className={styles.scorePanel}>
            <p>Score: {score}</p>
            <p>Attempts left: {3 - attempts}</p>
            <p>Points to high score: {scoreDistance}</p>
          </div>
        </>
      ) : (
        <div>
          <p>Game Over! Final Score: {score}</p>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
    </div>
  );
}

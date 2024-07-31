'use client';

import PokemonDisplay from '../PokemonDisplay';
import styles from '../PokemonDisplay.module.scss';
import { usePokemonData } from '@/app/hooks/usePokemonData';
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from 'react';

export default function QuizMode() {
  const {
    pokemon,
    isLoading,
    error,
    score,
    attempts,
    gameOver,
    handleTypeGuess,
    resetGame,
    fetchNewPokemon,
    submitHighScore
  } = usePokemonData();

  const addHighScore = useMutation(api.addHighScore.addHighScore);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmitScore = async (initials: string, email: string) => {
    try {
      await submitHighScore(initials, email);
      setSubmitStatus('success');
    } catch (error) {
      console.error('Error submitting score:', error);
      setSubmitStatus('error');
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!pokemon) return <div>No Pokemon data available</div>;

  return (
    <div className={styles.pokedex}>
      <PokemonDisplay
        imageUrl={pokemon.sprites.front_default}
        name={pokemon.name}
        isQuizMode={true}
      />
      {gameOver ? (
        <div>
          <p>Game Over! Your score: {score}</p>
          <button onClick={resetGame}>Play Again</button>
          {submitStatus === 'success' && <p>High score submitted successfully!</p>}
          {submitStatus === 'error' && <p>Error submitting high score. Please try again.</p>}
          {/* Add form for submitting high score */}
        </div>
      ) : (
        <div>
          <p>Guess the Pokemon type:</p>
          {/* Add type buttons for guessing */}
          {/* Use handleTypeGuess function for button click handlers */}
        </div>
      )}
    </div>
  );
}

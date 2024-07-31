'use client';

import PokemonDisplay from '../PokemonDisplay';
import styles from '../PokemonDisplay.module.scss';
import { usePokemonData } from '@/app/hooks/usePokemonData';
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
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
      />
{gameOver ? (
  <div>
    <p>Game Over! Your score: {score}</p>
    <button onClick={resetGame}>Play Again</button>
    {submitStatus === 'success' && <p>High score submitted successfully!</p>}
    {submitStatus === 'error' && <p>Error submitting high score. Please try again.</p>}
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      handleSubmitScore(formData.get('initials') as string, formData.get('email') as string);
    }}>
      <input type="text" name="initials" maxLength={3} placeholder="Initials" required />
      <input type="email" name="email" placeholder="Email" required />
      <button type="submit">Submit High Score</button>
    </form>
  </div>
) : (
  <div>
    <p>Guess the Pokemon type:</p>
    {['Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 'Ground'].map(type => (
      <button key={type} type="button" onClick={() => handleTypeGuess(type)}>{type}</button>
    ))}
  </div>
)}

    </div>
  );
}

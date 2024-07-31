'use client';

import PokemonDisplay from '../PokemonDisplay';
import QuizMode from '../QuizMode';
import RandomMode from '../RandomMode';
import { usePokemonData } from '@/app/hooks/usePokemonData';
import styles from '../PokemonDisplay.module.scss';
import { useMutation, useQuery } from "convex/react";
// import { api } from "@/convex/_generated/api";

export default function ClientPokedex({ isQuizMode }: { isQuizMode: boolean }) {
  const {
    pokemon,
    isLoading,
    error,
    score,
    attempts,
    gameOver,
    handleTypeGuess,
    resetGame,
    fetchNewPokemon
  } = usePokemonData();

  const addHighScore = useMutation(api.addHighScore);
  const highScores = useQuery(api.getHighScores);

  const handleSubmitScore = (initials: string, email: string) => {
    addHighScore({ initials, email, score });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!pokemon) return <div>No Pokemon data available</div>;

  return (
    <div className={styles.pokedex}>
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
      )}
      {isQuizMode && gameOver && (
        <div>
          <h2>Game Over! Your score: {score}</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            handleSubmitScore(formData.get('initials') as string, formData.get('email') as string);
          }}>
            <input type="text" name="initials" maxLength={3} placeholder="Initials" required />
            <input type="email" name="email" placeholder="Email" required />
            <button type="submit">Submit High Score</button>
          </form>
          <h3>High Scores</h3>
          {highScores?.map((highScore, index) => (
            <div key={index}>
              {highScore.initials}: {highScore.score}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

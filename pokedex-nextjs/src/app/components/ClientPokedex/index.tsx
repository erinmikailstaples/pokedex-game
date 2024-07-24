'use client';

import PokemonDisplay from '../PokemonDisplay';
import QuizMode from '../QuizMode';
import RandomMode from '../RandomMode';
import { usePokemonData } from '@/app/hooks/usePokemonData';
import styles from '../PokemonDisplay.module.scss';

export default function ClientPokedex({ isQuizMode }) {
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
    </div>
  );
}

// app/page.tsx
'use client';

import styles from './Pokedex.module.scss';
import PokemonDisplay from '../components/PokemonDisplay';
import QuizMode from '../components/QuizMode';
import RandomMode from '../components/RandomMode';
import { usePokemonData } from '../hooks/usePokemonData';

export default function Home() {
  const {
    pokemon,
    isLoading,
    error,
    isQuizMode,
    score,
    attempts,
    gameOver,
    fetchNewPokemon,
    handleTypeGuess,
    resetGame
  } = usePokemonData();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!pokemon) return <div>No Pokemon data available</div>;

  return (
    <main className={styles.main}>
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
    </main>
  );
}

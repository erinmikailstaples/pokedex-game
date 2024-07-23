// app/components/ClientPokedex.tsx
'use client';

import PokemonDisplay from '../PokemonDisplay';
import QuizMode from '../QuizMode';
import RandomMode from '../RandomMode';
import { usePokemonData } from '../../hooks/usePokemonData';

export default function ClientPokedex() {
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
    <div>
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
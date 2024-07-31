'use client';

import PokemonDisplay from '../PokemonDisplay';
import TypeButtons from '../TypeButtons';
import { usePokemonData } from '@/app/hooks/usePokemonData';
import styles from '../PokemonDisplay.module.scss';

export default function ClientPokedex() {
  const {
    pokemon,
    isLoading,
    error,
    handleTypeGuess,
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
      />
      <TypeButtons onTypeGuess={handleTypeGuess} />
      <button onClick={fetchNewPokemon}>Get New Pokemon</button>
    </div>
  );
}

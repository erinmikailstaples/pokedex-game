'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Pokedex.module.scss';

// ... (keep the PokemonData interface as is)

const Pokedex: React.FC = () => {
  const [pokemon, setPokemon] = useState<PokemonData | null>(null);

  // ... (keep the useEffect hook as is)

  if (!pokemon) return <div>Loading...</div>;

  return (
    <div className={styles.pokedex}>
      <div className={styles.cameraDisplay}>
        <Image
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          width={300}
          height={300}
          unoptimized={true}
        />
      </div>
      <h2 className={styles.pokemonName}>{pokemon.name}</h2>
      <div className={styles.statsDisplay}>
        <h3>Abilities</h3>
        <ul>
          {pokemon.abilities.slice(0, 2).map((ability, index) => (
            <li key={index}>{ability.ability.name}</li>
          ))}
        </ul>
        <h3>Moves</h3>
        <ul>
          {pokemon.moves.slice(0, 3).map((move, index) => (
            <li key={index}>{move.move.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <main className={styles.main}>
      <Pokedex />
    </main>
  );
}

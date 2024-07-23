'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Pokedex.module.scss';

interface PokemonData {
  name: string;
  id: number;
  abilities: { ability: { name: string } }[];
  moves: { move: { name: string } }[];
  sprites: { front_default: string };
}

const Pokedex: React.FC = () => {
  const [pokemon, setPokemon] = useState<PokemonData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setIsLoading(true);
        const randomId = Math.floor(Math.random() * 898) + 1;
        console.log(`Fetching Pokemon with ID: ${randomId}`);
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: PokemonData = await response.json();
        console.log('Fetched Pokemon data:', data);
        setPokemon(data);
      } catch (e) {
        console.error('Error fetching Pokemon:', e);
        setError('Failed to fetch Pokemon. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!pokemon) return <div>No Pokemon data available</div>;

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

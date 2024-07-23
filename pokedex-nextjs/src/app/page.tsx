'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Pokedex.module.scss';
import { initialize, LDClient } from 'launchdarkly-js-client-sdk';

interface PokemonData {
  name: string;
  id: number;
  abilities: { ability: { name: string } }[];
  moves: { move: { name: string } }[];
  sprites: { front_default: string };
  types: { type: { name: string } }[];
}

const Pokedex: React.FC = () => {
  const [pokemon, setPokemon] = useState<PokemonData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ldClient, setLdClient] = useState<LDClient | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  useEffect(() => {
    const initLaunchDarkly = async () => {
      const client = initialize('YOUR_CLIENT_SIDE_ID', { anonymous: true });
      await client.waitForInitialization();
      setLdClient(client);
    };

    initLaunchDarkly();
  }, []);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setIsLoading(true);
        const randomId = Math.floor(Math.random() * 898) + 1;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: PokemonData = await response.json();
        if (selectedType && !data.types.some(t => t.type.name === selectedType)) {
          throw new Error('Pokemon type does not match selected type');
        }
        setPokemon(data);
      } catch (e) {
        console.error('Error fetching Pokemon:', e);
        setError('Failed to fetch Pokemon. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemon();
  }, [selectedType]);

  const handleTypeSelect = (type: string) => {
    if (ldClient) {
      const showType = ldClient.variation('show-pokemon-type', false);
      if (showType) {
        setSelectedType(type);
      }
    }
  };

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
        <h3>Type</h3>
        <ul>
          {pokemon.types.map((type, index) => (
            <li key={index}>{type.type.name}</li>
          ))}
        </ul>
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
      <div className={styles.typeButtons}>
        <button onClick={() => handleTypeSelect('fire')}>Fire</button>
        <button onClick={() => handleTypeSelect('water')}>Water</button>
        <button onClick={() => handleTypeSelect('grass')}>Grass</button>
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

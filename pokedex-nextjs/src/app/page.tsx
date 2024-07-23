'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Pokedex.module.scss';
import { initialize, LDClient } from 'launchdarkly-js-client-sdk';

interface PokemonData {
  name: string;
  id: number;
  types: { type: { name: string } }[];
  sprites: { front_default: string };
}

const Pokedex: React.FC = () => {
  const [pokemon, setPokemon] = useState<PokemonData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ldClient, setLdClient] = useState<LDClient | null>(null);
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const initLaunchDarkly = async () => {
      const sdkKey = process.env.NEXT_PUBLIC_LD_CLIENT_SIDE_SDK;
      console.log('LaunchDarkly Client ID:', sdkKey);
      if (sdkKey) {
        const client = initialize(sdkKey, { kind: 'user', key: 'user-key-123abc' });
        await client.waitForInitialization();
        setLdClient(client);
        setIsQuizMode(client.variation('quiz-mode', false));
      } else {
        console.error('LaunchDarkly Client ID is not set');
      }
    };

    initLaunchDarkly();
  }, []);

  useEffect(() => {
    fetchNewPokemon();
  }, [isQuizMode]);

  const fetchNewPokemon = async () => {
    const types = ['fire', 'water', 'grass'];
    try {
      setIsLoading(true);
      let validPokemon = null;
      while (!validPokemon) {
        const randomId = Math.floor(Math.random() * 898) + 1;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: PokemonData = await response.json();
        if (data.types.some(type => types.includes(type.type.name))) {
          validPokemon = data;
        }
      }
      setPokemon(validPokemon);
    } catch (e) {
      console.error('Error fetching Pokemon:', e);
      setError('Failed to fetch Pokemon. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTypeGuess = (guessedType: string) => {
    if (!pokemon || gameOver) return;

    const correctType = pokemon.types[0].type.name;
    if (guessedType === correctType) {
      setScore(score + 1);
      fetchNewPokemon();
    } else {
      setAttempts(attempts + 1);
      if (attempts >= 2) {
        setGameOver(true);
      }
    }
  };

  const resetGame = () => {
    setScore(0);
    setAttempts(0);
    setGameOver(false);
    fetchNewPokemon();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!pokemon) return <div>No Pokemon data available</div>;

  return (
    <div className={styles.pokedex}>
      <div className={styles.cameraDisplay}>
        <Image
          src={pokemon.sprites.front_default}
          alt={isQuizMode ? "Mystery Pokemon" : pokemon.name}
          width={300}
          height={300}
          unoptimized={true}
        />
      </div>
      {isQuizMode ? (
        <div className={styles.quizMode}>
          <h2>Guess the Pokemon Type!</h2>
          <div className={styles.scoreBoard}>
            <p>Score: {score}</p>
            <p>Attempts left: {3 - attempts}</p>
          </div>
          {gameOver ? (
            <div>
              <p>Game Over! Your final score: {score}</p>
              <button onClick={resetGame}>Play Again</button>
            </div>
          ) : (
            <div className={styles.typeButtons}>
              <button onClick={() => handleTypeGuess('fire')}>Fire</button>
              <button onClick={() => handleTypeGuess('water')}>Water</button>
              <button onClick={() => handleTypeGuess('grass')}>Grass</button>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.randomMode}>
          <h2 className={styles.pokemonName}>{pokemon.name}</h2>
          <div className={styles.statsDisplay}>
            <h3>Type</h3>
            <ul>
              {pokemon.types.map((type, index) => (
                <li key={index}>{type.type.name}</li>
              ))}
            </ul>
          </div>
          <button onClick={fetchNewPokemon}>Get New Pokemon</button>
        </div>
      )}
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

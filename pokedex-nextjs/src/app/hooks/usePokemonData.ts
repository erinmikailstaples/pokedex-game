'use client';

import { useState, useEffect } from 'react';
import { initialize, LDClient } from 'launchdarkly-js-client-sdk';

interface PokemonData {
  name: string;
  id: number;
  types: { type: { name: string } }[];
  sprites: { front_default: string };
}

export function usePokemonData() {
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
      const clientSideId = process.env.NEXT_PUBLIC_LD_CLIENT_SIDE_SDK;
      console.log('LaunchDarkly Client Side ID:', clientSideId);
      if (!clientSideId) {
        console.error('LaunchDarkly client-side ID is not set');
        return;
      }
      try {
        const client = initialize(clientSideId, { anonymous: true });
        await client.waitForInitialization();
        console.log('LaunchDarkly client initialized successfully');
        setLdClient(client);
        const quizModeValue = client.variation('quiz-mode', false);
        console.log('Quiz mode value:', quizModeValue);
        setIsQuizMode(quizModeValue);
      } catch (error) {
        console.error('Error initializing LaunchDarkly:', error);
        // Set a default value for isQuizMode if LaunchDarkly fails
        setIsQuizMode(false);
      }
    };

    initLaunchDarkly();
  }, []);

  useEffect(() => {
    fetchNewPokemon();
  }, [isQuizMode]);

  const fetchNewPokemon = async () => {
    try {
      setIsLoading(true);
      const randomId = Math.floor(Math.random() * 898) + 1;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: PokemonData = await response.json();
      setPokemon(data);
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

  return {
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
  };
}

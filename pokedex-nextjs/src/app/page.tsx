// Import necessary hooks and components
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Pokedex.module.scss';

function Home() {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/charmander');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setPokemon(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemon();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div id="forest"> {/* Assuming 'forest' is an ID, use it directly */}
      <div className={styles.pokedex}>
        <div className={styles.sensor}>
          <button></button>
        </div>
        <div className={styles.cameraDisplay}>
          {pokemon && (
            <Image src={pokemon.sprites.front_default} alt={pokemon.name} width={300} height={300} />
          )}
        </div>
        <div className={styles.divider}></div>
        <div className={styles.statsDisplay}>
          {pokemon && (
            <>
              <h2>{pokemon.name}</h2>
              <h3>Abilities</h3>
              <ul>
                {pokemon.abilities.map((ability) => (
                  <li key={ability.ability.name}>{ability.ability.name}</li>
                ))}
              </ul>
              <h3>Moves</h3>
              <ul>
                {pokemon.moves.slice(0, 3).map((move) => (
                  <li key={move.move.name}>{move.move.name}</li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className={styles.bottomActions}>
          {/* Bottom Actions and Input Pad remain unchanged */}
        </div>
      </div>
    </div>
  );
}

export default Home;
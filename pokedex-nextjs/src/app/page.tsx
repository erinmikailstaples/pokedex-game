<<<<<<< HEAD
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

=======
import Image from "next/image";
import styles from './Pokedex.module.scss';

export default function Home() {
>>>>>>> parent of fea1a14 (update the main page)
  return (
    <div id="forest"> {/* Assuming 'forest' is an ID, use it directly */}
      <div className={styles.pokedex}>
        <div className={styles.sensor}>
          <button></button>
        </div>
        <div className={styles.cameraDisplay}>
          <Image src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png" alt="Pokemon" width={300} height={300} />
        </div>
        <div className={styles.divider}></div>
        <div className={styles.statsDisplay}>
          <h2>Charmander</h2>
          <h3>Abilities</h3>
          <ul>
            <li>Solar-power</li>
            <li>Blaze</li>
          </ul>
          <h3>Moves</h3>
          <ul>
            <li>dragon-rage</li>
            <li>dragon-breath</li>
            <li>dragon-claw</li>
          </ul>
        </div>
        <div className={styles.botomActions}>
          <div id={styles.actions}>
            <button className={styles.a}></button>
          </div>
          <div id={styles.cross}>
            <button className={`${styles.crossButton} ${styles.up}`}></button>
            <button className={`${styles.crossButton} ${styles.right}`}></button>
            <button className={`${styles.crossButton} ${styles.down}`}></button>
            <button className={`${styles.crossButton} ${styles.left}`}></button>
            <div className={`${styles.crossButton} ${styles.center}`}> </div>
          </div>
        </div>
<<<<<<< HEAD
=======
        <div className={styles.inputPad}><input /></div>
        <div className={styles.bottomModes}>
          <button className={styles.levelButton}></button>
          <button className={styles.levelButton}></button>
          <button className={styles.levelButton}></button>
          <button className={styles.levelButton}></button>
          <button className={`${styles.pokedexMode} ${styles.blackButton}`}>Pokedex</button>
          <button className={`${styles.gameMode} ${styles.blackButton}`}>Game</button>
        </div>
>>>>>>> parent of fea1a14 (update the main page)
      </div>
    </div>
  );
}

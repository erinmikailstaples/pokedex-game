import Image from "next/image";
import styles from './Pokedex.module.scss';

export default function Home() {
  return (
    <div id={styles.forest}>
      <div id={styles.pokedex}>
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
        <div className={styles.inputPad}><input /></div>
        <div className={styles.bottomModes}>
          <button className={styles.levelButton}></button>
          <button className={styles.levelButton}></button>
          <button className={styles.levelButton}></button>
          <button className={styles.levelButton}></button>
          <button className={`${styles.pokedexMode} ${styles.blackButton}`}>Pokedex</button>
          <button className={`${styles.gameMode} ${styles.blackButton}`}>Game</button>
        </div>
      </div>
    </div>
  );
}

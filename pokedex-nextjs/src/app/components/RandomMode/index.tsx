// random pokemon display - components/RandomMode.tsx
import styles from '../PokemonDisplay.module.scss';

interface RandomModeProps {
  name: string;
  types: { type: { name: string } }[];
  onNewPokemon: () => void;
}

export default function RandomMode({ name, types, onNewPokemon }: RandomModeProps) {
  return (
    <div className={styles.randomMode}>
      <h2 className={styles.pokemonName}>{name}</h2>
      <div className={styles.statsDisplay}>
        <h3>Type</h3>
        <ul>
          {types.map((type, index) => (
            <li key={index}>{type.type.name}</li>
          ))}
        </ul>
      </div>
      <button onClick={onNewPokemon}>Get New Pokemon</button>
    </div>
  );
}
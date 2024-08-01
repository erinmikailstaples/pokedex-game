import styles from '../PokemonDisplay.module.scss';

const types = ['Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 'Ground'];

interface TypeButtonsProps {
  onTypeGuess: (type: string) => void;
}

export default function TypeButtons({ onTypeGuess }: TypeButtonsProps) {
  return (
    <div className={styles.typeButtons}>
      {types.map(type => (
        <button 
          key={type} 
          className={styles.typeButton} 
          data-type={type}
          onClick={() => onTypeGuess(type)}
        >
          {type}
        </button>
      ))}
    </div>
  );
}

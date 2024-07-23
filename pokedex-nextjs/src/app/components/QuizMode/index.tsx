// src/app/components/QuizMode/index.tsx

import styles from '../PokemonDisplay.module.scss';

interface QuizModeProps {
  score: number;
  attempts: number;
  gameOver: boolean;
  onGuess: (type: string) => void;
  onReset: () => void;
}

const QUIZ_TYPES = ['fire', 'water', 'grass'];

export default function QuizMode({ score, attempts, gameOver, onGuess, onReset }: QuizModeProps) {
  const handleGuess = (type: string) => {
    onGuess(type);
    // The score update is now handled in the parent component (usePokemonData hook)
  };

  return (
    <div className={styles.quizMode}>
      <h2>Guess the Pokemon Type!</h2>
      <div className={styles.scoreBoard}>
        <p>Score: {score}</p>
        <p>Attempts left: {3 - attempts}</p>
      </div>
      {gameOver ? (
        <div>
          <p>Game Over! Your final score: {score}</p>
          <button onClick={onReset}>Play Again</button>
        </div>
      ) : (
        <div className={styles.typeButtons}>
          {QUIZ_TYPES.map((type) => (
            <button key={type} onClick={() => handleGuess(type)}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// creates quiz mode components/QuizMode.tsx

import styles from './QuizMode.module.scss';

interface QuizModeProps {
  score: number;
  attempts: number;
  gameOver: boolean;
  onGuess: (type: string) => void;
  onReset: () => void;
}

export default function QuizMode({ score, attempts, gameOver, onGuess, onReset }: QuizModeProps) {
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
          <button onClick={() => onGuess('fire')}>Fire</button>
          <button onClick={() => onGuess('water')}>Water</button>
          <button onClick={() => onGuess('grass')}>Grass</button>
        </div>
      )}
    </div>
  );
}

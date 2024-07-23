// creates display image - components/PokemonDisplay.tsx
import Image from 'next/image';
import styles from './PokemonDisplay.module.scss';

interface PokemonDisplayProps {
  imageUrl: string;
  name: string;
  isQuizMode: boolean;
}

export default function PokemonDisplay({ imageUrl, name, isQuizMode }: PokemonDisplayProps) {
  return (
    <div className={styles.cameraDisplay}>
      <Image
        src={imageUrl}
        alt={isQuizMode ? "Mystery Pokemon" : name}
        width={300}
        height={300}
        unoptimized={true}
      />
    </div>
  );
}

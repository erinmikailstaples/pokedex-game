import Image from 'next/image';
import styles from '../PokemonDisplay.module.scss';

interface PokemonDisplayProps {
  imageUrl: string;
  name: string;
}

export default function PokemonDisplay({ imageUrl, name }: PokemonDisplayProps) {
  return (
    <div className={styles.cameraDisplay}>
      <Image
        src={imageUrl}
        alt={name}
        width={300}
        height={300}
        unoptimized={true}
      />
      <div className={styles.namePopup}>
        <p>{name}</p>
      </div>
    </div>
  );
}
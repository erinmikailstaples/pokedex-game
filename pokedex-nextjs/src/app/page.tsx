'use client';

import ClientPokedex from '@/app/components/ClientPokedex';
import styles from '@/app/components/PokemonDisplay.module.scss';
import { usePokemonData } from '@/app/hooks/usePokemonData';

export default function Home() {
  const { isQuizMode } = usePokemonData();

  return (
    <main className={styles.main}>
      <ClientPokedex isQuizMode={isQuizMode} />
    </main>
  );
}

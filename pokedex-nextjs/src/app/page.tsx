'use client';

import dynamic from 'next/dynamic';
import styles from '@/app/components/PokemonDisplay.module.scss';
import { usePokemonData } from '@/app/hooks/usePokemonData';
import Leaderboard from '@/app/components/Leaderboard';

const ClientPokedex = dynamic(() => import('@/app/components/ClientPokedex'), {
  ssr: false,
});

export default function Home() {
  const { isQuizMode, gameOver, score } = usePokemonData();

  return (
    <main className={styles.main}>
      <ClientPokedex isQuizMode={isQuizMode} />
      {isQuizMode && gameOver && <Leaderboard />}
    </main>
  );
}

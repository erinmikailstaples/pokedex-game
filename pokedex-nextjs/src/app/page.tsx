'use client';

import { useQuery, useMutation } from "@/convex/_generated/react";
import dynamic from 'next/dynamic';
import styles from '@/app/components/PokemonDisplay.module.scss';
import { usePokemonData } from '@/app/hooks/usePokemonData';
import Leaderboard from '@/app/components/Leaderboard';

const ClientPokedex = dynamic(() => import('@/app/components/ClientPokedex'), {
  ssr: false,
});

export default function Home() {
  const { isQuizMode, gameOver, score } = usePokemonData();
  const addScore = useMutation("addScore");

  const handleGameCompletion = async (initials: string) => {
    if (isQuizMode && gameOver) {
      await addScore({ initials, score });
    }
  };

  return (
    <main className={styles.main}>
      <ClientPokedex isQuizMode={isQuizMode} onGameComplete={handleGameCompletion} />
      {isQuizMode && gameOver && <Leaderboard />}
    </main>
  );
}

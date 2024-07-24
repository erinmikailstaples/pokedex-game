'use client';

import dynamic from 'next/dynamic';
import styles from '@/app/components/PokemonDisplay.module.scss';
import { usePokemonData } from '@/app/hooks/usePokemonData';

const ClientPokedex = dynamic(() => import('@/app/components/ClientPokedex').then(mod => mod.default), {
  ssr: false,
});

export default function Home() {
  const { isQuizMode } = usePokemonData();

  return (
    <main className={styles.main}>
      <ClientPokedex isQuizMode={isQuizMode} />
    </main>
  );
}

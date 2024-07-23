'use client';

import dynamic from 'next/dynamic';
import styles from '@/app/components/PokemonDisplay.module.scss';

const ClientPokedex = dynamic(() => import('@/app/components/ClientPokedex'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className={styles.main}>
      <ClientPokedex />
    </main>
  );
}

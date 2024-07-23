'use client';

import dynamic from 'next/dynamic';
import styles from './Pokedex.module.scss';

const ClientPokedex = dynamic(() => import('./components/ClientPokedex'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className={styles.main}>
      <ClientPokedex />
    </main>
  );
}

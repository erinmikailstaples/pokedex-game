import dynamic from 'next/dynamic';
import styles from './Pokedex.module.scss';

const ClientPokedex = dynamic(() => import('./components/ClientPokedex'), {
  ssr: false,
});


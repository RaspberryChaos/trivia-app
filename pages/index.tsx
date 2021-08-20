import type { NextPage } from 'next';
import Link from "next/link";
import styles from '../styles/Home.module.css';


const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>Trivia App</h1>
      <Link href="/quiz" passHref>
        <button>Start Game!</button>
        </Link>

    </div>
  )
}

export default Home
